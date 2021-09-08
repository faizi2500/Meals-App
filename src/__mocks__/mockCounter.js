let count = 0;

const counterDummy = (arr) => {
  // menuTarget.textContent = data !== null ? `${mealCategory} (${data.length})` : 0;
  if (arr.length) {
    count = arr.length;
    return count;
  }

  return 0;
};

export default counterDummy;