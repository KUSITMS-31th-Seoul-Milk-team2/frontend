import React, { useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import dropdown from "@assets/icons/dropdown.svg";
import download from "@assets/icons/download.svg"
import PaginationComponent from "./PaginationComponent";

// interface ListItem {
//   id: number;
//   supplier: string;
//   recipient: string;
//   writer: string;
//   date: string;
// }
interface ListItem{
  id: number;
  employeeName: string;
  suName: string;
  ipName: string;
  erdatStart : string;
  erdatEnd: string;
}
const itemsPerPage = 10;

const EmployeeListComponent: React.FC<{ data: ListItem[] }> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("최신순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "최신순") return b.erdatEnd.localeCompare(a.erdatEnd);
    if (sortOrder === "오래된순") return a.erdatEnd.localeCompare(b.erdatEnd);
    if (sortOrder === "공급받는자 사업체명(ㄱ→ㅎ)") return a.ipName.localeCompare(b.ipName);
    if (sortOrder === "공급받는자 사업체명(ㅎ→ㄱ)") return b.ipName.localeCompare(a.ipName);
    return 0;
  });

  const offset = currentPage * itemsPerPage;
  const currentItems = sortedData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    setIsDropdownOpen(false);
    setCurrentPage(0);
  };

  const handleExcelDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "리스트");
    XLSX.writeFile(workbook, "지급결의서.xlsx");
  };

  return (
    <Container>
      <ButtonContainer>
  <ExcelButton onClick={handleExcelDownload}>
    엑셀 다운로드
    <Icon src={download} alt="엑셀 다운로드 아이콘" />
  </ExcelButton>

  <SortButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
    {sortOrder}
    <Icon src={dropdown} alt="드롭다운 아이콘" />
  </SortButton>
        {isDropdownOpen && (
          <Dropdown>
            <DropdownItem onClick={() => handleSortChange("최신순")} isSelected={sortOrder === "최신순"}>
              최신순
            </DropdownItem>
            <DropdownItem onClick={() => handleSortChange("오래된순")} isSelected={sortOrder === "오래된순"}>
              오래된 순
            </DropdownItem>
            <DropdownItem onClick={() => handleSortChange("공급받는자 사업체명(ㄱ→ㅎ)")} isSelected={sortOrder === "공급받는자 사업체명(ㄱ→ㅎ)"}>
              공급받는자 사업체명(ㄱ→ㅎ)
            </DropdownItem>
            <DropdownItem onClick={() => handleSortChange("공급받는자 사업체명(ㅎ→ㄱ)")} isSelected={sortOrder === "공급받는자 사업체명(ㅎ→ㄱ)"}>
              공급받는자 사업체명(ㅎ→ㄱ)
            </DropdownItem>
          </Dropdown>
        )}
      </ButtonContainer>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>번호</TableHeader>
            <TableHeader>공급자 사업체명</TableHeader>
            <TableHeader>공급받는자 사업체명</TableHeader>
            <TableHeader>작성일자</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.suName}</TableCell>
              <TableCell>{item.ipName}</TableCell>
              <TableCell>{item.erdatEnd}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <PaginationComponent
  currentPage={currentPage}
  pageCount={pageCount}
  onPageChange={handlePageClick}
/>
    </Container>
  );
};

export default EmployeeListComponent;

const Container = styled.div`
  width: 100%;
  max-width: 1040px;
  margin-top: 10px;
`;

const ExcelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;

const SortButton = styled(ExcelButton)`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;
  position: relative;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #009857;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 10;
  min-width: 200px;
  margin-top : 10px;
`;


const DropdownItem = styled.div<{ isSelected: boolean }>`
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? "#009857" : "white")};
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};
  border-radius: 4px;
  &:hover {
    background: #009857;
    color: white;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  
  @media (max-width: 480px) {
    display: block;
    margin-bottom: 10px;
  }
`;

const TableHeader = styled.th`
  background: #f8f8f8;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }
  
  @media (max-width: 480px) {
    display: block;
    padding: 8px;
  }
`;