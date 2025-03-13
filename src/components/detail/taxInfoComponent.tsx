import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import token from "@utils/token";
import FilePreview from "@components/common/FilePreview";
import DetailForm from "@components/common/DetailForm";

interface TaxInfo {
  approvalNo: string;
  contractorRegNumber: string;
  reportingDate: string;
  supplierRegNumber: string;
  supplyValue: string;
  fileUrl?: string;
}

const TaxInfoComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [taxInfo, setTaxInfo] = useState<TaxInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const [formValues, setFormValues] = useState({
    totalSupplyAmount: "",
    totalTaxAmount: "",
    totalAmount: "",
    creationDate: "",
    creationTime: "",
  });

  useEffect(() => {
    if (id) {
      fetchTaxInfo(id);
    }
  }, [id]);

  const fetchTaxInfo = async (id: string) => {
    try {
      const response = await token.get(`/v1/receipt/valid/search-one?id=${id}`);
      const data = response.data.data;
      setTaxInfo(data);

      setFormValues({
        totalSupplyAmount: data.chargeTotal || "",
        totalTaxAmount: data.taxTotal || "",
        totalAmount: data.grandTotal || "",
        creationDate: data.erdat || "",
        creationTime: data.erzet || "",
      });

      console.log("세금계산서 정보:", data);
    } catch (error) {
      console.error("세금계산서 정보를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof typeof formValues,
    value: string
  ) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleClearInput = (field: keyof typeof formValues) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: "",
    }));
  };

  const handleUpdate = async () => {
    try {
      const updateData = {
        id,
        chargeTotal: formValues.totalSupplyAmount,
        taxTotal: formValues.totalTaxAmount,
        grandTotal: formValues.totalAmount,
        erdat: formValues.creationDate,
        erzet: formValues.creationTime,
      };

      await token.put("/v1/receipt/update", updateData);
      alert("세금계산서 정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("세금계산서 정보 수정 오류:", error);
      alert("세금계산서 정보 수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <p>세금계산서 정보를 불러오는 중...</p>;

  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr.length !== 8) return "0000.00.00";
    return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
  };

  return (
    <Component>
      {taxInfo?.fileUrl && <FilePreview fileUrl={taxInfo.fileUrl} />}
      <ContentWrapper>
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

        <DetailForm
          formValues={formValues}
          onInputChange={handleInputChange}
          onClearInput={handleClearInput}
        />
      </ContentWrapper>

      <ButtonWrapper>
        <UpdateButton onClick={handleUpdate}>수정</UpdateButton>
      </ButtonWrapper>
    </Component>
  );
};

export default TaxInfoComponent;

const Component = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width : 1040px;
`;

const Container = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  margin-left : 30px;
  margin-top : 17px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 58px 28px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottm : 36px;
`;

const Label = styled.span`
  color: var(--gray-600, #A6A5A5);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 150%;
`;

const Value = styled.span`
  color: var(--gray-800, #777);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 24px */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;
const UpdateButton = styled.button`
  background: #009857;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;
