import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { Sidebar } from "components/AdminSidebar";
import { TableRow } from "components/PrTable/TableRow";
import { useAuth } from "hooks/useAuth";
import { SERVER_URI } from "lib/constants";
import { Pr } from "lib/types";
//import { useRouter } from "next/router";
import Error from "next/error";
import { useRouter } from "next/router";

export async function getServerSideProps(ctx: any) {
  const res = await fetch(`${SERVER_URI}/prs`);
  const prs: Pr[] = await res.json();
  return {
    props: {
      prs,
    },
  };
}

export const AdminTableRow = ({ pr }: { pr: Pr }) => {
  const router = useRouter();
  return (
    <Tr
      _hover={{ background: "gray.50" }}
      cursor="pointer"
      onClick={() => router.push(`/admin/edit/${pr.slug}`)}
      transition="250ms"
      key={pr.id}
    >
      <Td width="20%">{pr.subject}</Td>
      <Td width="20%">{new Date(Date.parse(pr.date)).toLocaleDateString()}</Td>
      <Td>{pr.title}</Td>
    </Tr>
  );
};

export const AdminTable = ({ prs }: { prs: Pr[] }) => {
  return (
    <Box bg="white" borderRadius={10}>
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
                return <AdminTableRow pr={pr} />;
              })}
            </Tbody>
          </Table>
        </VStack>
      </Box>
  );
}

export default function AdminPage({ prs }: { prs: Pr[] }) {
  const user = useAuth();
  //const router = useRouter();

  if (!user) {
    return <Error statusCode={500} />
  }

  return (
    <Flex px={10} bg="gray.100" pt={10}  style={{ zIndex: -100}}>
      <Sidebar />
      <Box minW={200} w={"50vw"}>
        <AdminTable prs={prs} />
      </Box>
    </Flex>
  );
}
