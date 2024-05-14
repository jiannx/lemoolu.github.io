"use client"
import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/i18n';
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </I18nextProvider>
      </body>
    </html>
  )
}