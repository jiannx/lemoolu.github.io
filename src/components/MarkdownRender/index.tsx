"use client"
import ReactMarkdown from 'react-markdown';
import style from './index.module.scss';
import remarkGfm from 'remark-gfm'
import hljs from 'highlight.js';
import { useEffect, useState } from 'react';
import { useCurrentColorMode } from '../IconSwitch/DarkSwitch';
import { loadCss, removeNode } from './utils';


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
  const [state, setState] = useState(false);
  const mode = useCurrentColorMode();

  useEffect(() => {
    // 
  }, []);

  useEffect(() => {
    if (!mode) {
      return;
    }
    removeNode('github-css');
    loadCss(`/css/github/github-markdown-${mode}.css`, 'github-css');
    removeNode('highlight-css');
    loadCss(`/css/highlight/${mode}.min.css`, 'highlight-css');

    setTimeout(() => {
      setState(true);
      hljs.highlightAll();
    }, 200)
  }, [mode]);

  if (!state) {
    return null;
  }

  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}