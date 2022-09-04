const DEFAULT_INDEX = 0;
const SEARCH_RESULT_THRESHOLD = 10;

const escapeHTML = (str) => {
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}
document.addEventListener('DOMContentLoaded', async () => { 
  const wrapFuncs = {
    wrapSearchPostResultSnippet: results => {
      if (results.length > 0) {
        results.sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime())
        return `
          <h4>文章（仅显示最近 ${SEARCH_RESULT_THRESHOLD} 条）</h4>
          <ul class="search-catelog-items">
          ${
            results.slice(0, SEARCH_RESULT_THRESHOLD).reduce((prev, i) => {
              prev += (`
                <li itemprop="name">
                  <a target="_blank" href="${i.url}" itemprop="url">
                    <span>${i.title}</span>&nbsp;|&nbsp;<time itemprop="datePublished" datetime="${i.rawDate}">${i.date}</time>
                  </a>
                  <ul>${
                    i.snippets.reduce((prevSnippet, j) => {
                      prevSnippet += `<li>... ${escapeHTML(j)} ...</li>`
                      return prevSnippet
                    }, '')
                  }</ul>
                </li>
              `);
              return prev
            }, '')
          }
          </ul><br>
        `;
      } else {
        return false;   
      }
    },
  };

  const mountDOMs = document.querySelectorAll('div.search-result-container');
  const searchKeyDOM = document.querySelector('input.input-search');
  const emptySignDOM = document.querySelector('div.no-result');
  const submitButtonDOM = document.querySelector('button.submit-search');

  searchKeyDOM.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      submitButtonDOM.click();
    }
  });
  
  submitButtonDOM.addEventListener('click', async e => {
    const target = e.target || e.srcElement;
    const searchKey = searchKeyDOM.value;
    if (searchKey) {
      target.disabled = true;
      target.innerText = '...';

      try {
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
        });

        if (Array.isArray(response.data.errors) && response.data.errors.length > 0) {
          alert(response.data.errors[DEFAULT_INDEX].message);
          return;
        }

        const { 
          data: {
            data: {
              ...searchKeys
            } 
          }
        } = response;

        const result = [];
        mountDOMs.forEach(dom => {
          const { type } = dom.dataset;
          result.push({
            html: wrapFuncs[`wrapSearch${type}ResultSnippet`].call(this, searchKeys[`search${type}sByKey`]),
            type,
          });
        });

        if (result.filter(i => i.html).length === 0) {
          mountDOMs.forEach(dom => {
            dom.innerHTML = '';
          });
          emptySignDOM.style.display = 'block';
        } else {
          emptySignDOM.style.display = 'none';
          mountDOMs.forEach(dom => {
            const { type } = dom.dataset;
            const { html } = result.filter(i => i.type === type)[DEFAULT_INDEX];
            if (html) {
              dom.innerHTML = '';
              dom.insertAdjacentHTML('afterbegin', html);
            }
          });
        }
      } catch(e) {
        console.error(e.message);
      } finally {
        target.disabled = false;
        target.innerText = '搜索';
      }
    }
  });
});
