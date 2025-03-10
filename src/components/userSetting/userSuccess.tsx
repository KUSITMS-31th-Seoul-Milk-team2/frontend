import React from "react";
import styled from "styled-components";
import token from "@utils/token";

interface UserSuccessProps {
  user: { name: string; employeeId: string };
  onClose: () => void;
}

const UserSuccess: React.FC<UserSuccessProps> = ({ user, onClose }) => {
  
  const handleGrantPrivilege = async () => {
    try {
      const response = await token.post("/v1/admin/grant-privilege", {
        name: user.name,
        employeeId: user.employeeId,
      });

      if (response.status === 200) {
        alert("권한이 성공적으로 부여되었습니다.");
        onClose(); 
      } else {
        alert("권한 부여에 실패했습니다.");
      }
    } catch (error) {
      console.error("권한 부여 오류:", error);
      alert("권한 부여 중 오류가 발생했습니다.");
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
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
        <ConfirmButton onClick={handleGrantPrivilege}>확인</ConfirmButton>
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
  z-index: 1020;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 350px;
  text-align: center;
  position: relative;
  onClick={(e) => e.stopPropagation()}
`;

const Title = styled.h2`
  color: var(--gray-1600, #393C3C);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 150%;
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
  font-weight: 400;
`;

const Value = styled.span`
  color: var(--primary-main-200, #009857);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
`;

const ConfirmButton = styled.button`
  width: 100%;
  height: 68px;
  padding: 19px 116px;
  justify-content: center;
  align-items: center;
  color: var(--gray-100, #F8F8F9);
  text-align: right;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 600;
  line-height: 150%;
  border: none;
  border-radius: 8px;
  background: var(--primary-main-200, #009857);
  cursor: pointer;
`;
