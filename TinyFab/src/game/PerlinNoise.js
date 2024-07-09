'use strict';

export default class PerlinNoise {
  constructor(frequency = 4) {
    this.frequency = frequency;
    this.seed();
  }

  randVect() {
    let theta = Math.random() * 2 * Math.PI;
    return { x: Math.cos(theta), y: Math.sin(theta) };
  }

  dotProdGrid(x, y, vx, vy) {
    let gVect;
    let dVect = { x: x - vx, y: y - vy };
    if (this.gradients[`${vx},${vy}`]) {
      gVect = this.gradients[`${vx},${vy}`];
    } else {
      gVect = this.randVect();
      this.gradients[`${vx},${vy}`] = gVect;
    }
    return dVect.x * gVect.x + dVect.y * gVect.y;
  }

  smootherstep(x) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
  }

  interp(x, a, b) {
    return a + this.smootherstep(x) * (b - a);
  }

  seed() {
    this.gradients = {};
    this.memory = {};
  }

  generate(x, y) {
    // Scale the coordinates by the frequency
    x *= this.frequency;
    y *= this.frequency;

    // Use a string key that includes the frequency to avoid conflicts
    const key = `${x.toFixed(6)},${y.toFixed(6)}`;

    if (this.memory.hasOwnProperty(key)) {
      return this.memory[key];
    }

    let xf = Math.floor(x);
    let yf = Math.floor(y);

    // Interpolate
    let tl = this.dotProdGrid(x, y, xf, yf);
    let tr = this.dotProdGrid(x, y, xf + 1, yf);
    let bl = this.dotProdGrid(x, y, xf, yf + 1);
    let br = this.dotProdGrid(x, y, xf + 1, yf + 1);
    let xt = this.interp(x - xf, tl, tr);
    let xb = this.interp(x - xf, bl, br);
    let v = this.interp(y - yf, xt, xb);

    // Normalize to [0, 1]
    v = (v + 1) / 2;
    this.memory[key] = v;
    return v;
  }
}