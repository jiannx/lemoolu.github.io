import { Page } from '@/components';
import { postsGetList } from '@/services/posts';
import type { Post } from '@/services/posts';
import { Box, Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function () {
  const posts = await postsGetList();
  const postsOfYear: Array<[number, Post[]]> = [];
  posts.forEach(x => {
    const year = dayjs(x.date).year();
    let yearPosts = postsOfYear.find((arr: any[]) => arr[0] === year);
    if (!yearPosts) {
      yearPosts = [year, []];
      postsOfYear.push(yearPosts);
    }
    yearPosts[1].push(x);
  });
  postsOfYear.sort(x => x[0]);

  return (
    <Page>
      <SimpleGrid columns={1} spacing={4}>
        {postsOfYear.map(year => {
          return year[1].map(p => {
            return (
              <Link key={p.hash} href={`/blog/${p.hash}`}>
                <Card>
                  <CardHeader>
                    <Heading size='md'>{p.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text pt='2' fontSize='sm'>{p.date}</Text>
                  </CardBody>
                </Card>
              </Link>
            )
          });
        })}
      </SimpleGrid>
    </Page>
  )
}