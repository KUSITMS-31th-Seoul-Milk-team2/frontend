import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";
import cameraIcon from "@assets/icons/cameraIcon.svg";
import fileUploadIcon from "@assets/icons/fileUploadIcon.svg";
import { transparentize } from "polished";
import styled from "styled-components";

interface UploaderProps {
    onFilesAdded: (addedFiles: File[]) => void; // ✅ 상위로 파일 전달
}
const Uploader = ({ onFilesAdded }: UploaderProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const webcamRef = useRef<Webcam>(null);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "application/pdf": [".pdf"],
        },
        maxSize: 20 * 1024 * 1024,
        multiple: true,
        onDrop: (acceptedFiles) => {
            // ✅ 상위로 즉시 전달 & 모달 열림
            onFilesAdded(acceptedFiles);
        },
    });

    const handleOpenCamera = () => {
        setIsCameraOpen(true);
    };

    const handleCapture = useCallback(() => {
        if (webcamRef.current) {
            const screenshot = webcamRef.current.getScreenshot();
            if (screenshot) {
                const file = dataURLtoFile(screenshot, `camera_${Date.now()}.png`);
                setFiles((prevFiles) => [...prevFiles, file]);
            }
        }
        setIsCameraOpen(false);
    }, []);

    const handleCloseCamera = () => {
        setIsCameraOpen(false);
    };

    function dataURLtoFile(dataURL: string, fileName: string): File {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    }

    return (
        <Container>
            <HeaderRow>
                <TitleArea>
                    <Title>세금계산서 업로드</Title>
                    <Subtitle>
                        전달받은 세금계산서를 <br />
                        아래와 같은 형식으로 올려주세요
                    </Subtitle>
                </TitleArea>

                <CameraButton onClick={handleOpenCamera}>
                    <img
                        src={cameraIcon}
                        alt="Camera Icon"
                        style={{ width: "1.5rem", height: "auto" }}
                    />
                    <Text>사진 촬영하기</Text>
                </CameraButton>
            </HeaderRow>

            <DropZoneContainer>
                <DropZone
                    {...getRootProps()}
                    $isDragActive={isDragActive}
                    $isClicked={isClicked}
                    onMouseUp={() => setIsClicked(false)}
                    onMouseDown={() => setIsClicked(true)}
                >
                    <input {...getInputProps()} />
                        <FileUploadButton>
                            <UploadIcon
                                src={fileUploadIcon}
                                alt="File Upload Icon"
                            />
                        </FileUploadButton>

                    <FileSelectButton>파일 선택</FileSelectButton>
                </DropZone>

                {files.length > 0 && (
                    <FileList>
                        {files.map((file) => (
                            <FileItem key={file.name}>{file.name}</FileItem>
                        ))}
                    </FileList>
                )}
                <FileInfo>파일 형식 PNG, PDF, JPG, JPEG</FileInfo>
                <FileInfo>최대 크기 20MB</FileInfo>
            </DropZoneContainer>

            {isCameraOpen && (
                <ModalOverlay>
                    <ModalContainer>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/png"
                            style={{ width: "auto", height: "100%" }}

                        />
                        <ButtonRow>
                            <CaptureButton onClick={handleCapture}>촬영하기</CaptureButton>
                            <CancelButton onClick={handleCloseCamera}>취소</CancelButton>
                        </ButtonRow>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default Uploader;

/* ======= styled-components ======= */

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    max-width: 900px;
    margin: 0 auto;
    width: 85%;
`;

const HeaderRow = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;

    @media (max-width: 768px) {
        margin-left: 3rem;
        margin-right: 3rem;
    }
    @media (max-width: 480px) {
        margin-left: 2rem;
        margin-right: 2rem;
    }
`;

const TitleArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Title = styled.h2`
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
    font-size: 1rem;
    color: #666;
    margin: 0;
    line-height: 1.4;
`;

const CameraButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-top: 1rem;
    align-self: flex-end;
`;

const FileUploadButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 1rem;

`;

const UploadIcon = styled.img`
    width: 5rem;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        width: 4rem;
    }
    @media (max-width: 480px) {
        width: 3rem;
    }
`;

const Text = styled.span`
    margin-left: 0.5rem;
    font-size: 0.8rem;
    color: #333;
`;

const DropZoneContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 2rem auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const DropZone = styled.div<{ $isDragActive: boolean; $isClicked: boolean }>`
    width: 100%;
    max-width: 1000px;
    aspect-ratio: 2.5 / 1;
    border: 2px
    ${({ $isClicked }) => ($isClicked ? "solid #0098571A" : "dashed #ccc")};
    border-radius: 0.75rem;
    background-color: ${(props) => (props.$isDragActive ? "#f0f0f0" : "#fff")};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    cursor: pointer;
    transition: background-color 0.2s, border 0.2s;

    &:hover {
        background-color: ${({ theme }) =>
                transparentize(0.9, theme.colors.main100)
        };
    }

    @media (max-width: 768px) {
        width: 90%;
        max-width: 600px;
        aspect-ratio: auto; 
    }
    @media (max-width: 480px) {
        width: 95%;
        max-width: 400px;
        aspect-ratio: auto;
    }
`;

const FileSelectButton = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 1.25rem;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    @media (max-width: 768px) {
        font-size: 0.85rem;
        padding: 0.4rem 0.8rem;
    }

    @media (max-width: 480px) {
        font-size: 0.8rem;
        padding: 0.35rem 0.7rem;
    }
`;

const FileList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 1rem;
    width: 100%;
`;

const FileItem = styled.li`
    font-size: 0.9rem;
    color: #333;
    word-break: break-all;
`;

const FileInfo = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin-top: 0.5rem;
  align-self: flex-start;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    width: 90%;
    max-width: 500px;
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonRow = styled.div`
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
`;

const CaptureButton = styled.button`
    background-color: #4caf50;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 1.25rem;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;

const CancelButton = styled.button`
    background-color: #999;
    color: white;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 1.25rem;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background-color: #777;
    }
`;
