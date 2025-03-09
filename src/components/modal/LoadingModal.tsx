import styled from "styled-components";
import {ClipLoader} from "react-spinners";
import {theme} from "@styles/theme.ts";

interface LoadingProps{
    content:string;
    subContent?:string;
}

const LoadingModal = ({content,subContent}:LoadingProps) =>{
    return (<ModalContainer>

        <ClipLoader
            cssOverride={{
                borderWidth: "4px", // 원하는 굵기로 설정

            }}
                    color={"#009857"}
                    size={25}
                    speedMultiplier={0.6}/>
        <LoadingContent>{content}</LoadingContent>
        <LoadingSubContent>{subContent}</LoadingSubContent>
    </ModalContainer>)
}
export default LoadingModal

const ModalContainer = styled.div`
    border: 1px solid ${({theme})=>theme.colors.gray300};
    display: flex;
    width: 380px;
    height: 180px;
    padding: 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;
const LoadingContent = styled.h2`
    color: ${theme.colors.gray1600};
    font-size: ${theme.typography.headlineM.fontSize};
    font-weight: ${theme.typography.headlineM.fontWeight};
`;

const LoadingSubContent = styled.h3`
    margin : 0;
    color: ${theme.colors.gray800};
    font-size: ${theme.typography.bodyL.fontSize};
    font-weight: ${theme.typography.bodyL.fontWeight};
`;

