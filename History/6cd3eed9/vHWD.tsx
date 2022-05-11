import { Box, Flex } from "@chakra-ui/react"
import type { NavItem } from "lib/types"
import Link from "next/link"
import type { IconType } from "react-icons/lib"
import { FiHome, FiUser } from "react-icons/fi"

interface SidebarItem extends NavItem {
  icon: IconType
}

const NAV_ITEMS: Array<SidebarItem> = [
  {
    label: "Comunicati Stampa",
    href: "/admin/dashboard",
    icon: FiHome,
  },
  {
    label: "Profile",
    href: "/admin/profile",
    icon: FiHome,
  },
];

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
