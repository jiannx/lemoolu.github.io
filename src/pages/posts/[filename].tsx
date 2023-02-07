import { useRouter } from 'next/router'
// import { getFileContent } from '@/util';
import { getAllPosts } from '@/util';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from 'next';
import ReactMarkdown from 'react-markdown'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map(x => ({
    params: { filename: x.fileName }
  }));
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<any>) => {
  console.log(params)
  const { filename } = params;
  const posts = getAllPosts();
  const post = posts.find(x => x.fileName === filename);
  return {
    props: {
      post
    },
  };
};

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(props)
  const {
    post,
  } = props;

  return (
    <ReactMarkdown>
      {post?.content || ''}
    </ReactMarkdown>
  );
}