import { createBrowserRouter } from "react-router-dom";
import UploadPage from "@pages/upload/UploadPage.tsx";
import HeaderLayout from "@components/layout/HeaderLayout.tsx";
import HomePage from "@pages/home/home.tsx";
import SearchPage from "@pages/search/searchPage.tsx";
import Login from "@pages/login/Login";
import UserSettingPage from "@pages/userSetting/UserSettingPage";
import AnnouncementPage from "@pages/announcement/AnnouncementPage.tsx";
import AnnouncementWritePage from "@pages/announcement/AnnouncementWritePage.tsx";
const router = createBrowserRouter([
    {
        path: "/upload",
        element: <HeaderLayout />,
        children: [{ path: "", element: <UploadPage /> }]
    },
    {
        path: "/home",
        element: <HeaderLayout />,
        children: [{ path: "", element: <HomePage /> }]
      },
      {
        path: "/search",
        element: <HeaderLayout />,
        children: [{ path: "", element: <SearchPage /> }]
      },
      {
        path: "/user-setting",
        element: <HeaderLayout />,
        children: [{ path: "", element: <UserSettingPage /> }]
      },
      {path:"/login", element : <Login/>},
    {
        path: "/announcement",
        element: <HeaderLayout />,
        children: [{ path: "", element: <AnnouncementPage /> }]
    },
    {
        path: "/announcement/write",
        element: <HeaderLayout />,
        children: [{ path: "", element: <AnnouncementWritePage /> }]
    },
]);

export default router;
