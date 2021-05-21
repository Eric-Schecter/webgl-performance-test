export const getTextureSize = (length: number) => {
  const s = Math.sqrt(length);
  if (s === ~~s) {
    return s;
  }
  return ~~s + 1;
}