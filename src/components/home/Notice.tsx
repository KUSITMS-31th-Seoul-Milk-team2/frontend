import styled from "styled-components";
import { transparentize } from "polished";

const Notice = ({ title, date, isNew }: { title: string; date: string; isNew: boolean }) => {
    return (
        <Container>
            <TopSection>
                {isNew && <NewIcon>New</NewIcon>}
                <DateTab>{date}</DateTab>
            </TopSection>
            <BottomSection>
                <Title>{title}</Title>
                <ArrowIcon>→</ArrowIcon>
            </BottomSection>
        </Container>
    );
};

export default Notice;

const Container = styled.div`
    width: 100%;
    max-width: 32rem;
    display: flex;
    flex-direction: column;
    padding: 2rem; 
    height: 7rem; 
    min-height: 5rem; 
    justify-content: center; 
    border: 0.0625rem solid ${({theme})=>theme.colors.gray300};
    border-radius: 0.5rem;
    background-color: ${({theme})=>theme.colors.white};
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 1rem;
        margin: 0 auto;
        height: auto;
        min-height: 4rem;
    }
`;

const TopSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 0.5rem;
`;

const BottomSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const NewIcon = styled.div`
    background-color: ${({ theme }) =>
            transparentize(0.9, theme.colors.main100)
    };
    color: ${({theme})=>theme.colors.main100};
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    border-radius: 0.75rem;
    white-space: nowrap;
`;

const DateTab = styled.div`
    font-size: 0.875rem;
    color: ${({theme})=>theme.colors.gray800};
    margin-left: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Title = styled.h1`
    font-size: 1rem;
    font-weight: 500;
    flex-grow: 1;
    margin: 0 0.75rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ArrowIcon = styled.div`
    font-size: 1.125rem;
    color: ${({theme})=>theme.colors.gray800};
    cursor: pointer;

    @media (max-width: 768px) {
        display: block; 
        margin-left: 0.5rem;
    }
`;
