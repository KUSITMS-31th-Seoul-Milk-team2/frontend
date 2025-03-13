import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Uploader from "@components/upload/Uploader";
import UploadModal from "@components/upload/UploadModal";
import SelectionPopup from "@components/modal/SelectionPopup";
import LoadingModal from "@components/modal/LoadingModal";
import checkAroundIcon from "@assets/icons/checkAroundIcon.svg";
import token from "@utils/token.tsx";
import styled from "styled-components";

export interface FileUploadState {
    file: File;
    progress: number;
    status: "ready" | "uploaded" | "error" | "uploading";
}

const UploadPage = () => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    const [files, setFiles] = useState<File[]>([]);
    const [uploadStates, setUploadStates] = useState<FileUploadState[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [showSelectionPopup, setShowSelectionPopup] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showSecondPopup, setShowSecondPopup] = useState(false);
    // 새로 추가된 실패 팝업 상태
    const [showFailurePopup, setShowFailurePopup] = useState(false);

    const handleFilesAdded = (newFiles: File[]) => {
        setFiles((prev) => [...prev, ...newFiles]);

        const newStates = newFiles.map<FileUploadState>((file) => {
            if (file.size > MAX_FILE_SIZE) {
                return {
                    file,
                    progress: 0,
                    status: "uploading",
                };
            } else {
                return {
                    file,
                    progress: 100,
                    status: "uploaded",
                };
            }
        });

        setUploadStates((prev) => [...prev, ...newStates]);
        setIsModalOpen(true);
    };

    const handleCancel = (fileState: FileUploadState) => {
        if (fileState.status === "uploading") {
            setUploadStates((prev) =>
                prev.map((st) =>
                    st.file === fileState.file
                        ? { ...st, status: "error", progress: 0 }
                        : st
                )
            );
        }
    };

    const handleRetry = (fileState: FileUploadState) => {
        if (fileState.status === "error") {
            if (fileState.file.size > MAX_FILE_SIZE) {
                setUploadStates((prev) =>
                    prev.map((st) =>
                        st.file === fileState.file
                            ? { ...st, status: "uploading", progress: 0 }
                            : st
                    )
                );
            } else {
                setUploadStates((prev) =>
                    prev.map((st) =>
                        st.file === fileState.file
                            ? { ...st, status: "uploaded", progress: 100 }
                            : st
                    )
                );
            }
        }
    };

    const handleRemove = (fileState: FileUploadState) => {
        setFiles((prev) =>
            prev.filter(
                (file) =>
                    file.name !== fileState.file.name ||
                    file.lastModified !== fileState.file.lastModified
            )
        );
        setUploadStates((prev) =>
            prev.filter(
                (st) =>
                    st.file.name !== fileState.file.name ||
                    st.file.lastModified !== fileState.file.lastModified
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
            console.log(invoiceResponse.data.data);
            if (invoiceResponse.data.data === true) {
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

    const handleSelectionConfirm = async () => {
        setShowSelectionPopup(false);
        setShowLoadingModal(true);

        try {
            const additionResponse = await token.post(
                `${BaseUrl}/v1/receipt/upload/addition`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setShowLoadingModal(false);
            console.log(additionResponse.data.data);
            if (additionResponse.data.data === true) {
                setShowSecondPopup(true);
            } else {
                // 실패시 실패 팝업을 띄움
                setShowFailurePopup(true);
            }
        } catch (err) {
            console.error("upload/addition API error", err);
            setShowLoadingModal(false);
            alert("API 통신에 실패했습니다.");
            navigate("/home");
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <Container>
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
                    Content={"간편인증이 완료되면 \n확인 버튼 눌러주세요"}
                    primaryButton={{
                        label: "확인",
                        onClick: handleSelectionConfirm,
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

            {/* 실패시 미발급 수정 페이지로 이동하도록 팝업 */}
            {showFailurePopup && (
                <SelectionPopup
                    Content={"불일치하는 파일 존재"}
                    SubContent={"미발급 수정 페이지로 이동합니다."}
                    primaryButton={{
                        label: "이동하기",
                        onClick: () => navigate("/reconciliation"),
                    }}
                    secondaryButton={{
                        label: "취소",
                        onClick: () => setShowFailurePopup(false),
                    }}
                />
            )}
        </Container>
    );
};

export default UploadPage;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;
    margin-bottom: 20rem;
`
