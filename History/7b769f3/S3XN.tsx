import type { NextPage } from "next";
import { ColorModeScript, ChakraProvider, Box } from "@chakra-ui/react";
import { useCustomTheme } from "hooks/useCustomTheme";
import { Footer, Navbar } from "components";
import { useAuth } from "hooks/useAuth";

export default function MyApp ({ Component, pageProps }: { Component: NextPage, pageProps: any }) {
  const theme = useCustomTheme();
  const user = useAuth();

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Box minH="60vh">
          <Component {...pageProps} />
        </Box>
        <Footer style={{ flex: 1 }} />
      </ChakraProvider>
    </>
      )
    }
