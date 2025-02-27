import React from "react";
import styled from "styled-components";
import SearchComponent from "../component/Search/SearchComponent";

const SearchPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>지급 결의서 조회</Title>
      <SearchComponent />
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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
`;
