import styled from "styled-components";
import ArrowRight from "@assets/icons/arrowRightIcon.svg";

interface CardProps {
    title: string;
    bgColor?: string;
    buttonText?: string;
    imageSrc?: string;
    onButtonClick?: () => void;
    color?: string;
}

const Card = ({ title, bgColor, buttonText, imageSrc, onButtonClick, color }: CardProps) => {
    return (
        <CardContainer $bgColor={bgColor}>
            <Title $color={color}>{title}</Title>
            <CardContent>
                <CardImage src={imageSrc} alt={title} />
                <CardButton $color={color} $bgColor={bgColor} onClick={onButtonClick}>
                    <ButtonContent>
                        <span>{buttonText}</span>
                        <Arrow>
                            <img
                                src={ArrowRight}
                                alt="ArrowRight Icon"
                                style={{ width: "1.5rem", height: "auto" }}
                            />
                        </Arrow>
                    </ButtonContent>
                </CardButton>
            </CardContent>
        </CardContainer>
    );
};

export default Card;

const CardContainer = styled.div<{ $bgColor?: string }>`
    display: flex;
    justify-content: center;
    align-self: center;
    flex-direction: column;
    margin: 0.5rem;
    max-width: 50rem;
    width: 100%;
    border-radius: 8px;
    padding-top: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-bottom: 1.2rem;
    background-color: ${({ $bgColor }) => $bgColor};
    flex-wrap: wrap;
    overflow: hidden;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        margin: 0.5rem;
        max-width: 100%;
    }
`;

const CardContent = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
    width: 70%;
    max-width: 160px;
    height: auto;
    margin-left: 1rem;

    @media (max-width: 768px) {
        max-width: 120px;
        align-self: center;
    }
`;

const CardButton = styled.button<{ $color?: string; $bgColor?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    min-width: min(14rem, 100%);
    max-width: 13rem;
    height: 3rem;
    padding: 0 1rem;
    margin-top: 2rem;
    white-space: nowrap;
    background-color: ${({ $color }) => $color};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.typography.buttonM.fontSize};
    font-weight: ${({ theme }) => theme.typography.buttonM.fontWeight};
    border: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadows.shadow100};
    transition: all 0.3s ease-in-out;

    &:hover {
        opacity: 0.5;
    }


    @media (max-width: 1024px) {
        max-width: min(12rem, 100%);
        padding: 0 1rem;
    }

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        padding: 0.5rem 1rem;
        margin-right: 0;
        text-align: center;
    }
`;


const ButtonContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0;
`;

const Arrow = styled.span`
  display: flex;
  align-items: center;
  color: #ffffff;
`;
