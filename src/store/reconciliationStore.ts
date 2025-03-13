import { create } from "zustand";

export interface FormValues {
    supplierRegNumber: string;
    recipientRegNumber: string;
    approvalNumber: string;
    writtenDate: string;
    supplyAmount: string;
}

export interface InvoiceItem {
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

interface ReconciliationState {
    list: InvoiceItem[];
    selectedId: number | null;
    formValues: FormValues;
    checkedIds: number[];
    transactionIdForAddition: string | null;
    // 추가 상태들
    showDeletePopup: boolean;
    showPageDeletePopup: boolean;
    showNoItemsPopup: boolean;
    showSelectionPopup: boolean;
    showLoadingModal: boolean;
    showSuccessPopup: boolean;
    showFailurePopup: boolean;
    // setter 함수들
    setList: (list: InvoiceItem[]) => void;
    setSelectedId: (id: number | null) => void;
    setFormValues: (values: FormValues) => void;
    setCheckedIds: (ids: number[]) => void;
    setTransactionIdForAddition: (transactionId: string | null) => void;
    // 추가 상태 setters
    setShowDeletePopup: (value: boolean) => void;
    setShowPageDeletePopup: (value: boolean) => void;
    setShowNoItemsPopup: (value: boolean) => void;
    setShowSelectionPopup: (value: boolean) => void;
    setShowLoadingModal: (value: boolean) => void;
    setShowSuccessPopup: (value: boolean) => void;
    setShowFailurePopup: (value: boolean) => void;
    reset: () => void;
}

export const useReconciliationStore = create<ReconciliationState>((set) => ({
    list: [],
    selectedId: null,
    formValues: {
        supplierRegNumber: "",
        recipientRegNumber: "",
        approvalNumber: "",
        writtenDate: "",
        supplyAmount: "",
    },
    checkedIds: [],
    transactionIdForAddition: null,
    // 추가 상태 초기값들
    showDeletePopup: false,
    showPageDeletePopup: false,
    showNoItemsPopup: false,
    showSelectionPopup: false,
    showLoadingModal: false,
    showSuccessPopup: false,
    showFailurePopup: false,
    setList: (list) => set({ list }),
    setSelectedId: (id) => set({ selectedId: id }),
    setFormValues: (values) => set({ formValues: values }),
    setCheckedIds: (ids) => set({ checkedIds: ids }),
    setTransactionIdForAddition: (transactionId) =>
        set({ transactionIdForAddition: transactionId }),
    setShowDeletePopup: (value) => set({ showDeletePopup: value }),
    setShowPageDeletePopup: (value) => set({ showPageDeletePopup: value }),
    setShowNoItemsPopup: (value) => set({ showNoItemsPopup: value }),
    setShowSelectionPopup: (value) => set({ showSelectionPopup: value }),
    setShowLoadingModal: (value) => set({ showLoadingModal: value }),
    setShowSuccessPopup: (value) => set({ showSuccessPopup: value }),
    setShowFailurePopup: (value) => set({ showFailurePopup: value }),
    reset: () =>
        set({
            list: [],
            selectedId: null,
            formValues: {
                supplierRegNumber: "",
                recipientRegNumber: "",
                approvalNumber: "",
                writtenDate: "",
                supplyAmount: "",
            },
            checkedIds: [],
            transactionIdForAddition: null,
            showDeletePopup: false,
            showPageDeletePopup: false,
            showNoItemsPopup: false,
            showSelectionPopup: false,
            showLoadingModal: false,
            showSuccessPopup: false,
            showFailurePopup: false,
        }),
}));
