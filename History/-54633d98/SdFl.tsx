import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useCustomTheme } from "../lib/hooks";
function App({ Component, pageProps }: AppProps): React.ReactNode {
  const theme = useCustomTheme();
  return (
    <main>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </main>
  );
}
export default App;
