const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  if (!basePath) {
    return path;
  }

  return `${basePath}${path}`;
}

export { basePath };
