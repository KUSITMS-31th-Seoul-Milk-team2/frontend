import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import close from "@assets/icons/cancelIcon.svg";
import ToolTipBack from "@assets/icons/Tooltip.png";

const PwToolTip = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
       console.log(" userInfo 있음:", userInfo);
      const { createdAt } = JSON.parse(userInfo);
      if (createdAt) {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const diffTime = now.getTime() - createdDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log("diffDays : ",diffDays);

        if (diffDays <= 3) {
        console.log("✅ 툴팁 표시");
          setShowTooltip(true);
        }
      }
    }
  }, []);

  if (!showTooltip) return null;

  return (
    <TooltipContainer>
      <TooltipBox>
        <ToolTipBackGround src={ToolTipBack} />
        <TooltipContentWrapper>
          <TooltipHeader onClick={() => navigate("/mypage/pw-setting")}>
            <Title>비밀번호 변경하기</Title>
            <TooltipContent>아직 변경이 안됐어요!</TooltipContent>
          </TooltipHeader>
          <CloseButton onClick={() => setShowTooltip(false)}>
            <CloseLogo src={close} />
          </CloseButton>
        </TooltipContentWrapper>
      </TooltipBox>
    </TooltipContainer>
  );
};

export default PwToolTip;

const TooltipContainer = styled.div`
  position: absolute;
  top: 70px;
  left: 70%;
  transform: translateX(-50%);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000;
  background: transparent;
  pointer-events: auto; 
  width : 130px;
`;

const TooltipBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background : none;
`;

const ToolTipBackGround = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: -1;
`;

const TooltipContentWrapper = styled.div`
  background: none;
  padding: 22px 30px;
  border-radius: 8px;
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const CloseLogo = styled.img`
  width: 14px;
  height: 14px;
`;

const Title = styled.div`
  color: var(--Base-Gray-02, #373D3F);
  font-family: Barlow;
  font-size: 15px;
  font-weight: 600;
  line-height: 20px;
  margin-top : 10px;
`;

const TooltipContent = styled.p`
  color: var(--Base-Gray-02, #373D3F);
  font-family: Barlow;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  margin-top: 4px;
`;

const TooltipHeader = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  padding: 0;
`;