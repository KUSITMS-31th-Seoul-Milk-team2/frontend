import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import mypageIcon from "@assets/icons/mypage.svg";
import userSettingIcon from "@assets/icons/makeUser.svg";
import logoutIcon from "@assets/icons/logout.svg";

interface AdminLayoutProps {
  name: string;
  employeeId: string;
  onClose: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ name, employeeId, onClose }) => {
  const navigate = useNavigate();

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <RoleTitle>관리자 계정</RoleTitle>
        <UserName>
          {name} <EmployeeId>{employeeId}</EmployeeId>
        </UserName>
        <Menu>
          <MenuItem onClick={() => navigate("/mypage")}>
            <Icon src={mypageIcon} alt="마이 페이지" />
            마이 페이지
          </MenuItem>
          <MenuItem onClick={() => navigate("/user-settings")}>
            <Icon src={userSettingIcon} alt="사용자 권한 설정" />
            사용자 권한 설정
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("userInfo");
              navigate("/login");
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

export default AdminLayout;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

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
  color: #009857;
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
