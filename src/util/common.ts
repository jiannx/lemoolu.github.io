import path from "path";

export const getPath = (folder: string) => {
  return path.join(process.cwd(), `/${folder}`);
}

export const pathJoin = (...arg: string[]) => {
  return path.join(...arg);
}