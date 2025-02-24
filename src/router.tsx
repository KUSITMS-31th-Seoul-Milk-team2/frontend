import { createBrowserRouter } from "react-router-dom";
import UploadPage from "./pages/upload/UploadPage.tsx";
const router = createBrowserRouter([
    {
        path: "/upload",
        element: <UploadPage />,
    },
]);

export default router;
