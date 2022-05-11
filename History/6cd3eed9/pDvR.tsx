import { Box, Flex, FlexProps, Icon, Text } from "@chakra-ui/react"
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
    icon: FiUser,
  },
];

interface NavItemProps extends FlexProps {
  navItem: SidebarItem
}
const NavItem = ({ navItem }: NavItemProps) => {
  const { icon, label, href } = navItem;
  return (
    <Link
      href={`${href}`}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "twin.400",
          color: "white",
        }}
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
        {label}
      </Flex>
    </Link>
  );
};

export const Sidebar = () => {
  return (
    <Box
    pos={"sticky"}
    top={100}
    minH={200}
    h={"80vh"}
    maxH={"400px"}
    borderRadius={10}
    bg="white"
    shadow="lg"
    w={250}
    py={10}
    style={{ zIndex: 1}}
    >
      <Text px={4} color={"twin.500"} fontWeight="bold" mb={5}>Admin Dashboard</Text>
      {NAV_ITEMS.map((navItem) => (
        <NavItem key={navItem.href} navItem={navItem} />
      ))}
    </Box>
  )
}
