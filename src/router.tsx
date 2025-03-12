import { createBrowserRouter } from "react-router-dom";
import UploadPage from "@pages/upload/UploadPage.tsx";
import HeaderLayout from "@components/layout/HeaderLayout.tsx";
import HomePage from "@pages/home/home.tsx";
import SearchPage from "@pages/search/searchPage.tsx";
import Login from "@pages/login/Login";
import UserSettingPage from "@pages/userSetting/UserSettingPage";
import AnnouncementPage from "@pages/announcement/AnnouncementPage.tsx";
import AnnouncementWritePage from "@pages/announcement/AnnouncementWritePage.tsx";
import MyPage from "@pages/mypage/Mypage";
import AnnouncementDetailPage from "@pages/announcement/AnnouncementDetailPage.tsx";
import AnnouncementEditPage from "@pages/announcement/AnnouncementEditPage.tsx";
import ReconciliationPage from "@pages/reconciliation/ReconciliationPage.tsx";
import PwSettingPage from "@pages/pwSetting/PwSettingPage";

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
      {path:"/", element : <Login/>},
    {
        path: "/announcement",
        element: <HeaderLayout />,
        children: [
            { path: "", element: <AnnouncementPage /> },
            { path: "write", element: <AnnouncementWritePage /> },
            { path: ":id", element: <AnnouncementDetailPage /> },
        ],
    },
    {
        path: "/announcement/edit/:id",
        element: <HeaderLayout />,
        children: [{ path: "", element: <AnnouncementEditPage /> }]
    },
    {
      path: "/mypage",
      element: <HeaderLayout />,
      children: [{ path: "", element: <MyPage /> }]
    },
    {
        path: "/reconciliation",
        element: <HeaderLayout />,
        children: [{ path: "", element: <ReconciliationPage /> }]
    },
  {
    path: "/mypage/pw-setting",
    element: <HeaderLayout />,
    children: [{ path: "", element: <PwSettingPage /> }]
    },
    {
        path: "/reconciliation",
        element: <HeaderLayout />,
        children: [{ path: "", element: <ReconciliationPage /> }]
    },
]);

export default router;
