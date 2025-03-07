import styled from "styled-components";
import ArrowRight from "@assets/icons/rightArrowIcon.svg";

interface CardProps{
    title: string;
    bgColor?: string;
    buttonText?: string;
    imageSrc?: string;
    onButtonClick?: () => void;
    color?:string;
}

const Card = ({title,bgColor,buttonText,imageSrc, onButtonClick,color}:CardProps)=>{
    return (
        <CardContainer $bgColor={bgColor}>
            <Title $color={color}>{title}</Title>
            <CardContent>
                <CardImage src={imageSrc} alt={title} />
                <CardButton
                    $color={color}
                    $bgColor={bgColor}
                    onClick={onButtonClick}
                >
                    {buttonText}
                    <Arrow>
                        <img
                            src={ArrowRight}
                            alt="ArrowRight Icon"
                            style={{width: "1.5rem", height: "auto"}}
                        />
                    </Arrow>
                </CardButton>
            </CardContent>
        </CardContainer>
    )
}
export default Card

const CardContainer = styled.div<{ $bgColor?: string }>`
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
    margin: 0.5rem;
    max-width: 50rem;
    border-radius: 8px;
   padding:0.7rem;
    background-color: ${({ $bgColor }) => $bgColor};
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1rem;
        margin: 0.5rem;
        max-width: calc(100% - 2rem);
    }
`;

const CardContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
`;

const Title = styled.h2<{ $color?: string }>`
    margin-left: 2rem;
    color: ${({ $color }) => $color};
    font-size: ${({ theme }) => theme.typography.headlineM.fontSize};
    font-weight: ${({ theme }) => theme.typography.headlineM.fontWeight};
    line-height: ${({ theme }) => theme.typography.headlineL.lineHeight};

    @media (max-width: 768px) {
        margin: 0 0 1rem 0;
        text-align: center;
        font-size: ${({ theme }) => theme.typography.headlineS.fontSize};
        font-weight: ${({ theme }) => theme.typography.headlineS.fontWeight};
        line-height: ${({ theme }) => theme.typography.headlineS.lineHeight};
    }
`;

const CardImage = styled.img`
    width: 100%;
    max-width: 180px;
    height: auto;
    align-self: flex-start;

    @media (max-width: 768px) {
        max-width: 120px;
        align-self: center;
    }
`;

const CardButton = styled.button<{ $color?: string, $bgColor?: string }>`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    max-width: 20rem;
    height: 3rem;
    padding: 0 5rem;
    margin-top: 3rem;
    margin-left: 1rem;
    white-space: nowrap;
    background-color: ${({ $color }) => $color};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.buttonM.fontSize};
    font-weight: ${({ theme }) => theme.typography.buttonM.fontWeight};
    border: none;
    border-radius: 12px 12px 12px 4px;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadows.shadow100};

    &:hover {
        background-color: ${({ $bgColor }) => $bgColor};
    }

    @media (max-width: 768px) {
        display: none;
       
    }
`;

const Arrow = styled.span`
    display: flex;
    align-items: center;
`;
