import React from "react";
import Container from '../../Container';
import { IconDeer, Trans, Link, Copy } from '@/components';
import { IconCurrentLocation, IconBrandWechat, IconMail, IconBrandWhatsapp, IconBrandX } from '@tabler/icons-react';

export default function Bottom() {

  return (
    <Container className="bg-base-200 mt-24">
      <footer className="flex flex-col py-10 items-center h-96 justify-between pc:flex-row pc:justify-start">
        <aside className="flex flex-col items-center text-center pc:flex-row pc:text-left">
          <div className="w-32 h-32 rounded-full bg-base-content flex justify-center items-center">
            <IconDeer className="w-20 h-20 text-base-100" />
          </div>
          <div className="px-6">
            <h1 className="text-2xl">Jiann 鹿</h1>
            <p>Indie Hacker & Digital Nomad & Outdoor</p>
          </div>
        </aside>
        <nav className="m-10">
          <h6 className="footer-title text-center pc:text-left">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <Copy copyTip="Copy Wechat" copyData="lomo_hao">
              <IconBrandWechat stroke={1} />
            </Copy>
            <Copy copyTip="Copy Email" copyData="lemoo.lu@gmail.com">
              <IconMail stroke={1} />
            </Copy>
            {/* <Link>
                <IconBrandWhatsapp stroke={1} />
              </Link> */}
            <div className="tooltip" data-tip="Click to open">
              <Link href="https://twitter.com/LemooLu" target="_blank">
                <IconBrandX stroke={1} />
              </Link>
            </div>
            <Copy copyTip="Hangzhou, China" copyData="Hangzhou, China">
              <IconCurrentLocation stroke={1} />
            </Copy>
          </div>
        </nav>
        {/* <aside>
        <p>Copyright © 2024 - All right reserved by LemoooLu</p>
      </aside> */}
      </footer>
    </Container>

  );
}