export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith("/") ? `${base}${path.replace(/^\//, "")}` : `${base}${path}`;
}
