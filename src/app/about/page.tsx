import { Copy, Link, Page } from "@/components";
import { IconBrandWechat, IconBrandX, IconCurrentLocation, IconMail } from "@tabler/icons-react";

export default function () {
  return (
    <Page size='lg'>
      <div className="rounded-2xl overflow-hidden shadow-xl mt-12 flex flex-col pc:flex-row border border-secondary-content">
        <div className="w-0 h-100 bg-[url('/images/aboutbg.jpg')] bg-cover pc:w-1/3">
        </div>
        <div className="w-full max-w-600 p-12 prose pc:w-2/3">
          <h2>Jiann Lu</h2>
          <p>
            Ten years of full-stack Engineer, Focus on Internet product design and development
          </p>
          <h4>Previously</h4>
          <ul>
            <li>
              Expert front-end development at Shuopan Intelligent Technology working on Low-Code Development Platform
            </li>
            <li>
              Staff full-stack development at Alibaba working on Digital agriculture SaaS and IoT Platform.
            </li>
            <li>
              Front-end development at Didi working on car service marketing platform and energy-related business.
            </li>
          </ul>

          <div className="grid grid-flow-col gap-4 w-40">
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
        </div>
      </div>
    </Page>
  )
}