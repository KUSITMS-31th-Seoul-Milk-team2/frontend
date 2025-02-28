import { createGlobalStyle } from "styled-components";
import { RouterProvider } from "react-router-dom";
import router from "./router";


const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body, #root {
    width: 100%;
    height: 100%;
    max-width: 1440px;
      min-width: 480px;
    max-height: 1024px;
      min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

function App() {
    return (
        <>
            <GlobalStyles />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
