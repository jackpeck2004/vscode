import { mode } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props: any) => ({
      bg: "primary",
      color: "white",
      _hover: {
        bg: mode("twin.300", "twin.700")(props),
      },
    }),
  },
  defaultProps: {},
};
