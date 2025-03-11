import {  useEffect } from "react";
import styled from "styled-components";
import WriteEditor from "@components/announcement/write/WriteEditor";
import { theme } from "@styles/theme";
import PostButton from "@components/announcement/PostButton";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAnnouncementStore } from "@store/announcementStore"; // zustand로 관리하는 경우

const AnnouncementEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // 수정할 게시글 id
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const TOKEN = import.meta.env.VITE_TOKEN;

    // zustand나 로컬 state에 저장된 제목, 내용을 사용
    const { title, content, setTitle, setContent } = useAnnouncementStore();

    // 페이지가 로드되면 기존 데이터를 가져와서 입력창에 채움
    useEffect(() => {
        if (id) {
            axios
                .get(`${BaseUrl}/v1/notice`, {
                    headers: {
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    params: { id: id },
                })
                .then((res) => {
                    if (res.status === 200 && res.data.success) {
                        const data = res.data.data;
                        setTitle(data.title);
                        setContent(data.content);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert("게시글 데이터를 불러오는 데 실패했습니다.");
                });
        }
    }, [id, BaseUrl, TOKEN, setTitle, setContent]);

    const handleEdit = async () => {
        try {
            const editNoticeRequest = {
                title,
                content,
            };

            const formData = new FormData();
            formData.append(
                "editNoticeRequest",
                new Blob([JSON.stringify(editNoticeRequest)], {
                    type: "application/json",
                })
            );

            // PUT 메소드로 게시글 수정 (URL은 id를 포함하거나 query parameter로 전달)
            await axios.put(`${BaseUrl}/v1/notice/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${TOKEN}`

                },
                params: { id: id },
            }).then((res) => {
                if (res.status === 200) {
                    alert("수정에 성공했습니다.");
                    navigate("/announcement");
                }
            });
        } catch (error) {
            console.error(error);
            alert("수정에 실패했습니다.");
        }
    };

    return (
        <Container>
            <Title>게시글 수정하기</Title>
            <TitleInput
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <WriteEditor content={content} setContent={setContent} />
            <PostButton onClick={handleEdit}  />
        </Container>
    );
};

export default AnnouncementEditPage;

/* ===== Styled-Components ===== */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

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
