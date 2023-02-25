import style from './Home.module.scss';
import { Post } from '@/services/posts';
import { useRouter } from 'next/router';
import Button from '../Button';
import { useState } from 'react';
import classnames from 'classnames';
import { IconMapPinFilled, IconBrandWechat, IconMail, IconMenu2 } from '@tabler/icons-react';
import Page from '../Page';
import Image from 'next/image';

function Card({
  title,
  children,
  id,
  bottom,
}: any) {
  return (
    <div className='home-card' id={id}>
      <div className='home-card-head'>
        {title}
      </div>
      <div className='home-card-content'>
        {children}
      </div>
      {bottom &&
        <div className='home-card-bottom'>
          {bottom}
        </div>
      }
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
    router.push(`/blog/${postHash}`);
  }

  return (
    <Page className={style.home}>
      <div className='home-banner'>
        <div className='home-banner-info'>
          <h1>
            {/* Do Not Go Gentle <br/><small>Into That</small><br/>Good Night.<span className='color-primary'></span> */}
            Lemoo <span className='color-primary'>Lu</span>
          </h1>
          <p>
          Do not go gentle into that good night.
            {/* {'programmer，Photographer'.toUpperCase()} */}
          </p>
        </div>
        <div className='home-banner-photo'></div>
      </div>

      <Card
        title={<>A LITTLE <span className='color-primary'>ABOUT</span> ME</>}
        bottom={<Button link="#contact">CONTACT ME</Button>}
      >
        爱拍照，爱钓鱼，认真生活的代码工程师
        {/* programmer，Photographer,热爱Coding，认真生活，爱摄影，爱钓鱼 */}
      </Card>

      <Card
        title={<><span className='color-primary'>Posts</span> List</>}
        bottom={<Button link="/blog">MORE</Button>}
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
      </Card >

      {/* <Card title="作品集"></Card> */}

      <Card title={<span><span className='color-primary'>PHOTOS</span> EXAMPLE</span>}>
        <div className='home-photos'>
          {[
            'https://xizhi-note-imgages.oss-cn-hangzhou.aliyuncs.com/DSCF1300.jpg',
            'https://xizhi-note-imgages.oss-cn-hangzhou.aliyuncs.com/DSCF3009.jpg',
            'https://xizhi-note-imgages.oss-cn-hangzhou.aliyuncs.com/DSCF3076.jpg',
            'https://xizhi-note-imgages.oss-cn-hangzhou.aliyuncs.com/DSCF3369.jpg',
            'https://xizhi-note-imgages.oss-cn-hangzhou.aliyuncs.com/DSCF8139.jpg',
            'https://xizhi-note-imgages.oss-cn-hangzhou.aliyuncs.com/DSCF9137.jpg',
            'https://xizhi-note-imgages.oss-cn-hangzhou.aliyuncs.com/IMG_0452.jpg',
            'https://xizhi-note-imgages.oss-cn-hangzhou.aliyuncs.com/IMG_3816.jpg',
          ].map((url: string) =>
          (
            <div className='home-photo' key={url}>
              <img src={url} alt="" />
            </div>
          ))}
        </div>
      </Card>


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