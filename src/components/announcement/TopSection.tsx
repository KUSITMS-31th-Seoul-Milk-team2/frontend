import { useState } from "react";
import styled from "styled-components";
import { theme } from "@styles/theme.ts";
import downArrowIcon from "@assets/icons/bottomArrowIcon.svg";

interface TopSectionProps {
    totalCount: number;
    onToggleMyPosts: () => void;
    isMyPostsOnly: boolean;
    sortOption: string;
    onChangeSortOption: (option: string) => void;
}

const TopSection = ({ totalCount, onToggleMyPosts, isMyPostsOnly, sortOption, onChangeSortOption }: TopSectionProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const sortOptions = ["최신순", "오래된순"];

    return (
        <Container>
            <ResultCount>
                검색결과 <Count>{totalCount}</Count>건
            </ResultCount>
            <SortFilterContainer>
                <FilterSection>
                    <FilterLabel>내가 쓴 글</FilterLabel>
                    <ToggleSwitch onClick={onToggleMyPosts} $isActive={isMyPostsOnly} />
                </FilterSection>
                <SortWrapper>
                    <SortButton onClick={() => setIsDropdownOpen((prev) => !prev)}>
                        {sortOption} <SortIcon src={downArrowIcon} alt="정렬 아이콘" />
                    </SortButton>
                    {isDropdownOpen && (
                        <DropdownMenu>
                            {sortOptions.map(option => (
                                <DropdownItem key={option} onClick={() => { onChangeSortOption(option); setIsDropdownOpen(false); }}>
                                    {option}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    )}
                </SortWrapper>
            </SortFilterContainer>
        </Container>
    );
};

export default TopSection;

/* ======= styled-components ======= */

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    padding: 1rem;
`;

const ResultCount = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: ${theme.colors.gray800};
`;

const Count = styled.span`
    color: ${theme.colors.main200};
    font-weight: bold;
`;

const SortFilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const FilterSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const FilterLabel = styled.span`
    font-size: 0.9rem;

    color: ${theme.colors.gray800};
`;

const ToggleSwitch = styled.button<{ $isActive: boolean }>`
    width: 40px;
    height: 20px;
    border-radius: 10px;
    background-color: ${({ $isActive, theme }) =>
            $isActive ? theme.colors.main200 : theme.colors.gray300};
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: white;
        border-radius: 50%;
        top: 50%;
        left: ${({ $isActive }) => ($isActive ? "calc(100% - 18px)" : "2px")};
        transform: translateY(-50%);
        transition: left 0.3s ease;
    }
`;
const SortWrapper = styled.div`
    position: relative;
`;

const SortButton = styled.button`
    display: flex;
    align-items: center;
    background: none;
    border: 1px solid ${theme.colors.gray300};
    border-radius: 32px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    color: ${theme.colors.gray800};
`;

const SortIcon = styled.img`
    width: 1rem;
    height: auto;
    margin-left: 0.5rem;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    width: 120px;
    background:  ${theme.colors.white};
    border: 1px solid ${theme.colors.gray300};
    border-radius: 0.5rem;
    padding: 0.5rem;
    z-index: 1000;
`;

const DropdownItem = styled.div`
    padding: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    color: ${theme.colors.gray800};

    &:hover {
        background-color: ${theme.colors.gray100};
    }
`;
