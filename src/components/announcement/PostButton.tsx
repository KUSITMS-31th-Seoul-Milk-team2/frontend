import styled from "styled-components";
import {transparentize} from "polished";
import {theme} from "@styles/theme.ts";

interface WriteButtonProps {
    onClick?: () => void;
}

const WriteButton = ({ onClick }: WriteButtonProps) => {
    return (
        <WriteButtonWrapper>
            <StyledWriteButton onClick={onClick}>
                등록하기
            </StyledWriteButton>
        </WriteButtonWrapper>
    );
};

export default WriteButton;

/* ======= styled-components ======= */
const WriteButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 16px;
`;

const StyledWriteButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 120px;
    height: 45px;
    padding: 12px 20px;
    border-radius: 8px;
    background-color: ${({ theme }) =>
    transparentize(0.9, theme.colors.main200)
};
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    color: ${theme.colors.main200};;

    &:hover {
        background: rgba(0, 152, 87, 0.15);
    }

    &:active {
        background: rgba(0, 152, 87, 0.20);
    }
`;
