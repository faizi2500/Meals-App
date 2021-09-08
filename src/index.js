import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { likeMeal, mealLikes } from './likes.js';
import displayModal from './modal.js';
import { mealsCounter } from './counter.js';

const navArea = document.querySelector('#navArea');
const contentArea = document.querySelector('#contentArea');

const displayMenuItems = async (mealCategory, menuTarget) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCategory}`)
    .then((res) => res.json())
    .then((data) => {
      contentArea.innerHTML = '';

      data.meals.forEach((el) => {
        mealLikes(el.idMeal).then((meallikes) => {
          const text = `<div class="col-lg-3 col-md-6 mb-3">
                <div class="card shadow border-1 m-1">
                <img src=${el.strMealThumb} width="100%" height="120"/>
                <div class="card-body" id="${el.idMeal}">
                  ${el.strMeal} <br>
                  <i class="far fa-heart likes"></i>
                  <span>${meallikes} Likes</span><br>
                  <button type="button" class="btn btn-sm btn-primary mt-2 rounded-pill" data-bs-toggle="modal"
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
      });
      mealsCounter(data.meals, mealCategory, menuTarget);
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
    displayMenuItems(e.target.textContent, e.target);
  });
});

window.onload = () => {
  const navItems = document.querySelectorAll('.nav-item');
  navItems[0].children[0].classList.add('active');
  displayMenuItems('Seafood', navItems[0].children[0]);
};
