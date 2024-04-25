import { glob } from 'glob';
import path from 'path';
import { mdPath } from '@/common';
import fs from 'fs';
import util from 'util';
import matter from "gray-matter";
import crypto from 'crypto';
import dayjs from 'dayjs';


const getFileContent = (filePath: string) => {
  return fs.readFileSync(filePath, "utf8");
};

export interface Post {
  /** 唯一id标识 */
  hash: string;
  /** 文章标题 */
  title: string;
  /** 描述 */
  description: string;
  /** 文章内容 */
  content: string;
  /** 文件名 */
  filename: string;
  /** 文件地址 */
  filePath: string;
  // 分类标签
  tags: string[];
  // 日期
  date: string;
}

export async function postsGetList(): Promise<Post[]> {
  // const files: any[] = [];
  const files = await glob(path.resolve(mdPath, "**/*.md"));
  const posts: Post[] = [];
  // console.log(files);
  files.forEach((file: string) => {
    // 扩展名
    const extname = path.extname(file);
    // 文件名
    const filename = path.basename(file, extname);
    // 源文件内容
    const source = fs.readFileSync(file, "utf8");
    // 标题，日期，标签，正文
    const { data: { title, date, tags, description }, content } = matter(source);
    posts.push({
      // hash: crypto.createHash('md5').update(file).digest('hex') + '-' +filename,
      hash: encodeURIComponent(filename),
      title: title || filename,
      description: description || '',
      content: content || '',
      filename,
      filePath: file,
      tags: tags?.split(',') || [],
      date: dayjs(date).format('YYYY-MM-DD'),
    });
  });
  posts.sort((b: Post, a: Post) => {
    return dayjs(a.date).unix() - dayjs(b.date).unix();
  });
  return posts;
}