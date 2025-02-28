import React, { useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";

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
  recipient: "공급받는자 사업체명",
  writer: "김혜연",
  date: `2025.01.${String(20 - (index % 10)).padStart(2, "0")}`,
}));

const itemsPerPage = 10;

const ListComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState("최신순");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortedData = [...dummyData].sort((a, b) =>
    sortOrder === "최신순" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
  );

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
    XLSX.writeFile(workbook, "지급 결의서.xlsx");
  };

  return (
    <Container>
      <ButtonContainer>
        <ExcelButton onClick={handleExcelDownload}>
          엑셀 다운로드
          <Icon src="/download.svg" alt="엑셀 다운로드 아이콘" />
        </ExcelButton>

        <SortButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          {sortOrder} <span>▼</span>
        </SortButton>

        {isDropdownOpen && (
          <Dropdown>
            <DropdownItem
              onClick={() => handleSortChange("최신순")}
              isSelected={sortOrder === "최신순"}
            >
              ✅ 최신순
            </DropdownItem>
            <DropdownItem
              onClick={() => handleSortChange("오래된순")}
              isSelected={sortOrder === "오래된순"}
            >
              ✅ 오래된 순
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
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </PaginationContainer>
    </Container>
  );
};

export default ListComponent;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 10px;
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

const Dropdown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: #fff;
  border: 1px solid #009857;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;

  .pagination {
    display: flex;
    list-style: none;
    gap: 8px;
    align-items: center;
  }

  .pagination li {
    cursor: pointer;
    padding: 10px 14px;
    border-radius: 50%;
    background: #fff;
    color: #444;
    font-weight: bold;
    transition: background 0.2s, color 0.2s;
  }

  .pagination .active {
    background: #009857;
    color: white;
  }
`;
