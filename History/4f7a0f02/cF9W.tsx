import type { NextPage } from 'next'
import type { Pr } from "../lib/types";
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
import { PrTable } from "../components/PrTable";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:5001/prs");
  const data: Pr[] = await res.json()

  return {
    props: {
      prs: data
    }, // will be passed to the page component as props
  }
}

const Home: NextPage<{prs: Pr[]}> = ({ prs }) => {
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
            Welcome to the <br />
            <Text as={"span"} color={"twin.500"}>
              Media Center
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            The all in one repository of all press releases published by{" "}
            <Button
              variant="link"
              colorScheme="blue"
              size="sm"
              onClick={() => window.open("https://twin.services", "_blank")}
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

export default Home
