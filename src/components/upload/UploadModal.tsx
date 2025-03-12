import styled from "styled-components";
import cancelIcon from "@assets/icons/cancelIcon.svg";
import fileInfo from "@assets/icons/fileInfoIcon.svg";
import refreshIcon from "@assets/icons/refreshIcon.svg";
import trashIcon from "@assets/icons/trashIcon.svg";
import { FileUploadState } from "@pages/upload/UploadPage";

interface UploadModalProps {
    uploadStates: FileUploadState[];
    onCancel: (fileState: FileUploadState) => void;
    onRetry: (fileState: FileUploadState) => void;
    onRemove: (fileState: FileUploadState) => void;
    onComplete: () => void;
    onClose: () => void;
}

const UploadModal = ({
                         uploadStates,
                         onCancel,
                         onRetry,
                         onRemove,
                         onComplete,
                         onClose,
                     }: UploadModalProps) => {
    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        const units = ["KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = (bytes / Math.pow(1024, i)).toFixed(1);
        return `${size} ${units[i]}`;
    };

    const isAllSuccess =
        uploadStates.length > 0 &&
        uploadStates.every((fs) => fs.status === "success");

    return (
        <ModalOverlay>
            <ModalContainer>
                <CloseButton onClick={onClose}>
                    <img src={cancelIcon} alt="닫기" />
                </CloseButton>

                <Title>업로드 상태</Title>
                <FileList>
                    {uploadStates.map((state) => {
                        const { file, progress, status } = state;
                        const fileSize =
                            status === "error" ? "업로드 실패" : formatFileSize(file.size);

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
                                        <CancelButtonSmall onClick={() => onCancel(state)}>
                                            <img src={cancelIcon} alt="취소" />
                                        </CancelButtonSmall>
                                    )}
                                    {status === "error" && (
                                        <ActionButtons>
                                            <IconButton onClick={() => onRetry(state)}>
                                                <img src={refreshIcon} alt="재시도" />
                                            </IconButton>
                                            <IconButton onClick={() => onRemove(state)}>
                                                <img src={trashIcon} alt="삭제" />
                                            </IconButton>
                                        </ActionButtons>
                                    )}
                                    {status === "success" && (
                                        <ActionButtons>
                                            <IconButton onClick={() => onRemove(state)}>
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

                <ButtonRow>
                    <CompleteButton disabled={!isAllSuccess} onClick={onComplete}>
                        완료
                    </CompleteButton>
                </ButtonRow>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default UploadModal;

/* ===== styled-components ===== */
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
    color: ${({ theme, $isError }) =>
            $isError ? theme.colors.gray200 : theme.colors.gray600};
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
    background-color: ${({ theme, disabled }) =>
            disabled ? theme.colors.gray300 : theme.colors.main200};
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
