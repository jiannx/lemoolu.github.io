import { postsGetList } from '@/services/posts';
import type { Post } from '@/services/posts';
import { Button } from '@/components';

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
  console.log(posts)
  return (
    <div>
      {posts.map(p => (
        <Button key={p.hash} link={`/posts/${p.hash}`}>
          {p.title}
        </Button>
      ))}
    </div>
  )
}