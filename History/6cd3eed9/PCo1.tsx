import { Box, Flex } from "@chakra-ui/react"
import Link from "next/link"

export const Sidebar = () => {
  return (
    <Flex
    pos={"sticky"}
    top={100}
    h={"85vh"}
    borderRadius={10}
    bg={"gray.100"}
    shadow="lg"
    w={250}
    style={{ zIndex: -3 }}
    >
      <ul>
        <Link href="/"><li>prs</li></Link>
      </ul>
    </Flex>
  )
}
