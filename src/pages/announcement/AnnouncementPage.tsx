import SearchBar from "@components/announcement/SearchBar.tsx";
import styled from "styled-components";
const AnnouncementPage = ()=>{
    return <Container>
        <SearchBar/>
    </Container>
}
export default AnnouncementPage

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 800px;
`
