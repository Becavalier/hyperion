document.addEventListener('DOMContentLoaded', async e => { 

  // back to top;
  const action = () => {
    if (window.getComputedStyle(document.body, null).getPropertyValue('flex-direction') === 'column') {
      document.documentElement.scrollTop = 0;
    } else {
      document.querySelector('main').scrollTop = 0;
    }
  };
  document.querySelector('.touch-top').addEventListener('touchstart', action);
  document.querySelector('.touch-top').addEventListener('click', action);


  // image zooming;
  const canvasContainer = document.querySelector('.canvas-containter');
  let zoomage = new Zoomage({
    container: canvasContainer,
    enableDesktop: true, 
    enableGestureRotate: true,
    dbclickZoomThreshold: 0.1,
    maxZoom: 3,
    minZoom: 0.1
  });
  
  document.querySelector('article').addEventListener('click', e => {
    const target = e.target || e.srcElement;
    if (target.tagName === 'IMG') {    
      canvasContainer.style.opacity = '1';
      canvasContainer.style.display = 'block';
      canvasContainer.style.zIndex = '200';
      // animation;
      canvasContainer.classList.add('animation-show');
      canvasContainer.classList.remove('animation-hide');
      zoomage.load(target.currentSrc);
    } 
  });

  canvasContainer.querySelector('span').addEventListener('click', () => {
    canvasContainer.style.opacity = '0';
    canvasContainer.style.zIndex = '-200';
    // animation;
    canvasContainer.classList.add('animation-hide');
    canvasContainer.classList.remove('animation-show');
  });


  // comments;
  const postId = document.querySelector('article').getAttribute('post-id');

  const contentNode = document.querySelector('.comments-input textarea');
  const publisherNode = document.querySelector('.comments-input input[type="text"]');
  const commentDisplayNode = document.querySelector(".comments-display-container");
  
  // "@";
  commentDisplayNode.addEventListener('click', e => {
    const target = e.target || e.srcElement;
    if (target.className === 'nickname') {
      contentNode.value = `@${target.innerText} ` + contentNode.value;
    }
  });

  // wrapping comment DOM;
  const wrapCommentSnippet = (comment) => {
    return `
      <div class="comment-snippet">
        <div>
          <span class="nickname">${comment.publisher}</span>
          <span class="date">${comment.publishTime}</span>
        </div>
        <div class="content">${comment.content}</div>
      </div>
    `;
  }

  document.querySelector('.submit-comment').addEventListener('click', async () => {
    const content = contentNode.value;
    const publisher = publisherNode.value;
    if (content && publisher) {
      const { 
        data: {
          data: {
            insertPostComment
          } 
        }
      } = await axios.post('/graphql', {
        query: `
mutation insertPostComment($postId: String!, $publisher: String!, $content: String!) {
  insertPostComment(postId: $postId, publisher: $publisher, content: $content) {
    ...post
  }
}

fragment post on PostComment {
  id
  publisher
  content
  ipAddr
  publishTime
}
        `,
        variables: {
          postId, content, publisher
        }
      });
      let ph = commentDisplayNode.querySelector('.placeholder');
      ph && ph.remove();
      
      commentDisplayNode.insertAdjacentHTML('afterbegin', wrapCommentSnippet(insertPostComment));
      (contentNode.value = '') || (publisherNode.value = '');
    } else {
      alert("请输入【评论内容】和【昵称】后再提交！");
    }
  });

  // query exist comments;
  const loadComments = async (callback = false) => {
    const { 
      data: {
        data: {
          postComments
        } 
      }
    } = await axios.get('/graphql', {
      params: {
        query: `
query {
  postComments(postId: "${postId}") {
    ...post
  }
}
fragment post on PostComment {
  id
  publisher
  content
  publishTime
}
        `
      }
    });
  
    // dynamic mount;
    if (Array.isArray(postComments) && postComments.length > 0) {
      let ph = commentDisplayNode.querySelector('.placeholder');
      ph && ph.remove();
      postComments.forEach(comment => {
        commentDisplayNode.insertAdjacentHTML('beforeend', wrapCommentSnippet(comment));
      });
    }
    
    callback && callback();
  }

  loadComments();
});

// service worker;
if ('serviceWorker' in window.navigator) {
  // use the window load event to keep the page load performant;
  window.addEventListener('load', () => {
    window.navigator.serviceWorker.register('/sw.js');
  });
}
