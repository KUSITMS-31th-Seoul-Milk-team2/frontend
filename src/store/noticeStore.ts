import { create } from "zustand";
import axios from "axios";

interface Notice {
    id: number;
    title: string;
    author: string;
    date: string;
    content: string;
}

interface NoticeStoreState {
    notices: Notice[];
    setNotices: (notices: Notice[]) => void;

    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    setPagination: (
        pageNo: number,
        pageSize: number,
        totalElements: number,
        totalPages: number
    ) => void;


    isMyPostsOnly: boolean;
    setMyPostsOnly: (value: boolean) => void;


    searchType: string;
    keyword: string;
    setSearchType: (val: string) => void;
    setKeyword: (val: string) => void;

    fetchNoticesBySearch: (token: string, baseUrl: string) => Promise<void>;
}

const useNoticeStore = create<NoticeStoreState>((set, get) => ({
    notices: [],
    setNotices: (notices) => set({ notices }),

    pageNo: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    setPagination: (pageNo, pageSize, totalElements, totalPages) =>
        set({ pageNo, pageSize, totalElements, totalPages }),

    isMyPostsOnly: false,
    setMyPostsOnly: (value) => set({ isMyPostsOnly: value }),

    searchType: "all", // 초기값: "전체"와 대응
    keyword: "",
    setSearchType: (val) => set({ searchType: val }),
    setKeyword: (val) => set({ keyword: val }),

    fetchNoticesBySearch: async (token: string, baseUrl: string) => {
        const { searchType, keyword } = get();
        try {
            const res = await axios.get(`${baseUrl}/v1/notice/search`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    searchType,
                    keyword,
                },
            });

            if (res.status === 200 && res.data.data) {
                const data = res.data.data;
                set({
                    notices: data.content,
                });

                set({
                    pageNo: data.pageNo,
                    pageSize: data.pageSize,
                    totalElements: data.totalElements,
                    totalPages: data.totalPages,
                });
            }
        } catch (err) {
            console.error(err);
        }
    },
}));

export default useNoticeStore;
