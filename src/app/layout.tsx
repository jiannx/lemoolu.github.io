import * as React from 'react';
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <GoogleAnalytics gaId="G-E7F7XTH2Y0" />
      </body>
    </html>
  )
}