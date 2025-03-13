import { useState } from "react";
import styled from "styled-components";
import { theme } from "@styles/theme.ts";
import searchButtonIcon from "@assets/icons/searchButtonIcon.svg";
import bottomArrowColorIcon from "@assets/icons/bottomArrowColorIcon.svg";
import useNoticeStore from "@store/noticeStore";

const SearchBar = () => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;

    const {
        searchType,
        keyword,
        setSearchType,
        setKeyword,
        fetchNoticesBySearch,
    } = useNoticeStore();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const displayFilter = (type: string) => {
        switch (type) {
            case "all":
                return "전체";
            case "title_and_content":
                return "제목 + 내용";
            case "author":
                return "작성자";
            default:
                return "전체";
        }
    };

    const toSearchType = (display: string) => {
        switch (display) {
            case "전체":
                return "all";
            case "제목 + 내용":
                return "title_and_content";
            case "작성자":
                return "author";
            default:
                return "all";
        }
    };

    const selectedFilter = displayFilter(searchType);

    const allFilters = ["전체", "제목 + 내용", "작성자"];
    const options = allFilters; // 항상 모든 옵션 표시

    const handleSelectFilter = (filter: string) => {
        setSearchType(toSearchType(filter));
        setIsDropdownOpen(false);
    };

    const handleSearch = async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            console.error("토큰이 없습니다.");
            return;
        }
        await fetchNoticesBySearch(storedToken, BaseUrl);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <Container>
            <SearchBarWrapper>
                <SearchBarContainer>
                    <FilterWrapper>
                        <FilterButton onClick={() => setIsDropdownOpen((prev) => !prev)}>
                            {selectedFilter}{" "}
                            <DropdownIcon src={bottomArrowColorIcon} alt="Dropdown Icon" />
                        </FilterButton>
                    </FilterWrapper>
                    <SearchInput
                        type="text"
                        placeholder="검색 조건을 입력해주세요"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <SearchButton onClick={handleSearch}>
                        <SearchIcon src={searchButtonIcon} alt="Search Icon" />
                    </SearchButton>
                </SearchBarContainer>

                {isDropdownOpen && (
                    <FilterDropdown>
                        {options.map((option) => (
                            <DropdownItem key={option} onClick={() => handleSelectFilter(option)}>
                                {option}
                            </DropdownItem>
                        ))}
                    </FilterDropdown>
                )}
            </SearchBarWrapper>
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

const SearchBarWrapper = styled.div`
    position: relative;
    width: 100%;
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
    background-color: ${theme.colors.white};
    transition: width 0.3s ease-in-out;

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
    width: 15%;
    background-color: ${theme.colors.white};
    border: 2px solid ${theme.colors.main200};
    border-radius: 0.5rem;
    padding: 0.5rem;
    z-index: 1000;
    margin-top: 0.5rem;
    box-sizing: border-box;
`;

const DropdownItem = styled.div`
    padding: 0.5rem;
    font-size: ${({ theme }) => theme.typography.buttonL.fontSize};
    font-weight: ${({ theme }) => theme.typography.buttonL.fontWeight};
    cursor: pointer;
    color: #717171;
    border-radius: 0.25rem;

    &:hover {
        color: ${theme.colors.main100};
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
