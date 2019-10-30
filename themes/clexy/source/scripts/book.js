document.addEventListener('DOMContentLoaded', async e => { 
  const response = (await axios.get('/graphql', {
    params: {
      query: `
query {
  fetchAllBookRecord {
    id
    name
    url
    totalPages
    currentPages
  }
}`
    }
  })).data.data.fetchAllBookRecord;

  if (Array.isArray(response) && response.length > 0) {
    const container = document.querySelector('.books-container');
    container.insertAdjacentHTML('afterbegin', response.map(i => {
      return `
        <div class="book-item">
          <span>《${i.name}》</span>
          <span class="state">${(i.currentPages / i.totalPages).toFixed(2)}%</span>
          <button class="action-read" data-url="${i.url}" data-id="${i.id}" data-page="${i.currentPages}">阅读</button>
        </div>`;
    }));

    // listeners;
    container.addEventListener('click', e => {
      const { url, id, page } = e.target.dataset;
      if (e.target.dataset.url) {
        window.open(`/app-pdf-viewer/web/viewer.html?file=${encodeURIComponent(url)}#page=${page}`);
      }
    });
  }  
});
