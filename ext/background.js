function logURL(requestDetails) {
  console.log(`Loading: ${requestDetails.url}`);
}

console.log('req ', 212);
chrome.webRequest.onBeforeRequest.addListener(logURL, { urls: ['<all_urls>'] });
