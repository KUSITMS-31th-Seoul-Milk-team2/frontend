import React from "react";
import styled from "styled-components";

interface UserSuccessProps {
  user: { name: string; employeeId: string };
  onClose: () => void;
}

const UserSuccess: React.FC<UserSuccessProps> = ({ user, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Title>계정이 생성됐어요.</Title>
        <InfoBox>
          <InfoRow>
            <Label>이름</Label>
            <Value>{user.name}</Value>
          </InfoRow>
          <InfoRow>
            <Label>사번</Label>
            <Value>{user.employeeId}</Value>
          </InfoRow>
        </InfoBox>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserSuccess;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index : 1020;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 350px;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  color: var(--gray-1600, #393C3C);
text-align: center;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 150%; /* 36px */
  margin-bottom: 16px;
`;

const InfoBox = styled.div`
  background: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

const Label = styled.span`
  color: #000;
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const Value = styled.span`
  color: var(--primary-main-200, #009857);
text-align: center;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const ConfirmButton = styled.button`
  width: 100%;
  display: flex;
height: 68px;
padding: 19px 116px;
justify-content: center;
align-items: center;
gap: 10px;
align-self: stretch;
  color: var(--gray-100, #F8F8F9);
text-align: right;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 150%;
  border: none;
 border-radius: 8px;
background: var(--primary-main-200, #009857);
  cursor: pointer;
`;
