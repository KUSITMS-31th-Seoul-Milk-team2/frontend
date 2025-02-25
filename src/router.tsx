import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";
import HomePage from "./page/home";
const router = createBrowserRouter([
    {
        path: "/home",
        element: <Layout />,
        children: [{ path: "", element: <HomePage /> }]
      },
]);

export default router;