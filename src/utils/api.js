/**
 * API Utilities for CPD Sessions Webapp
 * 
 * Implements fetchJSONP to bypass standard browser CORS redirect blocks
 * when communicating with Google Apps Script Web Apps.
 */
export function fetchJSONP(url) {
  return new Promise((resolve, reject) => {
    // Generate a unique callback function name
    const callbackName = 'jsonp_cb_' + Math.round(100000 * Math.random());
    
    // Append prefix parameter to the query string
    const separator = url.includes('?') ? '&' : '?';
    const scriptUrl = `${url}${separator}prefix=${callbackName}`;
    
    // Set up a timeout to reject if the script takes too long (10 seconds)
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error('Network request timed out'));
    }, 10000);

    // Register callback globally
    window[callbackName] = (data) => {
      clearTimeout(timeoutId);
      resolve(data);
      cleanup();
    };
    
    // Create script element
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.id = callbackName;
    script.async = true;
    
    // Handle loading errors
    script.onerror = () => {
      clearTimeout(timeoutId);
      reject(new Error('Failed to load resource from server'));
      cleanup();
    };
    
    // Inject script into the document head to fire request
    document.head.appendChild(script);
    
    function cleanup() {
      const element = document.getElementById(callbackName);
      if (element) {
        element.remove();
      }
      delete window[callbackName];
    }
  });
}
