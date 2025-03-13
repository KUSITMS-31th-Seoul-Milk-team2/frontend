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
  z-index: 1010;
`;

const ModalContainer = styled.div`
  display: flex;
width: 634px;
padding : 40px 24px 20px 24px;
flex-direction: column;
justify-content: flex-end;
align-items: center;
border-radius: 16px;
background: #FFF;
box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.16);
`;

const Message = styled.p`
  fcolor: var(--gray-1600, #393C3C);
text-align: center;
font-family: Pretendard;
font-size: 28px;
font-style: normal;
font-weight: 600;
line-height: 150%; /* 42px */
`;

const SubMessage = styled.p`
  color: var(--gray-600, #A6A5A5);
text-align: center;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 150%; /* 36px */
margin-top : -20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap : 20px;
`;

const CancelButton = styled.button`
  display: flex;
height: 68px;
padding: 19px 121px;
justify-content: center;
align-items: center;
gap: 10px;
flex: 1 0 0;
color: var(--gray-1600, #393C3C);
text-align: right;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 150%; /* 36px */
border-radius: 16px;
background: var(--gray-200, #F1F1F1);
border : none;
`;

const DeleteButton = styled.button`
  display: flex;
height: 68px;
padding: 19px 116px;
justify-content: center;
align-items: center;
gap: 10px;
flex: 1 0 0;
color: var(--gray-100, #F8F8F9);
text-align: right;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 600;
line-height: 150%; /* 36px */
border-radius: 16px;
background: var(--primary-main-200, #009857);
border : none;
`;
