"use client"
import { Heading, Text, Image, Center } from "@chakra-ui/react";
import { CardItem } from "../CardItem";
import { useRef } from "react";
import { useInViewport } from 'ahooks';

export default function Image2({
  url,
}: {
  url: string
}) {
  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);

  return (
    <CardItem p={0}>
      <Center overflow={'hidden'} w={'100%'} h={'100%'} ref={ref}>
        {inViewport && <Image src={url} alt=""></Image>}
      </Center>
    </CardItem>
  );
}