// uploadStore.ts
import {create}from "zustand";
import { FileUploadState } from "@pages/upload/UploadPage";

interface UploadState {
    files: File[];
    uploadStates: FileUploadState[];
    isModalOpen: boolean;
    showSelectionPopup: boolean;
    showLoadingModal: boolean;
    showFinalPopup: boolean;
    finalMessage: string;
    setFiles: (files: File[]) => void;
    addFiles: (newFiles: File[]) => void;
    setUploadStates: (states: FileUploadState[]) => void;
    addUploadStates: (states: FileUploadState[]) => void;
    setModalOpen: (open: boolean) => void;
    setShowSelectionPopup: (show: boolean) => void;
    setShowLoadingModal: (show: boolean) => void;
    setShowFinalPopup: (show: boolean) => void;
    setFinalMessage: (msg: string) => void;
    reset: () => void;
}

const useUploadStore = create<UploadState>((set) => ({
    files: [],
    uploadStates: [],
    isModalOpen: false,
    showSelectionPopup: false,
    showLoadingModal: false,
    showFinalPopup: false,
    finalMessage: "",
    setFiles: (files) => set({ files }),
    addFiles: (newFiles) =>
        set((state) => ({ files: [...state.files, ...newFiles] })),
    setUploadStates: (states) => set({ uploadStates: states }),
    addUploadStates: (states) =>
        set((state) => ({ uploadStates: [...state.uploadStates, ...states] })),
    setModalOpen: (open) => set({ isModalOpen: open }),
    setShowSelectionPopup: (show) => set({ showSelectionPopup: show }),
    setShowLoadingModal: (show) => set({ showLoadingModal: show }),
    setShowFinalPopup: (show) => set({ showFinalPopup: show }),
    setFinalMessage: (msg) => set({ finalMessage: msg }),
    reset: () =>
        set({
            files: [],
            uploadStates: [],
            isModalOpen: false,
            showSelectionPopup: false,
            showLoadingModal: false,
            showFinalPopup: false,
            finalMessage: "",
        }),
}));

export default useUploadStore;
