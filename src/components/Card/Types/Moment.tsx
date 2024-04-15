import { Flex, Box, Text, Link, Heading } from "@chakra-ui/react";
import { CardItem } from "../CardItem";

export default function Moment({
  title,
  fromTitle,
  fromLink,
}: {
  title: string,
  fromTitle: string,
  fromLink: string,
}) {
  return (
    <CardItem rowSpan={1} colSpan={1} tag="moment">
      <Flex direction={'column'} h={'100%'} justifyContent={'flex-end'}>
        <Box>
          <Heading fontSize={'lg'}>{title}</Heading>
        </Box>
        <Box textAlign={'right'} mt={4}>
          <Link size={'xs'} href={fromLink} target="_blank">--{fromTitle}</Link>
        </Box>
      </Flex>
    </CardItem>
  );
}