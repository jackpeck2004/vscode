import { Tr, Td } from "@chakra-ui/react";
import slugify from "@sindresorhus/slugify";
import { Pr } from "lib/types";
import { useNavigate } from "react-router-dom";

export const TableRow = ({ pr }: { pr: any }) => {
  const navigate = useNavigate();
  return (
    <Tr
      _hover={{ background: "gray.50" }}
      cursor="pointer"
      onClick={() => navigate(slugify(pr.title))}
      transition="250ms"
      key={pr.id}
    >
      <Td width="20%">{pr.subject}</Td>
      <Td width="20%">{Date.parse(pr.date).toLocaleString()}</Td>
      <Td>{pr.title}</Td>
    </Tr>
  );
};
