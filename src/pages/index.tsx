import { getAllPosts } from '@/util/posts';
import Link from "next/link";

export const getStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
};

export default function Home({ posts }: any) {

  return (
    <div>
      Posts List
      <div>
        {posts.map((post: any) => (
          <article key={post.filePath}>
            <Link href={`/posts/${post.fileName}`}>
              {post.title}
            </Link>
            <p>{post.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
