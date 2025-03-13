import ReactPaginate from "react-paginate";
import styled from "styled-components";
import LeftArrowIcon from "@assets/icons/leftArrowIcon.svg?react";
import RightArrowIcon from "@assets/icons/rightArrow.svg?react";
import DoubleLeftArrowIcon from "@assets/icons/doubleLeftIcon.svg?react";
import DoubleRightArrowIcon from "@assets/icons/doubleRightIcon.svg?react";

interface BottomPaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (selectedItem: { selected: number }) => void;
}
const BottomPagination = ({ pageCount, currentPage, onPageChange }: BottomPaginationProps) => {
    return (
        <Container>
            <NavButton onClick={() => onPageChange({ selected: 0 })}>
                <DoubleArrowLeftIcon />
            </NavButton>

            <StyledPaginate
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={onPageChange}
                forcePage={currentPage - 1} // 현재 페이지 설정
                renderOnZeroPageCount={null}
                previousLabel={<NavButton><ArrowLeftIcon /></NavButton>}
                nextLabel={<NavButton><ArrowRightIcon /></NavButton>}
                breakLabel="..."
                pageLinkClassName="page-link"
                pageClassName="page-item"
                previousClassName="nav-item"
                nextClassName="nav-item"
                breakClassName="break"
            />

            <NavButton onClick={() => onPageChange({ selected: pageCount - 1 })}>
                <DoubleArrowRightIcon />
            </NavButton>
        </Container>
    );
};

export default BottomPagination;

/* ======= styled-components ======= */
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;  
    width: 100%;
    margin-top: 20px;
 
`;


const NavButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray600};
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: ${({ theme }) => theme.colors.gray200};
    }
`;


const ArrowLeftIcon = styled(LeftArrowIcon)`
    width: 20px;
    height: 20px;
`;

const DoubleArrowLeftIcon = styled(DoubleLeftArrowIcon)`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const DoubleArrowRightIcon = styled(DoubleRightArrowIcon)`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const ArrowRightIcon = styled(RightArrowIcon)`
    width: 20px;
    height: 20px;
`;

const StyledPaginate = styled(ReactPaginate).attrs({
    activeClassName: "active",
})`
    display: flex;
    align-items: center;
    justify-content: center; 
    gap: 12px;
    list-style: none;
    padding: 0;

    li {
        cursor: pointer;
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.gray800};
        padding: 6px 12px;
        border-radius: 4px;
        transition: color 0.2s ease-in-out;

        &:hover {
            color: ${({ theme }) => theme.colors.main200};
        }
    }

    .active {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.main200};
        border-bottom: 2px solid ${({ theme }) => theme.colors.main200};
    }

    .disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    
    .previous,
    .next {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        border: 1px solid ${({ theme }) => theme.colors.gray600}; 
        border-radius: 4px;
        transition: background-color 0.2s ease-in-out;

        &:hover {
            background-color: ${({ theme }) => theme.colors.gray400};
        }
    }

    .break {
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.gray600};
    }
`;
