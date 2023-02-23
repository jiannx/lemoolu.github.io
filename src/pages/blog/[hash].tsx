import { useRouter } from 'next/router'
// import { getFileContent } from '@/util';
import { getAllPosts } from '@/util';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from 'next';
import ReactMarkdown from 'react-markdown'
import { postsGetList } from '@/services/posts';
import { Button, Page } from '@/components';

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

export default function Posts(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    post,
  } = props;

  return (
    <Page container menu>
      <h1 style={{ marginTop: 48 }}>{post?.title}</h1>
      <div>
        {post?.date}
      </div>
      <div>
        {post?.description}
      </div>
      <ReactMarkdown>
        {post?.content || ''}
      </ReactMarkdown>
    </Page>
  );
}