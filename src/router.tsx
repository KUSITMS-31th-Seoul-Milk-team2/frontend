import { createBrowserRouter } from "react-router-dom";
import Layout from "./component/layout";
import HomePage from "./page/home";
import SearchPage from "./page/searchPage";
const router = createBrowserRouter([
    {
        path: "/home",
        element: <Layout />,
        children: [{ path: "", element: <HomePage /> }]
      },
      {
        path: "/search",
        element: <Layout />,
        children: [{ path: "", element: <SearchPage /> }]
      },
]);

export default router;