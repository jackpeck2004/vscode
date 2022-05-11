import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useCustomTheme } from "../lib/hooks";
function App({ Component, pageProps }: AppProps): React.ReactNode {
  const theme = useCustomTheme();
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
