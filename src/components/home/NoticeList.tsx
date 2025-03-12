import  { useState, useEffect } from "react";
import Notice from "@components/home/Notice";
import styled from "styled-components";
import token from "@utils/token.tsx";

interface NoticeType {
    id:number;
    title: string;
    createdAt: string;
}

const NoticeList = () => {
    const [notices, setNotices] = useState<NoticeType[]>([]);
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        token
            .get(`${BaseUrl}/v1/notice/list`,{headers: {
                    Authorization: `Bearer ${token}`,
                },})
            .then((res) => {
                if (res.status === 200 && res.data.success) {
                    const allNotices: NoticeType[] = res.data.data.content;
                    const recentNotices = allNotices.slice(0, 4);
                    setNotices(recentNotices);
                }
            })
            .catch((err) => {
                console.error("공지사항 불러오기 실패:", err);
            });
    }, [BaseUrl]);

    return (
        <ListContainer>
            {notices.map((notice, index) => (
                <Notice key={index} {...notice} />
            ))}
        </ListContainer>
    );
};

export default NoticeList;

const ListContainer = styled.div`
    width: 100%;
`;
