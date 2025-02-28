import React, { useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

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
  date: "2025.01.20",
}));

const itemsPerPage = 10;

const ListComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * itemsPerPage;
  const currentItems = dummyData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(dummyData.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <Container>
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
          previousClassName={"prev"}
          nextClassName={"next"}
          breakClassName={"break"}
          pageClassName={"page"}
          disabledClassName={"disabled"}
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
    border: 1px solid transparent;
    background: #fff;
    color: #444;
    font-weight: bold;
    transition: background 0.2s, color 0.2s;
  }

  .pagination .page {
    border: none;
  }

  .pagination .active {
    background: #009857;
    color: white;
    font-weight: bold;
    border: 1px solid #009857;
  }

  .pagination .prev,
  .pagination .next {
    font-size: 16px;
    background: transparent;
    color: #444;
    border: none;
    padding: 10px;
  }

  .pagination .disabled {
    color: #bbb;
    pointer-events: none;
  }

  .pagination .break {
    cursor: default;
  }
`;
