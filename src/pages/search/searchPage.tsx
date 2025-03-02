import React from "react";
import styled from "styled-components";
import SearchComponent from "@components/Search/SearchComponent.tsx";
import ListComponent from "@components/Search/ListComponent.tsx";

const SearchPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>지급 결의서 조회</Title>
      <SearchComponent />
      <ListComponent/>
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
