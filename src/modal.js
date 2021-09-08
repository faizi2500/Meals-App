import { mealComments, commentMeal } from './comment.js';
import { commentsCounter } from './counter.js';

const modalTitle = document.querySelector('#modalTitle');
const modalBody = document.querySelector('#modal-content');
const modalImage = document.querySelector('#modalImage');
const contentModalBody = document.querySelector('#contentModalBody');

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
              <button type="button" class="btn btn-sm btn-primary rounded-pill" id="btnComment" data-bs-dismiss="modal">Comment</button>
            </div>
            </small>
          </div>`;

      contentModalBody.classList.remove('d-none');
      modalImage.setAttribute('src', data.meals[0].strMealThumb);
      modalTitle.innerText = data.meals[0].strMeal;
      modalBody.innerHTML = text;
      const commentText = document.querySelector('#commentTexts');

      mealComments(id).then((comments) => {
        const commentsTitle = `<h6 class="text-center">Comments(${commentsCounter(comments)})</h6>`;
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

export default displayModal;