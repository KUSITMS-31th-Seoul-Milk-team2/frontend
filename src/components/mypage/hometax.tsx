import React from "react";
import styled from "styled-components";
import quikAuth from "@assets/icons/quickAuth.svg";
import DigitalCertifi from "@assets/icons/DigitalCertifi.svg"; 
import Info from "@assets/icons/infoBlack.svg";
import RightArrow from "@assets/icons/rightArrow.svg";
import Recent from "@assets/icons/recentLogin.png";

const HomeTax: React.FC = () => {
  return (
    <Container>
      <AuthBox>
        <Content>
        <AuthContent>
          <Icon src={quikAuth} alt="간편인증" />
          <TextContainer>
            <Title>간편인증</Title>
            <SubTitle>민간 전자서명 이용</SubTitle>
            <Description>
            <DescriptionLogo src={Info}/>
              카카오톡, 페이코, 삼성패스, KB 모바일, 통신사(PASS), 네이버, 신한 인증서, toss, 뱅크 샐러드
            </Description>
          </TextContainer>
        </AuthContent>
        <Arrow src={RightArrow}/>
        </Content>
        <RecentLoginTag src={Recent}/>
      </AuthBox>

      <AuthBox>
        <Content>
        <AuthContent>
          <Icon src={DigitalCertifi} alt="공동인증서" />
          <TextContainer>
            <Title>공동인증서</Title>
            <SubTitle>공공기관 발급 인증서</SubTitle>
            <Description>구 공인인증서</Description>
          </TextContainer>
        </AuthContent>
        <Arrow src={RightArrow}/>
        </Content>
      </AuthBox>
    </Container>
  );
};

export default HomeTax;


const Container = styled.div`
  display: flex;
  gap: 12px;
  margin-top : 20px;
`;

const AuthBox = styled.div`
  display: flex;
width: 450px;
height: 80px;
padding: 22px 40px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 8px;
border: 1px solid var(--gray-200, #F1F1F1);
background: #F8F8F9;
  &:hover {
    background: #ececec;
  }
`;

const AuthContent = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 30px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  width : 323px;
`;

const SubTitle = styled.div`
  font-size: 14px;
  color: #009857;
`;

const Description = styled.div`
  color: var(--gray-800, #777);
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;
  margin-top: 4px;
  max-width: 250px;
`;

const Arrow = styled.img`
  fwidth: 26px;
height: 26px;
aspect-ratio: 1/1;
`;

const RecentLoginTag = styled.img`
width: 80px;
position : absolute;
top : 90%;
left : 44%;

`;
const DescriptionLogo = styled.img`
width: 12px;
height: 12px;
aspect-ratio: 1/1;
`
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`