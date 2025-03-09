import styled from "styled-components";

interface SelectionPopupProps {
    IconImg?: string;
    Content: string;
    SubContent?: string;
    PrimaryBtnContent: string;
    SecondaryBtnContent: string;
}

const SelectionPopup = ({
                            IconImg,
                            Content,
                            SubContent,
                            PrimaryBtnContent,
                            SecondaryBtnContent,
                        }: SelectionPopupProps) => {
    return (
        <ModalContainer>
            {IconImg && <Icon src={IconImg} alt="icon" />}
            <ModalContent>{Content}</ModalContent>
            {SubContent &&  <SubModalContent>{SubContent}</SubModalContent>}
            <ButtonContainer>
                <SecondaryButton>{SecondaryBtnContent}</SecondaryButton>
                <PrimaryButton >
                    {PrimaryBtnContent}
                </PrimaryButton>
            </ButtonContainer>
        </ModalContainer>
    );
};

export default SelectionPopup;

const ModalContainer = styled.div`
    border: 1px solid ${({theme})=>theme.colors.gray300};
    display: flex;
    width: 380px;
    height: 180px;
    padding: 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const ModalContent = styled.p`
    font-size: 16px;
    text-align: center;
    gap: 1px;
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
    background-color: ${({theme})=>theme.colors.main200};
    color: ${({theme})=>theme.colors.gray100};
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
  background-color: ${({theme})=>theme.colors.gray200};
  color: ${({theme})=>theme.colors.gray1600};
  border: 1px solid ${({theme})=>theme.colors.gray200};;
  padding: 8px 16px;
  border-radius: 1rem;
  cursor: pointer;
`;
