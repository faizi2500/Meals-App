
const mealsCounter = (data, mealCategory, menuTarget) => {
  if(data.length){
    menuTarget.textContent = data !== null ? `${mealCategory} (${data.length})` : 0;
    return true
  }
  else {
    return false;
  }
};

const commentsCounter = (comments) => {
  return comments.length ? comments.length : 0
}

export  { mealsCounter, commentsCounter };