import React, { useState } from "react";
import styled from "styled-components";
import PaginationComponent from "@components/Search/PaginationComponent";

interface User {
  id: number;
  name: string;
  employeeId: string;
  role: string;
}

const dummyUsers: User[] = Array.from({ length: 34 }, (_, index) => ({
  id: index + 1,
  name: "김혜연",
  employeeId: "12345678",
  role: "사원",
}));

const itemsPerPage = 10;

const UserList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const offset = currentPage * itemsPerPage;
  const currentItems = dummyUsers.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(dummyUsers.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

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
          {currentItems.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.employeeId}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
      <PaginationComponent currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageClick} />
      </PaginationContainer>
      <ButtonContainer>
        <CreateButton>+ 생성하기</CreateButton>
      </ButtonContainer>
    </Container>
  );
};

export default UserList;

const Container = styled.div`
  width: 100%;
  max-width: 1050px;
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
  bottom: 12%;
  right: 20px;
`;
const PaginationContainer = styled.div`
margin-top : 68px;
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
