import style from './Home.module.scss';
import { Post } from '@/services/posts';
import { useRouter } from 'next/router';
import Button from '../Button';

function Card({
  title,
  children
}: any) {
  return (
    <div className='home-card'>
      <div className='home-card-head'>
        {title}
      </div>
      <div className='home-card-content'>
        {children}
      </div>
    </div>
  )
}

export default function Home({
  posts
}: {
  posts: Post[]
}) {
  const router = useRouter();

  const onLinkPost = (postHash: string) => {
    router.push(`/posts/${postHash}`);
  }

  return (
    <div className={style.home}>
      <div className='home-banner'>
        <div className='home-banner-info'>
          <div className="home-banner-title">
            <h1>
              Lemoo Lu
            </h1>
            <span>
              {'programmer，Photographer'.toUpperCase()}
            </span>
          </div>
        </div>
        <div className='home-banner-photo'>
          <img src="https://xizhi-note-imgages.oss-cn-hangzhou.aliyuncs.com/DSCF0242.jpg" alt="" />
        </div>
      </div>

      <Card
        title="A LITTLE ABOUT ME"
      >
        As a professional business and IT consultant I focus on combining both skillsets to deliver solutions. After graduating from the University of Waterloo I worked internationally, living and working in various countries for over 15 years, before returning to Canada. Over the past 30 years I have gained extensive experience in both the IT and business fields.
        <a>contact me</a>
      </Card>

      <Card title="Posts List">
        <div className='home-post'>
          {posts.slice(0, 4).map((post: Post) => (
            <article
              key={post.hash}
              onClick={() => {
                onLinkPost(post.hash)
              }}
            >
              <h2>{post.title}</h2>
              <p>{post.description || post.content}</p>
            </article>
          ))}
        </div>
        <Button link="/posts">
          More
        </Button>
      </Card>

      <Card title="DROP ME A LINE">
        <div className='home-contact'>
          <div className='home-contact-block'>
            <span>Address</span>
            <p>Hangzhou China</p>
          </div>
          <div className='home-contact-block'>
            <span>WeChat</span>
            <p>lomo_hao</p>
          </div>
          <div className='home-contact-block'>
            <span>Email</span>
            <p>lomo_hao@163.com</p>
          </div>
        </div>
      </Card>
      <div className="home-bottom">
        Designed by LemooLu
      </div>
    </div>
  );
}