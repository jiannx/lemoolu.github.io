import { useRouter } from 'next/router'
// import { getFileContent } from '@/util';
import { getAllPosts } from '@/util';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from 'next';
import ReactMarkdown from 'react-markdown'
import { postsGetList } from '@/services/posts';
import { Button } from '@/components';
// import './posts.module.scss';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await postsGetList();
  const paths = posts.map(({ hash }) => ({ params: { hash } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<any>) => {
  const { hash } = params;
  const posts = await postsGetList();
  const post = posts.find(x => x.hash === hash);
  return {
    props: { post },
  };
};

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    post,
  } = props;

  return (
    <ReactMarkdown>
      {post?.content || ''}
    </ReactMarkdown>
  );
}