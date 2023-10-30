const loadScript = (url, attrs = {}) => {
  const scriptEle = document.createElement("script")
  Object.entries(attrs).forEach(([key, val]) => {
    scriptEle[key] = val
  })
  scriptEle.src = url
  scriptEle.addEventListener("error", (e) => {
    console.error(e.message)
  })
  document.body.appendChild(scriptEle)
}

const DEFAULT_INDEX = 0
const SEARCH_RESULT_THRESHOLD = 15
const SEARCH_INDEX = 'hangyu_site'

const urlParams = new URLSearchParams(document.currentScript.getAttribute('src').split('?')[DEFAULT_INDEX + 1])
const searchEndpoint = urlParams.get('endpoint')
let algoliaSearchClient = null

if (searchEndpoint === 'algolia') {
  loadScript('https://cdn.jsdelivr.net/npm/algoliasearch@4.19.1/dist/algoliasearch-lite.umd.js', {
    crossorigin: 'anonymous',
    type: 'text/javascript',
  })
} else {
  loadScript('https://shadow.elemecdn.com/npm/axios@0.18.0/dist/axios.min.js', {
    type: 'text/javascript',
  })
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const escapeHTML = (str) => {
  const p = document.createElement("p")
  p.appendChild(document.createTextNode(str))
  return p.innerHTML
}

document.addEventListener('DOMContentLoaded', async () => { 
  const wrapFuncs = {
    wrapSearchPostResultSnippet: results => {
      if (results.length > 0) {
        return `
          <h4>文章（仅显示相关的 ${SEARCH_RESULT_THRESHOLD} 条）</h4>
          <ul class="search-catelog-items">
          ${
            results.slice(0, SEARCH_RESULT_THRESHOLD).reduce((prev, i) => {
              prev += (`
                <li itemprop="name">
                  <a target="_blank" href="${i.url || i.permalink}" itemprop="url">
                    <span class="title">${i.title}</span>
                    <span class="separator">|</span>
                    <time itemprop="datePublished" datetime="${i.rawDate || i.date}">${formatDate(i.date)}</time>
                  </a>
                  <ul>${
                    (i.snippets || [i.content]).reduce((prevSnippet, j) => {
                      prevSnippet += `<li>... ${escapeHTML(j)} ...</li>`
                      return prevSnippet
                    }, '')
                  }</ul>
                </li>
              `)
              return prev
            }, '')
          }
          </ul><br>
        `
      } else {
        return false   
      }
    },
  }

  const mountDOMs = document.querySelectorAll('div.search-result-container')
  const searchKeyDOM = document.querySelector('input.input-search')
  const emptySignDOM = document.querySelector('div.no-result')
  const submitButtonDOM = document.querySelector('button.submit-search')

  searchKeyDOM.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      submitButtonDOM.click()
    }
  })
  
  submitButtonDOM.addEventListener('click', async e => {
    const target = e.target || e.srcElement
    const searchKey = searchKeyDOM.value
    if (searchKey) {
      target.disabled = true
      target.innerText = '...'
      const result = []
      try {
        if (searchEndpoint === 'algolia' && algoliasearch) {
          if (!algoliaSearchClient) algoliaSearchClient = algoliasearch('1R78TOVXIF', '820e7a4698c4a73b53d7054a38c80b3f')
          const index = algoliaSearchClient.initIndex(SEARCH_INDEX)
          const { hits } = await index.search(searchKey)
          mountDOMs.forEach(dom => {
            const { type } = dom.dataset
            result.push({
              html: wrapFuncs[`wrapSearch${type}ResultSnippet`].call(this, hits),
              type,
            })
          })
        } else if (axios) {
          const response = await axios.get('/graphql', {
            params: {
              query: `
    query searchContent($searchKey: String!) {
      searchPostsByKey(key: $searchKey) {
        title
        url
        date
        rawDate
        snippets
      }
    }
              `,
              variables: {
                searchKey
              }
            }
          })

          if (Array.isArray(response.data.errors) && response.data.errors.length > 0) {
            alert(response.data.errors[DEFAULT_INDEX].message)
            return
          }

          const { 
            data: {
              data: {
                ...searchKeys
              } 
            }
          } = response

          mountDOMs.forEach(dom => {
            const { type } = dom.dataset
            result.push({
              html: wrapFuncs[`wrapSearch${type}ResultSnippet`].call(this, searchKeys[`search${type}sByKey`]),
              type,
            })
          })
        }
      
        if (result.filter(i => i.html).length === 0) {
          mountDOMs.forEach(dom => {
            dom.innerHTML = ''
          })
          emptySignDOM.style.display = 'block'
        } else {
          emptySignDOM.style.display = 'none'
          mountDOMs.forEach(dom => {
            const { type } = dom.dataset
            const { html } = result.filter(i => i.type === type)[DEFAULT_INDEX]
            if (html) {
              dom.innerHTML = ''
              dom.insertAdjacentHTML('afterbegin', html)
            }
          })
        }
      } catch(e) {
        console.error(e.message)
      } finally {
        target.disabled = false
        target.innerText = '搜索'
      }
    }
  })
})
