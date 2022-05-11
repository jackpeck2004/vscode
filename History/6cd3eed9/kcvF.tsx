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

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

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
          {navItem.label}
        </NavItem>
      ))}
    </Box>
  )
}
