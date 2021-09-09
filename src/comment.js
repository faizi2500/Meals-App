const commentsAppURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wugJLYSzQnqoaIruIx0N/comments/';

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

const mealComments = async (mealID) => {
  const res = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/wugJLYSzQnqoaIruIx0N/comments?item_id=${mealID}`,
    { headers: { 'Content-type': 'application/json; charset=UTF-8' } });
  const data = await res.json();
  return data;
};

export { mealComments, commentMeal };