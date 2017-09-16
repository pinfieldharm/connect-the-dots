export const grids = [
  `001101
   111111
   111111
   110110
   111110
   110110`,
  `111111
   011111
   001111
   101011
   101101
   110111`
];

export const parseGrid = index => grids[index].split("\n").map(row => row.trim().split("").map(s => parseInt(s, 10)));

