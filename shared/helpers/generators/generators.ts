export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function getRandomArbitraryInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function genRandomHexColor(): string {
  const color = `#${Math.floor(Math.random() * 16_777_215).toString(16)}`;

  if (color.length === 7) return color;

  return genRandomHexColor();
}

export function gen2DArray(rows: number, columns: number): unknown[][] {
  const x = new Array(rows);
  for (let i = 0; i < rows; i++) {
    x[i] = new Array(columns);
  }

  return x;
}
