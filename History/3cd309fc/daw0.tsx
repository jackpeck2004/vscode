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

export const PrTable = () => {

  const [prs, setPrs] = useState([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:5001/prs");
    const data = await res.json();
    setPrs(data);
  }

  useEffect(() => {
    fetchData();
  }, [])
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
            return <TableRow pr={pr} />;
          })}
        </Tbody>
      </Table>
    </VStack>
  );
};
