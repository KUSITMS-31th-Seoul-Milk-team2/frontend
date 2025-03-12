import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import mypageIcon from "@assets/icons/mypage.svg";
import logoutIcon from "@assets/icons/logout.svg";

interface EmployeeLayoutProps {
  name: string;
  employeeId: string;
  onClose: () => void;
}

const EmployeeLayout: React.FC<EmployeeLayoutProps> = ({ name, employeeId, onClose }) => {
  const navigate = useNavigate();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
      <UserInfo>
        <RoleTitle>사원 계정</RoleTitle>
        <UserName>
          {name} <EmployeeId>{employeeId}</EmployeeId>
        </UserName>
        </UserInfo>
        <Menu>
          <MenuItem onClick={() => navigate("/mypage")}>
            <Icon src={mypageIcon} alt="마이 페이지" />
            마이 페이지
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            <Icon src={logoutIcon} alt="로그아웃" />
            로그아웃
          </MenuItem>
        </Menu>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EmployeeLayout;

const ModalOverlay = styled.div`
  position: absolute;
  top: 11%;
  right: 9%;
  padding: 8px;
  z-index: 10;
  min-width: 200px;
  margin-top : 10px;
  z-index: 1001;
`

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  text-align: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const RoleTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #2a7e4d;
  margin-bottom: 8px;
`;

const UserName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const EmployeeId = styled.span`
  font-size: 16px;
  color: gray;
  margin-left: 5px;
`;

const Menu = styled.div`
  margin-top: 10px;
  text-align: left;
`;

const MenuItem = styled.div`
  padding: 12px;
  border-radius: 8px;
  background: #f8f8f8;
  margin-bottom: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    background: #e0e0e0;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
const UserInfo = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: flex-start;
 gap: 8px;
`;