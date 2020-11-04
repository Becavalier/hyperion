const DEFAULT_INDEX = 0;

document.addEventListener('DOMContentLoaded', async e => { 
  // wrapping DOM;
  const wrapFuncs = {
    wrapSearchPostResultSnippet: results => {
      if (results.length > 0) {
        results.sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime())
        let dom = `
          <h4>文章</h4>
          <ul class="catelog-items">
        `;
        results.forEach(i => {
          dom += (`
            <li itemprop="name">
              <time itemprop="datePublished" datetime="${i.rawDate}">${i.date}</time> &nbsp;|&nbsp; <a href="${i.url}" itemprop="url">${i.title}</a>
            </li>
          `);
        });
        return `${dom}</ul>`;
      } else {
        return false;   
      }
    },
    wrapSearchTagResultSnippet: results => {
      if (results.length > 0) {
        let dom = `
          <h4>标签</h4>
          <div class="tag-item">
        `;
        results.forEach(i => {
          dom += (`
            <a href="/tags/${i.tagName}" itemprop="url">#${i.tagName}</a>
          `);
        });
        return `${dom}</div>`;
      } else {
        return false;   
      }
    }
  };

  const mountDOMs = document.querySelectorAll('.search-result-container');
  const searchKeyDOM = document.querySelector('.input-search');
  const emptySignDOM = document.querySelector('div.no-result');
  const submitButtonDOM = document.querySelector('.submit-search');

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
    }
    searchTagsByKey(key: $searchKey) {
      tagName
    }
  }
            `,
            variables: {
              searchKey
            }
          }
        });

        // exception handling;
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

        let _t = [];
        mountDOMs.forEach(dom => {
          const { type } = dom.dataset;
          _t.push({
            html: wrapFuncs[`wrapSearch${type}ResultSnippet`].call(this, searchKeys[`search${type}sByKey`]),
            type,
          });
        });

        if (_t.filter(i => i.html).length === 0) {
          mountDOMs.forEach(dom => {
            dom.insertAdjacentHTML('afterbegin', '');
          });
          emptySignDOM.style.display = 'block';
        } else {
          emptySignDOM.style.display = 'none';
          // mount;
          mountDOMs.forEach(dom => {
            const { type } = dom.dataset;
            const html = _t.filter(i => i.type === type)[DEFAULT_INDEX].html;
            if (html) dom.insertAdjacentHTML('afterbegin', html);
          });
        }
      } catch(e) {
        console.error(e.message);
      } finally {
        target.disabled = false;
        target.innerText = '搜索';
      }
    } else {
      alert(":( Nothing to search!");
    }
  });
});
