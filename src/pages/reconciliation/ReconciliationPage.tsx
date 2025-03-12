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
    { id: 4, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 5, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 6, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 7, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 8, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 9, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 10, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id:11, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 12, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 13, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id:11, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 12, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 13, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id:11, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 12, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },
    { id: 13, title: "세금계산서 사업체명 C", imageUrl: "/sample3.png" },

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
                      <RightContentContainer>
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
                      </RightContentContainer>
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
    align-items: stretch; /* 자식 요소가 컨테이너 높이에 맞게 늘어남 */
    width: 100%;
    /* height: 120vh; 제거 - 컨테이너가 내용물에 맞춰 늘어나도록 */
    border-radius: 16px;
    background-color: #fff;
    border: 1px solid ${({ theme }) => theme.colors.gray300};
`;


const PageTitle = styled.h1`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
`;

const LeftPanel = styled.div`
    width: 350px; /* 400px에서 350px로 축소 */
    border-right: 1px solid #ddd;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    border-radius: 16px 0 0 16px;
    /* overflow-y 속성 제거 - ScrollArea에서 처리 */
`;


const LeftTitle = styled.h2`
    font-size: ${({theme})=>theme.typography.titleM.fontSize};
    font-weight: ${({theme})=>theme.typography.titleM.fontWeight};
    color: ${({theme})=>theme.colors.gray1600};
    padding: 16px;
`;

const ActionRow = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid #ddd;
`;

const SelectAllCheckbox = styled.input`
    width: 1rem;
    height:1rem;
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
    flex: 1; /* Takes remaining space in the flex container */
    overflow-y: auto; /* Enables vertical scrolling */
    /* Optional: adds some styling to the scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 3px;
    }
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
    width: 1rem;
    height: 1rem;
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
/* 오른쪽 패널 - 너비 조정 */
const RightPanel = styled.div`
    width: calc(100% - 350px); /* 왼쪽 패널 크기에 맞게 조정 */
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow-y: auto; /* 내용이 많아질 경우 스크롤 */
`;
/* 오른쪽 컨텐츠 컨테이너 - 너비 조정 */
const RightContentContainer = styled.div`
    width: 100%; /* 90%에서 100%로 변경 */
    max-width: 800px; /* 최대 너비 유지 */
    margin: 0 auto; /* 중앙 정렬 */
    padding-bottom: 24px; /* 하단 여백 추가 */
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
    min-height: 350px;
    max-height: 400px; /* Add a maximum height constraint */
`;

const PreviewWrapper = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    height: 350px; /* Set a fixed height */
    max-height: 350px; /* Ensure it doesn't grow beyond this */
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
    object-fit: contain; /* This preserves the aspect ratio */
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

/* 폼 영역 */
const DetailForm = styled.div`
    border: 1px solid ${({theme})=>theme.colors.gray400};
    border-radius: 16px;
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
        font-size: ${({theme})=>theme.typography.bodyL.fontSize};
        font-weight: ${({theme})=>theme.typography.bodyL.fontWeight};;
        color:  ${({theme})=>theme.colors.gray1300};
    }
`;

const InputWrapper = styled.div`
    position: relative;
    width: 300px; 

    input {
        width: 100%;
        padding: 15px 40px 15px 10px; /* Extra right padding for the remove button */
        border: 2px solid #ddd;  /* Thicker border */
        border-radius: 10px;
        background-color: ${({theme})=>theme.colors.gray100};
        color:  ${({theme})=>theme.colors.gray1600};
        font-size:  ${({theme})=>theme.typography.bodyL.fontSize};
        font-weight: ${({theme})=>theme.typography.bodyL.fontWeight};
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

    button {
        padding: 8px 16px;
        cursor: pointer;
        border: 1px solid #999;
        background: #fff;
        border-radius: 4px;
    }
`;
