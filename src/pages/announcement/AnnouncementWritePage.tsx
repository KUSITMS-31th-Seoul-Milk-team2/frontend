import { useAnnouncementStore } from "@store/announcementStore";
import WriteEditor from "@components/announcement/write/WriteEditor";
import styled from "styled-components";
import { theme } from "@styles/theme";
import PostButton from "@components/announcement/PostButton";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const AnnouncementWritePage = () => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const TOKEN = import.meta.env.VITE_TOKEN;
    const { title, content, setTitle, setContent } = useAnnouncementStore();

    const handlePost = async () => {
        try {
            const postNoticeRequest = {
                title,
                content,
            };

            const formData = new FormData();

            formData.append(
                "postNoticeRequest",
                new Blob([JSON.stringify(postNoticeRequest)], {
                    type: "application/json",
                })
            );

           await axios.post(`${BaseUrl}/v1/notice`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${TOKEN}`,
                },
            }).then((res)=>{
                if(res.status===200){
                    alert("등록에 성공했습니다.");
                    navigate('/announcement');
                }
            });


        } catch (error) {
            console.log(error)
            alert("등록에 실패했습니다.");
        }
    };

    return (
        <Container>
            <Title>공지사항 작성하기</Title>
            <TitleInput
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <WriteEditor content={content} setContent={setContent} />
            <PostButton onClick={handlePost} />
        </Container>
    );
};

export default AnnouncementWritePage;

const Title = styled.h1`
    align-self: flex-start;
    margin-left: 2.7rem;
    font-size: ${theme.typography.headlineM.fontSize};
    font-weight: ${theme.typography.headlineM.fontWeight};
`;

const TitleInput = styled.input`
    width: 795px;
    box-sizing: border-box;
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
`;
