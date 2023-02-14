import style from './Home.module.scss';
import Link from "next/link";
import EnvironmentOutlined from '@ant-design/icons';

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
}) {
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