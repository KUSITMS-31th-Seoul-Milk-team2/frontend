import styled from "styled-components";
import { theme } from "@styles/theme";
import { useNavigate } from "react-router-dom";

interface Notice {
    id: number;
    title: string;
    author: string;
    date: string;
}

interface NoticeListProps {
    notices?: Notice[];
    showHeader?: boolean;
    isMyPostsOnly?: boolean;
    selectedIds?: number[];
    onSelect?: (noticeId: number, checked: boolean) => void;
    onSelectAll?: (checked: boolean) => void;
    onDeleteSelected?: () => void;
}

const NoticeList = ({
                        notices = [],
                        showHeader = true,
                        isMyPostsOnly = false,
                        selectedIds = [],
                        onSelect = () => {},
                        onSelectAll = () => {},
                        onDeleteSelected = () => {},
                    }: NoticeListProps) => {
    const navigate = useNavigate();
    const hasCheckbox = isMyPostsOnly; // "내가 쓴 글"일 때만 체크박스 표시

    // 모든 항목이 체크되었는지 여부
    const allChecked =
        notices.length > 0 && notices.every((n) => selectedIds.includes(n.id));

    return (
        <>
            {showHeader && (
                <NoticeHeader hasCheckbox={hasCheckbox}>
                    {/* 1) 전체 선택 체크박스 */}
                    {hasCheckbox && (
                        <HeaderItem>
                            <input
                                type="checkbox"
                                checked={allChecked}
                                onChange={(e) => onSelectAll(e.target.checked)}
                            />
                        </HeaderItem>
                    )}
                    {/* 2) 번호 */}
                    <HeaderItem>번호</HeaderItem>
                    {/* 3) 삭제 버튼 (헤더) */}
                    {hasCheckbox && (
                        <HeaderItem>
                            <DeleteHeaderButton onClick={onDeleteSelected}>
                                삭제
                            </DeleteHeaderButton>
                        </HeaderItem>
                    )}
                    {/* 4) 제목 */}
                    <HeaderItem>공지사항 제목</HeaderItem>
                    {/* 5) 작성자 */}
                    <HeaderItem>작성자</HeaderItem>
                    {/* 6) 작성일자 */}
                    <HeaderItem>작성일자</HeaderItem>
                </NoticeHeader>
            )}

            <NoticeContainer>
                {notices.map((notice) => (
                    <NoticeItem key={notice.id} hasCheckbox={hasCheckbox}>
                        {/* (1) 개별 체크박스 */}
                        {hasCheckbox && (
                            <CheckboxWrapper>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(notice.id)}
                                    onChange={(e) => onSelect(notice.id, e.target.checked)}
                                />
                            </CheckboxWrapper>
                        )}
                        {/* (2) 번호 */}
                        <NoticeNumber>{notice.id}</NoticeNumber>
                        {/* (3) 빈 셀 (헤더의 삭제 버튼과 자리 맞추기) */}
                        {hasCheckbox && <EmptyCell />}
                        {/* (4) 제목 */}
                        <NoticeTitle onClick={() => navigate(`/announcement/${notice.id}`)}>
                            {notice.title}
                        </NoticeTitle>
                        {/* (5) 작성자 */}
                        <NoticeAuthor>{notice.author}</NoticeAuthor>
                        {/* (6) 작성일자 */}
                        <NoticeDate>{notice.date}</NoticeDate>
                    </NoticeItem>
                ))}
            </NoticeContainer>
        </>
    );
};

export default NoticeList;

/* ======= styled-components ======= */
const NoticeHeader = styled.div<{ hasCheckbox: boolean }>`
    display: grid;
    grid-template-columns: ${({ hasCheckbox }) =>
            hasCheckbox
                    ? "50px 50px 80px 1fr 100px 120px"
                    : "50px 1fr 100px 120px"};
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
`;

const HeaderItem = styled.div`
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DeleteHeaderButton = styled.button`
    background-color: ${theme.colors.gray200};
    border: 1px solid ${theme.colors.gray300};
    color: ${theme.colors.gray1600};
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        opacity: 0.8;
    }
`;

const NoticeContainer = styled.div`
    margin-top: 1rem;
`;

const NoticeItem = styled.div<{ hasCheckbox: boolean }>`
    display: grid;
    grid-template-columns: ${({ hasCheckbox }) =>
            hasCheckbox
                    ? "50px 50px 80px 1fr 100px 120px"
                    : "50px 1fr 100px 120px"};
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.gray200};
    font-size: 1rem;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const EmptyCell = styled.div`
    width: 80px;
`;

const NoticeNumber = styled.span`
    font-weight: bold;
    color: ${theme.colors.gray500};
    text-align: center;
`;

const NoticeTitle = styled.span`
    font-weight: 500;
    cursor: pointer;
`;

const NoticeAuthor = styled.span`
    color: ${theme.colors.gray600};
`;

const NoticeDate = styled.span`
    color: ${theme.colors.gray900};
    font-size: 0.9rem;
    text-align: center;
`;
