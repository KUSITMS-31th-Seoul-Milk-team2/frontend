import styled from "styled-components";

interface SelectionPopupProps {
    IconImg?: string;
    Content: string;
    SubContent?: string;
    primaryButton: {
        label: string;
        onClick: () => void;
    };
    secondaryButton?: {
        label: string;
        onClick: () => void;
    };
}

const SelectionPopup = ({
                            IconImg,
                            Content,
                            SubContent,
                            primaryButton,
                            secondaryButton,
                        }: SelectionPopupProps) => {
    return (
        <Overlay>
            <ModalContainer>
                {IconImg && <Icon src={IconImg} alt="icon" />}
                <ModalContent>{Content}</ModalContent>
                {SubContent && <SubModalContent>{SubContent}</SubModalContent>}
                <ButtonContainer>
                    {secondaryButton && (
                        <SecondaryButton onClick={secondaryButton.onClick}>
                            {secondaryButton.label}
                        </SecondaryButton>
                    )}
                    <PrimaryButton onClick={primaryButton.onClick}>
                        {primaryButton.label}
                    </PrimaryButton>
                </ButtonContainer>
            </ModalContainer>
        </Overlay>
    );
};

export default SelectionPopup;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* 회색 반투명 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ModalContainer = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray300};
    background: #fff;
    display: flex;
    width: 380px;
    height: 180px;
    padding: 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    z-index: 10000;
`;

const ModalContent = styled.p`
    font-size: 16px;
    text-align: center;
    white-space: pre-line;
`;

const SubModalContent = styled.p`
    font-size: 16px;
    text-align: center;
`;

const Icon = styled.img`
    width: 40px;
    height: 40px;
`;

const ButtonContainer = styled.div`
    display: flex;
    width: 90%;
    gap: 10px;
    justify-content: space-between;
`;

const PrimaryButton = styled.button`
    background-color: ${({ theme }) => theme.colors.main200};
    color: ${({ theme }) => theme.colors.gray100};
    width: 160px;
    height: 40px;
    border: none;
    padding: 8px 16px;
    border-radius: 1rem;
    cursor: pointer;
`;

const SecondaryButton = styled.button`
  width: 160px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray1600};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: 8px 16px;
  border-radius: 1rem;
  cursor: pointer;
`;
