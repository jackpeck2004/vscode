import type { NextPage } from "next";
import { ColorModeScript, ChakraProvider, Box } from "@chakra-ui/react";
import { useCustomTheme } from "hooks/useCustomTheme";
import { Footer, Navbar } from "components";

export default function MyApp ({ Component, pageProps }) {
  const theme = useCustomTheme();

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Navbar />
        <Box minH="60vh" mt={"100px"}>
          <Component {...pageProps} />
        </Box>
        <Footer style={{ flex: 1 }} />
      </ChakraProvider>
    </>
      )
    }
