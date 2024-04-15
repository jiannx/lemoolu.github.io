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
        default: 'gray.200',
        _dark: 'gray.600',
      },
      lightGray: {
        default: 'gray.50',
        _dark: 'gray.800',
      },
      dark: {
        default: '#0B0B0B',
        _dark: '#FFFFFF',
      },
      white: {
        default: '#FFFFFF',
        _dark: '#0B0B0B',
      },
    },
  },
});

export default theme;
