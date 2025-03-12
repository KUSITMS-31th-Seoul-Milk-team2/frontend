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
    width: 100%; // 추가: 컨테이너의 전체 너비 사용
    border-radius: 8px;
    padding: 0.7rem;
    background-color: ${({ $bgColor }) => $bgColor};
    flex-wrap: wrap;
    overflow: hidden; // 추가: 내부 콘텐츠가 넘치지 않도록 설정

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        margin: 0.5rem;
        max-width: 100%; // 변경: calc 대신 100%로 단순화
    }
`;

const CardContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-wrap: wrap; // 추가: 콘텐츠가 넘칠 경우 줄바꿈 허용

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
    justify-content: center;
    align-items: center;
    width: auto;
    min-width: min(14rem, 100%); // 변경: 컨테이너 너비를 넘지 않도록 설정
    max-width: 13rem;
    height: 3rem;
    padding: 0 1rem; // 패딩 축소
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
        background-color: ${({ $bgColor }) => $bgColor};
    }

    @media (max-width: 1024px) {
        max-width: min(12rem, 100%); // 변경: 컨테이너 너비를 넘지 않도록 설정
        padding: 0 1rem;
    }

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%; // 변경: 모바일에서는 가득 차도록
        min-width: 0; // 추가: 최소 너비 제한 해제
        padding: 0.5rem 1rem;
        margin-right: 0; // 추가: 오른쪽 여백 제거
        text-align: center;
    }
`;
const Arrow = styled.span`
    display: flex;
    align-items: center;
`;
