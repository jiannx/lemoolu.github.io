import { useRouter } from 'next/router'
import { GetStaticProps, InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from 'next';
import ReactMarkdown from 'react-markdown'
import { postsGetList } from '@/services/posts';
import { MarkdownRender, Page } from '@/components';
import { useEffect } from 'react';

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
      <h1 style={{ margin: '48px 0', fontSize: '3em' }}>{post?.title}</h1>
      <div>
        {post?.date}
      </div>
      {/* <div>
        {post?.description}
      </div> */}
      <MarkdownRender>
        {post?.content || ''}
      </MarkdownRender>
    </Page>
  );
}