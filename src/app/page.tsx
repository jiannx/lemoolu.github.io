import { Trans, CardGrid, Card, Page, Container, Gallery, Typed } from '@/components';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { Metadata } from 'next';
import { Post, postsGetList } from '@/services/posts';
import { momentsGetList } from '@/services/moments';

export const metadata: Metadata = {
  title: 'LemooLu\'s Blog',
  description: "LemooLu\'s Blog, web, web-developer, frontend, react",
}
// backgroundImage: 'url("/images/banner.jpg"'

export default async function () {
  const posts = await postsGetList();
  const moments = await momentsGetList();

  return (
    <Page isFull={true}>
      <Flex flexDirection={{ base: 'column-reverse', lg: 'row' }} mt={-12}>
        <Center
          w={{ base: '100%', lg: '40%' }}
          mt={{ base: 16, lg: 0 }}
          flexDirection={'column'}
          px={4}
          py={10}
        >
          <Heading mb={6} size='4xl' as={'h1'} fontWeight={200}>
            Lemoo <Text color={'primary'} as={'span'}>Lu</Text>
          </Heading>

          <Text minH={16}>
            <Typed
              strings={[
                'Do not go gentle into that good night. 🏕️',
                '这里记录日常的一些思考，希望遇到同频的朋友。',
                // '我目前专注的方向是 独立开发'
              ]}
            >
            </Typed>
            {/* <Trans i18nKey='doNotGoGentle' /> 🏕️
            <br />
            <Trans i18nKey='rageAgainst' /> */}
          </Text>
        </Center>
        <Box
          w={{ base: '100%', lg: '60%' }}
          h={{ base: '50vh', lg: '100vh' }}
          backgroundImage={'/images/banner.webp'}
          backgroundSize={'cover'}
          transform={'rotateY(180deg)'}
        ></Box>
      </Flex>

      <Container>

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

        <CardGrid title='Gallery'>
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


        {/* <CardGrid title='Gallery' asGrid={false}>
          <Gallery images={[
            '/images/i1.jpg',
            '/images/i2.jpg',
            '/images/i3.jpg',
            '/images/i4.jpg',
            '/images/i5.jpg',
            '/images/i6.jpg',
            '/images/i7.jpg',
            '/images/i8.jpg',
          ]}></Gallery>
        </CardGrid> */}

      </Container>
    </Page>
  )
}