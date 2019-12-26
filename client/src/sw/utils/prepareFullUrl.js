export function prepareFullUrl(path) {
  const url = new URL(path, location.href);
  return url.href;
}
