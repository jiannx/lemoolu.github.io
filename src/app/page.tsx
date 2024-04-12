import { Page, Trans, CardGrid, CardItem, Card } from '@/components';
import { Box, Button, CardBody, CardHeader, Heading, Stack, Image, Text, Card as Card2, HStack, VStack, Wrap, Flex, Center, GridItem } from '@chakra-ui/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { IconCurrentLocation, IconBrandWechat, IconMail, IconBrandWhatsapp, IconBrandTwitter } from '@tabler/icons-react';
import { Post, postsGetList } from '@/services/posts';

export const metadata: Metadata = {
  title: 'LemooLu\'s Blog',
}
// backgroundImage: 'url("/images/banner.jpg"'

export default async function (props) {
  const posts = await postsGetList();
  const my = 6;

  return (
    <>
      <Box my={my}>
        <Text fontSize={'xl'} fontWeight={500}>这里记录我日常的一些思考，希望遇到同频的朋友。</Text>
        {/* <Text fontSize={'xl'} fontWeight={500}>我目前专注的方向是</Text> */}
      </Box>
      <HStack my={my}>
        <Box>🏕️</Box>
        <Text>
          <Trans i18nKey='doNotGoGentle' />
          {/* <Trans i18nKey='rageAgainst' /> */}
        </Text>
      </HStack>

      <CardGrid>
        <Card.Person />
        {/* <Card.Moment /> */}
        {[
          '/images/i1.jpg',
          // '/images/i2.jpg',
          '/images/i3.jpg',
          '/images/i4.jpg',
          '/images/i5.jpg',
          // '/images/i6.jpg',
          '/images/i7.jpg',
          '/images/i8.jpg',
        ].map((url: string) => (
          <Card.Image key={url} url={url} />
        ))}

        {posts.slice(0, 6).map((post: Post) => (
          <Card.Blog
            key={post.hash}
            title={post.title}
            desc={post.description}
            data={post.date}
            href={`/blog/${post.hash}`}
          />
        ))}
      </CardGrid>

      <Card2 my={my}>
        <CardHeader>
          <Heading size='md'>Hello</Heading>
        </CardHeader>
        <CardBody>
          <Flex justifyContent={'space-around'}>
            <VStack>
              <IconCurrentLocation stroke={1} />
              <Trans i18nKey='addressInfo' />
            </VStack>
            <VStack>
              <IconBrandWechat stroke={1} />
              <Text>lomo_hao</Text>
            </VStack>
            <VStack>
              <IconBrandWhatsapp stroke={1} />
              <Text>whatsapp</Text>
            </VStack>
            <VStack>
              <IconMail stroke={1} />
              <Text>lemmoo.lu@gmail.com</Text>
            </VStack>
            <VStack>
              <IconBrandTwitter stroke={1} />
              <Text>Twitter</Text>
            </VStack>
          </Flex>
        </CardBody>
      </Card2>

    </>
  )
}