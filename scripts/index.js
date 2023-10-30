// const fs = require('fs')
// const path = require('path')
const UglifyES = require('uglify-es')
const csso = require('csso')
// const imagemin = require('imagemin')
// const imageminMozjpeg = require('imagemin-mozjpeg')
// const imageminPngquant = require('imagemin-pngquant')

// Compression
hexo.extend.filter.register('after_render:js', (str, data) => {
  return UglifyES.minify(str).code
})

hexo.extend.filter.register('after_render:css', (str, data) => {
  return csso.minify(str).css
})

// Minify images
// hexo.assetsContainer = {}
// hexo.extend.filter.register('before_post_render', data => {
//   const reg = /!\[\S+?\]?\((\d+[\.png|\.jpg]+)\)/i
//   const regGlobal = /!\[\S+?\]?\((\d+[\.png|\.jpg]+)\)/ig
  
//   let items = data.raw.match(regGlobal)
//   if (Array.isArray(items) && items.length > 0) {
//     hexo.assetsContainer[data.path] = items.map(i => {
//       let result = reg.exec(i)
//       return result ? result[DEFAULT_INDEX + 1] : []
//     })
//   }
//   return data
// })

// Handle pattern like "[Page: 1]" with special styles.
hexo.extend.filter.register('before_post_render', data => {
  if (data.layout === 'post' && typeof(data.content) === 'string') {
    data.content = data.content.replace(/\[Page:\s*(\d+)\]\s*/g, '<span class="pn">Page $1</span>')
  }
  return data
})

hexo.extend.filter.register('after_post_render', data => {
  // For "Cards" page.
  if (data.layout === 'page' && data.page === 'cards') {
    data.cards = Array.from(String(data.content).matchAll(/<h3.*?>(?<head>[\S\s]+?<\/a>(?<title>[\S\s]+?))<\/h3>(?<content>[\S\s]+?)(?=(<h3|$))/g)).map(i => {
      return {
        title: i.groups.title,
        head: i.groups.head,
        content: i.groups.content.split('<hr>')
      }
    })
  }
  if (data.layout === 'post' && typeof(data.content) === 'string') {
    data.content = data.content.replace(/(<img src="[0-9a-zA-Z.]*?" alt="([\S\s]*?)">)/g, '<p>$1<span class="pic-desc">$2</span></p>')
  }
  return data
})

// hexo.extend.filter.register('before_exit', data => {
//   for (let key in hexo.assetsContainer) {
//     const items = hexo.assetsContainer[key]
//     items.forEach(async i => {
//       const relativePath = key + i
//       const absolutePath = path.resolve(__dirname, '../public', relativePath)

//       try {
//         const files = await imagemin([absolutePath], {
//           destination: path.dirname(absolutePath),
//           plugins: [
//             imageminMozjpeg({
//               quality: 50
//             }),
//             imageminPngquant({quality: [.5, .6]}),
//           ]
//         })
//         if (files[DEFAULT_INDEX]) {
//           console.info(`[Hexo Minify] ${files[DEFAULT_INDEX]['sourcePath']}`)
//         }
//       } catch (e) {
//         console.error(e)
//       }
//     })
//   }
// })
