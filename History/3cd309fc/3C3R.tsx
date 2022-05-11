import {
  Flex,
  Table,
  Tbody, Th,
  Thead,
  Tr,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TableRow } from "./TableRow";
import { SERVER_URI } from "../../lib/constants";
import { Pr } from "../../lib/types";


export const PrTable = ({ prs }: { prs: Pr[] }) => {

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
            // if (filterSubject && filterSubject !== pr.prFiles.subject)
            //   return null;
            return <TableRow pr={pr} key={pr.id}/>;
          })}
        </Tbody>
      </Table>
    </VStack>
  );
};
