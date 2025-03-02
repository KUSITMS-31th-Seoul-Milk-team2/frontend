import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

      navigate("/");
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
          <div>
            <Label>아이디</Label>
            <Input
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div>
            <Label>비밀번호</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          {error && <ErrorMessage>아이디 또는 비밀번호가 잘못 되었습니다.<br/>
            아이디와 비밀번호를 정확히 입력해주세요.</ErrorMessage>}
          <Button type="submit">로그인</Button>
        </Form>
        <FooterText>*아이디는 사번으로 되어있습니다.</FooterText>
        <FooterText>*개인정보 보호를 위해 비밀번호는 정기적으로 변경 요망</FooterText>
        <HelpLink href="">🔗 사용방법 안내</HelpLink>
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
  background-color: #ffffff;
`;

const LoginBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 380px;
  text-align: center;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  margin-top: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.3rem;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 1rem;
  background-color: #f9f9f9;

  &:focus {
    border-color: #008c45;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  background-color: #008c45;
  color: white;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #00753a;
  }
`;

const FooterText = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-top: 10px;
  text-align: center;
`;

const HelpLink = styled.a`
  font-size: 0.8rem;
  color: #666;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 8px;

  &:hover {
    text-decoration: underline;
  }
`;
