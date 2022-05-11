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
import { HOME_URL } from "lib/constants";
import { PrTable } from "components";

export function IndexPage() {
  return (
    <>
    <h1>fjsdlfjkl</h1>
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
              onClick={() => window.open(HOME_URL, "_blank")}
            >
              T.W.I.N srl
            </Button>
          </Text>
        </Stack>
        <PrTable />
      </Container>
    </>
  );
}
