import React from "react";
import PwSettingComponent from "@components/pwSetting/PwSettingComponent";
import styled from "styled-components";

const PwSettingPage: React.FC = () => {
  return (
    <PageContainer>
    <Title>비밀번호 변경</Title>
  <PwSettingComponent />
  </PageContainer>);
};
export default PwSettingPage;

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
  width : 500px;
`;

