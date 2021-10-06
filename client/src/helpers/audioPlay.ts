export const audioPlay = (url: string) => {
  const audio = new Audio(url);

  console.log(audio);
  audio.play();
};
