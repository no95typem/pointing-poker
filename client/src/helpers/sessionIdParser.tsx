export const sessionIdPathParser = (path: string) => {
  const arr = path.split('/');
  const indexSessionString = arr.findIndex(str => str === 'session');
  const lobbyId = arr[indexSessionString + 1];

  return lobbyId;
};
