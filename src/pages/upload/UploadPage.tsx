import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import Uploader from "@components/upload/Uploader";
import UploadModal from "@components/upload/UploadModal";
import SelectionPopup from "@components/modal/SelectionPopup";
import { useNavigate } from "react-router-dom";
import LoadingModal from "@components/modal/LoadingModal.tsx";
import checkAroundIcon from "@assets/icons/checkAroundIcon.svg"

export interface FileUploadState {
    file: File;
    progress: number;
    status: "pending" | "uploading" | "success" | "error";
    cancelToken?: CancelTokenSource;
}

const UploadPage = () => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    // 파일과 업로드 상태 관리
    const [files, setFiles] = useState<File[]>([]);
    const [uploadStates, setUploadStates] = useState<FileUploadState[]>([]);

    // 업로드 모달 & 다음 팝업 표시 여부
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSelectionPopup, setShowSelectionPopup] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showSecondPopup, setShowSecondPopup] = useState(false);
    // 완료(두 번째) 요청 중 로딩 상태
    const [isSendingAll, setIsSendingAll] = useState(false);
    // 에러 메시지
    const [error, setError] = useState("");

    // 업로드 모달 열고 닫기
    const closeModal = () => setIsModalOpen(false);

    // 1) 파일 선택 시
    const handleFilesAdded = (newFiles: File[]) => {
        setFiles((prev) => [...prev, ...newFiles]);
        setIsModalOpen(true);
    };

    // 2) 새로 들어온 파일이 있으면 uploadStates에 추가
    useEffect(() => {
        const newFiles = files.filter(
            (file) => !uploadStates.some((state) => state.file === file)
        );
        if (newFiles.length > 0) {
            const newUploadStates = newFiles.map((file) => ({
                file,
                progress: 0,
                status: "pending" as const,
            }));
            setUploadStates((prev) => [...prev, ...newUploadStates]);
        }
    }, [files, uploadStates]);

    // 3) uploadStates 중 "pending"인 파일을 찾아 업로드
    useEffect(() => {
        uploadStates.forEach((state) => {
            if (state.status === "pending") {
                uploadFile(state);
            }
        });
    }, [uploadStates]);

    // 4) 개별 파일 업로드 (기존 로직)
    const uploadFile = async (fileState: FileUploadState) => {
        const formData = new FormData();
        formData.append("files", fileState.file);
        const source = axios.CancelToken.source();
        console.log(isSendingAll);
        console.log(error)
        // 업로드 시작: status를 uploading으로
        setUploadStates((prev) =>
            prev.map((state) =>
                state.file === fileState.file
                    ? { ...state, status: "uploading", cancelToken: source }
                    : state
            )
        );

        try {
            const response = await axios.post(`${BaseUrl}/v1/invoice`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMTAyNiIsImlzcyI6InNlb3VsbWlsayIsImlhdCI6MTc0MTUwNzc4MiwiZXhwIjoxNzQxNTk0MTgyfQ.aBcb4Q41p9r3ZEUYZx5rapRVIZ4DSHczG9l0W_K5hWJ9ZROZGy5WZpG2SHbutF3qJfHEj-QeX_cPiq4oMEss8g",
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) /
                        (progressEvent.total || fileState.file.size)
                    );
                    // 진행률 업데이트
                    setUploadStates((prev) =>
                        prev.map((state) =>
                            state.file === fileState.file
                                ? { ...state, progress: percent }
                                : state
                        )
                    );
                },
                cancelToken: source.token,
            });

            setUploadStates((prev) =>
                prev.map((state) =>
                    state.file === fileState.file
                        ? { ...state, status: response.status === 200 ? "success" : "error" }
                        : state
                )
            );
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log("업로드가 취소되었습니다.");
            } else {
                console.error("업로드 중 에러 발생:", err);
            }
            setUploadStates((prev) =>
                prev.map((state) =>
                    state.file === fileState.file ? { ...state, status: "error" } : state
                )
            );
        }
    };

    // 업로드 취소
    const handleCancel = (fileState: FileUploadState) => {
        fileState.cancelToken?.cancel("User canceled upload");
        setUploadStates((prev) => prev.filter((st) => st.file !== fileState.file));
    };

    // 재시도
    const handleRetry = (fileState: FileUploadState) => {
        setUploadStates((prev) =>
            prev.map((state) =>
                state.file === fileState.file
                    ? { ...state, status: "pending", progress: 0 }
                    : state
            )
        );
    };

    // 파일 제거
    const handleRemove = (fileState: FileUploadState) => {
        setUploadStates((prev) => prev.filter((st) => st.file !== fileState.file));
    };

    // 모든 파일이 성공 상태인지
    const isAllSuccess =
        uploadStates.length > 0 &&
        uploadStates.every((state) => state.status === "success");

    // 5) "완료" 버튼 → 성공한 파일들을 한 번 더 multipart/form-data로 전송
    const handleComplete = async () => {
        if (!isAllSuccess) {
            console.log("아직 모든 파일이 성공 상태가 아닙니다.");
            return;
        }

        // 업로드 모달 닫기
        closeModal();

        try {
            setIsSendingAll(true);
            setError("");

            // (1) 성공한 파일만 추출
            const successFiles = uploadStates
                .filter((state) => state.status === "success")
                .map((state) => state.file);

            // (2) 새 FormData 생성
            const formData2 = new FormData();
            successFiles.forEach((file) => {
                formData2.append("files", file);
            });

            // (3) multipart/form-data로 다시 POST
            await axios.post(`${BaseUrl}/v1/invoice`, formData2, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMTAyNiIsImlzcyI6InNlb3VsbWlsayIsImlhdCI6MTc0MTUwNzc4MiwiZXhwIjoxNzQxNTk0MTgyfQ.aBcb4Q41p9r3ZEUYZx5rapRVIZ4DSHczG9l0W_K5hWJ9ZROZGy5WZpG2SHbutF3qJfHEj-QeX_cPiq4oMEss8g",
                },
            });

            // 성공 시 SelectionPopup 띄우기
            setIsSendingAll(false);
            setShowSelectionPopup(true);
        } catch (err) {
            console.error("두 번째 요청 중 에러 발생:", err);
            setIsSendingAll(false);
            setError("다시 요청 중 오류가 발생했습니다.");
        }
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
                    onClose={closeModal}
                    // 필요하다면 isSendingAll, error 등을 모달에 전달
                />
            )}

            {showSelectionPopup && (
                <SelectionPopup
                    Content={"간편인증이 완료되면\n확인 버튼을 눌러주세요"}
                    primaryButton={{
                        label: "확인",
                        onClick: () => {
                            // 첫 팝업 닫고 로딩 모달 띄움
                            setShowSelectionPopup(false);
                            setShowLoadingModal(true);

                            // 2초 후 로딩 모달 닫고 두 번째 팝업 열기
                            setTimeout(() => {
                                setShowLoadingModal(false);
                                setShowSecondPopup(true);
                            }, 2000);
                        },
                    }}
                    secondaryButton={{
                        label: "취소",
                        onClick: () => setShowSelectionPopup(false),
                    }}
                />
            )}
            {showLoadingModal && (
                <LoadingModal
                    content="처리중입니다."
                    subContent="잠시만 기다려주세요..."
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
