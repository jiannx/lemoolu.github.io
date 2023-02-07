import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPath } from './common';

export const POSTS_PATH = getPath('/posts');

const getFileContent = (filePath: string) => {
  return fs.readFileSync(path.join(POSTS_PATH, filePath), "utf8");
};


export const getSinglePost = (filePath: string): Post => {
  const source = getFileContent(filePath);
  const { data, content } = matter(source);
  const fileName = filePath.replace(/\.*\.md?$/, "");

  return {
    title: data.title,
    content,
    fileName,
    filePath,
  };
};

export interface Post {
  /** 文章标题 */
  title: string;
  /** 文章内容 */
  content: string;
  /** 文件名 */
  fileName: string;
  /** 文件地址 */
  filePath: string;
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /.*\.md?$/.test(path))
    .map((filePath) => {
      return getSinglePost(filePath);
    });
};