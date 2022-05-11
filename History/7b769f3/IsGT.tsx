import type { NextPage } from "next";
import { ColorModeScript, ChakraProvider, Box } from "@chakra-ui/react";
import { useCustomTheme } from "hooks/useCustomTheme";
import { Footer, Navbar } from "components";
import { useAuth } from "hooks/useAuth";
import { useAdminRoute } from "hooks/useAdminRoute";

export default function MyApp ({ Component, pageProps }: { Component: NextPage, pageProps: any }) {
  const theme = useCustomTheme();
  const isOnAdminDashboard = useAdminRoute();

  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <Navbar />
        <Box minH={ !isOnAdminDashboard ? "60vh" : 0}>
          <Component {...pageProps} />
        </Box>
        <Footer style={{ flex: 1 }} />
      </ChakraProvider>
    </>
      )
    }
