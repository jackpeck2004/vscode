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
        <VStack mb={100}>
          <Flex w={"100%"}>
            <Flex flex={{ base: 1 }} justify={{ base: "end" }}>
              {/* <FilterButtonAndMenu
            filterSubject={filterSubject}
            setFilterSubject={setFilterSubject}
          /> */}
            </Flex>
          </Flex>
          <Table mb={100}>
            <Thead>
              <Tr>
                <Th color="twin.500">Soggetto</Th>
                <Th color="twin.500">Data</Th>
                <Th color="twin.500">Titolo</Th>
              </Tr>
            </Thead>
            <Tbody>
              {prs.map((pr) => {
                // if (filterSubject && filterSubject !== pr.prFiles.subject)
                //   return null;
                return <TableRow pr={pr} />;
              })}
            </Tbody>
          </Table>
        </VStack>
      </Box>
    </main>
  );
}