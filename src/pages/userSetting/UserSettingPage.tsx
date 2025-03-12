import React from "react";
import styled from "styled-components";
import UserSearch from "@components/userSetting/userSearch";
import UserList from "@components/userSetting/userList";

const UserSettingPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>사용자 권한 관리</Title>
      <UserSearch />
      <UserList/>
    </PageContainer>
  );
};

export default UserSettingPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
