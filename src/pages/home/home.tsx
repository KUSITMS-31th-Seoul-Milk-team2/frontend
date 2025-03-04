import styled from "styled-components";
import Card from "@components/home/Card.tsx";
import { transparentize } from "polished";
import {theme} from "@styles/theme.ts";
import NoticeList from "@components/home/NoticeList.tsx";

const HomePage = () => {
  return (
      <Container>
         <AccessContainer>
             <Title>{"바로 가기"}</Title>
             <Card title={"세금 계산서 업로드"} buttonText={"업로드 하기"} imageSrc={"/green_image.png"} color={theme.colors.main200} bgColor={transparentize(0.9, theme.colors.main100)}/>
             <Card title={"지급결의서 조회"} buttonText={"조회하러 가기"} imageSrc={"/red_image.png"} color={theme.colors.sub100} bgColor={transparentize(0.9, theme.colors.sub100)}/>
         </AccessContainer>
          <NoticeContainer>
             <TopContainer> <Title>{"공지 사항"}</Title> <ShowAllNotices>{"전체보기"}</ShowAllNotices>
                 </TopContainer>
              <NoticeList/>
          </NoticeContainer>
      </Container>
  );
};

export default HomePage;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction:row;
    width: 50%;
`
const AccessContainer = styled.div`
`
const NoticeContainer = styled.div`
`
const TopContainer = styled.div`
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    width: 100%; 
    white-space: nowrap;
`;

const Title = styled.h1`
    flex-grow: 1; 
    white-space: nowrap;
    margin-left: 1rem;
    font-size: ${({ theme }) => theme.typography.headlineM.fontSize};
    font-weight: ${({ theme }) => theme.typography.headlineM.fontWeight};
    line-height: ${({ theme }) => theme.typography.headlineM.lineHeight};
`;

const ShowAllNotices = styled.h3`
    cursor: pointer;
    margin-right: 1rem;
    font-size: ${({ theme }) => theme.typography.bodyM.fontSize};
    font-weight: ${({ theme }) => theme.typography.bodyM.fontWeight};
    line-height: ${({ theme }) => theme.typography.bodyM.lineHeight};
    color: ${({theme})=>theme.colors.gray1100};
`
