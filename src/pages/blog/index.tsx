import { postsGetList } from '@/services/posts';
import type { Post } from '@/services/posts';
import { Button, Page } from '@/components';
import styles from './posts.module.scss';
import Link from 'next/link'

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

  return (
    <Page container menu>
      {posts.map(p => (
        <div key={p.hash} style={{ paddingBottom: 40 }} className={styles.posts}>
          <Link href={`/blog/${p.hash}`}><h2>{p.title}</h2></Link>
          <small>
            {p.date}
          </small>
          <p>
            {p.description}
          </p>
        </div>
      ))}
    </Page>
  )
}