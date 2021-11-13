// https://github.com/daybrush/matrix/blob/master/src/index.ts
// 作者行列互换来表示，可能解决的是动态下 列矩阵的表达问题，因为我这边场景很确定，所以怎么表示都可以。

export function create2DMatrix() {
  // 0,0,0,
  // 0,0,0,
  // 0,0,1

  return [0, 0, 0, 0, 0, 0, 0, 0, 1];
}

export function create2DRotateMatrix(rad) {
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const matrix = create2DMatrix();

  // cos -sin
  // sin cos

  matrix[0] = cos;
  matrix[1] = -sin;
  matrix[3] = sin;
  matrix[4] = cos;

  return matrix;
}

// export function create2DOriginMatrix(origin = []) {
//   const matrix = create2DMatrix();
//   const length = Math.min(origin.length, n - 1);

//   for (let i = 0; i < length; ++i) {
//     m[n * (n - 1) + i] = origin[i];
//   }
//   return m;
// }

export function position2Matrix2D(position = [0, 0]) {
  const matrix = position.slice();
  matrix[2] = 1;
  return matrix;
}

export function multiply2D(
  matrix = [0, 0, 0, 0, 0, 0, 0, 0, 1],
  positionMatrix = [0, 0, 1]
) {
  const newMatrix = [0, 0, 1];

  newMatrix[0] =
    matrix[0] * positionMatrix[0] +
    matrix[1] * positionMatrix[1] +
    matrix[2] * positionMatrix[2];
  newMatrix[1] =
    matrix[3] * positionMatrix[0] +
    matrix[4] * positionMatrix[1] +
    matrix[5] * positionMatrix[2];

  return newMatrix;
}
