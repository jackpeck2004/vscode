import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { ColorModeScript } from "@chakra-ui/react";
import { AppProps } from "next/app";
function App({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <ThemeProvider>
      <CSSReset />
      <ColorModeScript />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default App;
