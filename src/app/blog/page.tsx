import { postsGetList } from '@/services/posts';
import type { Post } from '@/services/posts';
import { Box, Card, CardHeader, Heading, Text } from '@chakra-ui/react';
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
    <>
      {postsOfYear.map(year => (
        <Card key={year[0]}>
          <CardHeader>
            <Heading size='md'>{year[0]}</Heading>
          </CardHeader>
          {year[1].map(p => {
            return (
              <Link key={p.hash} href={`/blog/${p.hash}`}>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    {p.title}
                  </Heading>
                  <Text pt='2' fontSize='sm'>{p.date}</Text>
                </Box>
              </Link>
            )
          })}
        </Card>
      ))}
    </>
  )
}