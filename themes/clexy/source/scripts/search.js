const DEFAULT_INDEX = 0;

document.addEventListener('DOMContentLoaded', async e => { 
  // wrapping DOM;
  const wrapFuncs = {
    wrapSearchPostResultSnippet: results => {
      if (results.length > 0) {
        let dom = `
          <h4>文章结果</h4>
          <ul class="catelog-items">
        `;
        results.forEach(i => {
          dom += (`
            <li itemprop="name">
              <a href="${i.url}" itemprop="url">《${i.title}》</a> &nbsp;—&nbsp;<time itemprop="datePublished" datetime="${i.rawDate}"> ${i.date}</time>
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
          <h4>标签结果</h4>
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

        let t = [];
        mountDOMs.forEach(dom => {
          const { type } = dom.dataset;
          t.push({
            html: wrapFuncs[`wrapSearch${type}ResultSnippet`].call(this, searchKeys[`search${type}sByKey`]),
            type
          });
        });

        if (t.filter(i => i.html).length === 0) {
          mountDOMs.forEach(dom => {
            dom.innerHTML = '';
          });
          emptySignDOM.style.display = 'block';
        } else {
          emptySignDOM.style.display = 'none';
          // mount;
          mountDOMs.forEach(dom => {
            const { type } = dom.dataset;
            const html = t.filter(i => i.type === type)[DEFAULT_INDEX].html;
            html && (dom.innerHTML = html);
          });
        }
      } catch(e) {
        console.error(e.message);
      } finally {
        target.disabled = false;
        target.innerText = '搜索';
      }
    } else {
      alert("STOP! Please check your input fields.");
    }
  });

});
