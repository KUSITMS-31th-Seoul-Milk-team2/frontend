import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import token from "@utils/token";

interface TaxInfo {
  approvalNo: string; 
  contractorRegNumber: string;
  reportingDate: string; 
  supplierRegNumber: string; 
  supplyValue: string; 
}

const TaxInfoComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [taxInfo, setTaxInfo] = useState<TaxInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchTaxInfo(id);
    }
  }, [id]);

  const fetchTaxInfo = async (id: string) => {
    try {
      const response = await token.get(`/v1/receipt/valid/search-one?id=${id}`);
      setTaxInfo(response.data.data);
      console.log(" 세금계산서 정보:", response.data.data);
    } catch (error) {
      console.error("세금계산서 정보를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>세금계산서 정보를 불러오는 중...</p>;

  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr.length !== 8) return "0000.00.00";
    return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
  };

  return (
    <Container>
      <Title>세금계산서 진위여부</Title>
      <InfoBox>
        <InfoRow>
          <Label>승인번호</Label>
          <Value>{taxInfo?.approvalNo || "000-00-0000"}</Value>
        </InfoRow>
        <InfoRow>
          <Label>매출매입 구분</Label>
          <Value>{taxInfo?.supplyValue || "0000000"}</Value> 
        </InfoRow>
        <InfoRow>
          <Label>전자세금계산서 작성일자</Label>
          <Value>{formatDate(taxInfo?.reportingDate)}</Value>
        </InfoRow>
        <InfoRow>
          <Label>공급자 사업자 등록번호</Label>
          <Value>{taxInfo?.supplierRegNumber || "000-00-0000"}</Value>
        </InfoRow>
        <InfoRow>
          <Label>공급받는자 사업자 등록번호</Label>
          <Value>{taxInfo?.contractorRegNumber || "000-00-0000"}</Value>
        </InfoRow>
      </InfoBox>
    </Container>
  );
};

export default TaxInfoComponent;

const Container = styled.div`
  max-width: 400px;
  margin: 20px auto;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #555;
`;

const Value = styled.span`
  font-size: 14px;
  color: #777;
`;
