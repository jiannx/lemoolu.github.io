import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { Container } from '@/components';

export default function Bottom() {
  return (
    <Box>
      <Container>
        <Center h={'100px'} fontSize={14}>
          © 2024 by LemoooLu
        </Center>
      </Container>
    </Box>
  )
}