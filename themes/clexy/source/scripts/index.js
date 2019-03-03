// service worker;
if ('serviceWorker' in window.navigator) {
  // use the window load event to keep the page load performant;
  window.addEventListener('load', () => {
    window.navigator.serviceWorker.register('/sw.js');
  });
}
