document.addEventListener("DOMContentLoaded",async e=>{const a=(await axios.get("/graphql",{params:{query:"\n        query {\n          fetchAllBookRecord {\n            id\n            name\n            url\n            totalPages\n            currentPages\n          }\n        }"}})).data.data.fetchAllBookRecord;if(Array.isArray(a)&&a.length>0){const e=document.querySelector(".books-container");e.insertAdjacentHTML("afterbegin",a.map(e=>{const a=(100*Number(e.currentPages/e.totalPages)).toFixed(2);return`\n        <div class="book-item">\n          <span>《${e.name}》</span>\n          <span class="progress"><progress value="${a}" max="100"></span>\n          <span class="state">${a}%</span>\n          <button class="action-read" data-url="${e.url}" data-id="${e.id}" data-page="${e.currentPages}">阅读</button>\n          <button class="action-note" data-id="${e.id}">笔记</button>\n        </div>`}).join("")),e.addEventListener("click",async e=>{const{url:a,id:n,page:t}=e.target.dataset;if("action-read"===e.target.className&&a&&window.open(`/app-pdf-viewer/web/viewer.html?file=${encodeURIComponent(a)}#page=${t}`),"action-note"===e.target.className&&n){const e=(await axios.get("/graphql",{params:{query:"\n              query fetchBookNotes($id: Int!) {\n                fetchAllBookNoteById(id: $id) {\n                  id\n                  bookId\n                  page\n                  note\n                }\n              }\n            ",variables:{id:Number(n)}}})).data.data.fetchAllBookNoteById;window.open().document.write(`<ol>${e.map(e=>`<li><pre>${e.note}</pre></li>`).join("")}</ol>`)}})}});