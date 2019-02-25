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
  const canvas = canvasContainer.querySelector('canvas');
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
      canvasContainer.style.display = 'block';
      canvasContainer.style.opacity = '1';
      canvasContainer.style.zIndex = '100';
      zoomage.load(target.currentSrc);
    } 
  });

  canvasContainer.querySelector('span').addEventListener('click', () => {
    canvasContainer.style.display = 'none';
  });
});
