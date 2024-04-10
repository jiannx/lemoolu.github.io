import React from "react";
import { Container } from "@chakra-ui/react";

export default function _Container(props: any) {
  return (
    <Container {...props} maxW="6xl">
      {props.children}
    </Container>
  );
}
