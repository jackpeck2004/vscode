import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AppProps } from "next/app";
function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ThemeProvider>
      <CSSReset />
      <ColorModeScript />
      <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  );
}
export default App;
