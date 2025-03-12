import React from "react";
import styled from "styled-components";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Message>선택한 계정을 삭제하시겠습니까?</Message>
        <SubMessage>삭제 후에는 되돌릴 수 없습니다.</SubMessage>
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <DeleteButton onClick={onConfirm}>삭제</DeleteButton>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default DeleteModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Message = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #393c3c;
`;

const SubMessage = styled.p`
  font-size: 14px;
  color: #888;
  margin-top: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background: #f0f0f0;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  background: #008000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #393c3c;
  }
`;
