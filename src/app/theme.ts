import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    primary: "#D23669",
    secondary: "#F4D0B0",
    contrast: "#05A8B4",
  },
});

export default theme;
