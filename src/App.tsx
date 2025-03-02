import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import {theme} from "@styles/theme.ts";
import router from "./router";


function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App
