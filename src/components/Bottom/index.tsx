import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { Container } from '@/components';

export default function Bottom({
  h
}: {
  h: string;
}) {
  return (
    <Box>
      <Container>
        <Center h={h} fontSize={14}>
          Personal blog by LemooLu. Powered by NextJS
        </Center>
      </Container>
    </Box>
  )
}