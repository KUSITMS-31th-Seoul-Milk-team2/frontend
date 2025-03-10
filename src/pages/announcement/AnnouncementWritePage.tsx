import { useAnnouncementStore } from "@store/announcementStore";
import WriteEditor from "@components/announcement/write/WriteEditor";
import styled from "styled-components";
import { theme } from "@styles/theme";
import PostButton from "@components/announcement/PostButton";
import axios from "axios";


const AnnouncementWritePage = () => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;


    const { title, content, setTitle, setContent } = useAnnouncementStore();

    const handlePost = async () => {
        try {
            // 서버가 요구하는 JSON 형식: { postNoticeRequest: { title, content } }
            // 하지만 실제로는 @RequestPart("postNoticeRequest")를 쓰는 경우,
            // 서버에서 postNoticeRequest라는 "파트" 안에 JSON을 담길 기대하는 경우가 많습니다.
            // 그러므로 FormData에 "postNoticeRequest" 파트를 추가하고, 그 안에 JSON을 넣습니다.

            // 1. 전송할 JSON 객체 구성
            const postNoticeRequest = {
                title,
                content,
            };

            // 2. FormData 생성
            const formData = new FormData();

            // 3. "postNoticeRequest"라는 이름의 파트로 JSON을 추가
            //    Blob을 써서 "application/json" 형태로 감싸야 합니다.
            formData.append(
                "postNoticeRequest",
                new Blob([JSON.stringify(postNoticeRequest)], {
                    type: "application/json",
                })
            );

            // 4. multipart/form-data 전송
            const response = await axios.post(`${BaseUrl}/v1/notice`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiMTAyNiIsImlzcyI6InNlb3VsbWlsayIsImlhdCI6MTc0MTUyMjA4NSwiZXhwIjoxNzQxNjA4NDg1fQ.uzjooL7tihVt2IHVOpxl40o84ucVVJ_ZGHd-eQJAJVlP7GZJMBX2w7a_nndtXnatGOnkzBcpBUyuBMkgSPID1Q`,
                },
            });

            console.log("등록 성공:", response.data);
            alert("공지사항이 등록되었습니다.");
        } catch (error) {
            console.error("등록 실패:", error);
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
