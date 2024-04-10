import React from "react";
import Header from '../Header';
import Bottom from '../Bottom';
import Container from '../Container';

export default function Page(props: any) {
  return (
    <>
      <Header h="56px" />
      <Container minH={'calc(100vh - 56px - 100px)'}>
        {props.children}
      </Container>
      <Bottom h="100px" />
    </>
  )
}