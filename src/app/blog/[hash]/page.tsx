import { postsGetList } from '@/services/posts';
import { MarkdownRender } from '@/components';
import { Container, Heading } from '@chakra-ui/react';

/**
 用于静态生成文件
 */
export const generateStaticParams = async () => {
  const posts = await postsGetList();
  const paths = posts.map(({ hash }) => ({ hash }));
  return paths;
};

export default async function Posts({ params }: any) {
  const { hash } = params;
  const posts = await postsGetList();
  const post = posts.find(x => x.hash === hash);

  return (
    <>
      <Heading>{post?.title}</Heading>
      <div>
        {post?.date}
      </div>
      <MarkdownRender>
        {post?.content || ''}
      </MarkdownRender>
    </>
  );
}