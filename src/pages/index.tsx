import { postsGetList } from '@/services/posts';

import { Home } from '@/components';

export const getStaticProps = async () => {
  const posts = await postsGetList();
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
