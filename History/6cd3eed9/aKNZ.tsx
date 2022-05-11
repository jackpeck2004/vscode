import { Box, Flex } from "@chakra-ui/react"
import { NavItem } from "lib/types"
import Link from "next/link"

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Comunicati Stampa",
    href: "/admin/dashboard",
  }
]

export const Sidebar = () => {
  return (
    <Box
    pos={"sticky"}
    top={100}
    h={"80vh"}
    borderRadius={10}
    bg="white"
    shadow="lg"
    w={250}
    >

    </Box>
  )
}
