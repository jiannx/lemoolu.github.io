import ReactMarkdown from 'react-markdown';
import style from './index.module.scss';
import remarkGfm from 'remark-gfm'

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

export default function MarkdownRender({ children }: any) {
  const toc = getToc(children);

  return (
    <div className={style.markdown}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}