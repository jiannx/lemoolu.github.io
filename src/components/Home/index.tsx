import style from './Home.module.scss';
import { Post } from '@/services/posts';
import { useRouter } from 'next/router';
import Button from '../Button';
import { useState } from 'react';
import classnames from 'classnames';
import { IconMapPinFilled, IconBrandWechat, IconMail, IconMenu2 } from '@tabler/icons-react';
import Page from '../Page';

function Card({
  title,
  children,
  id,
}: any) {
  return (
    <div className='home-card' id={id}>
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
  const [menuOpen, setMenuOpen] = useState(false);

  const onLinkPost = (postHash: string) => {
    router.push(`/posts/${postHash}`);
  }

  return (
    <Page className={style.home}>
      <div className='home-banner'>
        <div className='home-banner-info'>
          <div className="home-banner-title">
            <h1>
              Lemoo <span className='color-primary'>Lu</span>
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
        title={<span>A LITTLE <span className='color-primary'>ABOUT</span> ME</span>}
      >
        <div style={{ marginBottom: 48 }}>
          热爱自由，多年研发经验
        </div>
        <Button link="#contact">CONTACT ME</Button>
      </Card>

      <Card
        title={<span><span className='color-primary'>Posts</span> List</span>}
      >
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
        <Button link="/blog">
          MORE
        </Button>
      </Card >

      {/* <Card title="作品集">
        <div className='home-post'>

        </div>
        <Button link="/posts">
          More
        </Button>
      </Card> */}

      {/* <Card title="照片墙">
        <div className='columns-3'>
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
      </Card> */}
      <Card
        title={<span>DROP <span className='color-primary'>ME</span> A LINE</span>}
        id="contact"
      >
        <div className='home-contact'>
          <div className='home-contact-block'>
            <IconMapPinFilled />
            <span>ADDRESS</span>
            <p>Hangzhou China</p>
          </div>
          <div className='home-contact-block'>
            <IconBrandWechat />
            <span>WECHAT</span>
            <p>lomo_hao</p>
          </div>
          <div className='home-contact-block'>
            <IconMail />
            <span>EMAIL</span>
            <p><a href="mailto:lomo_hao@163.com">lomo_hao@163.com</a></p>
          </div>
        </div>
      </Card>
    </Page >
  );
}