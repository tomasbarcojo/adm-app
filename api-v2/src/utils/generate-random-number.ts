export const generateRandomNumber = (min: number, max: number): number => {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};
