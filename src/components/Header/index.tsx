import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link'
import { IconDeer, DarkSwitch, LngSwitch } from '@/components';
import { useTranslation } from 'react-i18next';

interface MenuProps { }

export default function Header({ }: MenuProps) {

  const [t] = useTranslation();

  return (
    <div className="fixed w-full h-14 left-0 top-0 z-50">
      <div
        className="w-full h-full bg-white/70 backdrop-blur"
        style={{ borderBottom: '1px solid var(--color-gray)' }}
      ></div>
      <div className="absolute left-0 top-0 w-full h-full px-4 flex justify-between items-center pc:px-8">
        <Link href="/" className="w-8 h-8 flex justify-around items-center">
          <IconDeer />
        </Link>
        <div className="flex items-center text-sm text-dark">
          <div className='flex items-center font-medium'>
            <Link className='px-2 mx-3 pc:mx-3' href="/" suppressHydrationWarning>{t('home')}</Link>
            <Link className='px-2 mx-3 pc:mx-3' href="/blog" suppressHydrationWarning>{t('article')}</Link>
            <Link className='px-2 mx-3 pc:mx-3' href="/#contact" suppressHydrationWarning>{t('contact')}</Link>
          </div>
          <div className="w-0.5 h-4 bg-gray"></div>
          <div className='flex items-center'>
            <DarkSwitch className='ml-4 h-4' />
            <LngSwitch className='ml-4' />
          </div>
        </div>
      </div>
    </div>
  );
}