import { extendTheme, theme as baseTheme, } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props: any) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'black')(props),
        lineHeight: 'base',
      },
    }),
  },
  colors: {
    white: '#fff',
    black: '#000',
    // primary: "#D23669",
    // secondary: "#F4D0B0",
    // contrast: "#05A8B4",
    brand: baseTheme.colors.red,
    gray: {
      50: '#F9F9F9',
      100: '#EEE',
      200: '#ccc',
      600: '#555',
      700: '#333',
      800: '#222',
      900: '#111',
    },
  },
  semanticTokens: {
    colors: {
      gray: {
        default: 'gray.100',
        _dark: 'gray.600',
      },
      lightGray: {
        default: 'gray.100',
        _dark: 'gray.800',
      },
      dark: {
        default: '#000',
        _dark: '#FFFFFF',
      },
      white: {
        default: '#FFFFFF',
        _dark: '#000',
      },
    },
  },
});

export default theme;
