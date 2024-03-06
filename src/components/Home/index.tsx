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
    <div className='home-card text-dark bg-white' id={id}>
      <div className='home-card-head'>
        <div>{title}</div>
        <div>
          <img src="/images/h1-bg.png" alt="" className="dark:invert" />
        </div>
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
        <div className='pc:w-1/3 pc:[padding-top:30vh] w-full text-center text-dark bg-white flex flex-col'>
          <h1 className='text-5xl pc:text-8xl'>
            Lemoo <span className='text-primary'>Lu</span>
          </h1>
          <p className='italic'>Do not go gentle into that good night.</p>
        </div>
        <div className='pc:w-2/3 w-full bg-cover bg-[url("/images/banner.jpg")] [transform:rotateY(180deg)] flex-1'></div>
      </div>

      <Card
        title={<>A LITTLE <span className='text-primary'>ABOUT</span> ME</>}
        bottom={<Button link="#contact">CONTACT ME</Button>}
      >
        爱拍照，爱钓鱼，认真生活的代码工程师
        {/* programmer，Photographer,热爱Coding，认真生活，爱摄影，爱钓鱼 */}
      </Card>

      <Card
        title={<><span className='text-primary'>Posts</span> List</>}
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

      <Card title={<span><span className='text-primary'>PHOTOS</span> EXAMPLE</span>}>
        <div className='home-photos'>
          {[
            '/images/DSCF1300.jpg',
            '/images/DSCF3009.jpg',
            '/images/DSCF3076.jpg',
            '/images/DSCF3369.jpg',
            '/images/DSCF8139.jpg',
            '/images/DSCF9137.jpg',
            '/images/IMG_0452.jpg',
            '/images/IMG_3816.jpg',
          ].map((url: string) =>
          (
            <div className='home-photo' key={url}>
              <img src={url} alt="" />
            </div>
          ))}
        </div>
      </Card>


      <Card
        title={<span>DROP <span className='text-primary'>ME</span> A LINE</span>}
        id="contact"
      >
        <div className='home-contact'>
          <div className='home-contact-block'>
            <div className='text-center'><IconMapPinFilled /></div>
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