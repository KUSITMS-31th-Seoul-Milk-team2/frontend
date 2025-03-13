import { useNavigate } from "react-router-dom";
import Card from "@components/home/Card.tsx";
import NoticeList from "@components/home/NoticeList.tsx";
import { transparentize } from "polished";
import {theme} from "@styles/theme.ts";
import styled from "styled-components";

const HomePage = () => {
    const navigate = useNavigate();

    return (
      <Container>
         <AccessContainer>
             <Title>{"바로가기"}</Title>
            <CardContainer> <Card title={"세금계산서 업로드"} onButtonClick={() => navigate("/upload")}  buttonText={"업로드 하기"} imageSrc={"/green_image.png"} color={theme.colors.main200} bgColor={transparentize(0.9, theme.colors.main100)}/>
                <Card title={"세금계산서 조회"} onButtonClick={() => navigate("/search")}  buttonText={"조회하러 가기"} imageSrc={"/red_image.png"} color={theme.colors.sub100} bgColor={transparentize(0.9, theme.colors.sub100)}/></CardContainer>
         </AccessContainer>
          <NoticeContainer>
             <TopContainer> <Title>{"공지사항"}</Title> <ShowAllNotices onClick={() => navigate("/announcement")}>{"전체보기"}</ShowAllNotices>
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
    flex-direction:column;
    width: 75%;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
`
const AccessContainer = styled.div`
   margin: 0.5rem;
`
const NoticeContainer = styled.div`
    margin: 0.5rem;
`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
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
