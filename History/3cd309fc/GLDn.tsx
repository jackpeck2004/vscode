import {
  Flex,
  Table,
  Tbody, Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import { TableRow } from "./TableRow";

export const PrTable = () => {

  return (
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
            if (filterSubject && filterSubject !== pr.prFiles.subject)
              return null;
            return <TableRow pr={pr} />;
          })}
        </Tbody>
      </Table>
      {/* {paging && (
        <Flex justify={{ base: "center" }} align={{ base: "center" }}>
          <Button
            onClick={async () => {
              //   setIsLoading(true);
              //   const test = fetchMore({ variables: {
              //     lastIdx: data.prs.pageInfo?.endCursor
              //   }})
              //  const t = await test;
              //  setPrs(t.data.prs.nodes)
              //  setIsLoading(false)
            }}
          >
            Pevious Page
          </Button>
          <Text mx={50}>
            {page} - {hasNextPage.toString()}
          </Text>
          <Button
            onClick={async () => {
              setIsLoading(true);
              setPage(page + 1);
              const test = fetchMore({
                variables: {
                  lastIdx: data.prs.pageInfo?.endCursor,
                },
              });

              const t = await test;
              setPrs(t.data.prs.nodes);
              console.log(t);
              if (typeof t.data.prs.pageInfo?.hasNextPage !== "undefined") {
                console.log(t.data.prs.pageInfo?.hasNextPage);
                setHasNextPage(t.data.prs.pageInfo?.hasNextPage);
              }
              setIsLoading(false);
            }}
            disabled={!hasNextPage}
          >
            Next Page
          </Button>
        </Flex>
      )} */}
    </VStack>
  );
};
