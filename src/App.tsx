import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import {theme} from "@styles/theme.ts";
import router from "./router";
import { CookiesProvider } from 'react-cookie';

function App() {
    return (
        <ThemeProvider theme={theme}>
           <CookiesProvider>
               <RouterProvider router={router} />
           </CookiesProvider>
        </ThemeProvider>
    );
}

export default App
