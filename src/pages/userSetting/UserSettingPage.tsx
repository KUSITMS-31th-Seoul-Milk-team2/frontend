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
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
`;
