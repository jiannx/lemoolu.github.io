import { postsGetList } from '@/services/posts';
import { MarkdownRender, Page } from '@/components';

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
    <Page>
      <div className={`max-w-4xl mx-auto px-4 mt-6`}>
        <h1 className='my-8 text-3xl'>
          {post?.title}
        </h1>
        <div className='mb-4'>
          {post?.date}
        </div>
        <MarkdownRender>
          {post?.content}
        </MarkdownRender>
      </div>
    </Page>
  );
}