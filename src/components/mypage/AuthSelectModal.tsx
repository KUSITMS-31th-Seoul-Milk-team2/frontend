import React, { useState } from "react";
import styled from "styled-components";
import token from "@utils/token";
import Kakao from "@assets/icons/kakao.png";
import Payco from "@assets/icons/payco.png";
import Samsung from "@assets/icons/samsungpass.png";
import Kb from "@assets/icons/kb.png";
import Pass from "@assets/icons/pass.png";
import Naver from "@assets/icons/naver.png";
import Shinhan from "@assets/icons/sinhan.png";
import Toss from "@assets/icons/toss.png";
import BankSalad from "@assets/icons/banksalad.png";

interface AuthSelectModalProps {
  onClose: () => void;
}

const AUTH_METHODS = [
  { name: "카카오톡", value: "1", icon: Kakao },
  { name: "페이코", value: "2", icon: Payco },
  { name: "삼성패스", value: "3", icon: Samsung },
  { name: "KB 모바일", value: "4", icon: Kb },
  { name: "통신사 패스", value: "5", icon: Pass },
  { name: "네이버", value: "6", icon: Naver },
  { name: "신한 인증서", value: "7", icon: Shinhan },
  { name: "토스", value: "8", icon: Toss },
  { name: "뱅크샐러드", value: "9", icon: BankSalad },
];

const AuthSelectModal: React.FC<AuthSelectModalProps> = ({ onClose }) => {
  const [selectedAuth, setSelectedAuth] = useState<string | null>(null);

  const handleAuthSelect = (authMethod: string) => {
    setSelectedAuth(authMethod);
  };

  const handleConfirmSelection = async () => {
    if (!selectedAuth) return;

    try {
      const response = await token.put("/v1/emp/hometax", {
        homeTaxNum: selectedAuth, 
      });

      if (response.status === 200) {
        alert("간편 인증 방법이 저장되었습니다.");
        onClose();
      }
    } catch (error) {
      alert("인증 방법 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>간편인증</Title>
        <AuthGrid>
          {AUTH_METHODS.map((auth) => (
            <AuthItem
              key={auth.value}
              onClick={() => handleAuthSelect(auth.value)}
              isSelected={selectedAuth === auth.value}
            >
              <AuthIcon src={auth.icon} alt={auth.name} />
              <AuthLabel>{auth.name}</AuthLabel>
            </AuthItem>
          ))}
        </AuthGrid>
        <ActionButton onClick={selectedAuth ? handleConfirmSelection : onClose}>
          {selectedAuth ? "선택하기" : "취소"}
        </ActionButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthSelectModal;

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
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  width: 320px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const AuthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
`;

const AuthItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  background: ${({ isSelected }) => (isSelected ? "#e6f7e6" : "transparent")};
  border: ${({ isSelected }) => (isSelected ? "2px solid #009857" : "none")};
`;

const AuthIcon = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
`;

const AuthLabel = styled.p`
  margin-top: 6px;
  font-size: 14px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #009857;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  margin-top: 16px;
  cursor: pointer;

  &:hover {
    background: #007a48;
  }
`;
