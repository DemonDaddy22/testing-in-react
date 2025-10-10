export const getRandomData = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      const random = Math.random();
      if (random >= 0.25) {
        res(random);
      } else {
        rej(random);
      }
    }, 500);
  });
