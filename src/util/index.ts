import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`);
}

export const getFileContent = (filename: string, folder: string) => {
  const POSTS_PATH = getPath(folder)
  return fs.readFileSync(path.join(POSTS_PATH, filename), "utf8");
};

export const getAllPosts = (folder: string) => {
  const POSTS_PATH = getPath(folder)
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /.*\.md?$/.test(path))
    .map((fileName) => {
      const source = getFileContent(fileName, folder);
      const name = fileName.replace(/\.*\.md?$/, "");
      const { data, content } = matter(source);
      return {
        title: data.title || name,
        isPublished: true,
        content,
        slug: data.slug || null,
      };
    });
};

export const getAllPublished = (folder: string) => {
  const posts = getAllPosts(folder)
  const published = posts.filter((post) => {
    // return post.frontmatter.isPublished === true
    return true;
  })
  return published
}

export const getSinglePost = (slug: string, folder: string) => {
  const source = getFileContent(`${slug}.md`, folder);
  const { data: frontmatter, content } = matter(source);

  return {
    frontmatter,
    content,
  };
};