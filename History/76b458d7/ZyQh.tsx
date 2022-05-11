import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HOME_URL, SERVER_URI } from "lib/constants";
import { Pr } from "lib/types";
import { PrTable } from "components";

import "focus-visible/dist/focus-visible";

export async function getServerSideProps(ctx: any) {
  const prs = await fetchPrs();
  const res = await fetch(`${SERVER_URI}/prs`);
  const prs: Pr[] = await res.json();
  return {
    props: {
      prs
    }
  }
}

export default function IndexPage({ prs }: { prs: Pr[] }) {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Benvenuti nel <br />
            <Text as={"span"} color={"twin.500"}>
              Media Center
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            L'archivo unico per tutti i comunicati stampa pubblicati da{" "}
            <Button
              variant="link"
              colorScheme="blue"
              size="sm"
              onClick={() => window.open(HOME_URL, "_blank")}
            >
              T.W.I.N srl
            </Button>
          </Text>
        </Stack>
        <PrTable prs={prs}/>
      </Container>
    </>
  );
}
