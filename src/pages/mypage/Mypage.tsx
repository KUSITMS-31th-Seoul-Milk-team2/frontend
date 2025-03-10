import React from "react";
import styled from "styled-components";
import MypageBasic from "@components/mypage/MypageBasic";
const MyPage: React.FC = () => {
  return (
    <PageContainer>
    <Title>마이 페이지</Title>
      <MypageBasic/>
    </PageContainer>
  );
};

export default MyPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 16px;
`;

const Title = styled.h1`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 16px;
  text-align: left;  
  align-items: center;
  width : 1044px;
`;
