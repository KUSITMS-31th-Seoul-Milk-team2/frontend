import { useState, useEffect } from "react";
import styled from "styled-components";
import TopSection from "@components/announcement/TopSection";
import SearchBar from "@components/announcement/SearchBar.tsx";
import NoticeList from "@components/announcement/NoticeList.tsx";
import { useCookies } from "react-cookie";
import BottomPagination from "@components/announcement/BottomPagination.tsx";
import WriteButton from "@components/announcement/WriteButton.tsx";
import { useNavigate } from "react-router-dom";
import useNoticeStore from "@store/noticeStore.ts";
import axios from "axios";

const AnnouncementPage = () => {
    const navigate = useNavigate();
    const [isMyPostsOnly, setIsMyPostsOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const [cookies] = useCookies(["accessToken"]);
    const TOKEN = import.meta.env.VITE_TOKEN;

    const { notices, totalPages, setNotices, setPagination } = useNoticeStore();

    // 체크된 게시글 ID 목록
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleGetList = () => {
        const endpoint = isMyPostsOnly
            ? `${BaseUrl}/v1/notice/my-notices`
            : `${BaseUrl}/v1/notice/list`;

        axios
            .get(endpoint, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data.data;
                    console.log(data);
                    setNotices(data.content);
                    setPagination(
                        data.pageNo,
                        data.pageSize,
                        data.totalElements,
                        data.totalPages
                    );
                    setSelectedIds([]);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // 전체 선택/해제
    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = notices.map((n) => n.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    // 개별 체크박스 선택/해제
    const handleSelect = (noticeId: number, checked: boolean) => {
        setSelectedIds((prev) =>
            checked ? [...prev, noticeId] : prev.filter((id) => id !== noticeId)
        );
    };

    // 전체 삭제 (NoticeList 헤더의 삭제 버튼에서만 호출)
    const handleDeleteSelected = async () => {
        console.log(cookies)
        if (selectedIds.length === 0) return;
        if (!confirm("선택한 게시글을 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`${BaseUrl}/v1/notice`, {
                data: { id: selectedIds },
                headers: { Authorization: `Bearer ${TOKEN}` },
            });
            alert("삭제 성공");
            handleGetList();
        } catch (err) {
            console.error(err);
            alert("삭제 실패");
        }
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

    const toggleMyPosts = () => {
        setIsMyPostsOnly((prev) => !prev);
    };

    useEffect(() => {
        handleGetList();
    }, [isMyPostsOnly]);

    return (
        <Container>
            <SearchBar />
            <TopSection
                totalCount={notices.length}
                onToggleMyPosts={toggleMyPosts}
                isMyPostsOnly={isMyPostsOnly}
            />

            <NoticeList
                notices={notices}
                isMyPostsOnly={isMyPostsOnly}
                selectedIds={selectedIds}
                onSelect={handleSelect}
                onSelectAll={handleSelectAll}
                onDeleteSelected={handleDeleteSelected}
            />

            <BottomPagination
                pageCount={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <WriteButton onClick={() => navigate("/announcement/write")} />
        </Container>
    );
};

export default AnnouncementPage;

const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 2rem;
`;
