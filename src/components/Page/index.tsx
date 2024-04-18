import React from "react";
import Header from '../Header';
import Bottom from '../Bottom';
import Container from '../Container';

export default function Page(props: any) {
  return (
    <>
      <Header />
      <Container>
        {props.children}
      </Container>
      <Bottom />
    </>
  )
}