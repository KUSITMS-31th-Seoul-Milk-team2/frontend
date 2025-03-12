import React, { useState } from "react";
import styled from "styled-components";
import search from "@assets/icons/search.svg";
import token from "@utils/token"; 

interface UserSearchProps {
  onSearch: (users: any[]) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }
  
    try {
      const response = await token.get(`/v1/admin?name=${searchTerm}`);
      const result = response.data.data;
      onSearch(result ? [result] : []); 
    } catch (err: any) {
      alert("검색 중 오류 발생: " + (err.response?.data?.message || "다시 시도해주세요."));
    }
  };
  

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="검색 조건을 입력해주세요"
        value={searchTerm}
        onChange={handleChange}
      />
      <SearchButton onClick={handleSearch}>
        <SearchLogo src={search}/>
      </SearchButton>
    </SearchContainer>
  );
};

export default UserSearch;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #008000;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  max-width: 1030px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 5px;
  color: var(--gray-500, #C0C0C0);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #008000;
  margin-left: 8px;
`;

const SearchLogo = styled.img`
  width: 19.31px;
  height: 19px;
`;
