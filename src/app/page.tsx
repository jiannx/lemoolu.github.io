import { Page, Trans } from '@/components';
import { Button } from '@chakra-ui/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { IconMapPinFilled, IconBrandWechat, IconMail, IconMenu2 } from '@tabler/icons-react';
import { Post, postsGetList } from '@/services/posts';

export const metadata: Metadata = {
  title: 'LemooLu\'s Blog',
}

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


export default async function () {
  const posts = await postsGetList();

  return (
    <Page>
      <div className='home-banner'>
        <div className='pc:w-1/3 pc:[padding-top:25vh] w-full text-center text-dark bg-white flex flex-col'>
          <h1 className='text-5xl pc:text-8xl'>
            Lemoo <span className='text-primary'>Lu</span>
          </h1>
          <p className='italic leading-6'>
            <Trans i18nKey='doNotGoGentle' />
            <br />
            <Trans i18nKey='rageAgainst' />
          </p>
        </div>
        <div className='pc:w-2/3 w-full bg-cover bg-[url("/images/banner.jpg")] [transform:rotateY(180deg)] flex-1'></div>
      </div>

      <Card
        title={<><Trans i18nKey='aLittle' /><span className='text-primary'><Trans i18nKey='me' /></span></>}
        bottom={<Link href={'#contac'}><Button><Trans i18nKey='contactMe' /></Button></Link>}
      >
        <Trans i18nKey='aboutInfo' />
      </Card>

      <Card
        title={<><span className='text-primary'><Trans i18nKey='posts' /></span><Trans i18nKey='list' /></>}
        bottom={<Link href="/blog"><Button><Trans i18nKey='more' /></Button></Link>}
      >
        <div className='home-post'>
          {posts.slice(0, 4).map((post: Post) => (
            <Link href={`/blog/${post.hash}`}>
              <article
                key={post.hash}
              >
                <h2>{post.title}</h2>
                <p>{post.description || post.content}</p>
              </article>
            </Link>
          ))}
        </div>
      </Card >

      <Card title={<span><span className='text-primary'></span><Trans i18nKey='photos' /></span>}>
        <div className='home-photos'>
          {[
            '/images/i1.jpg',
            '/images/i2.jpg',
            '/images/i3.jpg',
            '/images/i4.jpg',
            '/images/i5.jpg',
            '/images/i6.jpg',
            '/images/i7.jpg',
            '/images/i8.jpg',
          ].map((url: string) =>
          (
            <div className='home-photo' key={url}>
              <img src={url} alt="" />
            </div>
          ))}
        </div>
      </Card>


      <Card
        title={<span><Trans i18nKey='contact' /> <span className='text-primary'><Trans i18nKey='me' /></span></span>}
        id="contact"
      >
        <div className='home-contact'>
          <div className='home-contact-block'>
            <div className='text-center'><IconMapPinFilled /></div>
            <span><Trans i18nKey='address' /></span>
            <p><Trans i18nKey='addressInfo' /></p>
          </div>
          <div className='home-contact-block'>
            <IconBrandWechat />
            <span><Trans i18nKey='wechat' /></span>
            <p>lomo_hao</p>
          </div>
          <div className='home-contact-block'>
            <IconMail />
            <span><Trans i18nKey='email' /></span>
            <p><a href="mailto:lomo_hao@163.com">lomo_hao@163.com</a></p>
          </div>
        </div>
      </Card>

    </Page>
  )
}