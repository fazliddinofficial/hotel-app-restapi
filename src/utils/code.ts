export const generateRandomNumbers = (length: number) => {
  return new Date()
    .getTime()
    .toString()
    .slice(length * -1);
};