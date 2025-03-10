import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import info from "@assets/icons/info.svg";

const Login = () => {
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    console.log("로그인 에러 : ",error);
  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
  
      if (!employeeId || !password) {
        setError("아이디와 비밀번호를 입력하세요.");
        return;
      }
  
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employeeId, password }),
          credentials: "include",
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("로그인 성공:", data);
        localStorage.setItem("userInfo", JSON.stringify(data.data.userInfo));
        localStorage.setItem("token", data.token); 
  
        navigate("/home");
      } catch (err: any) {
        console.error("로그인 요청 중 오류 발생:", err);
        setError(err.message || "로그인 중 문제가 발생했습니다.");
      }
    };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo src="/SeoulMilkLogo.png" alt="서울우유 로고" />
        <Form onSubmit={handleLogin}>
          <InputContainer>
            <FloatingLabel className={isFocused || employeeId ? "active" : ""}>아이디를 입력하세요</FloatingLabel>
            <Input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(!!employeeId)}
              required
            />
          </InputContainer>

          <InputContainer>
            <FloatingLabel className={isPasswordFocused || password ? "active" : ""}>비밀번호를 입력하세요</FloatingLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(!!password)}
              required
            />
          </InputContainer>
          {error && <ErrorMessage>아이디 또는 비밀번호가 잘못 되었습니다.<br/>
            아이디와 비밀번호를 정확히 입력해주세요.</ErrorMessage>}
          <Button type="submit">로그인</Button>
          <FooterText>
          *초기 비밀번호는 전화번호 뒤 8자리와 동일합니다.<br/>
            *개인정보 보호를 위해 비밀번호는 정기적으로 변경 요망.
          </FooterText>
        </Form>

        <HelpContainer>
          <HelpLink href="">
            <HelpLogo src={info} />사용방법 안내
          </HelpLink>
        </HelpContainer>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
`;

const Logo = styled.img`
  width: 380px;
  height: 82px;
  margin-bottom : 48px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 28px;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid var(--gray-400, #D6D6D5);
  width: 100%;
  max-width: 560px;
  @media screen and (max-width: 500px) {
  border : none;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 504px;
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
    top: 15px;
    font-size: 12px;
    color: var(--gray-500, #C0C0C0);
  }
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid var(--gray-600, #A6A5A5);
  font-size: 14px;
  background: transparent;
  transition: all 0.2s ease-in-out;
  max-width: 370px; 

  &:focus {
    border: 2px solid var(--primary-main-200, #009857);
    outline: none;
  }
`;

const Button = styled.button`
  display: flex;
  height: 68px;
  padding: 10px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  background: var(--primary-main-200, #009857);
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25);
  border: none;
  color: var(--white, #FFF);
  text-align: center;
  font-size: 20px;
  font-weight: 700;

  &:hover {
    background-color: #00753a;
  }
`;

const HelpContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
`;

const HelpLogo = styled.img`
  width: 18px;
  height: 18px;
  vertical-align: middle;
`;

const HelpLink = styled.a`
  font-size: 0.8rem;
  color: #666;
  text-decoration: underline;
  display: flex;
  align-items: center;
`;
const FooterText = styled.p`
  display: flex;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  color: var(--gray-1300, #545454);
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
`;
const ErrorMessage = styled.div`
color: var(--Sub, #E60012);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
display: flex;
width: 448px;
height: 40px;
flex-direction: column;
justify-content: center;
margin-left : 60px;
`