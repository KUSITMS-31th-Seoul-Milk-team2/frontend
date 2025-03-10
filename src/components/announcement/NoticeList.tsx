import styled from "styled-components";
import { theme } from "@styles/theme.ts";

interface Notice {
    id: number;
    title: string;
    author: string;
    date: string;
}

interface NoticeListProps {
    notices?: Notice[];
    showHeader?: boolean; // 헤더 표시 여부 (기본값 true)
}

const NoticeList = ({ notices = [], showHeader = true }: NoticeListProps) => {
    return (
        <>
            {showHeader && (
                <NoticeHeader>
                    <HeaderItem>번호</HeaderItem>
                    <HeaderItem>공지사항 제목</HeaderItem>
                    <HeaderItem>작성자</HeaderItem>
                    <HeaderItem>작성일자</HeaderItem>
                </NoticeHeader>
            )}

            <NoticeContainer>
                {notices.map((notice) => (
                    <NoticeItem key={notice.id}>
                        <NoticeNumber>{notice.id}</NoticeNumber>
                        <NoticeTitle>{notice.title}</NoticeTitle>
                        <NoticeAuthor>{notice.author}</NoticeAuthor>
                        <NoticeDate>{notice.date}</NoticeDate>
                    </NoticeItem>
                ))}
            </NoticeContainer>
        </>
    );
};

export default NoticeList;

/* ======= styled-components ======= */
const NoticeHeader = styled.div`
    display: grid;
    grid-template-columns: 50px 1fr 100px 120px;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: ${theme.colors.gray100};
    font-size: ${theme.typography.titleM};
    font-weight: ${theme.typography.titleM};
    border: 2px solid ${theme.colors.gray300};
    border-radius: 10px;
    color: ${theme.colors.gray1600};
    width: 100%;
    height: auto;
`;

const HeaderItem = styled.div`
    font-size: 1rem;
`;

const NoticeContainer = styled.div`
    margin-top: 1rem;
`;

const NoticeItem = styled.div`
    display: grid;
    grid-template-columns: 50px 1fr 100px 120px;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.white};
    font-size: 1rem;
`;

const NoticeNumber = styled.span`
    font-weight: bold;
    color: ${theme.colors.gray500};
`;

const NoticeTitle = styled.span`
    font-weight: 500;
`;

const NoticeAuthor = styled.span`
    color: ${theme.colors.gray600};
`;

const NoticeDate = styled.span`
    color: ${theme.colors.gray900};
    font-size: 0.9rem;
`;
