import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const navArea = document.querySelector('#navArea');
const contentArea = document.querySelector('#contentArea');
const modalTitle = document.querySelector('#modalTitle');
const modalBody = document.querySelector('#modal-content');
const modalImage = document.querySelector('#modalImage');
const contentModalBody = document.querySelector('#contentModalBody');
const likesAppURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wugJLYSzQnqoaIruIx0N/likes/';
const commentsAppURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wugJLYSzQnqoaIruIx0N/comments/';

const likeMeal = async (mealID) => {
  await fetch(likesAppURL, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      item_id: mealID,
    }),
  });
};

const commentMeal = async (itemId, data) => {
  await fetch(commentsAppURL, {
    method: 'POST',
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({
      item_id: itemId,
      username: data.username,
      comment: data.comment,
    }),
  });
};

const mealLikes = async (mealID) => {
  let counter = 0;
  const res = await fetch(likesAppURL);
  const data = await res.json();
  data.forEach((val) => {
    if (val.item_id === mealID) {
      counter = val.likes;
    }
  });
  return counter;
};

const mealComments = async (mealID) => {
  const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wugJLYSzQnqoaIruIx0N/comments?item_id=${mealID}`,
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } });
  const data = await res.json();
  return data;
};

const displayModal = async (id) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => res.json()).then((data) => {
    if (data) {
      const text = `
            <h6 class="text-center">Ingredients</h6><hr>
            <small class="container row">
                <div class="col-md-6">1. ${data.meals[0].strIngredient1}</div>
                <div class="col-md-6">2. ${data.meals[0].strIngredient2}</div>
                <div class="col-md-6">3. ${data.meals[0].strIngredient3}</div>
                <div class="col-md-6">4. ${data.meals[0].strIngredient4}</div>
            </small>
            <hr>
          <div class="container">
          <small id="commentTexts" class="mb-2"></small>
          <small>
          <h6 class="text-center mt-2">Add a comment</h6>
            <div class="form-group mb-2">
              <input type="text" id="userName" class="form-control" placeholder="Your name...">
            </div>
            <div class="form-group mb-2">
              <textarea name="comment" id="commentBody" placeholder="Your comment..." class="form-control"></textarea>
            </div>
            <div class="form-group d-grid mb-3">
              <button type="button" class="btn btn-primary" id="btnComment" data-bs-dismiss="modal">Comment</button>
            </div>
            </small>
          </div>`;

      contentModalBody.classList.remove('d-none');
      modalImage.setAttribute('src', data.meals[0].strMealThumb);
      modalTitle.innerText = data.meals[0].strMeal;
      modalBody.innerHTML = text;

      const commentText = document.querySelector('#commentTexts');
      mealComments(id).then((comments) => {
        const commentsTitle = `<h6 class="text-center">Comments(${comments.length ? comments.length : 0})</h6>`;
        commentText.innerHTML = commentsTitle;
        if (comments.length) {
          const ul = document.createElement('ul');
          ul.classList.add('list-group');
          comments.forEach((el) => {
            const li = document.createElement('li');
            const text = `<li class="list-group-item">${el.creation_date} <b>${el.username}</b> ${el.comment} </li>`;
            li.innerHTML = text;
            ul.appendChild(li);
          });
          commentText.appendChild(ul);
        }
      });
    }
  });

  const userName = document.querySelector('#userName');
  const commentBody = document.querySelector('#commentBody');
  const btnComment = document.querySelector('#btnComment');

  btnComment.addEventListener('click', (e) => {
    e.preventDefault();

    const data = {
      username: userName.value,
      comment: commentBody.value,
    };
    commentMeal(id, data);
  });
};

const displayMenuItems = async (mealCategory) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`)
    .then((res) => res.json())
    .then((data) => {
      contentArea.innerHTML = '';
      data.meals.forEach((el, index) => {
        if (index < 6) {
          mealLikes(el.idMeal).then((meallikes) => {
            const text = `<div class="col-lg-4 col-md-6 mb-3">
                <div class="card shadow border-1 m-1">
                <img src=${el.strMealThumb} width="100%" height="100"/>
                <div class="card-body" id="${el.idMeal}">
                  ${el.strMeal} <br>
                  <i class="far fa-heart likes"></i>
                  <span>${meallikes} Likes</span><br>
                  <button type="button" class="btn btn-sm btn-primary mt-2" data-bs-toggle="modal"
                  data-bs-target="#contentModalBody" id="comment">Comments</button>
                </div>
            </div>`;
            contentArea.innerHTML += text;

            const likes = document.querySelectorAll('.likes');
            likes.forEach((like) => {
              like.addEventListener('click', (e) => {
                const mealLike = e.target.parentNode.children[2].textContent;
                e.target.parentNode.children[2].textContent = `${Number(mealLike.match(/\d+/)[0]) + 1} Likes`;
                likeMeal(e.target.parentNode.id);
              });
            });

            const comments = document.querySelectorAll('#comment');
            comments.forEach((each) => {
              each.addEventListener('click', (e) => {
                displayModal(e.target.parentNode.id);
              });
            });
          });
        }
      });
    });
};

const navBtns = [...navArea.children];

navBtns.forEach((val) => {
  const nav = document.querySelector(`#${val.children[0].id}`);
  nav.addEventListener('click', (e) => {
    [...e.target.parentNode.parentNode.children].forEach((el) => {
      el.children[0].classList.remove('active');
    });
    e.target.classList.add('active');
    displayMenuItems(e.target.textContent);
  });
});

window.onload = () => {
  const navItems = document.querySelectorAll('.nav-item');
  navItems[0].children[0].classList.add('active');
  displayMenuItems('Seafood');
};
