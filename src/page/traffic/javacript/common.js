export const getDottedArray = (number) => {
  let str = "";

  Array(number)
    .fill()
    .forEach(() => {
      str += ".";
    });

  return str;
};
