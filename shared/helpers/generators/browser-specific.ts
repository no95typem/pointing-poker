export function genUniqId(): string {
  const arr = new Uint8Array(4);

  return window.crypto.getRandomValues(arr).join('');
}
