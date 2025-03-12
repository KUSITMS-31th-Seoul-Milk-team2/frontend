import React, { useState } from "react";
import styled from "styled-components";
import close from "@assets/icons/cancel.svg";

interface UserCreateProps {
  onClose: () => void;
  onCreateSuccess: (name: string, employeeId: string) => void;
}

const UserCreate: React.FC<UserCreateProps> = ({ onClose, onCreateSuccess }) => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");

  const handleEmployeeIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
    setEmployeeId(value);
  };

  const handleSubmit = () => {
    if (!name || employeeId.length !== 8) {
      setError("이름이나 사번을 다시 확인해주세요.");
      return;
    }
    onCreateSuccess(name, employeeId);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <CloseLogo src={close} />
        </CloseButton>
        <Title>새 계정 생성하기</Title>
        <Label>이름</Label>
        <Input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>사번</Label>
        <Input
          type="text"
          placeholder="사번을 입력하세요"
          value={employeeId}
          onChange={handleEmployeeIdChange}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <CreateButton onClick={handleSubmit}>생성하기</CreateButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserCreate;

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
  display: inline-flex;
  padding: 40px 36px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 16px;
  background: #fff;
  width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  color: var(--gray-1600, #393c3c);
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

const Label = styled.label`
  color: var(--gray-1300, #545454);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  height: 25px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 380px;
  height: 28px;
  display: flex;
  padding: 10px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 2px solid var(--gray-600, #a6a5a5);
  background: var(--white, #fff);
`;

const ErrorText = styled.p`
  color: var(--Sub, #E60012);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
display: flex;
height: 25px;
flex-direction: column;
justify-content: center;
align-self: stretch;
`;

const CreateButton = styled.button`
  width: 100%;
  display: flex;
  height: 68px;
  padding: 10px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  border: none;
  background: var(--primary-main-200, #009857);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25);
  color: var(--white, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 80px;
`;

const CloseLogo = styled.img`
  fill: var(--gray-700, #898989);
`;
