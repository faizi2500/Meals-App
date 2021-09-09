import { mealComments, commentMeal } from './comment.js';
import { commentsCounter } from './counter.js';

const modalTitle = document.querySelector('#modalTitle');
const modalBody = document.querySelector('#modal-content');
const modalImage = document.querySelector('#modalImage');
const contentModalBody = document.querySelector('#contentModalBody');

const getComments = (id, commentText) => {
  mealComments(id).then((comments) => {
    const commentsTitle = `<h6 class="text-center" id="commentsTitle">Comments(${commentsCounter(comments)})</h6>`;
    commentText.innerHTML += commentsTitle;
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
          <p class="error text-center" id="errorText"></p>
            <div class="form-group mb-2">
              <input type="text" id="userName" class="form-control" placeholder="Your name...">
            </div>
            <div class="form-group mb-2">
              <textarea name="comment" id="commentBody" placeholder="Your comment..." class="form-control"></textarea>
            </div>

            <div class="btn-group" role="group" style="width: 100%;">
              <button type="button" class="btn btn-sm btn-primary" id="btnComment">Comment</button>
              <button type="button" class="btn btn-sm btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
            <div class="form-group d-grid mb-3">
            </div>
            </small>
          </div>`;

      contentModalBody.classList.remove('d-none');
      modalImage.setAttribute('src', data.meals[0].strMealThumb);
      modalTitle.innerText = data.meals[0].strMeal;
      modalBody.innerHTML = text;
      const commentText = document.querySelector('#commentTexts');

      getComments(id, commentText);

      const userName = document.querySelector('#userName');
      const commentBody = document.querySelector('#commentBody');
      const btnComment = document.querySelector('#btnComment');
      const errorText = document.querySelector('#errorText');

      btnComment.addEventListener('click', (e) => {
        e.preventDefault();
        const commentsTitle = document.querySelector('#commentsTitle');

        if (userName.value && commentBody.value) {
          errorText.innerHTML = '';
          const data = {
            username: userName.value,
            comment: commentBody.value,
          };
          const commentNumber = commentsTitle.textContent;
          commentsTitle.textContent = `Comments(${Number(commentNumber.match(/\d+/)[0]) + 1})`;

          const addedComment = `<li class="list-group-item">
              ${new Date().toISOString().slice(0, 10)} <b>${data.username}</b> ${data.comment} 
          </li>`;

          commentText.innerHTML += addedComment;
          userName.value = '';
          commentBody.value = '';
          commentMeal(id, data);
        } else {
          errorText.innerHTML = 'Name and comment are required';
        }
      });
    }
  });
};

export default displayModal;