import { Heading, Text, Flex } from "@chakra-ui/react";
import { CardItem } from "../CardItem";

export default function Blog({
  title,
  desc,
  data,
  href,
}: {
  title: string;
  desc?: string;
  data?: string;
  href?: string;
}) {
  return (
    <CardItem tag="blog" link={href}>
      <Flex direction={'column'} h={'100%'} justifyContent={'flex-end'}>
        <Text fontSize={'xs'}>{data}</Text>
        <Heading size={'lg'}>{title}</Heading>
        <Text>{desc}</Text>
      </Flex>
    </CardItem>
  );
}