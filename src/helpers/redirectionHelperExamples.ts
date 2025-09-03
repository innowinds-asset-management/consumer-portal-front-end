/**
 * Examples of how to use the Redirection Helper
 * This file demonstrates various usage patterns
 */

import { 
  captureRedirectionStatus, 
  getRedirectionStatus, 
  getPageRedirectionInfo,
  clearRedirectionStatus,
  updatePageRedirectionStatus,
  hasRedirectionStatus,
  getAvailablePages
} from './redirectionHelper';

// Example 1: Basic usage - capture current page redirection status
export const handleBasicCapture = () => {
  // This will capture the current URL and store it based on the first path segment
  // Example: If on "http://localhost:3000/suppliers/detail/?sid=SUP-55509"
  // It will create: { "suppliers": { "key": "sid", "url": "suppliers/detail/?sid=SUP-55509" } }
  
  const status = captureRedirectionStatus();
  console.log('Captured status:', status);
};

// Example 2: Capture for a specific page name
export const handleSpecificPageCapture = () => {
  // This will create an entry for "customPage" instead of the current page
  // Useful when you want to store redirection info for a different page
  
  const status = captureRedirectionStatus({ pageName: 'customPage' });
  console.log('Captured status for custom page:', status);
};

// Example 3: Capture without creating entry (just get current status)
export const handleReadOnlyCapture = () => {
  // This will only read the current status without creating new entries
  
  const status = captureRedirectionStatus({ createEntry: false });
  console.log('Current status (read-only):', status);
};

// Example 4: Button click handler for navigation
export const handleNavigationButtonClick = (targetPage: string) => {
  // Capture current page status before navigating
  captureRedirectionStatus();
  
  // Navigate to target page
  // router.push(`/${targetPage}`);
  
  console.log(`Navigating to ${targetPage} and captured current page status`);
};

// Example 5: Get redirection info for a specific page
export const getRedirectionForPage = (pageName: string) => {
  const info = getPageRedirectionInfo(pageName);
  
  if (info) {
    console.log(`Redirection info for ${pageName}:`, info);
    console.log(`Parameter key: ${info.key}`);
    console.log(`URL: ${info.url}`);
    
    // You can use this info to navigate back or pre-populate forms
    return info;
  } else {
    console.log(`No redirection info found for ${pageName}`);
    return null;
  }
};

// Example 6: Check if redirection status exists
export const checkRedirectionExists = (pageName: string) => {
  const exists = hasRedirectionStatus(pageName);
  
  if (exists) {
    console.log(`Redirection status exists for ${pageName}`);
    const info = getPageRedirectionInfo(pageName);
    console.log('Info:', info);
  } else {
    console.log(`No redirection status for ${pageName}`);
  }
  
  return exists;
};

// Example 7: Clear specific page redirection status
export const clearSpecificPage = (pageName: string) => {
  clearRedirectionStatus(pageName);
  console.log(`Cleared redirection status for ${pageName}`);
};

// Example 8: Clear all redirection status
export const clearAllRedirections = () => {
  clearRedirectionStatus();
  console.log('Cleared all redirection status');
};

// Example 9: Update redirection status manually
export const updateRedirectionManually = (pageName: string, key: string, url: string) => {
  updatePageRedirectionStatus(pageName, key, url);
  console.log(`Manually updated redirection status for ${pageName}`);
};

// Example 10: Get all available pages with redirection status
export const showAllAvailablePages = () => {
  const pages = getAvailablePages();
  console.log('Available pages with redirection status:', pages);
  
  pages.forEach(page => {
    const info = getPageRedirectionInfo(page);
    console.log(`${page}: ${info?.key} = ${info?.url}`);
  });
  
  return pages;
};

// Example 11: React component button click handler
export const handleButtonClick = () => {
  // Capture current page status
  const status = captureRedirectionStatus();
  
  // You can now use this status for navigation or form pre-population
  console.log('Button clicked, captured status:', status);
  
  // Example: Navigate to AMC/CMC create page with captured asset info
  if (status.assets) {
    const assetUrl = status.assets.url;
    const assetId = new URLSearchParams(assetUrl.split('?')[1]).get(status.assets.key);
    
    if (assetId) {
      console.log(`Navigating to AMC/CMC create with asset ID: ${assetId}`);
      // router.push(`/amc-cmc/create?aid=${assetId}`);
    }
  }
  
  return status;
};

// Example 12: Form submission handler
export const handleFormSubmit = (formData: any) => {
  // Capture current page status before form submission
  captureRedirectionStatus();
  
  // Submit form
  console.log('Form submitted with data:', formData);
  console.log('Redirection status captured for potential return navigation');
};

// Example 13: Page load handler
export const handlePageLoad = () => {
  // Check if there's redirection info for the current page
  const currentPath = window.location.pathname.split('/')[1] || '';
  
  if (hasRedirectionStatus(currentPath)) {
    const info = getPageRedirectionInfo(currentPath);
    console.log(`Page loaded with existing redirection info:`, info);
    
    // You can use this info to pre-populate forms or set default values
    return info;
  }
  
  return null;
};

// Example 14: Navigation guard
export const checkNavigationPermission = (targetPage: string) => {
  // Check if user has redirection status for the target page
  const hasStatus = hasRedirectionStatus(targetPage);
  
  if (hasStatus) {
    console.log(`User has access to ${targetPage} (redirection status exists)`);
    return true;
  } else {
    console.log(`User doesn't have access to ${targetPage} (no redirection status)`);
    return false;
  }
};
