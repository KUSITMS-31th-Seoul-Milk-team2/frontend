import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PaginationComponent from "@components/Search/PaginationComponent";
import UserCreate from "@components/userSetting/userCreate";
import UserSuccess from "@components/userSetting/userSuccess";
import UserSearch from "@components/userSetting/userSearch";
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
  const [searchResults, setSearchResults] = useState<User[] | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [newUser, setNewUser] = useState<{ name: string; employeeId: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await token.get("/v1/admin/all");
      setUsers(response.data.data.emps || []);
      setSearchResults(null);
      setSelectedUsers([]); 
    } catch (err: any) {
      setError(err.response?.data?.message || "사용자 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (users: User[] | null) => { 
    if (users && users.length > 0) {
      setSearchResults(users);
    } else {
      alert("검색 결과가 없습니다.");
      setSearchResults(null);
    }
  };
  

  const dataToShow = searchResults || users;
  const offset = currentPage * itemsPerPage;
  const currentItems = dataToShow.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(dataToShow.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleCreateSuccess = ({ name, employeeId }: { name: string; employeeId: string }) => {
    setIsCreateOpen(false);
    setIsSuccessOpen(true);
    setNewUser({ name, employeeId }); 
    fetchUsers(); 
  };
  ;
  

  const handleCheckboxChange = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentItems.map((user) => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) return alert("삭제할 사용자를 선택하세요.");

    try {
      await token.delete("/v1/admin", { data: { ids: selectedUsers } });
      alert("삭제가 완료되었습니다.");
      fetchUsers();
    } catch (err: any) {
      alert("삭제 중 오류 발생: " + (err.response?.data?.message || "다시 시도해주세요."));
    }
  };

  if (loading) return <p>데이터를 불러오는 중...</p>;
console.log("에러 발생 ",error);

  return (
    <Container>
      <UserSearch onSearch={handleSearchResults} />
      <Table>
        <thead>
          <TableRow>
          <TableHeader>
              <input type="checkbox" onChange={handleSelectAll} checked={selectAll} />
            </TableHeader>
            <TableHeader>
              <DeleteButton onClick={handleDeleteSelected}>삭제</DeleteButton>
            </TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>사번</TableHeader>
            <TableHeader>직책</TableHeader>
            <TableHeader></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.employeeId}</TableCell>
                <TableCell>{user.role === "ADMIN" ? "관리자" : "사원"}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>사용자가 없습니다.</TableCell>
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
  max-width: 1044px;
  margin-top: 30px;
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  margin-top : 35px;
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

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: var(--gray-500, #C0C0C0);
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
