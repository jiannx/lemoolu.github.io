import { useRouter } from 'next/router';
import { useState } from 'react';
import { IconMenu2 } from '@tabler/icons-react';
import Link from 'next/link'
import { IconDeer } from '@/components';

interface MenuProps { }

export default function Header({ }: MenuProps) {

  return (
    <div className="fixed w-full h-14 left-0 top-0 z-50 ">
      <div
        className="w-full h-full bg-white/70 backdrop-blur"
        style={{ borderBottom: '1px solid var(--gray)' }}
      ></div>
      <div className="absolute left-0 top-0 w-full h-full px-4 flex justify-between items-center pc:px-8">
        <Link href="/" className="w-8 h-8 flex justify-around items-center">
          <IconDeer />
        </Link>
        <div className="flex items-center text-sm -mr-4 pc:-mr-6">
          <Link className='px-2 mx-2 transition-all pc:mx-4' href="/">Home</Link>
          <Link className='px-2 mx-2 transition-all pc:mx-4' href="/blog">Article</Link>
          <Link className='px-2 mx-2 transition-all pc:mx-4' href="/#contact">Contact</Link>
          <div className="w-0.5 h-4 g-bg-gray"></div>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
}