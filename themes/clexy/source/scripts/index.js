// service worker
if ('serviceWorker' in window.navigator) {
  // use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    window.navigator.serviceWorker.register('/sw.js')
  })
}

const throttle = (fn, delay) => {
  let timeout = null;
  return (...args) => {
    if (timeout === null) {
      fn.apply(this, args);
      timeout = setTimeout(() => {
        timeout = null;
      }, delay)
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')
  const headerLinks = Array.from(document.querySelectorAll('.headerlink'))
  const tocList = Array.from(document.querySelectorAll('.toc li'))
  if (tocList.length > 0) {
    const relayout = throttle(() => {
      let currentActiveIdx = headerLinks.map(i => i.offsetTop - main.scrollTop).findLastIndex(i => i <= 0);
      if (currentActiveIdx === -1) currentActiveIdx = 0
      tocList.forEach((e, idx) => {
        if (idx === currentActiveIdx) e.classList.add("active");
        else if (idx != headerLinks.length - 1 || currentActiveIdx != -1) e.classList.remove("active");
      })
    }, 100)
    relayout()
    main.addEventListener('scroll', () => {
      relayout()
    })  
  }
})
