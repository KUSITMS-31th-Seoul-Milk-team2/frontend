import { useState } from "react";
import styled from "styled-components";
import { theme } from "@styles/theme.ts";
import searchButtonIcon from "@assets/icons/searchButtonIcon.svg";
import bottomArrowIcon from "@assets/icons/bottomArrowIcon.svg";

const SearchBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("전체");

    const options = ["전체", "제목 + 내용", "작성자"].filter(option => option !== selectedFilter);

    const handleSelectFilter = (filter: string) => {
        setSelectedFilter(filter);
        setIsDropdownOpen(false);
    };

    return (
        <Container>
            <SearchBarContainer>
                <FilterWrapper>
                    <FilterButton onClick={() => setIsDropdownOpen(prev => !prev)}>
                        {selectedFilter} <DropdownIcon src={bottomArrowIcon} alt="Dropdown Icon" />
                    </FilterButton>

                    {isDropdownOpen && (
                        <FilterDropdown>
                            {options.map(option => (
                                <DropdownItem key={option} onClick={() => handleSelectFilter(option)}>
                                    {option}
                                </DropdownItem>
                            ))}
                        </FilterDropdown>
                    )}
                </FilterWrapper>
                <SearchInput type="text" placeholder="검색 조건을 입력해주세요" />
                <SearchButton>
                    <SearchIcon src={searchButtonIcon} alt="Search Icon" />
                </SearchButton>
            </SearchBarContainer>
        </Container>
    );
};

export default SearchBar;

/* ======= styled-components ======= */

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 1rem;
`;

const SearchBarContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    width: 100%;
    height: 3rem;
    border: 2px solid ${theme.colors.main200};
    border-radius: 0.5rem;
    padding: 0 1rem;
    background-color:${theme.colors.white};
    transition: width 0.3s ease-in-out;
    position: relative;

    @media (max-width: 1024px) {
        width: 100%;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr auto;
        padding: 0 0.5rem;
    }

    @media (max-width: 480px) {
        width: 95%;
        height: 2.8rem;
    }
`;

const FilterWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const FilterButton = styled.button`
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    color: ${theme.colors.gray800};
`;

const DropdownIcon = styled.img`
    width: 0.8rem;
    height: auto;
    margin-left: 1rem;
`;

const FilterDropdown = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 200px;
    background-color:  ${theme.colors.white};;
    border: 2px solid ${theme.colors.main200};
    border-radius: 0.5rem;
    margin-top: 1rem;
    padding: 0.5rem;
    z-index: 1000;
`;

const DropdownItem = styled.div`
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    color: ${theme.colors.gray800};
    border-radius: 0.25rem;

    &:hover {
        background-color: ${theme.colors.main100};
    }
`;

const SearchInput = styled.input`
    width: 100%;
    height: 2rem;
    font-size: 1rem;
    border: none;
    outline: none;
    padding: 0 0.5rem;
    color: ${theme.colors.gray800};

    &::placeholder {
        color: ${theme.colors.gray500};
    }
`;

const SearchButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0.5rem;
`;

const SearchIcon = styled.img`
    width: 1.5rem;
    height: auto;
`;
