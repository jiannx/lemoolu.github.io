import style from './Home.module.scss';
import { Post } from '@/services/posts';
import { useRouter } from 'next/router';
import Button from '../Button';
import { useState } from 'react';
import classnames from 'classnames';

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
  const [menuOpen, setMenuOpen] = useState(false);

  const onLinkPost = (postHash: string) => {
    router.push(`/posts/${postHash}`);
  }

  return (
    <div className={style.home}>

      <div className={classnames('home-menu', { open: menuOpen })}>
        <div className="home-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          M
        </div>

      </div>

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
        <div style={{ marginBottom: 50 }}>
          热爱自由，多年研发经验
        </div>
        <Button link="/posts">CONTACT ME</Button>
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
          MORE
        </Button>
      </Card>

      {/* <Card title="作品集">
        <div className='home-post'>

        </div>
        <Button link="/posts">
          More
        </Button>
      </Card> */}

      <Card title="照片墙">
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
      </Card>

      <Card title="DROP ME A LINE">
        <div className='home-contact'>
          <div className='home-contact-block'>
            <span>ADDREDD</span>
            <p>Hangzhou China</p>
          </div>
          <div className='home-contact-block'>
            <span>WECHAT</span>
            <p>lomo_hao</p>
          </div>
          <div className='home-contact-block'>
            <span>EMAIL</span>
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