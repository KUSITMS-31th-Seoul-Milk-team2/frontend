import { useState, useEffect } from "react";
import styled from "styled-components";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { transparentize } from "polished";
import SelectionPopup from "@components/modal/SelectionPopup.tsx";
import roundCheckIcon from "@assets/icons/checkAroundIcon.svg";
import { useNavigate } from "react-router-dom";
import token from "@utils/token.tsx";

interface InvoiceItem {
    id: number;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    employeeId: string;
    arap: string;
    issueId: string;
    issueDate: string;
    suId: string;
    suName: string;
    ipId: string;
    ipName: string;
    chargeTotal: number;
    taxTotal: number;
    grandTotal: number;
    erdat: string;
    erzet: string;
    fileUrl: string;
}

interface FormValues {
    supplierRegNumber: string;
    recipientRegNumber: string;
    approvalNumber: string;
    writtenDate: string;
    supplyAmount: string;
}

const ReconciliationPage = () => {
    const navigate = useNavigate();
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const [formValues, setFormValues] = useState<FormValues>({
        supplierRegNumber: "",
        recipientRegNumber: "",
        approvalNumber: "",
        writtenDate: "",
        supplyAmount: "",
    });
    const [isRequeryEnabled, setIsRequeryEnabled] = useState<boolean>(false);
    const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
    const [showPageDeletePopup, setShowPageDeletePopup] = useState<boolean>(false);
    const [showNoItemsPopup, setShowNoItemsPopup] = useState<boolean>(false);

    // 목록은 API로 받아오기
    const [list, setList] = useState<InvoiceItem[]>([]);

    // API를 통해 불일치 내역 받아오기
    useEffect(() => {
        const fetchInvalidList = async () => {
            try {
                const response = await token.get(`${BaseUrl}/v1/receipt/invalid/search`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setList(response.data.data);
                }
            } catch (error) {
                console.error("불일치 내역을 받아오는 중 오류 발생:", error);
            }
        };
        fetchInvalidList();
    }, [BaseUrl]);


    const selectedItem = list.find((item) => item.id === selectedId);
    useEffect(() => {
        if (selectedItem) {
            setFormValues({
                supplierRegNumber: selectedItem.suId,
                recipientRegNumber: selectedItem.ipId,
                approvalNumber: selectedItem.issueId,
                writtenDate: selectedItem.erdat,
                supplyAmount: selectedItem.chargeTotal.toString(),
            });
        }
    }, [selectedItem]);

    const totalCount = list.length;
    const allChecked = list.length > 0 && list.every((item) => checkedIds.includes(item.id));

    useEffect(() => {
        const hasValue = Object.values(formValues).some((value) => value.trim() !== "");
        setIsRequeryEnabled(hasValue);
    }, [formValues]);

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
            setCheckedIds(list.map((item) => item.id));
        } else {
            setCheckedIds([]);
        }
    };

    const handleDeleteClick = () => {
        if (checkedIds.length === 0) {
            alert("선택된 항목이 없습니다.");
            return;
        }
        setShowDeletePopup(true);
    };


    const handleConfirmDelete = async () => {
        try {
            const response = await token.delete(`${BaseUrl}/v1/receipt/delete`, {
                data: checkedIds,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                const newList = list.filter((item) => !checkedIds.includes(item.id));
                setList(newList);
                setCheckedIds([]);
                setShowDeletePopup(false);
                if (newList.length === 0) {
                    setShowNoItemsPopup(true);
                }
            } else {
                alert("전체 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("전체 삭제 에러:", error);
            alert("전체 삭제에 실패했습니다.");
        }
    };

    // 단일 삭제 API 호출 (삭제 확인 모달의 "삭제" 버튼)
    const handlePageDeleteClick = () => {
        if (!selectedItem) {
            alert("선택된 세금계산서가 없습니다.");
            return;
        }
        setShowPageDeletePopup(true);
    };

    const handleConfirmPageDelete = async () => {
        if (!selectedItem) return;
        try {
            const response = await token.delete(`${BaseUrl}/v1/receipt/${selectedItem.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                const newList = list.filter((item) => item.id !== selectedItem.id);
                setList(newList);
                setSelectedId(null);
                setShowPageDeletePopup(false);
                if (newList.length === 0) {
                    setShowNoItemsPopup(true);
                }
            } else {
                alert("삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("단일 삭제 에러:", error);
            alert("삭제에 실패했습니다.");
        }
    };

    const handleInputChange = (field: keyof FormValues, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleClearInput = (field: keyof FormValues) => {
        setFormValues((prev) => ({ ...prev, [field]: "" }));
    };

    const handleRequery =  async () => {
        try {
            const formattedDate = formValues.writtenDate.replace(/-/g, "");
            const requestBody = [{
                supplierRegNumber: formValues.supplierRegNumber,
                contractorRegNumber: formValues.recipientRegNumber,
                approvalNo: formValues.approvalNumber,
                reportingDate: formattedDate,
                supplyValue: formValues.supplyAmount,
            },];
            const response = await token.post(`${BaseUrl}/v1/receipt/validation`, requestBody, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", },
            });
            if (response.status=== 200) {
                const transactionId = response.data.data;
                console.log(transactionId)
                if (!selectedItem) {
                    alert("선택된 항목이 없습니다.");
                    return;
                }
                alert("재조회 요청이 성공적으로 완료되었습니다.");
                const additionResponse = await token.post(
                    `${BaseUrl}/v1/receipt/addition?transactionId=${transactionId}`,
                    [ selectedItem.id ],
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                console.log("addition response:", additionResponse);
                if (additionResponse.status === 200) {
                    alert("추가 인증이 성공적으로 완료되었습니다.");
                } else {
                    alert("추가 인증에 실패했습니다.");
                }
            } else {
                alert("재조회 요청에 실패했습니다.");
            }
        } catch (error) {
            console.error("재조회 요청 에러:", error);
            alert("재조회 요청 중 오류가 발생했습니다.");
        }
    };


    const formatIssueDate = (dateStr: string) => {
        if (dateStr.length === 8) {
            return `${dateStr.substring(0, 4)}.${dateStr.substring(4, 6)}.${dateStr.substring(6, 8)}`;
        }
        return dateStr;
    };


    return (
        <Wrapper>
            <PageWrapper>
                <PageTitle>미발급 파일 수정</PageTitle>
                <Container>
                    <LeftPanel>
                        <LeftTitle>총 {totalCount}건</LeftTitle>
                        <ActionRow>
                            <SelectAllCheckbox
                                type="checkbox"
                                checked={allChecked}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                            />
                            <DeleteButton onClick={handleDeleteClick}>전체삭제</DeleteButton>
                        </ActionRow>
                        <ScrollArea>
                            {list.map((item) => {
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
                                            <TitleRow>
                                                <TruncatedSpan>{item.suName}</TruncatedSpan>
                                                <Divider>|</Divider>
                                                <TruncatedSpan>{item.ipName}</TruncatedSpan>
                                            </TitleRow>
                                            <MetaRow>
                                                <span>PDF</span>
                                                <Divider>|</Divider>
                                                <span>{formatIssueDate(item.issueDate)}</span>
                                            </MetaRow>
                                        </ListItemContent>
                                    </ListItem>
                                );
                            })}
                        </ScrollArea>
                    </LeftPanel>
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
                                <InputRow>
                                    <label>공급자 등록번호</label>
                                    <InputWrapper>
                                        <input
                                            placeholder="000-00-00000"
                                            value={formValues.supplierRegNumber}
                                            onChange={(e) =>
                                                handleInputChange("supplierRegNumber", e.target.value)
                                            }
                                        />
                                        {formValues.supplierRegNumber && (
                                            <RemoveButton onClick={() => handleClearInput("supplierRegNumber")}>
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
                                            onChange={(e) =>
                                                handleInputChange("recipientRegNumber", e.target.value)
                                            }
                                        />
                                        {formValues.recipientRegNumber && (
                                            <RemoveButton onClick={() => handleClearInput("recipientRegNumber")}>
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
                                            onChange={(e) =>
                                                handleInputChange("approvalNumber", e.target.value)
                                            }
                                        />
                                        {formValues.approvalNumber && (
                                            <RemoveButton onClick={() => handleClearInput("approvalNumber")}>
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
                                            onChange={(e) => handleInputChange("writtenDate", e.target.value)}
                                        />
                                        {formValues.writtenDate && (
                                            <RemoveButton onClick={() => handleClearInput("writtenDate")}>
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
                                            onChange={(e) => handleInputChange("supplyAmount", e.target.value)}
                                        />
                                        {formValues.supplyAmount && (
                                            <RemoveButton onClick={() => handleClearInput("supplyAmount")}>
                                                ×
                                            </RemoveButton>
                                        )}
                                    </InputWrapper>
                                </InputRow>
                            </DetailForm>
                            <ButtonRow>
                                <ActionButton onClick={handlePageDeleteClick}>
                                    삭제
                                </ActionButton>
                                <ActionButton
                                    onClick={handleRequery}
                                    disabled={!isRequeryEnabled}
                                    style={{
                                        backgroundColor: isRequeryEnabled ? "#009857" : "#f0f0f0",
                                        color: isRequeryEnabled ? "#fff" : "#999",
                                        cursor: isRequeryEnabled ? "pointer" : "not-allowed",
                                    }}
                                >
                                    재조회
                                </ActionButton>
                            </ButtonRow>
                        </RightContentContainer>
                    </RightPanel>
                </Container>
            </PageWrapper>

            {showDeletePopup && (
                <SelectionPopup
                    Content={"선택한 파일을 삭제하시겠습니까?\n삭제 후에는 되돌릴 수 없습니다."}
                    primaryButton={{
                        label: "삭제",
                        onClick: handleConfirmDelete,
                    }}
                    secondaryButton={{
                        label: "취소",
                        onClick: () => setShowDeletePopup(false),
                    }}
                />
            )}

            {showPageDeletePopup && (
                <SelectionPopup
                    Content={"현재 페이지의 세금계산서를 삭제하시겠습니까?\n삭제 후에는 되돌릴 수 없습니다."}
                    primaryButton={{
                        label: "삭제",
                        onClick: handleConfirmPageDelete,
                    }}
                    secondaryButton={{
                        label: "취소",
                        onClick: () => setShowPageDeletePopup(false),
                    }}
                />
            )}

            {showNoItemsPopup && (
                <SelectionPopup
                    IconImg={roundCheckIcon}
                    Content={"불일치된 수정이 끝났어요."}
                    primaryButton={{
                        label: "홈으로 이동",
                        onClick: () => navigate("/home"),
                    }}
                    secondaryButton={{
                        label: "계속 업로드",
                        onClick: () => navigate("/upload"),
                    }}
                />
            )}
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
`;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
`;

const Container = styled.div`
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 90vh;
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

/* 왼쪽 패널 */
const LeftPanel = styled.div`
    width: 300px;
    border-right: 1px solid #ddd;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    border-radius: 16px 0 0 16px;
    overflow-y: auto;
`;

const LeftTitle = styled.h2`
    font-size: ${({ theme }) => theme.typography.titleM.fontSize};
    font-weight: ${({ theme }) => theme.typography.titleM.fontWeight};
    color: ${({ theme }) => theme.colors.gray1600};
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
    height: 1rem;
    margin-right: 8px;
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
    background-color: ${({ selected, theme }) =>
            selected ? transparentize(0.8, theme.colors.main200) : "transparent"};

    &:hover {
        background-color: ${({ selected, theme }) =>
                selected
                        ? transparentize(0.2, theme.colors.main200)
                        : transparentize(0.2, "#f9f9f9")};
    }
`;

const Checkbox = styled.input`
    margin-right: 8px;
    margin-top: 4px;
    width: 1rem;
    height: 1rem;
`;

const ListItemContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const TruncatedSpan = styled.span`
    max-width: 7ch;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
`;

const TitleRow = styled.div`
    font-size: 1rem;
    font-weight: 500;
    color: #393c3c;
    display: flex;
    align-items: center;
    gap: 4px;
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
    color: #ccc;
`;

/* 오른쪽 패널 */
const RightPanel = styled.div`
    width: calc(100% - 300px);
    display: flex;
    flex-direction: column;
    padding: 16px;
    overflow-y: auto;
`;

const RightContentContainer = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 24px;
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
    border: 1px solid ${({ theme }) => theme.colors.gray400};
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
        font-size: ${({ theme }) => theme.typography.bodyL.fontSize};
        font-weight: ${({ theme }) => theme.typography.bodyL.fontWeight};
        color: ${({ theme }) => theme.colors.gray1300};
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
        background-color: ${({ theme }) => theme.colors.gray100};
        color: ${({ theme }) => theme.colors.gray1600};
        font-size: ${({ theme }) => theme.typography.bodyL.fontSize};
        font-weight: ${({ theme }) => theme.typography.bodyL.fontWeight};
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
