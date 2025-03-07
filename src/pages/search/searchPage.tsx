import React from "react";
import styled from "styled-components";
import SearchComponent from "@components/Search/SearchComponent.tsx";
import AdminListComponent from "@components/Search/AdminListComponent";
import EmployeeListComponent from "@components/Search/EmployeeListComponent";

const SearchPage: React.FC = () => {
  const role = localStorage.getItem("role"); 
  return (
    <PageContainer>
      <Title>지급 결의서 조회</Title>
      <SearchComponent />
      {role === "ADMIN" ? <AdminListComponent /> : <EmployeeListComponent />}
    </PageContainer>
  );
};

export default SearchPage;

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
`;
