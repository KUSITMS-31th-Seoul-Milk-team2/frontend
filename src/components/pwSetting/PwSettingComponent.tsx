import React, { useState } from "react";
import styled from "styled-components";

const PwSettingComponent: React.FC = () => {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [focusField, setFocusField] = useState<string | null>(null);

  return (
    <Container>
      <FormBox>
        <InputContainer>
          <FloatingLabel className={focusField === "currentPw" || currentPw ? "active" : ""}>
            현재 비밀번호를 입력하세요
          </FloatingLabel>
          <Input
            type="password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            onFocus={() => setFocusField("currentPw")}
            onBlur={() => setFocusField(null)}
            required
          />
          <ConfirmButton>확인</ConfirmButton>
        </InputContainer>
        <InputContainer>
          <FloatingLabel className={focusField === "newPw" || newPw ? "active" : ""}>
            새 비밀번호를 입력하세요
          </FloatingLabel>
          <Input
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            onFocus={() => setFocusField("newPw")}
            onBlur={() => setFocusField(null)}
            required
          />
        </InputContainer>

        <InputContainer>
          <FloatingLabel className={focusField === "confirmPw" || confirmPw ? "active" : ""}>
            비밀번호를 다시 입력하세요
          </FloatingLabel>
          <Input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            onFocus={() => setFocusField("confirmPw")}
            onBlur={() => setFocusField(null)}
            required
          />
        </InputContainer>

        <SubmitButton>변경하기</SubmitButton>
      </FormBox>
    </Container>
  );
};

export default PwSettingComponent;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const FormBox = styled.div`
  display: flex;
  padding: 36px 28px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 16px;
  border: 1px solid var(--gray-400, #D6D6D5);
  width : 500px;
  height : 400px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width : 100% 
`;

const FloatingLabel = styled.span`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: var(--gray-600, #A6A5A5);
  transition: all 0.2s ease-in-out;
  pointer-events: none;

  &.active {
    top: 10px;
    font-size: 12px;
    color: var(--gray-500, #C0C0C0);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  padding-left: 12px;
  border: 1px solid var(--gray-400, #d1d1d1);
  border-radius: 6px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #009857;
  }
`;

const ConfirmButton = styled.button`
  display: flex;
  width: 68px;
  padding: 10px 9px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: var(--gray-200, #F1F1F1);
  border : none;
  color: var(--gray-1200, #5F5F5F);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: normal;
  cursor: pointer;
  margin-left: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #009857;
  color: white;
  padding: 14px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    background: #007a48;
  }
`;
