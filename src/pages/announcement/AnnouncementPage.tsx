import { useState,useEffect } from "react";
import styled from "styled-components";
import TopSection from "@components/announcement/TopSection";
import SearchBar from "@components/announcement/SearchBar.tsx";
import NoticeList from "@components/announcement/NoticeList.tsx";
import {useCookies} from "react-cookie";
import BottomPagination from "@components/announcement/BottomPagination.tsx";
import WriteButton from "@components/announcement/WriteButton.tsx";
import {useNavigate} from "react-router-dom";
import useNoticeStore from "@store/noticeStore.ts";
import axios from "axios";



const AnnouncementPage = () => {

    const navigate = useNavigate();
    const [isMyPostsOnly, setIsMyPostsOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const [cookies] = useCookies(["accessToken"]);
    const TOKEN = import.meta.env.VITE_TOKEN;
    const {
        notices,

        totalPages,
        setNotices,
        setPagination,
    } = useNoticeStore();

    const handleGetList = () =>{
        console.log(cookies)
        axios.get(`${BaseUrl}/v1/notice/list`,{
            headers: {
                Authorization:  `Bearer ${TOKEN}`,
            },
        })
            .then((res)=>{

               if(res.status===200){
                   const data = res.data.data;
                   console.log(data)
                   setNotices(data.content);
                   setPagination(data.pageNo, data.pageSize, data.totalElements, data.totalPages);
               }
            })
    }


    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);

    };
    const toggleMyPosts = () => {
        setIsMyPostsOnly((prev) => !prev);
    };
    useEffect(() => {
        handleGetList();
    }, []);



    return (
        <Container>
            <SearchBar />
            <TopSection
                totalCount={notices.length}
                onToggleMyPosts={toggleMyPosts}
                isMyPostsOnly={isMyPostsOnly}
            />
            <NoticeList notices={notices} />
            <WriteButton onClick={() => navigate("/announcement/write")} />
            <BottomPagination
                pageCount={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </Container>
    );
};

export default AnnouncementPage;

/* ======= styled-components ======= */
const Container = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;
