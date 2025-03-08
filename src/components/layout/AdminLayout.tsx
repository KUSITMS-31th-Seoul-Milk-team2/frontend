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
        <UserInfo>
        <RoleTitle>관리자 계정</RoleTitle>
        <UserName>
         <Name>{name}</Name>님 <EmployeeId>{employeeId}</EmployeeId>
        </UserName>
        </UserInfo>
        <Menu>
          <MenuItem onClick={() => navigate("/mypage")}>
            <Icon src={mypageIcon} alt="마이 페이지" />
            마이 페이지
          </MenuItem>
          <MenuItem onClick={() => navigate("/user-setting")}>
            <Icon src={userSettingIcon} alt="사용자 권한 설정" />
            사용자 권한 설정
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("userInfo");
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

export default AdminLayout;

const ModalOverlay = styled.div`
    position: absolute;
  top: 11%;
  right: 10%;
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
  color: var(--primary-main-200, #009857);
font-family: Pretendard;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;
const UserInfo = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: flex-start;
 gap: 8px;
`;
const UserName = styled.div`
  color: var(--gray-1600, #393C3C);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
gap : 12px;
`;
const Name = styled.strong`
color: var(--gray-1600, #393C3C);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const EmployeeId = styled.span`
  color: var(--gray-800, #777);
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: normal;
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
