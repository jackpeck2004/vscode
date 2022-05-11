import type { NextPage } from "next";
import { ColorModeScript, ChakraProvider, Box } from "@chakra-ui/react";
import { useCustomTheme } from "hooks/useCustomTheme";
import { Footer, Navbar } from "components";
import { useAuth } from "hooks/useAuth";

export default function MyApp ({ Component, pageProps }: { Component: NextPage, pageProps: any }) {
  const theme = useCustomTheme();

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Navbar />
        <Box minH="60vh" pt={"100px"}>
          <Component {...pageProps} />
        </Box>
        <Footer style={{ flex: 1 }} />
      </ChakraProvider>
    </>
      )
    }
