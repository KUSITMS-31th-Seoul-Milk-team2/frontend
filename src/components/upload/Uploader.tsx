import { useDropzone } from "react-dropzone";
import { useState } from "react";
import cameraIcon from "../../assets/icons/cameraIcon.svg";
import styled from "styled-components";

const Uploader = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isClicked, setIsClicked] = useState(false);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "application/pdf": [".pdf"],
        },
        maxSize: 20 * 1024 * 1024,
        multiple: true,
        onDrop: (acceptedFiles) => {
            setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        },
    });

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

                {/* 아래 줄에 버튼을 배치할 때 */}
                <CameraButton>
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
                    onMouseDown={() => setIsClicked(true)}
                >
                    <input {...getInputProps()} />
                    <p>PNG, PDF</p>
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
        </Container>
    );
};

export default Uploader;

/* ======= styled-components ======= */

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    margin: 0 auto;
    min-height: 70vh;
`;


const HeaderRow = styled.div`
    display: flex;
    flex-direction: column; 
    margin-top: 1rem;
    margin-left: 10rem;
    margin-right: 10rem;

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
    aspect-ratio: 2 / 1;
    border: 2px
    ${(props) => (props.$isClicked ? "solid #000" : "dashed #ccc")};
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
        background-color: #0098571a;
    }

    @media (max-width: 768px) {
        width: 90%;
        max-width: 600px;
    }
    @media (max-width: 480px) {
        width: 95%;
        max-width: 400px;
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

    &:hover {
        background-color: #45a049;
    }
    @media (max-width: 480px) {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
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
