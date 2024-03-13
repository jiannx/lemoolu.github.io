import style from './Home.module.scss';
import { Post } from '@/services/posts';
import { useRouter } from 'next/router';
import Button from '../Button';
import { useState } from 'react';
import classnames from 'classnames';
import { IconMapPinFilled, IconBrandWechat, IconMail, IconMenu2 } from '@tabler/icons-react';
import Page from '../Page';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

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

  const onLinkPost = (postHash: string) => {
    router.push(`/blog/${postHash}`);
  }
  const [t] = useTranslation();

  return (
    <Page className={style.home}>
      <div className='home-banner'>
        <div className='pc:w-1/3 pc:[padding-top:25vh] w-full text-center text-dark bg-white flex flex-col'>
          <h1 className='text-5xl pc:text-8xl'>
            Lemoo <span className='text-primary'>Lu</span>
          </h1>
          <p className='italic leading-6'>
            {t('doNotGoGentle')}
            <br />
            {t('rageAgainst')}
          </p>
        </div>
        <div className='pc:w-2/3 w-full bg-cover bg-[url("/images/banner.jpg")] [transform:rotateY(180deg)] flex-1'></div>
      </div>

      <Card
        title={<>{t('aLittle')} <span className='text-primary'>{t('about')}</span> {t('me')}</>}
        bottom={<Button link="#contact">{t('contactMe')}</Button>}
      >
        {/* 爱拍照，爱钓鱼，认真生活的代码工程师 */}
        {t('aboutInfo')}
        {/* programmer，Photographer,热爱Coding，认真生活，爱摄影，爱钓鱼 */}
      </Card>

      <Card
        title={<><span className='text-primary'>{t('posts')}</span> {t('list')}</>}
        bottom={<Button link="/blog">{t('more')}</Button>}
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

      <Card title={<span><span className='text-primary'>{t('photos')}</span> {t('example')}</span>}>
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
        title={<span>{t('contact')} <span className='text-primary'>{t('me')}</span></span>}
        id="contact"
      >
        <div className='home-contact'>
          <div className='home-contact-block'>
            <div className='text-center'><IconMapPinFilled /></div>
            <span>{t('address')}</span>
            <p>{t('addressInfo')}</p>
          </div>
          <div className='home-contact-block'>
            <IconBrandWechat />
            <span>{t('wechat')}</span>
            <p>lomo_hao</p>
          </div>
          <div className='home-contact-block'>
            <IconMail />
            <span>{t('email')}</span>
            <p><a href="mailto:lomo_hao@163.com">lomo_hao@163.com</a></p>
          </div>
        </div>
      </Card>

    </Page >
  );
}