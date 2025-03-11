import React, { useState } from "react";
import styled from "styled-components";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// 더미 데이터 예시
interface InvoiceItem {
    id: number;
    title: string;
    imageUrl: string; // PDF 미리보기라면 경로 등
}

const dummyList: InvoiceItem[] = [
    { id: 1, title: "세금계산서 사업체명 A", imageUrl: "/sample1.png" },
    { id: 2, title: "세금계산서 사업체명 B", imageUrl: "/sample2.png" },
    { id: 3, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    // ...
];

const ReconciliationPage: React.FC = () => {
    // 1) 단일 선택 (오른쪽 미리보기)
    const [selectedId, setSelectedId] = useState<number | null>(null);
    // 2) 다중 체크 (삭제용)
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    // 단일 선택 아이템 (오른쪽 미리보기)
    const selectedItem = dummyList.find((item) => item.id === selectedId);

    // 전체 갯수 (예: 48건)
    const totalCount = dummyList.length;

    // 항목 클릭 → 미리보기 선택
    const handleSelect = (id: number) => {
        setSelectedId(id);
    };

    // 체크박스 토글
    const handleCheck = (id: number, checked: boolean) => {
        setCheckedIds((prev) =>
            checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
        );
    };

    // 선택된 항목 삭제 (예시)
    const handleDelete = () => {
        if (checkedIds.length === 0) {
            alert("선택된 항목이 없습니다.");
            return;
        }
        // 실제 로직(서버 API 등)
        alert(`선택된 항목 삭제: ${checkedIds.join(", ")}`);
        // 여기서는 단순히 체크 초기화
        setCheckedIds([]);
    };

    return (
        <Container>
            {/* ====== 왼쪽 패널 ====== */}
            <LeftPanel>
                <TopBar>
                    <LeftTitle>총 {totalCount}건</LeftTitle>
                    <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
                </TopBar>

                <ScrollArea>
                    {dummyList.map((item) => {
                        const isSelected = item.id === selectedId; // 미리보기 선택 여부
                        const isChecked = checkedIds.includes(item.id); // 체크박스 선택 여부

                        return (
                            <ListItem
                                key={item.id}
                                selected={isSelected}
                                onClick={() => handleSelect(item.id)}
                            >
                                {/* 체크박스 */}
                                <Checkbox
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                        // 이벤트 버블링으로 인해 onClick도 호출되므로,
                                        // 여기서만 체크로직 처리
                                        e.stopPropagation();
                                        handleCheck(item.id, e.target.checked);
                                    }}
                                />
                                <ItemTitle>{item.title}</ItemTitle>
                            </ListItem>
                        );
                    })}
                </ScrollArea>
            </LeftPanel>

            {/* ====== 오른쪽 패널 ====== */}
            <RightPanel>
                <FilePreviewContainer>
                    {selectedItem ? (
                        <TransformWrapper
                            defaultScale={1}
                            wheel={{ step: 0.2 }}
                            doubleClick={{ disabled: false }}
                        >
                            {({ zoomIn, zoomOut, resetTransform }) => (
                                <>
                                    <ZoomButtonContainer>
                                        <button onClick={() => zoomIn()}>+</button>
                                        <button onClick={() => zoomOut()}>-</button>
                                        <button onClick={() => resetTransform()}>Reset</button>
                                    </ZoomButtonContainer>

                                    <TransformComponent>
                                        <PreviewImage
                                            src={selectedItem.imageUrl}
                                            alt={selectedItem.title}
                                        />
                                    </TransformComponent>
                                </>
                            )}
                        </TransformWrapper>
                    ) : (
                        <EmptyState>왼쪽에서 파일을 선택해주세요</EmptyState>
                    )}
                </FilePreviewContainer>

                {/* 세부 정보/입력 영역 */}
                <DetailForm>
                    <SubTitle>인서트 세금계산서</SubTitle>
                    <InputRow>
                        <label>000-00-00000</label>
                        <input placeholder="입력..." />
                    </InputRow>
                    <InputRow>
                        <label>000-00-00000</label>
                        <input placeholder="입력..." />
                    </InputRow>
                    <InputRow>
                        <label>000-00-00000</label>
                        <input placeholder="입력..." />
                    </InputRow>
                    <InputRow>
                        <label>000-00-00000</label>
                        <input placeholder="입력..." />
                    </InputRow>
                    <InputRow>
                        <label>000-00-00000</label>
                        <input placeholder="입력..." />
                    </InputRow>
                    <ButtonRow>
                        <button>이전</button>
                        <button>다음</button>
                    </ButtonRow>
                </DetailForm>
            </RightPanel>
        </Container>
    );
};

export default ReconciliationPage;

/* ================= Styled-Components ================= */

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100vh; /* 예시 */
    background-color: #fff;
`;

/* ====== 왼쪽 패널 ====== */
const LeftPanel = styled.div`
    width: 300px; /* 원하는 너비 */
    border-right: 1px solid #ddd;
    display: flex;
    flex-direction: column;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
`;

const LeftTitle = styled.h2`
    font-size: 1rem;
    font-weight: 500;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #009857;
    font-weight: 600;
    cursor: pointer;
`;

const ScrollArea = styled.div`
    flex: 1;
    overflow-y: auto;
`;

interface ListItemProps {
    selected: boolean;
}

const ListItem = styled.div<ListItemProps>`
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? "#f0f0f0" : "transparent")};

    &:hover {
        background-color: #f9f9f9;
    }
`;

const Checkbox = styled.input`
    margin-right: 8px;
`;

const ItemTitle = styled.span`
  font-size: 0.95rem;
`;

/* ====== 오른쪽 패널 ====== */
const RightPanel = styled.div`
    flex: 1; /* 나머지 공간 */
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

const FilePreviewContainer = styled.div`
    flex: 1;
    border: 1px solid #ddd;
    position: relative;
    margin-bottom: 16px;
    overflow: hidden; /* react-zoom-pan-pinch 영역 */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ZoomButtonContainer = styled.div`
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    gap: 4px;

    button {
        padding: 4px 8px;
        cursor: pointer;
    }
`;

const PreviewImage = styled.img`
    max-width: 800px; /* 예시 */
    max-height: 600px;
    object-fit: contain;
`;

const EmptyState = styled.div`
    color: #999;
    font-size: 1rem;
`;

const DetailForm = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
`;

const SubTitle = styled.h3`
    margin-bottom: 12px;
`;

const InputRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    label {
        width: 120px;
        font-size: 0.9rem;
        margin-right: 8px;
        color: #666;
    }

    input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
    }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;

  button {
    padding: 8px 16px;
    cursor: pointer;
    border: 1px solid #999;
    background: #fff;
  }
`;
