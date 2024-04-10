import React from "react";
import { Header, Bottom, Container } from '@/components';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container minH={'calc(100vh - 56px - 100px)'}>
        {children}
      </Container>
      <Bottom h="100px" />
    </>
  )
}