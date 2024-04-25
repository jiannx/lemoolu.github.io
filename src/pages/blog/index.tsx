import { postsGetList } from '@/services/posts';
import type { Post } from '@/services/posts';
import { Button, Page } from '@/components';
import styles from './posts.module.scss';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useRouter } from 'next/router'

export const getStaticProps = async () => {
  const posts = await postsGetList();
  return {
    props: { posts },
  };
};

interface PostsProps {
  posts: Post[]
}

export default function Posts({
  posts
}: PostsProps) {
  const router = useRouter();

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
    <Page container menu>
      {postsOfYear.map(year => (
        <div key={year[0]}>
          <h1 className="text-primary mt-12">{year[0]}</h1>
          {year[1].map(p => (
            <div key={p.hash} className={styles.posts} onClick={() => router.push(`/blog/${p.hash}`)}>
              <h3>{p.title}</h3>
              <small>{p.date}</small>
            </div>
          ))}
        </div>
      ))}
    </Page>
  )
}