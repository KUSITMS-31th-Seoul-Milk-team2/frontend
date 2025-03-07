import React from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, pageCount, onPageChange }) => {
  return (
    <PaginationContainer>
      <PaginationButton onClick={() => onPageChange({ selected: 0 })} disabled={currentPage === 0}>
        «
      </PaginationButton>
      <PaginationButton onClick={() => onPageChange({ selected: Math.max(currentPage - 1, 0) })} disabled={currentPage === 0}>
        ‹
      </PaginationButton>
      <ReactPaginate
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
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
      <PaginationButton onClick={() => onPageChange({ selected: Math.min(currentPage + 1, pageCount - 1) })} disabled={currentPage === pageCount - 1}>
        ›
      </PaginationButton>
      <PaginationButton onClick={() => onPageChange({ selected: pageCount - 1 })} disabled={currentPage === pageCount - 1}>
        »
      </PaginationButton>
    </PaginationContainer>
  );
};

export default PaginationComponent;
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
