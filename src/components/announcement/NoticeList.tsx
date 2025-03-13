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
        <NoticeWrapper>
            {showHeader && (
                <NoticeHeader hasCheckbox={hasCheckbox}>
                    {hasCheckbox && (
                        <div className="checkbox">
                            <input
                                type="checkbox"
                                checked={allChecked}
                                onChange={(e) => onSelectAll(e.target.checked)}
                            />
                        </div>
                    )}
                    <div className="number">번호</div>

                    {hasCheckbox && (
                        <div className="delete">
                            <DeleteHeaderButton onClick={onDeleteSelected}>
                                삭제
                            </DeleteHeaderButton>
                        </div>
                    )}

                    <div className="title">공지사항 제목</div>
                    <div className="author">작성자</div>
                    <div className="date">작성일자</div>
                </NoticeHeader>
            )}

            <NoticeContainer>
                {notices.map((notice) => (
                    <NoticeItem key={notice.id} hasCheckbox={hasCheckbox}>
                        {hasCheckbox && (
                            <div className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(notice.id)}
                                    onChange={(e) => onSelect(notice.id, e.target.checked)}
                                />
                            </div>
                        )}
                        <div className="number">{notice.id}</div>
                        {hasCheckbox && <div className="delete" />}
                        <div
                            className="title"
                            onClick={() => navigate(`/announcement/${notice.id}`)}
                        >
                            {notice.title}
                        </div>
                        <div className="author">{notice.author}</div>
                        <div className="date">
                            {new Date(notice.createdAt).toISOString().split("T")[0]}
                        </div>
                    </NoticeItem>
                ))}
            </NoticeContainer>
        </NoticeWrapper>
    );
};

export default NoticeList;

/* ======= styled-components ======= */
const NoticeWrapper = styled.div`
    width: 100%;
    /* 부모(Container)에서 이미 max-width: 1200px; 설정했으므로 여기선 제거 */
`;

const NoticeHeader = styled.div<{ hasCheckbox: boolean }>`
    display: grid;
    grid-template-columns: ${({ hasCheckbox }) =>
            hasCheckbox
                    ? "50px 80px 80px 1fr 120px 120px"
                    : "80px 1fr 120px 120px"};
    align-items: center;
    padding: 1rem;
    background-color: ${theme.colors.gray100};
    font-weight: bold;
    border: 1px solid ${theme.colors.gray300};
    border-radius: 8px;
    color: ${theme.colors.gray1600};
    box-sizing: border-box;

    & > div {
        text-align: center;
    }

    & > div.title {
        text-align: left;
        padding-left: 20px;
    }
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
    width: 100%;
`;

const NoticeItem = styled.div<{ hasCheckbox: boolean }>`
    display: grid;
    grid-template-columns: ${({ hasCheckbox }) =>
            hasCheckbox
                    ? "50px 80px 80px 1fr 120px 120px"
                    : "80px 1fr 120px 120px"};
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.gray200};
    box-sizing: border-box;

    & > div {
        text-align: center;
    }

    & > div.number {
        font-weight: bold;
        color: ${theme.colors.gray500};
    }

    & > div.title {
        text-align: left;
        padding-left: 20px;
        font-size: ${({ theme }) => theme.typography.titleM.fontSize};
        font-weight: ${({ theme }) => theme.typography.titleM.fontWeight};
        color: ${({ theme }) => theme.colors.gray1600};
        cursor: pointer;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & > div.author {
        color: ${theme.colors.gray600};
    }

    & > div.date {
        color: ${theme.colors.gray900};
        font-size: 0.9rem;
    }
`;
