import React, { useState } from "react";
import styled from "styled-components";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface InvoiceItem {
    id: number;
    title: string;
    imageUrl: string;
}

const dummyList: InvoiceItem[] = [
    { id: 1, title: "세금계산서 사업체명 A", imageUrl: "/red_image.png" },
    { id: 2, title: "세금계산서 사업체명 B", imageUrl: "/sample2.png" },
    { id: 3, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
];

const ReconciliationPage: React.FC = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    const selectedItem = dummyList.find((item) => item.id === selectedId);
    const totalCount = dummyList.length;
    const allChecked =
        dummyList.length > 0 && dummyList.every((item) => checkedIds.includes(item.id));

    const handleSelect = (id: number) => {
        setSelectedId(id);
    };

    const handleCheck = (id: number, checked: boolean) => {
        setCheckedIds((prev) =>
            checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
        );
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setCheckedIds(dummyList.map((item) => item.id));
        } else {
            setCheckedIds([]);
        }
    };

    const handleDelete = () => {
        if (checkedIds.length === 0) {
            alert("선택된 항목이 없습니다.");
            return;
        }
        alert(`선택된 항목 삭제: ${checkedIds.join(", ")}`);
        setCheckedIds([]);
    };

    return (
       <Wrapper>
           <PageWrapper>
               <PageTitle>미발급 파일 수정</PageTitle>

               <Container>
                   {/* 왼쪽 패널 */}
                   <LeftPanel>
                       <LeftTitle>총 {totalCount}건</LeftTitle>
                       <ActionRow>
                           <SelectAllCheckbox
                               type="checkbox"
                               checked={allChecked}
                               onChange={(e) => handleSelectAll(e.target.checked)}
                           />
                           <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
                       </ActionRow>

                       <ScrollArea>
                           {dummyList.map((item) => {
                               const isSelected = item.id === selectedId;
                               const isChecked = checkedIds.includes(item.id);

                               return (
                                   <ListItem
                                       key={item.id}
                                       selected={isSelected}
                                       onClick={() => handleSelect(item.id)}
                                   >
                                       <Checkbox
                                           type="checkbox"
                                           checked={isChecked}
                                           onChange={(e) => {
                                               e.stopPropagation();
                                               handleCheck(item.id, e.target.checked);
                                           }}
                                       />
                                       <ListItemContent>
                                           {/* 첫 번째 줄 */}
                                           <TitleRow>
                                               <TruncatedSpan>공급자 사업체명</TruncatedSpan>
                                               <Divider>|</Divider>
                                               <TruncatedSpan>공급받는자 사업체명</TruncatedSpan>
                                           </TitleRow>
                                           {/* 두 번째 줄 */}
                                           <MetaRow>
                                               <span>PDF</span>
                                               <Divider>|</Divider>
                                               <span>2024.12.10</span>
                                           </MetaRow>
                                       </ListItemContent>
                                   </ListItem>
                               );
                           })}
                       </ScrollArea>
                   </LeftPanel>

                   {/* 오른쪽 패널 */}
                   <RightPanel>
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
                                                       src={selectedItem.imageUrl}
                                                       alt={selectedItem.title}
                                                   />
                                               </TransformComponent>
                                           </PreviewWrapper>
                                           <BottomBar>
                                               <ZoomButtons>
                                                   <button onClick={() => zoomIn()}>+</button>
                                                   <button onClick={() => zoomOut()}>-</button>
                                               </ZoomButtons>
                                               <ReuploadButton>첨부파일 재업로드</ReuploadButton>
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


                           {/* 예시 항목 */}
                           <InputRow>
                               <label>공급자 등록번호</label>
                               <InputWrapper>
                                   <input placeholder="000-00-00000" />
                                   <RemoveButton>×</RemoveButton>
                               </InputWrapper>
                           </InputRow>
                           <InputRow>
                               <label>공급받는자 등록번호</label>
                               <InputWrapper>
                                   <input placeholder="000-00-00000" />
                                   <RemoveButton>×</RemoveButton>
                               </InputWrapper>
                           </InputRow>
                           <InputRow>
                               <label>승인번호</label>
                               <InputWrapper>
                                   <input placeholder="000-00-00000" />
                                   <RemoveButton>×</RemoveButton>
                               </InputWrapper>
                           </InputRow>
                           <InputRow>
                               <label>작성일자</label>
                               <InputWrapper>
                                   <input placeholder="YYYY-MM-DD" />
                                   <RemoveButton>×</RemoveButton>
                               </InputWrapper>
                           </InputRow>
                           <InputRow>
                               <label>공급가액</label>
                               <InputWrapper>
                                   <input placeholder="금액" />
                                   <RemoveButton>×</RemoveButton>
                               </InputWrapper>
                           </InputRow>

                           <ButtonRow>
                               <button>삭제</button>
                               <button>제출</button>
                           </ButtonRow>
                       </DetailForm>
                   </RightPanel>
               </Container>
           </PageWrapper>
       </Wrapper>
    );
};

