"use client"
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/i18n';
import theme from './theme';
import { ColorModeScript } from '@chakra-ui/react';
import '@/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            {children}
          </I18nextProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}