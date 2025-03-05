import { createBrowserRouter } from "react-router-dom";
import UploadPage from "@pages/upload/UploadPage.tsx";
import HeaderLayout from "@components/layout/HeaderLayout.tsx";
import HomePage from "@pages/home/home.tsx";
import SearchPage from "@pages/search/searchPage.tsx";
import Login from "@pages/login/Login";
import AnnouncementPage from "@pages/announcement/AnnouncementPage.tsx";
const router = createBrowserRouter([
    {
        path: "/upload",
        element: <HeaderLayout />,
        children: [{ path: "", element: <UploadPage /> }]
    },
    {
        path: "/",
        element: <HeaderLayout />,
        children: [{ path: "", element: <HomePage /> }]
      },
      {
        path: "/search",
        element: <HeaderLayout />,
        children: [{ path: "", element: <SearchPage /> }]
      },
      {path:"/login", element : <Login/>},
    {
        path: "/announcement",
        element: <HeaderLayout />,
        children: [{ path: "", element: <AnnouncementPage /> }]
    },

]);

export default router;
