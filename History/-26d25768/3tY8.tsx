import { Tr, Td } from "@chakra-ui/react";
import slugify from "@sindresorhus/slugify";
import { Pr } from "lib/types";
import { useNavigate } from "react-router-dom";

export const TableRow = ({ pr }: { pr: Pr }) => {
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
      <Td width="20%">{new Date(Date.parse(pr.date)).toLocaleDateString()}</Td>
      <Td>{pr.title}</Td>
    </Tr>
  );
};
