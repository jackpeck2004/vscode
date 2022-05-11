import {
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ComponentIsLoading } from "components/ComponentIsLoading";
import { toDate } from "lib/functions";
import { Pr, Prs } from "lib/types";
import { ErrorWhileFetching } from "pages";
import { useState } from "react";
import { Filter as FilterButtonAndMenu } from "./filter";
import { TableRow } from "./TableRow";

const ALL_PRS_QUERY = gql`
  query Prs($quantity: Int!, $lastIdx: String!) {
    prs(first: $quantity, after: $lastIdx) {
      nodes {
        id
        title
        content
        date
        prFiles {
          subject
          date
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const PrTable = () => {
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [paging, _setPaging] = useState<boolean>(false);
  const [prs, setPrs] = useState<Pr[]>([]);
  const [filterSubject, setFilterSubject] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loading = false;
  const error = null;
  const data = {prs: {nodes: [], pageInfo: {hasNextPage: false, endCursor: ""}}};

  if (loading || isLoading) return <ComponentIsLoading />;

  if (error || !data) {
    console.error("Error while fetching prs", error);
    return <ErrorWhileFetching />;
  }

  let tmp = [...data.prs.nodes];

  if (!prs.length) {
    setPrs(tmp);
  }

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
      {paging && (
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
      )}
    </VStack>
  );
};
