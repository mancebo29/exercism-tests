//
// This is only a SKELETON file for the 'Minesweeper' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

const getMineCounter = () => ({
  map: {},
  maxRows: 0,
  maxColumns: 0,
  initialized: false,
  initialize: function (maxRows, maxColumns) {
    this.maxRows = maxRows;
    this.maxColumns = maxColumns;
    this.initialized = true;
  },
  trackMine: function (row, column) {
    const key = `${row}${column}`;
    this.map[key] = '*';

    this.addCountToPosition(row - 1, column - 1);
    this.addCountToPosition(row - 1, column);
    this.addCountToPosition(row - 1, column + 1);

    this.addCountToPosition(row, column - 1);
    this.addCountToPosition(row, column + 1);

    this.addCountToPosition(row + 1, column - 1);
    this.addCountToPosition(row + 1, column);
    this.addCountToPosition(row + 1, column + 1);
  },
  addCountToPosition: function (row, column) {
    if (column < 0 || row < 0 || column > this.maxColumns || row > this.maxRows) {
      return;
    }
    const key = `${row}${column}`;
    if (this.map[key] === '*') {
      return;
    }

    if (!this.map[key]) {
      this.map[key] = 1;
    } else {
      this.map[key] += 1;
    }
  },
});

export const annotate = (input) => {
  const mineCounter = getMineCounter();
  const matrix = input.map(line => line.split(''));
  for (let row = 0; row < input.length; row++) {
    const line = input[row];
    if (!mineCounter.initialized) {
      mineCounter.initialize(input.length - 1, line.length - 1);
    }
    for (let column = 0; column < line.length; column++) {
      const value = matrix[row][column];
      if (value === '*') {
        mineCounter.trackMine(row, column);
      }
    }
  }

  Object.entries(mineCounter.map).forEach(([key, value]) => {
    const [row, column] = key.split('').map(n => Number(n));
    matrix[row][column] = value;
  });

  return matrix.map(line => line.join(''));
};
