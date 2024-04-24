import React from "react";
import Header from './Header';
import Bottom from './Bottom';
import Container from "../Container";
import { Box } from '@chakra-ui/react';

export default function Template({
  children,
  isFull = false,
}: {
  children: React.ReactNode;
  isFull?: boolean;
}) {
  return (
    <>
      <Header />
      {isFull ?
        children :
        <Container>
          {children}
        </Container>
      }
      <Bottom />
    </>
  )
}