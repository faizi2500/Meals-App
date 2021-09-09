const mealsCounter = (data, mealCategory, menuTarget) => {
  if (data.length && mealCategory) {
    menuTarget.textContent = `${mealCategory} (${data.length})`;
    return true;
  }
  return false;
};

const commentsCounter = (comments) => (comments.length ? comments.length : 0);

export { mealsCounter, commentsCounter };