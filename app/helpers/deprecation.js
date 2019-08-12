const splitName = string => {
  const words = string.split(' ');
  const nWords = words.length;
  return { firstName: words.slice(0, nWords - 1).join(), lastName: words[nWords - 1] };
};

module.exports = { splitName };
