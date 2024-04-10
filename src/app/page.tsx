import { Page, Trans } from '@/components';
import { Box, Button, CardBody, CardHeader, Heading, Stack, Image, Text, Card as Card2, HStack, VStack, Wrap, Flex } from '@chakra-ui/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { IconCurrentLocation, IconBrandWechat, IconMail, IconBrandWhatsapp, IconBrandTwitter } from '@tabler/icons-react';
import { Post, postsGetList } from '@/services/posts';

export const metadata: Metadata = {
  title: 'LemooLu\'s Blog',
}

export default async function () {
  const posts = await postsGetList();

  return (
    <>
      <Box my={8}>
        <Text fontSize={'xl'} fontWeight={500}>这里记录我日常的一些思考，希望遇到同频的朋友。</Text>
        <Text fontSize={'xl'} fontWeight={500}>我目前专注的方向是</Text>
      </Box>
      <HStack my={8}>
        <Box>🏕️</Box>
        <Text>
          <Trans i18nKey='doNotGoGentle' />
          {/* <Trans i18nKey='rageAgainst' /> */}
        </Text>
      </HStack>

      <Card2 mb={4}>
        <CardHeader>
          <Heading size='md'>Hello World</Heading>
        </CardHeader>
        <CardBody>
          <Flex justifyContent={'space-around'}>
            <div>
              <IconCurrentLocation stroke={1} />
              <Trans i18nKey='addressInfo' />
            </div>
            <div>
              <IconBrandWechat stroke={1} />
              <p>lomo_hao</p>
            </div>
            <div>
              <IconBrandWhatsapp stroke={1} />
              whatsapp
            </div>
            <div>
              <IconMail stroke={1} />
              lemmoo.lu@gmail.com
            </div>
            <div>
              <IconBrandTwitter stroke={1} />
              Twitter
            </div>
          </Flex>
        </CardBody>
      </Card2>

      <VStack gap={4}>
        <Card2 w={'100%'}>
          <CardHeader>
            <Heading size='md'>Moment</Heading>
          </CardHeader>

          <CardBody>
            <Wrap spacing={4} justify='center'>
              {[
                '/images/i1.jpg',
                // '/images/i2.jpg',
                '/images/i3.jpg',
                '/images/i4.jpg',
                '/images/i5.jpg',
                // '/images/i6.jpg',
                '/images/i7.jpg',
                '/images/i8.jpg',
              ].map((url: string) =>
              (
                <Box boxSize='xs' key={url} overflow={"hidden"}>
                  <Image src={url} />
                </Box>
              ))}
            </Wrap>
          </CardBody>
        </Card2>

        <Card2 style={{ backgroundImage: 'url("/images/banner.jpg"' }} w={'100%'}>
          <CardHeader>
            <Heading size='md'>Blog</Heading >
          </CardHeader>

          <CardBody>
            <div className='home-post'>
              {posts.slice(0, 4).map((post: Post) => (
                <Link href={`/blog/${post.hash}`}>
                  <article
                    key={post.hash}
                  >
                    <h2>{post.title}</h2>
                    {/* <p>{post.description || post.content}</p> */}
                  </article>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card2>
      </VStack>
    </>
  )
}