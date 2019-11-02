const DEFAULT_INDEX = 0;

document.addEventListener('DOMContentLoaded', async e => { 

  // back to top;
  const action = () => {
    if (window.getComputedStyle(document.body, null).getPropertyValue('flex-direction') === 'column') {
      window.scrollTo({ 
        top: 0, 
        behavior: "smooth" 
      });
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
          <span class="nickname">${comment.publisher.name}</span>
          <span class="date">${comment.publishTime}</span>
        </div>
        <div class="content">${comment.content}</div>
      </div>
    `;
  }

  document.querySelector('.submit-comment').addEventListener('click', async e => {
    const target = e.target || e.srcElement;
    const content = contentNode.value;
    const publisher = publisherNode.value;
    if (content && publisher) {
      target.disabled = true;
      target.innerText = '... 提交中 ...';

      try {
        const response = await axios.post('http://localhost:80/graphql', {
          query: `
  mutation insertPostComment($comment: CommentInput!) {
    insertPostComment(comment: $comment) {
      ...post
    }
  }
  
  fragment post on PostComment {
    id
    publisher {
      name
      gender
    }
    content
    ipAddr
    publishTime
  }
          `,
          variables: {
            comment: {
              postId, content, publisher
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
              insertPostComment
            } 
          }
        } = response;
      
        let ph = commentDisplayNode.querySelector('.placeholder');
        ph && ph.remove();
        
        commentDisplayNode.insertAdjacentHTML('afterbegin', wrapCommentSnippet(insertPostComment));
        (contentNode.value = '') || (publisherNode.value = '');
        // move top;
        window.location.href = "#comments";
      } catch(e) {
        console.error(e.message);
      } finally {
        target.disabled = false;
        target.innerText = '发布';
      }
    } else {
      alert("STOP! Please check your input fields.");
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
    } = await axios.get('http://localhost:80/graphql', {
      params: {
        query: `
  query {
    postComments(postId: "${postId}") {
      ...post
    }
  }
  fragment post on PostComment {
    id
    publisher {
      name
      gender
    }
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
