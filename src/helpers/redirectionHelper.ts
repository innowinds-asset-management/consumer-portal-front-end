/**
 * Redirection Helper - Captures URL information and stores in localStorage
 * Can be used anywhere in the application to track navigation context
 */

export interface RedirectionStatus {
  [key: string]: {
    key: string;
    url: string;
  };
}

export interface RedirectionOptions {
  pageName?: string;
  createEntry?: boolean;
  updateExisting?: boolean;
}

/**
 * Captures current URL information and stores in localStorage
 * @param options - Configuration options for redirection handling
 * @returns The current redirection status object
 */
export const captureRedirectionStatus = (options: RedirectionOptions = {}): RedirectionStatus => {
  const {
    pageName,
    createEntry = true,
    updateExisting = true
  } = options;

  try {
    // Get current URL
    const currentUrl = window.location.href;
    
    // Extract path and query parameters (ignore domain)
    const urlObj = new URL(currentUrl);
    const pathWithQuery = urlObj.pathname + urlObj.search;
    
    // Extract first word from path (e.g., "suppliers" from "/suppliers/detail")
    const pathSegments = urlObj.pathname.split('/').filter(Boolean);
    const firstSegment = pathSegments[0] || '';
    
    // Find the first query parameter key (e.g., "sid" from "?sid=SUP-55509")
    const queryParams = urlObj.searchParams;
    let paramKey = '';
    let paramValue = '';
    
    // Get the first query parameter
    for (const [key, value] of queryParams.entries()) {
      paramKey = key;
      paramValue = value;
      break; // Only get the first one
    }
    
    // If no query parameters, don't create entry
    if (!paramKey || !paramValue) {
      console.warn('No query parameters found in URL, skipping redirection capture');
      return getRedirectionStatus();
    }
    
    // Get existing redirection status from localStorage
    const existingStatus = getRedirectionStatus();
    
    // Create new entry
    const newEntry = {
      key: paramKey,
      url: pathWithQuery
    };
    
    // Handle different scenarios based on options
    if (createEntry) {
      if (pageName && pageName !== firstSegment) {
        // If pageName is provided and different from current page, create entry for that page
        existingStatus[pageName] = newEntry;
      } else {
        // Use the first segment of current path
        existingStatus[firstSegment] = newEntry;
      }
    }
    
    // Save to localStorage
    localStorage.setItem('redirectionStatus', JSON.stringify(existingStatus));
    
    console.log('Redirection status captured:', existingStatus);
    return existingStatus;
    
  } catch (error) {
    console.error('Error capturing redirection status:', error);
    return getRedirectionStatus();
  }
};

/**
 * Gets the current redirection status from localStorage
 * @returns The redirection status object
 */
export const getRedirectionStatus = (): RedirectionStatus => {
  try {
    const stored = localStorage.getItem('redirectionStatus');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading redirection status from localStorage:', error);
    return {};
  }
};

/**
 * Gets redirection information for a specific page
 * @param pageName - The page name to get redirection info for
 * @returns Redirection info for the specified page or null if not found
 */
export const getPageRedirectionInfo = (pageName: string) => {
  const status = getRedirectionStatus();
  return status[pageName] || null;
};

/**
 * Clears redirection status for a specific page or all pages
 * @param pageName - Optional page name to clear, if not provided clears all
 */
export const clearRedirectionStatus = (pageName?: string) => {
  try {
    if (pageName) {
      const status = getRedirectionStatus();
      delete status[pageName];
      localStorage.setItem('redirectionStatus', JSON.stringify(status));
      console.log(`Redirection status cleared for page: ${pageName}`);
    } else {
      localStorage.removeItem('redirectionStatus');
      console.log('All redirection status cleared');
    }
  } catch (error) {
    console.error('Error clearing redirection status:', error);
  }
};

/**
 * Updates redirection status for a specific page
 * @param pageName - The page name to update
 * @param key - The parameter key
 * @param url - The URL to store
 */
export const updatePageRedirectionStatus = (pageName: string, key: string, url: string) => {
  try {
    const status = getRedirectionStatus();
    status[pageName] = { key, url };
    localStorage.setItem('redirectionStatus', JSON.stringify(status));
    console.log(`Redirection status updated for page: ${pageName}`);
  } catch (error) {
    console.error('Error updating redirection status:', error);
  }
};

/**
 * Checks if redirection status exists for a specific page
 * @param pageName - The page name to check
 * @returns True if redirection status exists for the page
 */
export const hasRedirectionStatus = (pageName: string): boolean => {
  const status = getRedirectionStatus();
  return pageName in status;
};

/**
 * Gets all available page names with redirection status
 * @returns Array of page names that have redirection status
 */
export const getAvailablePages = (): string[] => {
  const status = getRedirectionStatus();
  return Object.keys(status);
};
