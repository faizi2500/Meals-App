let count = 0;

const counterDummy = (arr) => {
  if (arr.length) {
    count = arr.length;
    return count;
  }

  return 0;
};

export default counterDummy;