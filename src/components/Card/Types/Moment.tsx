import { Heading, Text } from "@chakra-ui/react";
import { CardItem } from "../CardItem";

export default function Moment({
  title,
  fromTitle,
  fromUrl,
}: {
  title: string,
  fromTitle: string,
  fromUrl: string,
}) {
  return (
    <CardItem rowSpan={1} colSpan={1}>
      Moment
    </CardItem>
  );
}