import styled from "styled-components";
import { theme } from "@styles/theme";

interface TopSectionProps {
    totalCount: number;
    onToggleMyPosts: () => void;
    isMyPostsOnly: boolean;

}

const TopSection = ({
                        totalCount,
                        onToggleMyPosts,
                        isMyPostsOnly,
                    }: TopSectionProps) => {
    return (
        <Container>
            <LeftSide>
                <ResultCount>
                    검색결과 <Count>{totalCount}</Count>건
                </ResultCount>
            </LeftSide>

            <RightSide>
                <FilterSection>
                    <FilterLabel>내가 쓴 글</FilterLabel>
                    <ToggleSwitch onClick={onToggleMyPosts} $isActive={isMyPostsOnly} />
                </FilterSection>
            </RightSide>
        </Container>
    );
};

export default TopSection;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    padding: 1rem;
    margin-bottom: 1rem;
`;

const LeftSide = styled.div`
    display: flex;
    align-items: center;
`;

const RightSide = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
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
  border-radius: 10px;border: none;
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
