import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import TaxInfoComponent from "@components/detail/taxInfoComponent";

const TaxDetail: React.FC = () => {
  const location = useLocation();
  const { suName, ipName, erdatEnd } = location.state || {};
  return (
    <Container>
      <Header>
        <Title>
          {suName} _ {ipName}
        </Title>
        <DateInfo>
          <Label>작성일자</Label>
          <Value>{erdatEnd || "0000.00.00"}</Value>
        </DateInfo>
      </Header>
      <TaxInfoComponent />
    </Container>
  );
};

export default TaxDetail;

const Container = styled.div`
  max-width: 1040px;
  margin: 20px auto;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  border : none;
`;

const Header = styled.div`
  width: 1040px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 12px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  color: #000;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const Label = styled.span`
  color: var(--gray-900, #717171);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-right: 8px;
`;

const Value = styled.span`
  color: var(--gray-900, #717171);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
