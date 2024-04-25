import React from "react";
import { Container } from "@chakra-ui/react";

export default function _Container(props: any) {
  return (
    <Container maxW="7xl" {...props}>
      {props.children}
    </Container>
  );
}
