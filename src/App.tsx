import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AppProvider from "./hooks";

import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ChakraProvider>
        <BrowserRouter>
          <AppProvider>
                <Router />
          </AppProvider>
        </BrowserRouter>
    
        <GlobalStyle />
      </ChakraProvider>
    
    </ThemeProvider>

  )
}

