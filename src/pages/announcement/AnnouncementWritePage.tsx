import WriteEditor from "@components/announcement/write/WriteEditor.tsx";
import styled from "styled-components";
import {theme} from "@styles/theme.ts";
import PostButton from "@components/announcement/PostButton.tsx";

const AnnouncementWritePage = () =>{
    return (<Container>
        <Title>{"공지사항 작성하기"}</Title>
        <TitleInput placeholder={"제목을 입력해주세요"}/>
        <WriteEditor/>
        <PostButton/>
    </Container>)
}
export default AnnouncementWritePage

const Title = styled.h1`
    align-self: flex-start;
    margin-left: 2.7rem;
    font-size: ${theme.typography.headlineM.fontSize};
    font-weight: ${theme.typography.headlineM.fontWeight};
`
const TitleInput = styled.input`
    width: 795px; /* 에디터 너비와 동일하게 고정 */
    box-sizing: border-box; /* 패딩을 포함해 전체 너비 계산 */
    margin-left: 2.7rem;
    border: 2px solid ${theme.colors.gray200};
    background-color: ${theme.colors.gray100};
    padding: 12px 20px;
    margin-bottom: 1.2rem;
`;
const Container = styled.div`
    display: flex;
    justify-content: center;
   align-items: center;
    
    flex-direction: column;
`
