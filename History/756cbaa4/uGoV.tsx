import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "hooks/useAuth";
import { HOME_URL } from "lib/constants";
import { ReactNode } from "react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

type FooterLinkSection = {
  title: string;
  links: { title: string; ref: string }[];
};

export const Footer: React.FC<any> = () => {
  const user = useAuth();

  const footerLinkSections: FooterLinkSection[] = [
    {
      title: "explore",
      links: [
        {
          title: "About",
          ref: `${HOME_URL}/about`,
        },
        {
          title: "Services",
          ref: `${HOME_URL}/servizi`,
        },
        {
          title: "Team",
          ref: `${HOME_URL}/team-partners`,
        },
        {
          title: "Contact us",
          ref: `${HOME_URL}/contattaci`,
        },
      ],
    },
    {
      title: "follow us",
      links: [
        {
          title: "LinkedIn",
          ref: "https://www.linkedin.com/company/t-w-i-n-s-r-l/",
        },
      ],
    },
    {
      title: "contact us",
      links: [
        {
          title: "+39 335 7737417",
          ref: "tel:+39-335-7737417",
        },
        {
          title: "mara@twin.services",
          ref: "mailto:mara@twin.services",
        },
      ],
    },
    {
      title: "legal",
      links: [
        {
          title: "Cookie Policy",
          ref: `${HOME_URL}/cookie-policy`,
        },
        {
          title: "Privacy Policy",
          ref: `https://www.iubenda.com/privacy-policy/20268065`,
        },
      ],
    },
  ];

  if (user) return null;
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={8}>
          {footerLinkSections.map((footerLinkSection) => {
            const lower = footerLinkSection.title.toLowerCase();
            const arr = lower.split(" ");
            const formatted = arr.map(
              (word) => word.charAt(0).toUpperCase() + word.slice(1)
            );
            const sectionTitle = formatted.join(" ");
            return (
              <Stack align="flex-start" key={sectionTitle}>
                <ListHeader>{sectionTitle}</ListHeader>
                {footerLinkSection.links.map((footerLink) => (
                  <Link href={footerLink.ref} key={footerLink.ref}>{footerLink.title}</Link>
                ))}
              </Stack>
            );
          })}
          <Stack align="flex-start">
            <ListHeader>Company</ListHeader>
            <ul style={{ listStyle: "none", lineHeight: "2" }}>
              <li>T.W.I.N S.R.L.</li>
              <li>TAX / VAT IT05012410261</li>
              <li>REA TV – 418453</li>
              <li>TREVISO</li>
              <li>MILANO</li>
            </ul>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
        </Flex>
        <Text pt={6} fontSize={"sm"} textAlign={"center"}>
          © {new Date().getFullYear()} T.W.I.N All rights reserved
        </Text>
      </Box>
    </Box>
  );
};
