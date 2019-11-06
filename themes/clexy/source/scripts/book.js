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
      const progress = (Number(i.currentPages / i.totalPages) * 100).toFixed(2);
      return `
        <div class="book-item">
          <span>《${i.name}》</span>
          <span class="progress"><progress value="${progress}" max="100"></span>
          <span class="state">${progress}%</span>
          <button class="action-read" data-url="${i.url}" data-id="${i.id}" data-page="${i.currentPages}">阅读</button>
          <button class="action-note" data-id="${i.id}">笔记</button>
        </div>`;
    }).join(''));

    // listeners;
    container.addEventListener('click', async e => {
      const { url, id, page } = e.target.dataset;
      if (e.target.className === 'action-read' && url) {
        window.open(`/app-pdf-viewer/web/viewer.html?file=${encodeURIComponent(url)}#page=${page}`);
      }

      if (e.target.className === 'action-note' && id) {
        const response = (await axios.get('/graphql', {
          params: {
            query: `
              query fetchBookNotes($id: Int!) {
                fetchAllBookNoteById(id: $id) {
                  id
                  bookId
                  page
                  note
                }
              }
            `,
            variables: { id: Number(id) }
          }
        })).data.data.fetchAllBookNoteById;
        window.open().document.write(`<ol>${response.map(i => `<li><pre>${i.note}</pre></li>`).join('')}</ol>`);
      }
    });
  }  
});
