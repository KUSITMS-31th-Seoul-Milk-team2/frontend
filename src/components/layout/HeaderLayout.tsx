import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import EmployeeLayout from "./EmployeeLayout";
import Dropdown from "@assets/icons/LayoutLogo.svg";

interface UserInfo {
  name: string;
  role: string;
  employeeId: string;
}

const HeaderLayout: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // 모달 감지용 ref

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <Container>
      <NotificationBar>
        <NotificationText>세금계산서 확인 및 지급결의서 웹사이트</NotificationText>
      </NotificationBar>
      <Header>
        <HeaderContent>
          <LogoContainer onClick={() => navigate("/home")}>
            <Logo src="/SeoulMilkLogo.png" alt="서울우유협동조합" />
          </LogoContainer>
          <Nav>
            {userInfo && (
              <UserInfo onClick={() => setIsModalOpen(true)}>
                {userInfo.name}님 ({userInfo.role === "ADMIN" ? "관리자" : "직원"})
                <UserLogo src={Dropdown} />
              </UserInfo>
            )}
          </Nav>
        </HeaderContent>
      </Header>
      <Main>
        <Outlet />
      </Main>

      {isModalOpen && userInfo && (
        <ModalContainer ref={modalRef}>
          {userInfo.role === "ADMIN" ? (
            <AdminLayout
              name={userInfo.name}
              employeeId={userInfo.employeeId}
              onClose={() => setIsModalOpen(false)}
            />
          ) : (
            <EmployeeLayout
              name={userInfo.name}
              employeeId={userInfo.employeeId}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </ModalContainer>
      )}
    </Container>
  );
};

export default HeaderLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1440px;
  overflow-x: hidden;
`;

const NotificationBar = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  background: var(--primary-main-200, #009857);
  height: 26px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 1000; 

  @media screen and (max-width: 1104px) {
    font-size: 10px;
  }
`;

const NotificationText = styled.div`
  width: 228px;
  color: var(--white, #FFF);
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
  margin-right: 840px;

  @media screen and (max-width: 1104px) {
    font-size: 10px;
  }
`;

const Header = styled.header`
  width: 100%;
  position: fixed;
  top: 26px;
  left: 0;
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  z-index: 999; 
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: 1440px;
  min-width: 1104px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;

  @media screen and (max-width: 1280px) {
    padding: 0 24px;
  }
  @media screen and (max-width: 1104px) {
    padding: 0 16px;
  }
`;

const UserLogo = styled.img`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

const LogoContainer = styled.button`
  width: 200px;
  height: 43.456px;
  margin-top: 10px;
  margin-left: 180px;
  border: none;
  background: none;
  cursor: pointer;

  @media screen and (max-width: 1280px) {
    margin-left: 100px;
  }

  @media screen and (max-width: 1104px) {
    margin-left: 40px;
  }
`;

const Logo = styled.img`
  height: 32px;
  margin-right: 8px;
`;

const Nav = styled.nav`
  display: flex;
  color: var(--gray-1600, #393C3C);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  gap: clamp(16px, 5vw, 44px);
  margin-right: 100px;

  @media screen and (max-width: 1280px) {
    margin-right: 60px;
  }

  @media screen and (max-width: 1104px) {
    margin-right: 30px;
  }
`;

const UserInfo = styled.span`
  display: flex;
  align-items: center; 
  cursor: pointer;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 1440px;
  min-width: 1104px;
  padding: 16px;
  display: flex;
  justify-content: center;
  margin-top: 110px;

  @media screen and (max-width: 768px) {
    margin-top: 90px;
    padding: 8px;
  }

  @media screen and (max-width: 480px) {
    margin-top: 70px;
    padding: 4px;
  }
`;

const ModalContainer = styled.div`
`;

