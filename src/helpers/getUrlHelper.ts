/**
 * URL Helper - Common functions for getting and extracting URLs from browser
 */

/**
 * Gets the current URL from the browser
 * @returns The current URL object
 */
export const getCurrentUrl = (): URL => {
  if (typeof window === 'undefined') {
    throw new Error('getCurrentUrl can only be used in browser environment');
  }
  return new URL(window.location.href);
};

/**
 * Gets the current URL as a string
 * @returns The current URL string
 */
export const getCurrentUrlString = (): string => {
  if (typeof window === 'undefined') {
    throw new Error('getCurrentUrlString can only be used in browser environment');
  }
  return window.location.href;
};

/**
 * Extracts the main URL (protocol + domain + port) from the current URL
 * @returns The main URL (e.g., "https://example.com:3000")
 */
export const getMainUrl = (): string => {
  const url = getCurrentUrl();
  return `${url.protocol}//${url.host}`;
};

/**
 * Extracts the main URL from a given URL string
 * @param urlString - The URL string to extract main URL from
 * @returns The main URL (e.g., "https://example.com:3000")
 */
export const getMainUrlFromString = (urlString: string): string => {
  const url = new URL(urlString);
  return `${url.protocol}//${url.host}`;
};

/**
 * Gets the current pathname (without domain)
 * @returns The current pathname (e.g., "/assets/detail")
 */
export const getCurrentPathname = (): string => {
  if (typeof window === 'undefined') {
    throw new Error('getCurrentPathname can only be used in browser environment');
  }
  return window.location.pathname;
};

/**
 * Gets the current pathname with search parameters
 * @returns The current pathname with query string (e.g., "/assets/detail?aid=123")
 */
export const getCurrentPathWithQuery = (): string => {
  if (typeof window === 'undefined') {
    throw new Error('getCurrentPathWithQuery can only be used in browser environment');
  }
  return window.location.pathname + window.location.search;
};

/**
 * Gets the full path without main URL (pathname + search + hash)
 * @returns The full path without domain (e.g., "/assets/detail?aid=123#section1")
 */
export const getFullPath = (): string => {
  if (typeof window === 'undefined') {
    throw new Error('getFullPath can only be used in browser environment');
  }
  return window.location.pathname + window.location.search + window.location.hash;
};

/**
 * Gets the current search parameters as an object
 * @returns Object containing all search parameters
 */
export const getCurrentSearchParams = (): Record<string, string> => {
  const url = getCurrentUrl();
  const params: Record<string, string> = {};
  
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
};

/**
 * Gets a specific search parameter value
 * @param paramName - The parameter name to get
 * @returns The parameter value or null if not found
 */
export const getSearchParam = (paramName: string): string | null => {
  const url = getCurrentUrl();
  return url.searchParams.get(paramName);
};

/**
 * Gets the first search parameter (useful for single-parameter URLs)
 * @returns Object with key and value of the first parameter, or null if none
 */
export const getFirstSearchParam = (): { key: string; value: string } | null => {
  const url = getCurrentUrl();
  const firstParam = url.searchParams.entries().next();
  
  if (firstParam.done) {
    return null;
  }
  
  const [key, value] = firstParam.value;
  return { key, value };
};

/**
 * Extracts the first path segment (e.g., "assets" from "/assets/detail")
 * @returns The first path segment or empty string
 */
export const getFirstPathSegment = (): string => {
  const pathname = getCurrentPathname();
  const segments = pathname.split('/').filter(Boolean);
  return segments[0] || '';
};

/**
 * Extracts all path segments
 * @returns Array of path segments
 */
export const getPathSegments = (): string[] => {
  const pathname = getCurrentPathname();
  return pathname.split('/').filter(Boolean);
};

/**
 * Checks if the current URL has search parameters
 * @returns True if URL has search parameters
 */
export const hasSearchParams = (): boolean => {
  const url = getCurrentUrl();
  return url.searchParams.size > 0;
};

/**
 * Checks if a specific search parameter exists
 * @param paramName - The parameter name to check
 * @returns True if the parameter exists
 */
export const hasSearchParam = (paramName: string): boolean => {
  const url = getCurrentUrl();
  return url.searchParams.has(paramName);
};

/**
 * Gets the current URL information in a structured format
 * @returns Object containing all URL components
 */
export const getUrlInfo = () => {
  const url = getCurrentUrl();
  
  return {
    fullUrl: url.href,
    mainUrl: getMainUrl(),
    fullPath: getFullPath(),
    protocol: url.protocol,
    host: url.host,
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
    search: url.search,
    searchParams: getCurrentSearchParams(),
    hash: url.hash,
    pathSegments: getPathSegments(),
    firstPathSegment: getFirstPathSegment(),
    hasSearchParams: hasSearchParams(),
    firstSearchParam: getFirstSearchParam()
  };
};

/**
 * Builds a URL from components
 * @param pathname - The pathname (e.g., "/assets/detail")
 * @param searchParams - Optional search parameters object
 * @param hash - Optional hash
 * @returns The constructed URL string
 */
export const buildUrl = (
  pathname: string, 
  searchParams?: Record<string, string>, 
  hash?: string
): string => {
  const mainUrl = getMainUrl();
  let url = mainUrl + pathname;
  
  if (searchParams && Object.keys(searchParams).length > 0) {
    const params = new URLSearchParams(searchParams);
    url += '?' + params.toString();
  }
  
  if (hash) {
    url += hash;
  }
  
  return url;
};
