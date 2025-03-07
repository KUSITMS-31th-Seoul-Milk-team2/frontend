import { useState, useEffect } from "react";
import styled from "styled-components";
import axios, { CancelTokenSource } from "axios";
import Uploader from "@components/upload/Uploader";
import cancelIcon from "@assets/icons/cancelIcon.svg";
import fileInfo from "@assets/icons/fileInfoIcon.svg";
import refreshIcon from "@assets/icons/refreshIcon.svg";
import trashIcon from "@assets/icons/trashIcon.svg";

interface UploadModalProps {
    onFilesAdded: (addedFiles: File[]) => void;
    onClose: () => void;
}

interface FileUploadState {
    file: File;
    progress: number;
    status: "pending" | "uploading" | "success" | "error";
    cancelToken?: CancelTokenSource;
}

const UploadModal = ({ onClose }: UploadModalProps) => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const [uploadStates, setUploadStates] = useState<FileUploadState[]>([]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleFilesAdded = (addedFiles: File[]) => {
        const newStates = addedFiles.map((file) => ({
            file,
            progress: 0,
            status: "pending" as const,
        }));
        setUploadStates((prev) => [...prev, ...newStates]);
        newStates.forEach(uploadFile);
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        const units = ["KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = (bytes / Math.pow(1024, i)).toFixed(1);
        return `${size} ${units[i]}`;
    };

    const uploadFile = async (fileState: FileUploadState) => {
        const formData = new FormData();
        formData.append("file", fileState.file);

        const source = axios.CancelToken.source();

        setUploadStates((prev) =>
            prev.map((fs) =>
                fs.file === fileState.file
                    ? { ...fs, status: "uploading", cancelToken: source }
                    : fs
            )
        );

        try {
            const response = await axios.post(`${BaseUrl}/v1/invoice`, formData, {
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) /
                        (progressEvent.total || fileState.file.size)
                    );
                    setUploadStates((prev) =>
                        prev.map((fs) =>
                            fs.file === fileState.file ? { ...fs, progress: percent } : fs
                        )
                    );
                },
                cancelToken: source.token,
            });

            setUploadStates((prev) =>
                prev.map((fs) =>
                    fs.file === fileState.file
                        ? {
                            ...fs,
                            status: response.status === 200 ? "success" : "error",
                        }
                        : fs
                )
            );
        } catch (error: unknown) {
            if (axios.isCancel(error)) {
                console.log("업로드가 취소되었습니다.");
            } else {
                console.log("업로드 중 에러 발생", error);
            }
            setUploadStates((prev) =>
                prev.map((fs) =>
                    fs.file === fileState.file ? { ...fs, status: "error" } : fs
                )
            );
        }
    };

    const handleCancel = (fileState: FileUploadState) => {
        fileState.cancelToken?.cancel("User canceled upload");
        setUploadStates((prev) => prev.filter((fs) => fs.file !== fileState.file));
    };

    const handleRetry = (fileState: FileUploadState) => {
        setUploadStates((prev) =>
            prev.map((fs) =>
                fs.file === fileState.file ? { ...fs, status: "pending", progress: 0 } : fs
            )
        );
        uploadFile({ ...fileState, status: "pending", progress: 0 });
    };

    const handleRemove = (fileState: FileUploadState) => {
        setUploadStates((prev) => prev.filter((fs) => fs.file !== fileState.file));
    };

    const isAllSuccess = uploadStates.length > 0 && uploadStates.every((fs) => fs.status === "success");

    const handleComplete = () => {
        if (!isAllSuccess) return;
        // TODO: 완료 시 처리할 로직 (예: 서버에 최종 확인 요청, 페이지 이동, etc.)
        onClose();
    };

    return (
        <ModalOverlay>
            <ModalContainer>
                <CloseButton onClick={onClose}>
                    <img src={cancelIcon} alt="닫기" />
                </CloseButton>

                <Uploader onFilesAdded={handleFilesAdded} />

                <Title>업로드 상태</Title>
                <FileList>
                    {uploadStates.map((state) => {
                        const { file, progress, status } = state;
                        // 정상 업로드 시 파일 크기, 실패 시 "업로드 실패"
                        const fileSize = status === "error" ? "업로드 실패" : formatFileSize(file.size);

                        return (
                            <FileItem key={file.name}>
                                <FileRow>
                                    <LeftInfo>
                                        <FileIcon src={fileInfo} alt="File Info" />
                                        <FileTextWrapper>
                                            <FileName $isError={status === "error"}>
                                                {file.name}
                                            </FileName>
                                            <FileSize $isError={status === "error"}>
                                                {fileSize}
                                            </FileSize>
                                        </FileTextWrapper>
                                    </LeftInfo>

                                    {status === "uploading" && (
                                        <CancelButtonSmall onClick={() => handleCancel(state)}>
                                            <img src={cancelIcon} alt="취소" />
                                        </CancelButtonSmall>
                                    )}
                                    {status === "error" && (
                                        <ActionButtons>
                                            <IconButton onClick={() => handleRetry(state)}>
                                                <img src={refreshIcon} alt="재시도" />
                                            </IconButton>
                                            <IconButton onClick={() => handleRemove(state)}>
                                                <img src={trashIcon} alt="삭제" />
                                            </IconButton>
                                        </ActionButtons>
                                    )}
                                    {status === "success" && (
                                        <ActionButtons>
                                            <IconButton onClick={() => handleRemove(state)}>
                                                <img src={trashIcon} alt="삭제" />
                                            </IconButton>
                                        </ActionButtons>
                                    )}
                                </FileRow>

                                <ProgressBar>
                                    <ProgressFill style={{ width: `${progress}%` }} />
                                </ProgressBar>
                            </FileItem>
                        );
                    })}
                </FileList>

                {/* 하단 우측 '완료' 버튼 */}
                <ButtonRow>
                    <CompleteButton disabled={!isAllSuccess} onClick={handleComplete}>
                        완료
                    </CompleteButton>
                </ButtonRow>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default UploadModal;

/* ======= styled-components ======= */
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ModalContainer = styled.div`
    width: 500px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    width: 24px;
    height: 24px;
    padding: 0;

    img {
        width: 100%;
        height: 100%;
    }

    &:hover {
        opacity: 0.7;
    }
`;

const Title = styled.h2`
    margin-bottom: 1rem;
`;

const FileList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    max-height: 250px;
    overflow-y: auto;
    overscroll-behavior: contain;
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background: #f0f0f0;
    }
