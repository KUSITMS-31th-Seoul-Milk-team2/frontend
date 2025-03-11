import styled from "styled-components";
import { theme } from "@styles/theme";
import { useNavigate } from "react-router-dom";

interface Notice {
    id: number;
    title: string;
    author: string;
    createdAt: string;
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
    const hasCheckbox = isMyPostsOnly;

    const allChecked =
        notices.length > 0 && notices.every((n) => selectedIds.includes(n.id));

    return (
        <>
            {showHeader && (
                <NoticeHeader hasCheckbox={hasCheckbox}>
                    {hasCheckbox && (
                        <HeaderItem>
                            <input
                                type="checkbox"
                                checked={allChecked}
                                onChange={(e) => onSelectAll(e.target.checked)}
                            />
                        </HeaderItem>
                    )}
                    <HeaderItem>번호</HeaderItem>

                    {hasCheckbox && (
                        <HeaderItem>
                            <DeleteHeaderButton onClick={onDeleteSelected}>
                                삭제
                            </DeleteHeaderButton>
                        </HeaderItem>
                    )}

                    <HeaderItem>공지사항 제목</HeaderItem>

                    <HeaderItem>작성자</HeaderItem>

                    <HeaderItem>작성일자</HeaderItem>
                </NoticeHeader>
            )}

            <NoticeContainer>
                {notices.map((notice) => {
                    return (
                        <NoticeItem key={notice.id} hasCheckbox={hasCheckbox}>
                            {hasCheckbox && (
                                <CheckboxWrapper>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(notice.id)}
                                        onChange={(e) => onSelect(notice.id, e.target.checked)}
                                    />
                                </CheckboxWrapper>
                            )}
                            <NoticeNumber>{notice.id}</NoticeNumber>
                            {hasCheckbox && <EmptyCell />}
                            <NoticeTitle onClick={() => navigate(`/announcement/${notice.id}`)}>
                                {notice.title}
                            </NoticeTitle>
                            <NoticeAuthor>{notice.author}</NoticeAuthor>
                            <NoticeDate>
                                {new Date(notice.createdAt).toISOString().split("T")[0]}
                            </NoticeDate>
                        </NoticeItem>
                    );
                })}
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
    width: 97%;
    margin-left: 1rem;
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
    margin-left: 2rem;
`;

const EmptyCell = styled.div`
    width: 80px;
`;

const NoticeNumber = styled.span`
    font-weight: bold;
    color: ${theme.colors.gray500};
    text-align: center;
    margin-left: 1rem;
`;

const NoticeTitle = styled.span`
    font-weight: 500;
    cursor: pointer;
    margin-left: 3rem;
`;

const NoticeAuthor = styled.span`
    color: ${theme.colors.gray600};
    margin-left: 2rem;
`;

const NoticeDate = styled.span`
    color: ${theme.colors.gray900};
    font-size: 0.9rem;
    text-align: center;
    margin-left: 2rem;
`;
