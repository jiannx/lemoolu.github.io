"use client"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { useEffect, useState } from 'react';
import { loadCss } from './utils';


function getToc(str: string) {
  const reg = /\#{1,5}\s{1,}\S.*/g;
  const res = str.match(reg);
  if (!res) {
    return null;
  }
  const titles: Array<{ level: number; name: string, children?: any[] }> = [];
  res.forEach(x => {
    const match = x.match(/(\#{1,5})\s{1,}(\S.*)/);
    const name = match?.[2] || '';
    const level = match![1].length;
    titles.push({ level, name, children: [] })
  });
  return res;
}


// const MdComponentsMap = {
//   a: Link,
//   blockquote: 'blockquote',
//   br: 'br',
//   code: Code,
//   em: 'em',
//   h1: { class: Heading, props: { size: '2xl' } },
//   h2: { class: Heading, props: { size: 'xl' } },
//   h3: { class: Heading, props: { size: 'lg' } },
//   h4: { class: Heading, props: { size: 'md' } },
//   h5: { class: Heading, props: { size: 'sm' } },
//   h6: { class: Heading, props: { size: 'xs' } },
//   hr: 'hr',
//   img: Image,
//   li: ListItem,
//   ol: OrderedList,
//   p: Text,
//   pre: { class: Text, props: {} },
//   strong: { class: Text, props: { as: 'b' } },
//   ul: UnorderedList,
//   del: { class: Text, props: { as: 'del' } },
//   input: Input,
//   table: 'table',
//   tbody: 'tbody',
//   td: 'td',
//   th: 'th',
//   thead: 'thead',
//   tr: 'tr'
// }

// const MdComponents: any = {};
// Object.keys(MdComponentsMap).forEach(htmlType => {
//   MdComponents[htmlType] = (props: any) => {
//     const { node, ...rest } = props
//     const Fn = MdComponentsMap[htmlType]?.class || MdComponentsMap[htmlType] || 'div';
//     console.log('fn', Fn)
//     return (
//       <Fn {...rest} {...MdComponentsMap[htmlType]?.props} />
//     )
//   }
// });


export default function MarkdownRender({ children }: any) {
  // const toc = getToc(children);


  useEffect(() => {
    // 
  }, []);

  useEffect(() => {
    // // removeNode('github-css');
    // loadCss(`/css/github/github-markdown-${colorMode}.css`, 'github-css');
    // // removeNode('highlight-css');
    // loadCss(`/css/highlight/${colorMode}.min.css`, 'highlight-css');

  }, []);

  return (
    <article className="markdown markdown-body prose w-full max-w-full" style={{ background: 'none' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      // components={MdComponents}
      >
        {children}
        {/* {markdown} */}
      </ReactMarkdown>
    </article>
  )
}