import styled from "styled-components";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useReconciliationStore } from "@store/reconciliationStore";
import { useNavigate } from "react-router-dom";

interface RightPanelProps {
    onPageDeleteClick: () => void;
    onRequery: () => void;
    onInputChange: (field: string, value: string) => void;
    onClearInput: (field: string) => void;
}

const RightPanel = ({
                        onPageDeleteClick,
                        onRequery,
                        onInputChange,
                        onClearInput,
                    }: RightPanelProps) => {
    const navigate = useNavigate();
    const { list, selectedId, formValues } = useReconciliationStore();
    const selectedItem = list.find((item) => item.id === selectedId);

    return (
        <RightPanelContainer>
            <NoticeContainer>
                <NoticeTitle>발급여부가 확인되지 않았어요</NoticeTitle>
                <NoticeSubtitle>
                    인식된 세금계산서 서류가 잘못되지 않았는지 확인해보세요.
                </NoticeSubtitle>
            </NoticeContainer>
            <FilePreviewContainer>
                {selectedItem ? (
                    <TransformWrapper initialScale={1} wheel={{ step: 0.2 }}>
                        {({ zoomIn, zoomOut }) => (
                            <>
                                <PreviewWrapper>
                                    <TransformComponent>
                                        <PreviewImage
                                            src={selectedItem.fileUrl}
                                            alt={selectedItem.suName}
                                        />
                                    </TransformComponent>
                                </PreviewWrapper>
                                <BottomBar>
                                    <ZoomButtons>
                                        <button onClick={() => zoomIn()}>+</button>
                                        <button onClick={() => zoomOut()}>-</button>
                                    </ZoomButtons>
                                    <ReuploadButton onClick={() => navigate("/upload")}>
                                        첨부파일 재업로드
                                    </ReuploadButton>
                                </BottomBar>
                            </>
                        )}
                    </TransformWrapper>
                ) : (
                    <EmptyState>왼쪽에서 파일을 선택해주세요</EmptyState>
                )}
            </FilePreviewContainer>
            <SubTitle>인식된 세금계산서</SubTitle>
            <FormDescription>
                계속 일치하지 않을 경우 "첨부파일 재업로드" 혹은 "삭제"를 눌러주세요.
            </FormDescription>
            <DetailForm>
                <InputRow>
                    <label>공급자 등록번호</label>
                    <InputWrapper>
                        <input
                            placeholder="000-00-00000"
                            value={formValues.supplierRegNumber}
                            onChange={(e) => onInputChange("supplierRegNumber", e.target.value)}
                        />
                        {formValues.supplierRegNumber && (
                            <RemoveButton onClick={() => onClearInput("supplierRegNumber")}>
                                ×
                            </RemoveButton>
                        )}
                    </InputWrapper>
                </InputRow>
                <InputRow>
                    <label>공급받는자 등록번호</label>
                    <InputWrapper>
                        <input
                            placeholder="000-00-00000"
                            value={formValues.recipientRegNumber}
                            onChange={(e) => onInputChange("recipientRegNumber", e.target.value)}
                        />
                        {formValues.recipientRegNumber && (
                            <RemoveButton onClick={() => onClearInput("recipientRegNumber")}>
                                ×
                            </RemoveButton>
                        )}
                    </InputWrapper>
                </InputRow>
                <InputRow>
                    <label>승인번호</label>
                    <InputWrapper>
                        <input
                            placeholder="000-00-00000"
                            value={formValues.approvalNumber}
                            onChange={(e) => onInputChange("approvalNumber", e.target.value)}
                        />
                        {formValues.approvalNumber && (
                            <RemoveButton onClick={() => onClearInput("approvalNumber")}>
                                ×
                            </RemoveButton>
                        )}
                    </InputWrapper>
                </InputRow>
                <InputRow>
                    <label>작성일자</label>
                    <InputWrapper>
                        <input
                            placeholder="YYYY-MM-DD"
                            value={formValues.writtenDate}
                            onChange={(e) => onInputChange("writtenDate", e.target.value)}
                        />
                        {formValues.writtenDate && (
                            <RemoveButton onClick={() => onClearInput("writtenDate")}>
                                ×
                            </RemoveButton>
                        )}
                    </InputWrapper>
                </InputRow>
                <InputRow>
                    <label>공급가액</label>
                    <InputWrapper>
                        <input
                            placeholder="금액"
                            value={formValues.supplyAmount}
                            onChange={(e) => onInputChange("supplyAmount", e.target.value)}
                        />
                        {formValues.supplyAmount && (
                            <RemoveButton onClick={() => onClearInput("supplyAmount")}>
                                ×
                            </RemoveButton>
                        )}
                    </InputWrapper>
                </InputRow>
            </DetailForm>
            <ButtonRow>
                <ActionButton onClick={onPageDeleteClick}>삭제</ActionButton>
                <ActionButton onClick={onRequery}>재조회</ActionButton>
            </ButtonRow>
        </RightPanelContainer>
    );
};

export default RightPanel;

const RightPanelContainer = styled.div`
    width: calc(100% - 300px);
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow-y: auto;
`;

const NoticeContainer = styled.div`
    margin-bottom: 16px;
`;

const NoticeTitle = styled.div`
    color: #ff4b4b;
    font-weight: 600;
    margin-bottom: 4px;
    font-size: 1rem;
`;

const NoticeSubtitle = styled.div`
    color: #666;
    font-size: 0.875rem;
    line-height: 1.3;
`;

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

const BottomBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background-color: #f5f5f5;
    border-top: 1px solid #ddd;
`;

const ZoomButtons = styled.div`
    display: flex;
    gap: 8px;

    button {
        padding: 4px 8px;
        cursor: pointer;
    }
`;

const ReuploadButton = styled.button`
    background: none;
    border: none;
    color: #009857;
    font-weight: 600;
    cursor: pointer;
`;

const PreviewImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    width: auto;
    height: auto;
`;

const EmptyState = styled.div`
    color: #999;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const SubTitle = styled.h3`
    margin-top: 16px;
    margin-bottom: 8px;
`;

const FormDescription = styled.p`
    font-size: 0.85rem;
    color: #999;
    margin-bottom: 16px;
`;

const DetailForm = styled.div`
    border: 1px solid #ddd;
    border-radius: 16px;
    padding: 24px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const InputRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
        width: 140px;
        font-size: 1rem;
        font-weight: bold;
        color: #333;
    }
`;

const InputWrapper = styled.div`
    position: relative;
    width: 300px;

    input {
        width: 100%;
        padding: 15px 40px 15px 10px;
        border: 2px solid #ddd;
        border-radius: 10px;
        background-color: #f8f8f8;
        color: #333;
        font-size: 1rem;
        box-sizing: border-box;
        text-indent: 1rem;
    }
`;

const RemoveButton = styled.button`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #aaa;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
        color: #777;
    }
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 24px;
`;

const ActionButton = styled.button`
    padding: 8px 16px;
    cursor: pointer;
    background: #f0f0f0;
    border: none;
    border-radius: 8px;
`;
