import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PaginationComponent from "@components/Search/PaginationComponent";
import UserCreate from "@components/userSetting/userCreate";
import UserSuccess from "@components/userSetting/userSuccess";
import token from "@utils/token";

interface User {
  id: number;
  name: string;
  employeeId: string;
  role: string;
}

const itemsPerPage = 10;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [newUser, setNewUser] = useState<{ name: string; employeeId: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await token.get("/v1/admin/all"); 
        setUsers(response.data.data.emps || []); 
      } catch (err: any) {
        setError(err.response?.data?.message || "사용자 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentItems = users.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(users.length / itemsPerPage);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  const handleCreateSuccess = (name: string, employeeId: string) => {
    setNewUser({ name, employeeId });
    setIsCreateOpen(false);
    setIsSuccessOpen(true);
  };

  if (loading) return <p>데이터를 불러오는 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>번호</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>사번</TableHeader>
            <TableHeader>역할</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.employeeId}</TableCell>
                <TableCell>{user.role === "ADMIN" ? "관리자" : "사원"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>사용자가 없습니다.</TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
      <PaginationComponent 
        currentPage={currentPage} 
        pageCount={pageCount} 
        onPageChange={handlePageClick} 
      />
      
      <ButtonContainer>
        <CreateButton onClick={() => setIsCreateOpen(true)}>+ 생성하기</CreateButton>
      </ButtonContainer>

      {isCreateOpen && <UserCreate onClose={() => setIsCreateOpen(false)} onCreateSuccess={handleCreateSuccess} />}
      {isSuccessOpen && newUser && <UserSuccess user={newUser} onClose={() => setIsSuccessOpen(false)} />}
    </Container>
  );
};

export default UserList;
const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 30px;
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableHeader = styled.th`
  background: #f8f8f8;
  padding: 12px;
  text-align: left;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 12px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 9px;
  right: 20px;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 152, 87, 0.10);
  border: none;
  color: #009857;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  width: 150px;
`;
