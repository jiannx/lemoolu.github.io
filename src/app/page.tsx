import { Page, Trans, CardGrid, CardItem, Card } from '@/components';
import { Box, Button, CardBody, CardHeader, Heading, Stack, Image, Text, Card as Card2, HStack, VStack, Wrap, Flex, Center, GridItem } from '@chakra-ui/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { IconCurrentLocation, IconBrandWechat, IconMail, IconBrandWhatsapp, IconBrandTwitter } from '@tabler/icons-react';
import { Post, postsGetList } from '@/services/posts';
import { momentsGetList } from '@/services/moments';

export const metadata: Metadata = {
  title: 'LemooLu\'s Blog',
}
// backgroundImage: 'url("/images/banner.jpg"'

export default async function (props) {
  const posts = await postsGetList();
  const moments = await momentsGetList();

  return (
    <>
      <Box my={8}>
        <Text fontSize={'xl'} fontWeight={500}>这里记录我日常的一些思考，希望遇到同频的朋友。</Text>
        {/* <Text fontSize={'xl'} fontWeight={500}>我目前专注的方向是</Text> */}
      </Box>
      <Box my={2}>
        <Trans i18nKey='doNotGoGentle' /> 🏕️
      </Box>

      <CardGrid title='Moment'>
        {moments.slice(0, 3).map((moment) => (
          <Card.Moment
            key={moment.hash}
            title={moment.content}
            fromTitle={moment.fromTitle}
            fromLink={moment.fromLink}
          />
        ))}
      </CardGrid>

      <CardGrid title='Posts'>
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

      <CardGrid title='Posts'>
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
      </CardGrid>

      <Heading mt={10} mb={6}>Personal</Heading>
      <Card.Personal />
    </>
  )
}