
const d2 = ([x1, y1], [x2, y2]) => {
  return (x2 - x1)**2 + (y2 - y1)**2;
};

export const isSquare = ([p1, p2, p3, p4]) => {
  const d13 = d2(p1, p3);
  const d24 = d2(p2, p4);
  const d12 = d2(p1, p2);
  const d23 = d2(p2, p3);
  const d34 = d2(p3, p4);
  const d41 = d2(p4, p1);

  return (d13 === d24 && d12 === d34 && d23 === d41 && d12 === d23);
};
