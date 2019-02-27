document.addEventListener('DOMContentLoaded', e => { 
  // for comments interfaces;
  const id = document.querySelector('article').getAttribute('post-id');
  console.log(`[id: ${id}]`);


  // back to top;
  const action = () => {
    if (window.getComputedStyle(document.body, null).getPropertyValue('flex-direction') === 'column') {
      document.documentElement.scrollTop = 0;
    } else {
      document.querySelector('main').scrollTop = 0;
    }
  };
  document.querySelector('.touch-top').addEventListener('touchstart', action);
  document.querySelector('.touch-top').addEventListener('click', action);


  // image zooming;
  const canvasContainer = document.querySelector('.canvas-containter');
  let zoomage = new Zoomage({
    container: canvasContainer,
    enableDesktop: true, 
    enableGestureRotate: true,
    dbclickZoomThreshold: 0.1,
    maxZoom: 3,
    minZoom: 0.1
  });
  
  document.querySelector('article').addEventListener('click', e => {
    const target = e.target || e.srcElement;
    if (target.tagName === 'IMG') {    
      canvasContainer.style.opacity = '1';
      canvasContainer.style.display = 'block';
      canvasContainer.style.zIndex = '200';
      // animation;
      canvasContainer.classList.add('animation-show');
      canvasContainer.classList.remove('animation-hide');
      zoomage.load(target.currentSrc);
    } 
  });

  canvasContainer.querySelector('span').addEventListener('click', () => {
    canvasContainer.style.opacity = '0';
    canvasContainer.style.zIndex = '-200';
    // animation;
    canvasContainer.classList.add('animation-hide');
    canvasContainer.classList.remove('animation-show');
  });
});

// service worker;
if ('serviceWorker' in window.navigator) {
  // use the window load event to keep the page load performant;
  window.addEventListener('load', () => {
    window.navigator.serviceWorker.register('/sw.js');
  });
}