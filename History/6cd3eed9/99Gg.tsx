import { Box, Flex } from "@chakra-ui/react"
import type { NavItem } from "lib/types"
import Link from "next/link"

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Comunicati Stampa",
    href: "/admin/dashboard",
    icon: "home",
  },
  {
    label: "Profile",
    href: "/admin/profile"
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
      {NAV_ITEMS.map((navItem) => (
        <NavItem key={navItem.href} icon={navItem.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
