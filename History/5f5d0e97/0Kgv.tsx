import { useAuth } from "hooks/useAuth";
//import { useRouter } from "next/router";
import Error from "next/error";
import { Sidebar } from "components/AdminSidebar";


export default function AdminPage() {
  const user = useAuth();
  //const router = useRouter();

  if (!user) {
    return <Error statusCode={500} />
  }

  return (
    <main>
      <Sidebar>
      </Sidebar>
    </main>
  )
}
