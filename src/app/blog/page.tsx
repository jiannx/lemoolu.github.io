import { Page, CardGrid, Card } from '@/components';
import { postsGetList } from '@/services/posts';
import type { Post } from '@/services/posts';
import dayjs from 'dayjs';

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
      <CardGrid title='Blogs'>
        {postsOfYear.map(year => {
          return year[1].map(p =>
            <Card.Blog
              key={p.hash}
              title={p.title}
              desc={p.description}
              data={p.date}
              href={`/blog/${p.hash}`}
            />
          );
        })}
      </CardGrid>
    </Page>
  )
}