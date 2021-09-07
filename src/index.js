import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const navArea = document.querySelector('#navArea');
const contentArea = document.querySelector('#contentArea');

const appURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wugJLYSzQnqoaIruIx0N/likes/';

const likeMeal = async (mealID) => {
  await fetch(appURL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      item_id: mealID,
    }),
  });
};

const mealLikes = async (mealID) => {
  let counter = 0;
  const res = await fetch(appURL);
  const data = await res.json();
  data.forEach((val) => {
    if (val.item_id === mealID) {
      counter = val.likes;
    }
  });

  return counter;
};

const menuItemes = async (mealType) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealType}`)
    .then((res) => res.json())
    .then((data) => {
      contentArea.innerHTML = '';
      data.meals.forEach((el, index) => {
        if (index < 6) {
          mealLikes(el.idMeal).then((meallikes) => {
            const text = `<div class="col-lg-4 col-md-6 mb-4">
                <div class="card">
                <img src=${el.strMealThumb} width="100%" height="120"/>
                <div class="card-body" id="${el.idMeal}">
                  ${el.strMeal} <br>
                  <i class="far fa-heart likes"></i>
                  <span>${meallikes}</span>
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="comment">Comment</button>
                </div>
            </div>`;
            contentArea.innerHTML += text;

            const likes = document.querySelectorAll('.likes');
            likes.forEach((like) => {
              like.addEventListener('click', (e) => {
                const mealLike = e.target.parentNode.children[2].textContent;
                e.target.parentNode.children[2].textContent = Number(mealLike) + 1;
                likeMeal(e.target.parentNode.id);
              });
            });

            const comment = document.querySelectorAll('#comment');
            comment.forEach((each) => {
              each.addEventListener('click', (e) => {
                display(e.target.parentNode.id);

              });
            });
          });
        }
      });
    });
};

const modalTitle = document.querySelector('#modalTitle');
const modalBody = document.querySelector('#modal-content')


const display = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  console.log(data.meals[0]);
  modalTitle.textContent = data.meals[0].strMeal;
}

const navBtns = [...navArea.children];

navBtns.forEach((val) => {
  const nav = document.querySelector(`#${val.children[0].id}`);
  nav.addEventListener('click', (e) => {
    // e.target.classList.add('active');
    menuItemes(e.target.textContent);
  });
});

window.onload = () => {
  menuItemes('Seafood');
};
