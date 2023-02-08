import { getAllPosts } from '@/util/posts';
import Link from "next/link";

export const getStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
};

function Card({
  title
}: any) {
  return (
    <div className='home-card'>
      {title}
    </div>
  )
}

export default function Index({ posts }: any) {
  // https://mrd-global.net/index.php#about
  return (
    <div className="">
      <div className='w-screen h-screen flex'>
        <div className='w-1/3'>
          LemoLu
        </div>
        <div className='w-2/3'>
          <img className='w-full' src="https://mrd-global.net/img/header-bg-me2.jpg" alt="" />
        </div>
      </div>

      <Card
        title="223"
      >

      </Card>
      <div

      >
        A LITTLE ABOUT ME
        As a professional business and IT consultant I focus on combining both skillsets to deliver solutions. After graduating from the University of Waterloo I worked internationally, living and working in various countries for over 15 years, before returning to Canada. Over the past 30 years I have gained extensive experience in both the IT and business fields.

        <a>contact me</a>
      </div>

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

      <div>
        PHOTOS RANDOM
        <div>

        </div>
      </div>


      <div>
        DROP ME A LINE
        <div>
          <>
            Address: Hangzhou
          </>
          <>
            Phone
          </>
          <>
            Email
          </>
        </div>
      </div>

    </div>
  );
}
