import styled from "styled-components";
import ArrowRight from "@assets/icons/arrowRightIcon.svg";


interface CardProps{
    title: string;
    bgColor?: string;
    buttonText?: string;
    imageSrc?: string;
    onButtonClick?: () => void;
    color?:string;
}

const Card = ({title,bgColor,buttonText,imageSrc, onButtonClick,color}:CardProps)=>{
    return ( <CardContainer $bgColor={bgColor}>
        <Title $color={color}>{title}</Title>
        <CardContent>
            <CardImage src={imageSrc} alt={title} />
            <CardButton $color={color} $bgColor={bgColor} onClick={onButtonClick}>{buttonText} <Arrow>
                <img
                src={ArrowRight}
                alt="ArrowRight Icon"
                style={{width: "1.5rem", height: "auto"}}
            /></Arrow></CardButton>
        </CardContent>
    </CardContainer>)
}
export default Card


const CardContainer = styled.div<{ $bgColor?: string }>`
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
    margin:1rem;
    width: 32rem;
    height: 14.5rem;
    border-radius: 8px;
    background-color: ${({ $bgColor }) => $bgColor};
    @media (max-width: 768px) {
        width: 100%; 
        max-width: 20rem; 
        margin: 0.5rem auto; 
        padding: 1rem;
    }
`;
const CardContent = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    gap: 1rem;
    @media (max-width: 768px) {
        flex-direction: column; /* 모바일에서는 세로 정렬 */
        align-items: center;
    }
`;
const Title = styled.h2<{ $color?: string }>`
    height: 3rem;
    margin-left: 2rem;
    color: ${({ $color }) => $color};
    font-size: ${({ theme }) => theme.typography.headlineM.fontSize};
    font-weight: ${({ theme }) => theme.typography.headlineM.fontWeight};
    line-height: ${({ theme }) => theme.typography.headlineL.lineHeight};
    @media (max-width: 768px) {
        margin: 0;
    }
`;

const CardImage = styled.img`
    width: 100%;
    max-width: 180px;
    height: auto;
    align-self: flex-start;
`;


const CardButton = styled.button<{ $color?: string,$bgColor?: string }>`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.8rem 4.5rem;
    white-space: nowrap;
    align-self: flex-end;
    background-color: ${({ $color }) => $color};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.buttonM.fontSize};
    font-weight: ${({ theme }) => theme.typography.buttonM.fontWeight};
    border: none;
    border-radius: 12px 12px 12px 4px;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadows.shadow100};
    &:hover {
        background-color:  ${({ $bgColor }) => $bgColor};
    }
    @media (max-width: 768px) {
        display: none;
    }
`;

const Arrow = styled.span`
    
`;