export default ReconciliationPage;

/* ================= Styled-Components ================= */

const Wrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;

`;

// 부모 높이를 없애고, align-items: stretch로 두면
// 오른쪽이 커질 때 왼쪽도 늘어납니다.
const Container = styled.div`
    display: flex;
    /* align-items: stretch가 핵심 */
    align-items: stretch;
    width: 100%;
    /* 제거: height: 80vh;  */
    border-radius: 16px;
    background-color: #fff;
    border: 1px solid ${({theme})=>theme.colors.gray300};
`;

const PageTitle = styled.h1`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
`;

/* 왼쪽 패널 */
const LeftPanel = styled.div`
    width: 400px;
    border-right: 1px solid #ddd;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    border-radius: 16px 0 0  16px;
    /* 높이 자동, stretch에 의해 오른쪽 패널만큼 늘어남 */
`;

const LeftTitle = styled.h2`
    font-size: 1rem;
    font-weight: 500;
    padding: 16px;
`;

const ActionRow = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid #ddd;
`;

const SelectAllCheckbox = styled.input`
    margin-right: 8px;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #009857;
    font-weight: 600;
    cursor: pointer;
`;

// 왼쪽 패널의 스크롤 영역
// 만약 오른쪽 패널보다 내용이 더 많다면 스크롤됨
const ScrollArea = styled.div`
    flex: 1;
    overflow-y: auto;
`;

interface ListItemProps {
    selected: boolean;
}

const ListItem = styled.div<ListItemProps>`
    display: flex;
    align-items: flex-start;
    padding: 12px 16px;
    cursor: pointer;
    background-color: ${({ selected }) => (selected ? "#f0f0f0" : "transparent")};

    &:hover {
        background-color: #f9f9f9;
    }
`;

const Checkbox = styled.input`
    margin-right: 8px;
    margin-top: 4px; /* slightly center with text if needed */
`;

const ListItemContent = styled.div`
    display: flex;
    flex-direction: column;
    /* optionally add margin-left if you want more spacing from checkbox */
`;
const TruncatedSpan = styled.span`
  max-width: 7ch;          /* Enough space for ~7 characters */
  white-space: nowrap;     /* No wrapping */
  overflow: hidden;        /* Hide overflow */
  text-overflow: ellipsis; /* Show ... when truncated */
  display: inline-block;   /* Needed for text-overflow to work on inline elements */
`;
const TitleRow = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #393C3C; /* example color */
  display: flex;
  align-items: center;
  gap: 4px; /* space around the divider */
`;

const MetaRow = styled.div`
  margin-top: 4px;
  font-size: 0.875rem;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Divider = styled.span`
  color: #ccc; /* or #ddd, whichever you prefer */
`;
/* 오른쪽 패널 */
const RightPanel = styled.div`
    width: calc(100% - 400px);
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

/* 상단 문구 */
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

/* 미리보기 영역 */
const FilePreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    position: relative;
    margin-bottom: 16px;
    min-height: 300px; /* 필요하다면 최소 높이 추가 */
`;

const PreviewWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
   
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
`;

const EmptyState = styled.div`
    color: #999;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

/* 폼 영역 */
const DetailForm = styled.div`
    border: 1px solid red;
    border-radius: 8px;
    /* Increase the padding for more space inside the form */
    padding: 24px;
    /* Add top margin so there's space above it */
    margin-top: 24px;
    /* Use flex layout + gap to space out each row */
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const SubTitle = styled.h3`
    margin-bottom: 8px;
`;

const FormDescription = styled.p`
    font-size: 0.85rem;
    color: #999;
    margin-bottom: 16px;
`;

const InputRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; // 이 부분을 추가

    label {
        width: 140px;
        font-size: 0.9rem;
        color: #666;
    }
`;

const InputWrapper = styled.div`
    position: relative; /* Make this container a positioning context */
    width: 300px; /* Increase width for a longer input */

    input {
        width: 100%;
        padding: 10px 40px 10px 10px; /* Extra right padding for the remove button */
        border: 2px solid #ddd;  /* Thicker border */
        border-radius: 4px;
        font-size: 1rem;
        box-sizing: border-box;
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

    button {
        padding: 8px 16px;
        cursor: pointer;
        border: 1px solid #999;
        background: #fff;
        border-radius: 4px;
    }
`;
