import style from './Menu.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classnames from 'classnames';
import { IconMenu2, IconHome, IconArticle, IconBox, IconMail } from '@tabler/icons-react';

export default function Home() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={classnames(style.menu, { [style.menuOpen]: menuOpen })}>
      <div className={style.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        <IconMenu2 />
      </div>
      <div className={style.menuItem}>
        <IconHome />
        <span>首页</span>
      </div>
      <div className={style.menuItem}>
        <IconArticle />
        <span>文章</span>
      </div>
      <div className={style.menuItem}>
        <IconBox />
        <span>作品</span>
      </div>
      <div className={style.menuItem}>
        <IconMail />
        <span>联系</span>
      </div>
    </div>
  );
}