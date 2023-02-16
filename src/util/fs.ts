import fs from "fs";

export function readdirSyncDeepth(path: string) {
  let files = fs.readdirSync(path, { withFileTypes: true });
  files.forEach(file => {
    console.log(file);
  });
}