import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const navArea = document.querySelector('#navArea');
const contentArea = document.querySelector('#contentArea');

const menuItemes = async (mealType) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealType}`)
    .then((res) => res.json())
    .then((data) => {
      contentArea.innerHTML = '';
      data.meals.forEach((el, index) => {
        if (index < 6) {
          const text = `<div class="col-lg-4">
                <div class="card card-body mb-2">${el.strMeal}</div>
            </div>`;
          contentArea.innerHTML += text;
        }
      });
    });
};

const navBtns = [...navArea.children];

navBtns.forEach((val) => {
  const nav = document.querySelector(`#${val.children[0].id}`);
  nav.addEventListener('click', (e) => {
    menuItemes(e.target.textContent);
  });
});

window.onload = () => {
  menuItemes('Seafood');
};