`;

const FileItem = styled.li`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.gray600};
    border-radius: 12px;
`;

const FileRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LeftInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const FileIcon = styled.img`
    width: 32px;
    height: auto;
`;

const FileTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const FileName = styled.span<{ $isError?: boolean }>`
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme, $isError }) => ($isError ? theme.colors.gray200 : theme.colors.gray600)};
`;

const FileSize = styled.span<{ $isError?: boolean }>`
    font-size: 0.85rem;
    color: ${({ $isError }) => ($isError ? "red" : "#4caf50")};
`;

const CancelButtonSmall = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 24px;
    height: 24px;
    padding: 0;

    img {
        width: 100%;
        height: 100%;
    }

    &:hover {
        opacity: 0.7;
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 8px;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 24px;
    height: 24px;
    padding: 0;

    img {
        width: 100%;
        height: 100%;
    }

    &:hover {
        opacity: 0.7;
    }
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 4px;
    overflow: hidden;
`;

const ProgressFill = styled.div`
    height: 100%;
    background: green;
    border-radius: 4px;
    transition: width 0.3s ease;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const CompleteButton = styled.button<{ disabled?: boolean }>`
    background-color: ${({ theme, disabled }) => (disabled ? theme.colors.gray300 : theme.colors.main200)};
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    font-weight: 500;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray300 : theme.colors.main300};
    }
`;
