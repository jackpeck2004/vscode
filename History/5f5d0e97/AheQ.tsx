import { useAuth } from "hooks/useAuth";
//import { useRouter } from "next/router";
import Error from "next/error";
import { Sidebar } from "components/AdminSidebar";
import { Box } from "@chakra-ui/react";


export default function AdminPage() {
  const user = useAuth();
  //const router = useRouter();

  if (!user) {
    return <Error statusCode={500} />
  }

  return (
    <main>
      <Sidebar />
      <Box minH={"100vh"}>
        <h1>Admin Page</h1>
        </Box>
    </main>
  )
}
