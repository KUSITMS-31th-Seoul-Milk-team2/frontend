import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "@components/announcement/SearchBar.tsx";
import TopSection from "@components/announcement/TopSection";
import NoticeList from "@components/announcement/NoticeList.tsx";
import BottomPagination from "@components/announcement/BottomPagination.tsx";
import WriteButton from "@components/announcement/WriteButton.tsx";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useNoticeStore from "@store/noticeStore";
import token from "@utils/token.tsx";

const AnnouncementPage = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(["accessToken"]);
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;

    // Zustand에서 관리하는 상태 사용
    const { notices, totalPages, setNotices, setPagination, isMyPostsOnly, setMyPostsOnly } =
        useNoticeStore();

    // 현재 페이지 상태 추가
    const [currentPage, setCurrentPage] = useState(1);

    // 개별 체크 상태는 로컬 state로 관리
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // 공지사항 리스트 가져오기 (페이지네이션 적용)
    const handleGetList = (page: number = 1) => {
        const endpoint = isMyPostsOnly
            ? `${BaseUrl}/v1/notice/my-notices`
            : `${BaseUrl}/v1/notice/list`;

        token
            .get(endpoint, {
                headers: { Authorization: `Bearer ${cookies.accessToken}` },
                params: { page: page - 1, size: 10 }, // 페이지는 0부터 시작
            })
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data.data;
                    setNotices(data.content);
                    setPagination(data.pageNo + 1, data.pageSize, data.totalElements, data.totalPages);
                    setSelectedIds([]); // 목록 갱신 시 선택 초기화
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // 페이지 변경 시 호출될 함수
    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
        handleGetList(selected + 1);
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

    // 전체 삭제 (헤더의 삭제 버튼)
    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm("선택한 게시글을 삭제하시겠습니까?")) return;
        try {
            await token.delete(`${BaseUrl}/v1/notice`, {
                data: { ids: selectedIds },
                headers: { Authorization: `Bearer ${cookies.accessToken}` },
            });
            alert("삭제 성공");
            handleGetList(currentPage);
        } catch (err) {
            console.error(err);
            alert("삭제 실패");
        }
    };

    const toggleMyPosts = () => {
        setMyPostsOnly(!isMyPostsOnly);
    };

    useEffect(() => {
        handleGetList(currentPage);
    }, [isMyPostsOnly, currentPage]);

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
            <WriteButton onClick={() => navigate("/announcement/write")} />
            <BottomPagination
                pageCount={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />


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
