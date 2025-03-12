// UploadPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Uploader from "@components/upload/Uploader";
import UploadModal from "@components/upload/UploadModal";
import SelectionPopup from "@components/modal/SelectionPopup";
import LoadingModal from "@components/modal/LoadingModal";
import checkAroundIcon from "@assets/icons/checkAroundIcon.svg";
import token from "@utils/token.tsx";

export interface FileUploadState {
    file: File;
    progress: number;
    status: "ready" | "uploaded" | "error" |"uploading";
}

const UploadPage = () => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    // 파일 크기 제한 (20MB)
    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    // 선택된 파일들을 저장
    const [files, setFiles] = useState<File[]>([]);
    // 파일의 업로드 상태를 관리 (여기서는 이미 업로드된 것으로 간주)
    const [uploadStates, setUploadStates] = useState<FileUploadState[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 간편 인증 후 진행 여부 확인 모달
    const [showSelectionPopup, setShowSelectionPopup] = useState(false);
    // 추가 API 호출 시 로딩 상태 모달
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    // 최종 성공 후 표시할 모달
    const [showSecondPopup, setShowSecondPopup] = useState(false);

    // Uploader에서 파일이 선택되면 호출됨
    const handleFilesAdded = (newFiles: File[]) => {
        setFiles((prev) => [...prev, ...newFiles]);

        // 파일 크기에 따라 상태 설정
        const newStates = newFiles.map<FileUploadState>((file) => {
            // 파일 크기가 20MB를 초과하는 경우 uploading 상태로 설정
            if (file.size > MAX_FILE_SIZE) {
                return {
                    file,
                    progress: 0, // 업로드 시작 상태
                    status: "uploading", // uploading 상태로 설정
                };
            } else {
                // 20MB 이하인 경우 기존과 같이 업로드 완료 상태로 설정
                return {
                    file,
                    progress: 100, // 이미 업로드 완료된 상태로 표시
                    status: "uploaded",
                };
            }
        });

        setUploadStates((prev) => [...prev, ...newStates]);
        setIsModalOpen(true);
    };

    // 취소 버튼 처리 기능 추가
    const handleCancel = (fileState: FileUploadState) => {
        // uploading 상태의 파일만 취소 처리
        if (fileState.status === "uploading") {
            // 해당 파일의 상태를 error로 변경
            setUploadStates(prev =>
                prev.map(state =>
                    state.file.name === fileState.file.name &&
                    state.file.lastModified === fileState.file.lastModified
                        ? { ...state, status: "error", progress: 0 }
                        : state
                )
            );
        }
    };

    // 재시도 기능 추가
    const handleRetry = (fileState: FileUploadState) => {
        // 오류 상태의 파일만 재시도 처리
        if (fileState.status === "error") {
            // 파일 크기에 따라 상태 변경
            if (fileState.file.size > MAX_FILE_SIZE) {
                setUploadStates(prev =>
                    prev.map(state =>
                        state.file.name === fileState.file.name &&
                        state.file.lastModified === fileState.file.lastModified
                            ? { ...state, status: "uploading", progress: 0 }
                            : state
                    )
                );
            } else {
                setUploadStates(prev =>
                    prev.map(state =>
                        state.file.name === fileState.file.name &&
                        state.file.lastModified === fileState.file.lastModified
                            ? { ...state, status: "uploaded", progress: 100 }
                            : state
                    )
                );
            }
        }
    };

    // 삭제 기능 추가
    const handleRemove = (fileState: FileUploadState) => {
        // 파일 목록에서 제거
        setFiles(prev =>
            prev.filter(file =>
                !(file.name === fileState.file.name &&
                    file.lastModified === fileState.file.lastModified)
            )
        );

        // 업로드 상태 목록에서도 제거
        setUploadStates(prev =>
            prev.filter(state =>
                !(state.file.name === fileState.file.name &&
                    state.file.lastModified === fileState.file.lastModified)
            )
        );
    };

    const handleComplete = async () => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        try {
            const invoiceResponse = await token.post(
                `${BaseUrl}/v1/invoice`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            if (invoiceResponse.status === 200) {
                // ✅ 업로드 모달을 닫고 간편 인증 모달을 띄우기
                setIsModalOpen(false);
                setShowSelectionPopup(true);
            } else {
                alert("파일 업로드 확인에 실패했습니다.");
                navigate("/home");
            }
        } catch (err) {
            console.error("Invoice API error", err);
            alert("API 통신에 실패했습니다.");
            navigate("/home");
        }
    };

// "확인" 버튼 클릭 시 실행되는 함수
    const handleSelectionConfirm = async () => {
        setShowSelectionPopup(false);
        setShowLoadingModal(true);

        try {
            const additionResponse = await token.post(
                `${BaseUrl}/v1/receipt/upload/addition`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setShowLoadingModal(false);

            if (additionResponse.data === 200) {
                setShowSecondPopup(true);
            } else {
                alert("세금계산서 정보가 일치하지 않습니다.");
                navigate("/reconciliation");
            }
        } catch (err) {
            console.error("upload/addition API error", err);
            setShowLoadingModal(false);
            alert("API 통신에 실패했습니다.");
            navigate("/home");
        }
    };
    // 모달 닫기 처리
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Uploader onFilesAdded={handleFilesAdded} />

            {isModalOpen && (
                <UploadModal
                    uploadStates={uploadStates}
                    onCancel={handleCancel}
                    onRetry={handleRetry}
                    onRemove={handleRemove}
                    onComplete={handleComplete}
                    onClose={handleModalClose}
                    isSendingAll={false}
                    error={""}
                />
            )}

            {showSelectionPopup && (
                <SelectionPopup
                    Content={"간편인이 완료되면 \n확인 버튼 눌러주세요"}
                    primaryButton={{
                        label: "확인",
                        onClick: handleSelectionConfirm, // ✅ 중복 호출 없이 이 함수만 호출
                    }}
                    secondaryButton={{
                        label: "취소",
                        onClick: () => setShowSelectionPopup(false),
                    }}
                />
            )}

            {showLoadingModal && (
                <LoadingModal
                    content="세금계산서 확인중"
                    subContent="홈텍스 정보와 세금계산서가 일치하는지 확인중이에요"
                />
            )}

            {showSecondPopup && (
                <SelectionPopup
                    IconImg={checkAroundIcon}
                    Content={"세금계산서 발급 여부가\n모두 확인되었어요!"}
                    primaryButton={{
                        label: "홈으로 이동",
                        onClick: () => navigate("/home"),
                    }}
                    secondaryButton={{
                        label: "계속 업로드",
                        onClick: () => setShowSecondPopup(false),
                    }}
                />
            )}
        </>
    );
};

export default UploadPage;
