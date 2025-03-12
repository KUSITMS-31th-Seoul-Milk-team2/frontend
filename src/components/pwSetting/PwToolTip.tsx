import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import close from "@assets/icons/cancelIcon.svg";

const PwToolTip = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { createdAt } = JSON.parse(userInfo);
      if (createdAt) {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const diffTime = now.getTime() - createdDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        console.log(diffDays);

        if (diffDays <= 3) {
          setShowTooltip(true);
        }
      }
    }
  }, []);

  if (!showTooltip) return null;

  return (
    <TooltipContainer>
      <TooltipBox onClick={() => navigate("/mypage/pw-setting")}>
        <TooltipHeader>
          <Title>비밀번호 변경하기</Title>
          <TooltipContent>아직 변경이 안됐어요!</TooltipContent>
        </TooltipHeader>   
        <CloseButton onClick={() => setShowTooltip(false)}>
            <CloseLogo src={close}/>
          </CloseButton>
      </TooltipBox>
    </TooltipContainer>
  );
};

export default PwToolTip;

const TooltipContainer = styled.div`
  position: fixed;
  top: -36%;
  left: 77%;
  transform: translateX(-50%);
  background: none;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const Title = styled.div`
color: var(--Base-Gray-02, #373D3F);
font-family: Barlow;
font-size: 10px;
font-style: normal;
font-weight: 600;
line-height: 20px; 
margin-bottom : -10px;
margin-right : 10px;
`;

const TooltipBox = styled.button`
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  display: flex;
width: 136px;
padding: 6px 4px;
align-items: flex-start;
flex-shrink: 0;
border-color : #009857;
`;

const TooltipHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  text-align: left;
  margin-left : 10px;
  width : 140px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const TooltipContent = styled.p`
  color: var(--Base-Gray-02, #373D3F);
font-family: Barlow;
font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: 16px; 
`;
const CloseLogo = styled.img`
  display: flex;
height: 16px;
justify-content: center;
align-items: center;
gap: 10px;
flex: 1 0 0;
`;