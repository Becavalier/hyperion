document.addEventListener('DOMContentLoaded', async e => { 
  // Click to top.
  const ttIns = document.querySelector('.touch-top')
  const ttAction = () => {
    if (window.getComputedStyle(document.body, null).getPropertyValue('flex-direction') === 'column') {
      window.scrollTo({ 
        top: 0, 
        behavior: "smooth" 
      })
    } else {
      document.querySelector('main').scrollTop = 0
    }
  }
  ttIns.addEventListener('touchstart', ttAction)
  ttIns.addEventListener('click', ttAction)

  // Image zooming.
  const canvasContainer = document.querySelector('.canvas-containter')
  let zoomage = new Zoomage({
    container: canvasContainer,
    enableDesktop: true, 
    enableGestureRotate: true,
    dbclickZoomThreshold: 0.1,
    maxZoom: 3,
    minZoom: 0.1
  })
  
  document.querySelector('article').addEventListener('click', e => {
    const target = e.target || e.srcElement
    if (target.tagName === 'IMG') {    
      canvasContainer.style.opacity = '1'
      canvasContainer.style.display = 'block'
      canvasContainer.style.zIndex = '200'
      canvasContainer.classList.add('animation-show')
      canvasContainer.classList.remove('animation-hide')
      zoomage.load(target.currentSrc)
    } 
  })

  canvasContainer.querySelector('span').addEventListener('click', () => {
    canvasContainer.style.opacity = '0'
    canvasContainer.style.zIndex = '-200'
    canvasContainer.classList.add('animation-hide')
    canvasContainer.classList.remove('animation-show')
  })
})
