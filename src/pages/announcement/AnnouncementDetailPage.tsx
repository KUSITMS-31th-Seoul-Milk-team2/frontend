import styled from "styled-components";
import { theme } from "@styles/theme.ts";
import NoticeList from "@components/announcement/NoticeList.tsx";

interface Notice {
    id: number;
    title: string;
    author: string;
    date: string;
}

const AnnouncementDetailPage = () => {
    // 예시 데이터 (API에서 받아온다고 가정)
    const notices: Notice[] = [
        { id: 28, title: "공지사항 제목입니다.", author: "김범연", date: "2025.01.20" },
        { id: 27, title: "두 번째 공지사항입니다.", author: "김범연", date: "2025.01.18" },
        { id: 26, title: "세 번째 공지사항입니다.", author: "김범연", date: "2025.01.10" },
        { id: 25, title: "네 번째 공지사항입니다.", author: "김범연", date: "2025.01.05" },
    ];

    return (
        <DetailContainer>
            <PageTitle>공지사항</PageTitle>
            <ContentContainer>
                <AnnouncementTitle>[중요] 세금계산서 제출 기한 및 유의사항 안내</AnnouncementTitle>

                <DetailHeader>
                    <Author>박범진</Author>
                    <DetailDate>2025.02.13</DetailDate>
                </DetailHeader>

                <Content>
                    안녕하세요. 세금계산서 제출을 안내드립니다.
                    <br />
                    <br />
                    세금계산서 발행 시 유의사항을 꼭 확인해주세요. <br />
                    발행 기한: YYYY.MM.DD까지<br />
                    제출 방법: [내용 작성] <br />
                    <br />
                    자세한 내용은 아래 첨부파일 혹은 홈페이지 공지사항을 참고해주시기 바랍니다.
                    <br />
                    <br />
                    문의: tax@seoulmilk.co.kr
                </Content>
            </ContentContainer>

            <ControlButtonContainer>
                <PrevButton>이전</PrevButton>
                <NextButton>다음</NextButton>
            </ControlButtonContainer>

            <NoticeListHeader>
                <NoticeListHeaderTitle>공지사항 목록</NoticeListHeaderTitle>
                <ViewAllButton>전체보기</ViewAllButton>
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

  &:hover {
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

  &:hover {
    opacity: 0.8;
  }
`;

/* 추가: 공지사항 목록 섹션 헤더 */
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
