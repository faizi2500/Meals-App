import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const navArea = document.querySelector('#navArea');
const contentArea = document.querySelector('#contentArea');

const appURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wugJLYSzQnqoaIruIx0N/likes/'

const likedMeal = async (mealID) => {
  const data = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wugJLYSzQnqoaIruIx0N/likes', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      item_id: mealID
    }),
  });
  // console.log(data.json());
  return data;
}


const menuItemes = async (mealType) => {
  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealType}`)
    .then((res) => res.json())
    .then((data) => {
      contentArea.innerHTML = '';
      data.meals.forEach((el, index) => {
        if (index < 6) {
          const text = `<div class="col-lg-4">
                <div class="card card-body mb-2 " id="${el.idMeal}">
                  ${el.strMeal} 
                  <i class="far fa-heart likes"></i>
                </div>
            </div>`;
          contentArea.innerHTML += text;
        }
      });
    });
    const likes = document.querySelectorAll('.likes');
    likes.forEach(like => {
      like.addEventListener('click',  (e) => {
        const result  = likedMeal(e.target.parentNode.id);
        console.log(result);
      })
    })
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
