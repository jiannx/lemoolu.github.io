import { Box, Center, Flex, Heading, Text, Image, HStack } from '@chakra-ui/react';
import { Metadata } from 'next';

export default function Gallery({
  images
}: {
  images: string[]
}) {
  return (
    <Flex gap={6} w={'100%'} flexWrap={'wrap'}>
      {images.map((url: string) => {
        return (
          <Image key={url} src={url} h={320}></Image>
        );
      })}
    </Flex>
  )
}