import { TWIN_RED } from "./constants";
import { ButtonStyles as Button } from "./styles/components/ButtonStyles";
import { extendTheme } from "@chakra-ui/react";

const twinTheme = extendTheme({
  colors: {
    primary: TWIN_RED,
    twin: {
      100: "#f57795",
      200: "#f36083",
      300: "#f14971",
      400: "#f03360",
      500: TWIN_RED,
      600: "#d61946",
      700: "#be163e",
      800: "#a71437",
      900: "#8f112f",
    },
  },
  components: {
    Button,
  },
  config: {
    useSystemColorMode: true,
    default: "light",
  },
});

export const useCustomTheme = () => {
  return twinTheme;
};
