const fetchNoteContent = async (id) => {
  try {
    const { data } = await axios.get('/graphql', {
      params: {
        query: `
query getNoteContentById($id: String!) {
  getNoteContentById(id: $id)
}
        `,
        variables: {
          id
        }
      }
    });
    return data.data.getNoteContentById
  } catch(e) {
    console.error(e)
  }
}

const setupNoteContent = async (nextSibling) => {
  if (!nextSibling.innerHTML) {
    const id = nextSibling.getAttribute('id')
    // fetch content if needed.
    const content = await fetchNoteContent(id);
    nextSibling.insertAdjacentHTML('afterbegin', content || '（没拉到内容 TT）');
  }
}

document.addEventListener('DOMContentLoaded', e => { 
  document.querySelector('article.notes-page').addEventListener('click', async e => {
    const { className, nextSibling, nodeName, parentNode } = e.target;
    if (className === 'title') {
      await setupNoteContent(nextSibling);
      nextSibling.style.display = nextSibling.style.display ? '' : 'block';
    } else if (nodeName === 'SPAN') {
      const { nextSibling } = parentNode
      await setupNoteContent(nextSibling);
      nextSibling.style.display = nextSibling.style.display ? '' : 'block';
    }
  });
});
