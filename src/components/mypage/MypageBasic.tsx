import React, { useEffect, useState } from "react";
import styled from "styled-components";
import userImage from "@assets/icons/userImgae.svg";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  name: string;
  employeeId: string;
  email: string;
  phoneNumber: string;
  role: string; 
  birthday:string;
}

const MypageBasic: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return (
    <Container>
      <ProfileBox>
        <ProfileImage src={userImage}/>
        <ProfileInfo>
          <EmployeeType>
            {userInfo?.role === "ADMIN" ? "관리자" : "사원"}
          </EmployeeType>
          <UserName>{userInfo?.name || "사용자"}님 안녕하세요.</UserName>
        </ProfileInfo>
        <ChangePasswordButton onClick={() =>navigate("/mypage/pw-setting")}>비밀번호 변경</ChangePasswordButton>
      </ProfileBox>

      <InfoContainer>
        <InfoRow>
          <InfoLabel>사번</InfoLabel>
          <InfoValue>{userInfo?.employeeId || "-"}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>생년월일</InfoLabel>
          <InfoValue>{userInfo?.birthday || "-"}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>전화번호</InfoLabel>
          <InfoValue>{userInfo?.phoneNumber || "000-0000-0000"}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>이메일</InfoLabel>
          <InfoValue>{userInfo?.email || "-"}</InfoValue>
        </InfoRow>
      </InfoContainer>
    </Container>
  );
};

export default MypageBasic;


const Container = styled.div`
  width: 100%;
  max-width: 1044px;
  margin: 0 auto;
`;

const ProfileBox = styled.div`
  display: flex;
  height : 80px;
padding: 40px 20px;
flex-direction: row;
align-items: flex-start;
gap: 10px;
align-self: stretch;
border-radius: 12px 12px 0px 0px;
background: #F8F9FA;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #d9d9d9;
  margin-right: 15px;
`;

const ProfileInfo = styled.div`
  flex-grow: 1;
`;

const EmployeeType = styled.div`
  color: var(--gray-600, #A6A5A5);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-top : 8px;
`;

const UserName = styled.div`
  color: #000;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const ChangePasswordButton = styled.button`
  display: flex;
height: 45px;
padding: 12px 20px;
justify-content: center;
align-items: center;
gap: 4px;
border-radius: 8px;
background: var(--gray-250, #ECECEC);
border: 1px solid var(--gray-300, #E5E5E4);
color: #616161;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 150%; /* 24px */
`;

const InfoContainer = styled.div`
  display: flex;
  margin-top: 20px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  flex-direction: row;
  border-radius: 0px 0px 10px 10px;
border: 1px solid var(--gray-300, #E5E5E4);
background: var(--white, #FFF);
padding: 42px 38px;
margin-top : 0px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap : 10px;
`;

const InfoLabel = styled.div`
  color: var(--gray-1600, #393C3C);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const InfoValue = styled.div`
  color: var(--gray-1000, #6A6A6A);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
  width: 180px;
`;
