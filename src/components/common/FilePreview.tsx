import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styled from "styled-components";

interface FilePreviewProps {
    fileUrl: string;
    suName: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileUrl, suName }) => {

    return (
        <FilePreviewContainer>
            <TransformWrapper initialScale={1} wheel={{ step: 0.2 }}>
                <PreviewWrapper>
                    <TransformComponent>
                        <PreviewImage src={fileUrl} alt={suName} />
                    </TransformComponent>
                </PreviewWrapper>
            </TransformWrapper>
        </FilePreviewContainer>
    );
};

export default FilePreview;


const FilePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin-bottom: 16px;
  min-height: 350px;
  max-height: 400px;
`;

const PreviewWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 350px;
  max-height: 350px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  width: auto;
  height: auto;
`;
