import { extendTheme, withDefaultColorScheme, theme as baseTheme, } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    black: '#0b0b0b',
    // primary: "#D23669",
    // secondary: "#F4D0B0",
    // contrast: "#05A8B4",
    brand: baseTheme.colors.red,
  },
  semanticTokens: {
    colors: {
      gray: {
        default: 'gray.100',
        _dark: 'gray.700',
      },
    },
  },
});

export default theme;
