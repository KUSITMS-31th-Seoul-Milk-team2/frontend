import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { transparentize } from "polished";

interface NoticeProps {
    id: number;
    title: string;
    createdAt: string;
}

const Notice: React.FC<NoticeProps> = ({ id, title, createdAt }) => {
    const navigate = useNavigate();


    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    const isNew = diffDays <= 3;

    return (
        <Container>
            <TopSection>
                {isNew && <NewIcon>New</NewIcon>}
                <DateTab>
                    {createdDate.toISOString().split("T")[0]}
                </DateTab>
            </TopSection>
            <BottomSection>
                <Title>{title}</Title>
                <ArrowIcon onClick={() => navigate(`/announcement/${id}`)}>
                    →
                </ArrowIcon>
            </BottomSection>
        </Container>
    );
};

export default Notice;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    height: 7rem;
    min-height: 5rem;
    justify-content: center;
    border: 0.0625rem solid ${({ theme }) => theme.colors.gray300};

    background-color: ${({ theme }) => theme.colors.white};
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
    background-color: ${({ theme }) => transparentize(0.9, theme.colors.main100)};
    color: ${({ theme }) => theme.colors.main100};
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.35rem 0.8rem;
    border-radius: 0.75rem;
    white-space: nowrap;
    border: 1px solid  ${({ theme }) =>
    transparentize(0.3, theme.colors.main200)};
`;

const DateTab = styled.div`
    font-size: ${({ theme }) => theme.typography.captionL.fontSize};
    font-weight:  ${({ theme }) => theme.typography.captionL.fontWeight};
    color: ${({ theme }) => theme.colors.gray600};
    margin-left: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Title = styled.h1`
    font-size: ${({ theme }) => theme.typography.bodyL.fontSize};
    font-weight:  ${({ theme }) => theme.typography.bodyL.fontWeight};
    color:  ${({ theme }) => theme.colors.gray1600};
    flex-grow: 1;
    margin: 0.5rem 0.75rem 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ArrowIcon = styled.div`
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.gray800};
    cursor: pointer;
    @media (max-width: 768px) {
        display: block;
        margin-left: 0.5rem;
    }
`;
