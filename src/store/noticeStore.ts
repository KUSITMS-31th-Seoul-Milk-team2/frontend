import {create} from "zustand";

interface Notice {
    id: number;
    title: string;
    author: string;
    date: string;
}

interface NoticeStoreState {
    notices: Notice[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    setNotices: (notices: Notice[]) => void;
    setPagination: (
        pageNo: number,
        pageSize: number,
        totalElements: number,
        totalPages: number
    ) => void;
}

const useNoticeStore = create<NoticeStoreState>((set) => ({
    notices: [],
    pageNo: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,

    setNotices: (notices) => set({ notices }),

    setPagination: (pageNo, pageSize, totalElements, totalPages) =>
        set({ pageNo, pageSize, totalElements, totalPages }),
}));

export default useNoticeStore;
