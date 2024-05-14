"use client"
import { DarkSwitch, LngSwitch, Trans } from '@/components';
import Avatar from './Avatar';
import Link from '../../Link';
import { useEffect, useState } from 'react';
import classNames from 'classnames';


export default function Header() {
  const w = typeof window !== 'undefined' ? window : null;
  const [isTop, setIsTop] = useState(w ? w?.document.documentElement.scrollTop === 0 : true);

  useEffect(() => {
    const event = () => {
      if (window?.document.documentElement.scrollTop > 0) {
        setIsTop(false);
      } else if (window?.document.documentElement.scrollTop === 0) {
        setIsTop(true);
      }
    }
    window?.addEventListener('scroll', event);
    return () => {
      window?.removeEventListener('scroll', event);
    };
  }, [isTop, w]);

  return (
    <nav
      className={classNames('navbar px-10 z-10 fixed top-0 h-14 min-h-14 transition-all', {
        glass: !isTop
      })}
    >
      <div className="flex-1">
        <Link href="/">
          <Avatar />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-4">
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/blog">BLOG</Link>
          </li>
          <li>
            <Link href="/project">PROJECT</Link>
          </li>
          {/* <li>
            <details>
              <summary>
                Theme
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li><a>Light</a></li>
                <li><a>Dark</a></li>
                <li></li>
                <li><LngSwitch /></li>
              </ul>
            </details>
          </li> */}
        </ul>
        <DarkSwitch />
      </div>
    </nav>
  );
}