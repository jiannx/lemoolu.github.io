"use client"
import { IconDeer, } from '@/components';
import { DarkSwitch } from '@/components';
import Link from '../../Link';
import { IconMenu2 } from '@tabler/icons-react'
import { useEffect, useState } from 'react';
import classNames from 'classnames';


export default function Header({ }: {}) {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const event = () => {
      if (window?.document.documentElement.scrollTop > 0) {
        setIsTop(false);
      } else if (window?.document.documentElement.scrollTop === 0) {
        setIsTop(true);
      }
    }
    event();
    window?.addEventListener('scroll', event);
    return () => {
      window?.removeEventListener('scroll', event);
    };
  }, []);

  return (
    <nav className={classNames('navbar px-4 z-10 fixed top-0 h-16 min-h-14 pc:px-10 transition-all duration-500', { glass: !isTop })}>
      <div className="flex-1">
        <Link href="/">
          <IconDeer className='w-8 h-8 text-primary' />
        </Link>
      </div>

      <div className="flex-none hidden pc:flex">
        <ul className="menu menu-horizontal px-4">
          <li>
            <Link href="/blog">BLOG</Link>
          </li>
          {/* <li>
            <Link href="/project">PROJECT</Link>
          </li> */}
        </ul>
        <DarkSwitch />
        <Link href="/about">
          <div className='btn btn-outline btn-sm h-10 px-6 ml-6 rounded-full font-normal'>ABOUT ME</div>
        </Link>
      </div>

      <div className='flex-none pc:hidden'>
        <div className=" drawer drawer-end">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer">
              <IconMenu2 ></IconMenu2>
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-40 min-h-full bg-base-200 text-base-content">
              <li><Link href="/blog">BLOG</Link></li>
              <li><Link href="/project">PROJECT</Link></li>
              <li><Link href="/about">ABOUT</Link></li>
              <li>
                <DarkSwitch />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}