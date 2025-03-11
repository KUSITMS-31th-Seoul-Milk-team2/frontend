import React, { useState } from "react";
import styled from "styled-components";
import token from "@utils/token";

const PwSettingComponent: React.FC = () => {
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [focusField, setFocusField] = useState<string | null>(null);
  const [isPwCorrect, setIsPwCorrect] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  const [isPwMismatch, setIsPwMismatch] = useState(false);
  console.log(message);

  const handleCheckPassword = async () => {
    try {
      const response = await token.post("/v1/emp/check-password-correct", {
        password: currentPw,
      });

      if (response.status === 200) {
        setIsPwCorrect(true);
        setMessage("현재 비밀번호가 일치합니다.");
      }
    } catch (error) {
      setIsPwCorrect(false);
      setMessage("현재 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleChangePassword = async () => {
    if (!isPwCorrect) {
      setMessage("현재 비밀번호를 먼저 확인해주세요.");
      return;
    }

    if (newPw.length < 8) {
      setMessage("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (newPw !== confirmPw) {
      setMessage("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await token.put("/v1/emp/password", {
        oldPassword: currentPw,
        newPassword: newPw,
      });

      if (response.status === 200) {
        setMessage("비밀번호가 성공적으로 변경되었습니다.");
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
        setIsPwCorrect(null);
        alert("비밀번호가 성공적으로 변경되었습니다.");
      }
    } catch (error) {
      setMessage("비밀번호 변경에 실패했습니다.");
    }
  };

  const handleConfirmPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPw(value);
    setIsPwMismatch(newPw !== value);
  };

  return (
    <Container>
      <FormBox>
        <Label>현재 비밀번호</Label>
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
          <ConfirmButton onClick={handleCheckPassword}>확인</ConfirmButton>
        </InputContainer>

        {isPwCorrect === false && <ErrorMessage>현재 비밀번호가 일치하지 않습니다.</ErrorMessage>}
        {isPwCorrect === true && <SuccessMessage>현재 비밀번호가 일치합니다.</SuccessMessage>}

        <Label>새 비밀번호</Label>
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

        {newPw.length > 0 && newPw.length < 8 && (
          <ErrorMessage>비밀번호는 8자 이상이어야 합니다.</ErrorMessage>
        )}

        <Label>새 비밀번호 확인</Label>
        <InputContainer>
          <FloatingLabel className={focusField === "confirmPw" || confirmPw ? "active" : ""}>
            비밀번호를 다시 입력하세요
          </FloatingLabel>
          <Input
            type="password"
            value={confirmPw}
            onChange={handleConfirmPwChange}
            onFocus={() => setFocusField("confirmPw")}
            onBlur={() => setFocusField(null)}
            required
          />
        </InputContainer>

        {isPwMismatch && (
          <ErrorMessage>비밀번호가 일치하지 않습니다. 다시 입력해주세요.</ErrorMessage>
        )}

        <SubmitButton
          onClick={handleChangePassword}
          disabled={isPwMismatch || newPw.length < 8}
        >
          변경하기
        </SubmitButton>
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
  width: 500px;
  height: 460px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
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
  width: 68px;
  padding: 10px 9px;
  border-radius: 4px;
  background: var(--gray-200, #F1F1F1);
  border: none;
  color: var(--gray-1200, #5F5F5F);
  font-weight: 700;
  cursor: pointer;
  margin-left: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#009857")};
  color: white;
  padding: 14px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  margin-top: 20px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#007a48")};
  }
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 700;
  width: 100%;
`;
const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
  margin-top: 5px;
`;

const SuccessMessage = styled.div`
  color: var(--primary-main-200, #009857);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;
