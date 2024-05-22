import { CardGrid, Card, Page, Typed } from '@/components';
import { Metadata } from 'next';
import { Post, postsGetList } from '@/services/posts';
import { momentsGetList } from '@/services/moments';

export const metadata: Metadata = {
  title: 'LemooLu\'s Blog',
  description: "LemooLu\'s Blog, web, web-developer, frontend, react",
}

export default async function () {
  const posts = await postsGetList(6);
  const moments = await momentsGetList();

  return (
    <Page>
      <div className='flex flex-row h-[80vh] flex-wrap-reverse -mt-16 pc:h-screen'>
        <div className='w-full h-1/2 flex-col flex items-center justify-center pc:w-2/5 pc:h-full'>
          <p className='text-6xl mb-6 font-light'>
            Jiann <span className='text-primary'>Lu</span>
          </p>
          <Typed
            strings={[
              'Do not go gentle into that good night. 🏕️',
              '这里记录日常的一些思考，希望遇到同频的朋友。',
              // '我目前专注的方向是 独立开发'
            ]}
          />
        </div>
        <div
          className="w-full h-1/2 bg-[url('/images/banner.webp')] bg-cover pc:w-3/5 pc:h-full"
          style={{
            transform: 'rotateY(180deg)'
          }}
        >
        </div>
      </div>

      <Page.Container size='lg'>
        <CardGrid title='Moment'>
          {moments.slice(0, 3).map((moment) => (
            <Card.Moment
              key={moment.hash}
              title={moment.content}
              fromTitle={moment.fromTitle}
              fromLink={moment.fromLink}
            />
          ))}
        </CardGrid>

        <CardGrid title='Posts'>
          {posts.map((post: Post) => (
            <Card.Blog
              key={post.hash}
              title={post.title}
              desc={post.description}
              data={post.date}
              href={`/blog/${post.hash}`}
            />
          ))}
        </CardGrid>

        <CardGrid title='Gallery' grid={false}>
          <div className="carousel carousel-center w-full space-x-4">
            {[
              '/images/i1.jpg',
              // '/images/i2.jpg',
              '/images/i3.jpg',
              '/images/i4.jpg',
              '/images/i5.jpg',
              // '/images/i6.jpg',
              '/images/i7.jpg',
              '/images/i8.jpg',
            ].map((url: string) => (
              <div className="carousel-item">
                <img src={url} className="rounded-md max-h-96" />
              </div>
            ))}
          </div>
        </CardGrid>
      </Page.Container>
    </Page>
  )
}