import Notice from "@components/home/Notice.tsx";
import styled from "styled-components";
const notices = [
    { title: "[CEO/인사담당자] 공정채용 누리집 이용은 이렇게!", date: "2024.12.10", isNew: true },
    { title: "[CEO/인사담당자] 공정채용 누리집 이용은 이렇게!", date: "2024.12.10", isNew: true },
    { title: "[CEO/인사담당자] 공정채용 누리집 이용은 이렇게!", date: "2024.12.10", isNew: false },
    { title: "[CEO/인사담당자] 공정채용 누리집 이용은 이렇게!", date: "2024.12.10", isNew: false },
];
const NoticeList = () => {
    return (
        <ListContainer>
            {notices.map((notice, index) => (
                <Notice key={index} {...notice} />
            ))}
        </ListContainer>
    );
};
export default NoticeList

const ListContainer = styled.div`
    margin:1rem
`
