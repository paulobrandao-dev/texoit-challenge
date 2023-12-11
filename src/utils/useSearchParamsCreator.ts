export type RequestPattern = Record<
  string,
  string | number | Array<string | number> | boolean | undefined | null
>;

export function useSearchParamsCreator() {
  return (request: RequestPattern, nullable?: boolean) => {
    const keys = Object.keys(request);
    if (!keys.length) return '';
    const query = keys.reduce((acc, key) => {
      if (request[key] === undefined || (request[key] === null && !nullable)) {
        return acc.trim();
      }
      if (Array.isArray(request[key])) {
        const params = (request[key] as Array<string | number>)
          .map(value => `${key}=${value}`)
          .join('&');
        return `${acc.trim()}${acc.trim().length === 0 ? '?' : '&'}${params}`;
      }
      return `${acc.trim()}${acc.trim().length === 0 ? '?' : '&'}${key}=${
        request[key]?.toString() || ''
      }`;
    }, '');
    return encodeURI(query);
  };
}
