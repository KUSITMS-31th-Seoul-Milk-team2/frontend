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
    width: 35rem;
    height: 7.5rem;
    max-width: 60rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 1rem 2rem; 
    border: 0.0625rem solid ${({theme})=>theme.colors.gray300};
    border-radius: 0.5rem;
    background-color: ${({theme})=>theme.colors.white};
`;

const TopSection = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-self: flex-start;
    margin-top: 1rem;
    gap: 1rem;
`;

const BottomSection = styled.div`
    display: flex;
    justify-content: flex-start;
    align-self: flex-start;
    width: 100%;
    margin-top: 0.5rem;
`

const NewIcon = styled.div`
    background-color: ${({ theme }) =>
            transparentize(0.9, theme.colors.main100)
    };
    color:${({theme})=>theme.colors.main100};
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.25rem 0.5rem; 
    border-radius: 0.75rem;
`;

const DateTab = styled.div`
    font-size: 0.875rem;
    color: ${({theme})=>theme.colors.gray800};
`;

const Title = styled.h1`
    font-size: 1rem;
    font-weight: 500;
    flex-grow: 1;
    margin: 0 0.75rem;
`;

const ArrowIcon = styled.div`
  font-size: 1.125rem;
  color: ${({theme})=>theme.colors.gray800};
  cursor: pointer;
`;
