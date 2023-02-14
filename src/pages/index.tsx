import { getAllPosts } from '@/util/posts';

import Home from '@/components/Home';

export const getStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
};



export default function Index({ posts }: any) {
  // https://mrd-global.net/index.php#about
  return ( 
    <Home posts={posts} />
  );
}
