import React, { useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import dropdown from "@assets/icons/dropdown.svg";
import download from "@assets/icons/download.svg"

interface ListItem {
  id: number;
  supplier: string;
  recipient: string;
  writer: string;
  date: string;
}

const dummyData: ListItem[] = Array.from({ length: 134 }, (_, index) => ({
  id: index + 1,
  supplier: "공급자 사업체명",
  recipient: `공급받는자 사업체명 ${index % 2 === 0 ? "가나다" : "하바사"}`,
  writer: "김혜연",
  date: `2025.01.${String(20 - (index % 10)).padStart(2, "0")}`,
}));

const itemsPerPage = 10;

const AdminListComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("최신순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortedData = [...dummyData].sort((a, b) => {
    if (sortOrder === "최신순") return b.date.localeCompare(a.date);
    if (sortOrder === "오래된순") return a.date.localeCompare(b.date);
    if (sortOrder === "공급받는자 사업체명(ㄱ→ㅎ)") return a.recipient.localeCompare(b.recipient);
    if (sortOrder === "공급받는자 사업체명(ㅎ→ㄱ)") return b.recipient.localeCompare(a.recipient);
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
            <TableHeader>작성자</TableHeader>
            <TableHeader>작성일자</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell>{item.recipient}</TableCell>
              <TableCell>{item.writer}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <PaginationContainer>
    <PaginationButton onClick={() => handlePageClick({ selected: 0 })} className={`page-nav ${currentPage === 0 ? "disabled" : ""}`}>
      «
    </PaginationButton>
    <PaginationButton onClick={() => handlePageClick({ selected: Math.max(currentPage - 1, 0) })} className={`page-nav ${currentPage === 0 ? "disabled" : ""}`}>
      ‹
    </PaginationButton>
    <ReactPaginate
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={handlePageClick}
      containerClassName="pagination"
      activeClassName="active"
      previousLabel=""
      nextLabel=""
      previousClassName=""
      nextClassName=""
      disabledClassName="disabled"
      breakClassName="break"
      forcePage={currentPage}
      renderOnZeroPageCount={null}
    />
    <PaginationButton onClick={() => handlePageClick({ selected: Math.min(currentPage + 1, pageCount - 1) })} className={`page-nav ${currentPage === pageCount - 1 ? "disabled" : ""}`}>
      ›
    </PaginationButton>
    <PaginationButton onClick={() => handlePageClick({ selected: pageCount - 1 })} className={`page-nav ${currentPage === pageCount - 1 ? "disabled" : ""}`}>
      »
    </PaginationButton>
</PaginationContainer>
    </Container>
  );
};

export default AdminListComponent;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
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


const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  gap: 4px; 

  .pagination {
    display: flex;
    list-style: none;
    gap: 6px;
    align-items: center;
    padding: 0;
    margin-right : -40px;
    margin-left : -50px;
  }

  .pagination li {
    cursor: pointer;
    padding: 6px 10px;
    border-radius: 6px;
    background: #fff;
    color: #6A6A6A;
    font-weight: 600;
    font-size: 14px;
    transition: background 0.2s, color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    border:none;
  }

  .pagination .active {
    color: #009857;
    position: relative;
  }

  .pagination .active::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 80%;
    height: 2px;
    background: #009857;
    transform: translateX(-50%);
  }

  .page-nav {
    min-width: 26px;
    text-align: center;
  }

  .disabled {
    opacity: 0.5;
    cursor: default;
  }

  .break {
    color: #6A6A6A;
  }
`;
const PaginationButton = styled.button`
  display: flex;
  width: 32px;
  height: 36px;
  padding: 7px 9px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1.5px solid var(--gray-600, #A6A5A5);
  background-color: white;
  color: var(--gray-600, #A6A5A5); 
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  z-index : 1001;

  &.disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
