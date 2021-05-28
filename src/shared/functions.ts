export const randomBetween = (n1: number, n2: number) => {
  const min = Math.min(n1, n2);
  const max = Math.max(n1, n2);
  return ~~(Math.random() * (max - min + 1) + min);
}

export const randomString = (strLength: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = chars.length;
  return new Array(strLength).fill(0).map(() => chars[randomBetween(0, length)]).join('');
}