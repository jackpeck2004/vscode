import { Box, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Footer, Navbar } from "components";
import { useAdminRoute } from "hooks/useAdminRoute";
import { useCustomTheme } from "hooks/useCustomTheme";
import type { NextPage } from "next";

export default function MyApp ({ Component, pageProps }: { Component: NextPage, pageProps: any }) {
  const theme = useCustomTheme();
  const isOnAdminDashboard = useAdminRoute();

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Navbar />
        <Box minH={ !isOnAdminDashboard ? "60vh" : 0} pt={"100px"}>
          <Component {...pageProps} />
        </Box>
        <Footer style={{ flex: 1 }} />
      </ChakraProvider>
    </>
      )
    }
