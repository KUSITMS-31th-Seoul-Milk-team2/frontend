import { useState } from "react";
import styled from "styled-components";
import TopSection from "@components/announcement/TopSection";
import SearchBar from "@components/announcement/SearchBar.tsx";
import NoticeList from "@components/announcement/NoticeList.tsx";

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

    // ✅ 내가 쓴 글 필터 토글
    const toggleMyPosts = () => {
        setIsMyPostsOnly((prev) => !prev);
    };

    // ✅ 정렬 변경 (최신순/오래된순)
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
            {/* ✅ 검색창 */}
            <SearchBar />

            {/* ✅ 검색 결과 개수, 필터, 정렬 기능 포함 */}
            <TopSection
                totalCount={notices.length}
                onToggleMyPosts={toggleMyPosts}
                isMyPostsOnly={isMyPostsOnly}
                sortOption={sortOption}
                onChangeSortOption={changeSortOption}
            />

            {/* ✅ 공지사항 리스트 */}
            <NoticeList notices={notices} />
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
