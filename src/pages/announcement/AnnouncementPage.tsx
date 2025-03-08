import { useState } from "react";
import styled from "styled-components";
import TopSection from "@components/announcement/TopSection";
import SearchBar from "@components/announcement/SearchBar.tsx";
import NoticeList from "@components/announcement/NoticeList.tsx";
import BottomPagination from "@components/announcement/BottomPagination.tsx";
import WriteButton from "@components/announcement/WriteButton.tsx";
import {useNavigate} from "react-router-dom";


const dummyNotices = [
    { id: 1, title: "공지사항 제목입니다.", author: "김혜연", date: "2025.01.20" },
    { id: 2, title: "새로운 기능이 추가되었습니다!", author: "관리자", date: "2025.01.18" },
    { id: 3, title: "시스템 점검 안내", author: "운영팀", date: "2025.01.15" },
    { id: 4, title: "서비스 이용 약관 변경 안내", author: "운영팀", date: "2025.01.10" },
    { id: 5, title: "점검이 완료되었습니다.", author: "관리자", date: "2025.01.08" },
];

const AnnouncementPage = () => {

    const [notices, setNotices] = useState(dummyNotices);
    const [isMyPostsOnly, setIsMyPostsOnly] = useState(false);
    const [sortOption, setSortOption] = useState("최신순");
    const [currentPage, setCurrentPage] = useState(1);
    const totalPageCount = 12;

    const navigate = useNavigate();

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };
    const toggleMyPosts = () => {
        setIsMyPostsOnly((prev) => !prev);
    };

    const changeSortOption = (option: string) => {
        setSortOption(option);
        const sortedNotices = [...notices].sort((a, b) => {
            if (option === "최신순") return new Date(b.date) > new Date(a.date) ? 1 : -1;
            return new Date(a.date) > new Date(b.date) ? 1 : -1;
        });
        setNotices(sortedNotices);
    };

    return (
        <Container>
            <SearchBar />
            <TopSection
                totalCount={notices.length}
                onToggleMyPosts={toggleMyPosts}
                isMyPostsOnly={isMyPostsOnly}
                sortOption={sortOption}
                onChangeSortOption={changeSortOption}
            />
            <NoticeList notices={notices} />
            <WriteButton onClick={() => navigate("/announcement/write")} />
            <BottomPagination  pageCount={totalPageCount}
                               currentPage={currentPage}
                               onPageChange={handlePageChange} />

        </Container>
    );
};

export default AnnouncementPage;

/* ======= styled-components ======= */
const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;
