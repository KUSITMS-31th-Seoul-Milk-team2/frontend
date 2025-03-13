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

    const { notices, totalPages, setNotices, setPagination, isMyPostsOnly, setMyPostsOnly } =
        useNoticeStore();

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleGetList = (page: number = 1) => {
        const endpoint = isMyPostsOnly
            ? `${BaseUrl}/v1/notice/my-notices`
            : `${BaseUrl}/v1/notice/list`;

        token
            .get(endpoint, {
                headers: { Authorization: `Bearer ${cookies.accessToken}` },
                params: { page: page - 1, size: 10 },
            })
            .then((res) => {
                if (res.status === 200) {
                    const data = res.data.data;
                    setNotices(data.content);
                    setPagination(data.pageNo + 1, data.pageSize, data.totalElements, data.totalPages);
                    setSelectedIds([]);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
        handleGetList(selected + 1);
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            const allIds = notices.map((n) => n.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelect = (noticeId: number, checked: boolean) => {
        setSelectedIds((prev) =>
            checked ? [...prev, noticeId] : prev.filter((id) => id !== noticeId)
        );
    };

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
            <Title>공지사항</Title>
            {/* 부모 컨테이너는 max-width 1200px; margin 0 auto; 만 가집니다 */}
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
const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 16px;
  text-align: left;  
  align-items: center;
  width : 1044px;
`;
