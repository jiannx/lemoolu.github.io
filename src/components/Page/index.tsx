import React from "react";
import Header from './Header';
import Bottom from './Bottom';
import Container from "./Container";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Container minH={'calc(100vh - 56px - 100px)'}>
        {children}
      </Container>
      <Bottom />
    </>
  )
}