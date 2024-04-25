import { Heading, Text, Image, Center } from "@chakra-ui/react";
import { CardItem } from "../CardItem";

export default function Image2({
  url,
}: {
  url: string
}) {
  return (
    <CardItem p={0}>
      <Center overflow={'hidden'} w={'100%'} h={'100%'}>
        <Image src={url}></Image>
      </Center>
    </CardItem>
  );
}