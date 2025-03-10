import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@styles/theme.ts";
import NoticeList from "@components/announcement/NoticeList.tsx";
import useNoticeStore from "@store/noticeStore";
import { useEffect, useState } from "react";
import axios from "axios";

interface NoticeDetail {
    id: number;
    title: string;
    author: string;
    content: string;
    fileUrl?: string;
    createdAt: string;
}

const AnnouncementDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { notices } = useNoticeStore();
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const TOKEN = import.meta.env.VITE_TOKEN;
    const [noticeDetail, setNoticeDetail] = useState<NoticeDetail | null>(null);

    useEffect(() => {
        if (id) {
            axios
                .get(`${BaseUrl}/v1/notice`, {
                    headers: {
                        Authorization:
                            `Bearer ${TOKEN}`,
                    },
                    params: { id: id },
                })
                .then((res) => {
                    if (res.status === 200 && res.data.success) {
                        setNoticeDetail(res.data.data);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [id, BaseUrl]);

    // 공지사항 배열에서 현재 id에 해당하는 인덱스 찾기
    const currentIndex = notices.findIndex(
        (notice) => notice.id === Number(id)
    );
    const prevNotice = currentIndex > 0 ? notices[currentIndex - 1] : null;
    const nextNotice =
        currentIndex >= 0 && currentIndex < notices.length - 1
            ? notices[currentIndex + 1]
            : null;
    const getFileName = (url: string) => {
        return url.split("/").pop() || "첨부파일.pdf";
    };
    if (!noticeDetail) return <div>Loading...</div>;

    return (
        <DetailContainer>
            <PageTitle>공지사항</PageTitle>
            <ContentContainer>
                <AnnouncementTitle>{noticeDetail.title}</AnnouncementTitle>
                <DetailHeader>
                    <Author>{noticeDetail.author}</Author>
                    <DetailDate>
                        {new Date(noticeDetail.createdAt).toLocaleDateString()}
                    </DetailDate>
                </DetailHeader>
                <Content>{noticeDetail.content}</Content>
                {noticeDetail.fileUrl && (
                    <AttachmentContainer>
                        <FileInfo>
                            <FileIcon src="/icons/fileIcon.svg" alt="file icon" />
                            <FileName>{getFileName(noticeDetail.fileUrl)}</FileName>
                        </FileInfo>
                        {/* 방법 A) a 태그 + download 속성 */}
                        <DownloadLink href={noticeDetail.fileUrl} download>
                            <DownloadIcon src="/icons/download.svg" alt="download icon" />
                        </DownloadLink>


                    </AttachmentContainer>
                )}
            </ContentContainer>

            <ControlButtonContainer>
                <PrevButton
                    onClick={() =>
                        prevNotice && navigate(`/announcement/${prevNotice.id}`)
                    }
                    disabled={!prevNotice}
                >
                    이전
                </PrevButton>
                <NextButton
                    onClick={() =>
                        nextNotice && navigate(`/announcement/${nextNotice.id}`)
                    }
                    disabled={!nextNotice}
                >
                    다음
                </NextButton>
            </ControlButtonContainer>

            <NoticeListHeader>
                <NoticeListHeaderTitle>공지사항 목록</NoticeListHeaderTitle>
                <ViewAllButton onClick={() => navigate("/announcement")}>
                    전체보기
                </ViewAllButton>
            </NoticeListHeader>

            <NoticeList notices={notices} showHeader={false} />
        </DetailContainer>
    );
};

export default AnnouncementDetailPage;

/* ===== Styled-Components ===== */
const DetailContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
`;

const PageTitle = styled.h1`
    font-size: 1.75rem;
    font-weight: 600;
    color: ${theme.colors.gray1600};
    margin-left: 2rem;
`;

const ContentContainer = styled.div`
    padding: 1rem 2rem 0 2rem;
`;

const AnnouncementTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.gray1600};
    margin-bottom: 1rem;
`;

const DetailHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${theme.colors.gray300};
    padding-bottom: 0.75rem;
`;

const Author = styled.h3`
    font-size: 1rem;
    font-weight: 500;
    color: ${theme.colors.gray1200};
    margin: 0;
`;

const DetailDate = styled.h3`
    font-size: 1rem;
    font-weight: 400;
    color: ${theme.colors.gray800};
    margin: 0;
`;

const Content = styled.div`
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    line-height: 1.5;
    color: ${theme.colors.gray900};
    background-color: ${theme.colors.gray100};
    padding: 1rem;
    white-space: pre-line;
`;

const ControlButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 2rem;
    margin-right: 2rem;
`;

const PrevButton = styled.button`
    background-color: ${theme.colors.gray200};
    color: ${theme.colors.gray1600};
    border: 1px solid ${theme.colors.gray300};
    padding: 0.75rem 3rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    &:hover:enabled {
        opacity: 0.8;
    }
`;

const NextButton = styled.button`
    background-color: ${theme.colors.main200};
    color: #fff;
    border: 1px solid ${theme.colors.main200};
    padding: 0.75rem 3rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    &:hover:enabled {
        opacity: 0.8;
    }
`;

/* 공지사항 목록 섹션 헤더 */
const NoticeListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${theme.colors.gray300};
    padding: 0.5rem 2rem 0.75rem 2rem;
`;

const NoticeListHeaderTitle = styled.h2`
    font-size: 1.25rem;
    color: ${theme.colors.gray1600};
    margin: 0;
`;

const ViewAllButton = styled.button`
    background: none;
    border: none;
    color: ${theme.colors.gray600};
    cursor: pointer;
    font-size: 0.95rem;
    &:hover {
        opacity: 0.8;
    }
`;
/* 첨부파일 영역 */
const AttachmentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${theme.colors.gray300};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  background: #fff;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FileIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const FileName = styled.span`
  font-size: 0.95rem;
  color: ${theme.colors.gray1600};
`;

/* a 태그를 이용한 다운로드 링크 */
const DownloadLink = styled.a`
  display: flex;
  align-items: center;
`;
const DownloadIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
