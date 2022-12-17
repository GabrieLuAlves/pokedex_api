export const parseQueryParams = (obj: unknown) => {
  if (!obj) {
    return undefined;
  }
  return JSON.parse(String(obj));
};
