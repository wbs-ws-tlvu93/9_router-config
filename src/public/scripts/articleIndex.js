/******************************************************************************
 *                          Fetch and display articles
 ******************************************************************************/

displayArticles();

function displayArticles() {
  httpGet('/api/articles/all')
    .then((response) => response.json())
    .then((response) => {
      var allarticles = response.articles;
      // Empty the anchor
      var allarticlesAnchor = document.getElementById('all-articles-anchor');
      allarticlesAnchor.innerHTML = '';
      // Append articles to anchor
      allarticles.forEach((article) => {
        allarticlesAnchor.innerHTML += getArticleDisplayEle(article);
      });
    });
}

function getArticleDisplayEle(article) {
  return `<div class="article-display-ele">

        <div class="normal-view">
            <div>Title: ${article.title}</div>
            <div>Author: ${article.author}</div>
            <button class="edit-article-btn" data-article-id="${article.id}">
                Edit
            </button>
            <button class="delete-article-btn" data-article-id="${article.id}">
                Delete
            </button>
        </div>
        
        <div class="edit-view">
            <div>
                Name: <input class="title-edit-input" value="${article.author}">
            </div>
            <div>
                Email: <input class="author-edit-input" value="${article.title}">
            </div>
            <button class="submit-edit-btn" data-article-id="${article.id}">
                Submit
            </button>
            <button class="cancel-edit-btn" data-article-id="${article.id}">
                Cancel
            </button>
        </div>
    </div>`;
}

/******************************************************************************
 *                        Add, Edit, and Delete articles
 ******************************************************************************/

document.addEventListener(
  'click',
  function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#add-article-btn')) {
      addArticle();
    } else if (ele.matches('.edit-article-btn')) {
      showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
      cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
      submitEdit(ele);
    } else if (ele.matches('.delete-article-btn')) {
      deleteArticle(ele);
    }
  },
  false
);

function addArticle() {
  var titleInput = document.getElementById('title-input');
  var authorInput = document.getElementById('author-input');
  var data = {
    article: {
      title: titleInput.value,
      author: authorInput.value,
    },
  };
  httpPost('/api/articles/add', data).then(() => {
    displayArticles();
  });
}

function showEditView(articleEle) {
  var normalView = articleEle.getElementsByClassName('normal-view')[0];
  var editView = articleEle.getElementsByClassName('edit-view')[0];
  normalView.style.display = 'none';
  editView.style.display = 'block';
}

function cancelEdit(articleEle) {
  var normalView = articleEle.getElementsByClassName('normal-view')[0];
  var editView = articleEle.getElementsByClassName('edit-view')[0];
  normalView.style.display = 'block';
  editView.style.display = 'none';
}

function submitEdit(ele) {
  var articleEle = ele.parentNode.parentNode;
  var titleInput = articleEle.getElementsByClassName('title-edit-input')[0];
  var authorInput = articleEle.getElementsByClassName('author-edit-input')[0];
  var id = ele.getAttribute('data-article-id');
  var data = {
    article: {
      title: titleInput.value,
      author: authorInput.value,
      id: Number(id),
    },
  };
  httpPut('/api/articles/update', data).then(() => {
    displayArticles();
  });
}

function deleteArticle(ele) {
  var id = ele.getAttribute('data-article-id');
  httpDelete('/api/articles/delete/' + id).then(() => {
    displayArticles();
  });
}

function httpGet(path) {
  return fetch(path, getOptions('GET'));
}

function httpPost(path, data) {
  return fetch(path, getOptions('POST', data));
}

function httpPut(path, data) {
  return fetch(path, getOptions('PUT', data));
}

function httpDelete(path) {
  return fetch(path, getOptions('DELETE'));
}

function getOptions(verb, data) {
  var options = {
    dataType: 'json',
    method: verb,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
}
