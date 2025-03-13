import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import token from "@utils/token.tsx";
import { useReconciliationStore } from "@store/reconciliationStore";
import LeftPanel from "@components/reconciliation/LeftPannel";
import RightPanel from "@components/reconciliation/RightPannel";
import SelectionPopup from "@components/modal/SelectionPopup";
import LoadingModal from "@components/modal/LoadingModal";
import roundCheckIcon from "@assets/icons/checkAroundIcon.svg";
import checkAroundIcon from "@assets/icons/checkAroundIcon.svg";
import styled from "styled-components";

const ReconciliationPage = () => {
    const navigate = useNavigate();
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;

    const {
        list,
        setList,
        selectedId,
        setSelectedId,
        formValues,
        setFormValues,
        checkedIds,
        setCheckedIds,
        transactionIdForAddition,
        setTransactionIdForAddition,
        showDeletePopup,
        setShowDeletePopup,
        showPageDeletePopup,
        setShowPageDeletePopup,
        showNoItemsPopup,
        setShowNoItemsPopup,
        showSelectionPopup,
        setShowSelectionPopup,
        showLoadingModal,
        setShowLoadingModal,
        showSuccessPopup,
        setShowSuccessPopup,
        showFailurePopup,
        setShowFailurePopup,
    } = useReconciliationStore();

    // 데이터 초기 로드
    useEffect(() => {
        fetchInvalidList();
    }, []);

    // 페이지가 마운트될 때 팝업 관련 상태를 동기적으로 초기화합니다.
    useLayoutEffect(() => {
        setShowNoItemsPopup(false);
        setShowDeletePopup(false);
        setShowPageDeletePopup(false);
        setShowSelectionPopup(false);
        setShowLoadingModal(false);
        setShowSuccessPopup(false);
        setShowFailurePopup(false);
    }, []);

    const fetchInvalidList = async () => {
        console.log("fetchInvalidList 호출");
        try {
            const response = await token.get(`${BaseUrl}/v1/receipt/invalid/search`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response);
            if (response.status === 200) {
                setList(response.data.data);
                return response.data.data;
            }
            return [];
        } catch (error) {
            console.error("불일치 내역을 받아오는 중 오류 발생:", error);
            return [];
        }
    };

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
    }, [selectedItem, setFormValues]);

    const handleSelect = (id: number) => {
        setSelectedId(id);
    };

    const handleCheck = (id: number, checked: boolean) => {
        setCheckedIds(checked ? [...checkedIds, id] : checkedIds.filter((item) => item !== id));
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
            if (response.data.data === true) {
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
            const response = await token.delete(`${BaseUrl}/v1/receipt/invalid/${selectedItem.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.data === true) {
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

    const handleRequery = async () => {
        try {
            const formattedDate = formValues.writtenDate.replace(/-/g, "");
            const requestBody = [
                {
                    supplierRegNumber: formValues.supplierRegNumber,
                    contractorRegNumber: formValues.recipientRegNumber,
                    approvalNo: formValues.approvalNumber,
                    reportingDate: formattedDate,
                    supplyValue: formValues.supplyAmount,
                },
            ];
            const response = await token.post(`${BaseUrl}/v1/receipt/validation`, requestBody, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });
            if (response.status === 200) {
                const transactionId = response.data.data;
                setTransactionIdForAddition(transactionId);
                console.log("Transaction ID:", transactionId);
                if (!selectedItem) {
                    alert("선택된 항목이 없습니다.");
                    return;
                }
                setShowSelectionPopup(true);
            } else {
                alert("재조회 요청에 실패했습니다.");
            }
        } catch (error) {
            setShowLoadingModal(false);
            console.error("재조회 요청 에러:", error);
            alert("재조회 요청 중 오류가 발생했습니다.");
        }
    };

    const handleSelectionConfirm = async () => {
        try {
            setShowSelectionPopup(false);
            setShowLoadingModal(true);
            if (!selectedItem || !transactionIdForAddition) {
                setShowLoadingModal(false);
                alert("필요한 정보가 없습니다.");
                return;
            }
            const additionResponse = await token.post(
                `${BaseUrl}/v1/receipt/addition?transactionId=${transactionIdForAddition}`,
                [selectedItem.id],
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setShowLoadingModal(false);
            console.log("Addition response:", additionResponse.data);
            if (additionResponse.status === 200 && additionResponse.data.data === true) {
                const newList = await fetchInvalidList();
                if (newList.length === 0) {
                    setShowNoItemsPopup(true);
                } else {
                    setShowSuccessPopup(true);
                }
            } else {
                setShowFailurePopup(true);
            }
        } catch (error) {
            setShowLoadingModal(false);
            console.error("추가 인증 요청 에러:", error);
            alert("추가 인증 요청 중 오류가 발생했습니다.");
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormValues({ ...formValues, [field]: value });
    };

    const handleClearInput = (field: string) => {
        setFormValues({ ...formValues, [field]: "" });
    };

    return (
        <Wrapper>
            <PageWrapper>
                <PageTitle>미발급 파일 수정</PageTitle>
                <Container>
                    <LeftPanel
                        onSelect={handleSelect}
                        onCheck={handleCheck}
                        onSelectAll={handleSelectAll}
                        onDeleteClick={handleDeleteClick}
                    />
                    <RightPanel
                        onPageDeleteClick={handlePageDeleteClick}
                        onRequery={handleRequery}
                        onInputChange={handleInputChange}
                        onClearInput={handleClearInput}
                    />
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

            {showSelectionPopup && (
                <SelectionPopup
                    Content={"간편인증이 완료되면 \n확인 버튼을 눌러주세요"}
                    primaryButton={{
                        label: "확인",
                        onClick: handleSelectionConfirm,
                    }}
                    secondaryButton={{
                        label: "취소",
                        onClick: () => setShowSelectionPopup(false),
                    }}
                />
            )}

            {showLoadingModal && (
                <LoadingModal
                    content="세금계산서 확인중"
                    subContent="홈텍스 정보와 세금계산서가 일치하는지 확인중이에요"
                />
            )}

            {showSuccessPopup && (
                <SelectionPopup
                    IconImg={checkAroundIcon}
                    Content={"재요청 성공"}
                    primaryButton={{
                        label: "확인",
                        onClick: () => setShowSuccessPopup(false),
                    }}
                    secondaryButton={{
                        label: "취소",
                        onClick: () => setShowSuccessPopup(false),
                    }}
                />
            )}

            {showFailurePopup && (
                <SelectionPopup
                    Content={"재요청 실패"}
                    SubContent={"다시 확인해주세요"}
                    primaryButton={{
                        label: "확인",
                        onClick: () => setShowFailurePopup(false),
                    }}
                    secondaryButton={{
                        label: "취소",
                        onClick: () => setShowFailurePopup(false),
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
    flex-direction: column;
    align-items: center;
`;

const PageWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    border-radius: 16px;
    background-color: #fff;
    border: 1px solid #ccc;
`;

const PageTitle = styled.h1`
    margin-bottom: 24px;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3;
`;
