import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminSearchComponent from "@components/Search/AdminSearchComponent";
import EmployeeSearchComponent from "@components/Search/EmployeeSearchComponent";
interface UserInfo {
  name: string;
  role: string;
  employeeId: string;
}
const SearchPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
      const storedUser = localStorage.getItem("userInfo");
      if (storedUser) {
        setUserInfo(JSON.parse(storedUser));
      }
    }, []);
  console.log("User Role:", userInfo?.role);
  return (
    <PageContainer>
      <Title>세금 계산서 조회</Title>
      {userInfo?.role === "ADMIN" ? <AdminSearchComponent /> : <EmployeeSearchComponent />}
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
  width : 1044px;
`;
