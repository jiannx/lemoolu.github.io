import style from './Menu.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classnames from 'classnames';
import { IconMenu2, IconHome, IconArticle, IconBox, IconMail } from '@tabler/icons-react';
import Link from 'next/link'

interface MenuProps {
  /** 是否强制可见 */
  visible?: boolean;
}

export default function Menu({
  visible,
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={classnames(style.menu, { [style.menuOpen]: visible || menuOpen })} style={{ position: visible ? 'static' : 'fixed' }}>
      <div className={style.menuIcon} onClick={() => setMenuOpen(!menuOpen)} style={{ position: visible ? 'absolute' : 'fixed' }}>
        <IconMenu2 />
      </div>

      <Link className={style.menuItem} href="/">
        <IconHome />
        <span>首页</span>
      </Link>
      <Link className={style.menuItem} href="/blog">
        <IconArticle />
        <span>文章</span>
      </Link>
      {/* <Link className={style.menuItem}  href="/posts">
        <IconBox />
        <span>作品</span>
      </Link> */}
      <Link className={style.menuItem} href="/#contact">
        <IconMail />
        <span>联系</span>
      </Link>

    </div>
  );
}