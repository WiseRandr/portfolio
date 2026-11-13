// next/link and static image imports add the base path automatically;
// plain <a href> to files in /public does not, so use this for those.
export function publicPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
