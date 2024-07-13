export const imgs = [];
export const snds = [];
export const btns = [];
export const frams = [];

export class Draw {
  constructor(a) {
    const { name, width, height, draws, erasers, ctx } = a;
    this.name = name;
    this.width = width;
    this.height = height;
    this.drawa = draws;
    this.erasers = erasers;
    this.ctx = ctx;
  }

  setClear = (a) => {
    const { color } = a;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = color || '#fff';
    this.ctx.fillRect(0, 0, this.width, this.height);
  };

  setimage = (a) => {
    const { img, ps } = a;
    if (ps[0] == ps[2] && ps[1] == ps[3]) this.ctx.drawImage(img, ps[0], ps[1], ps[2] + img.naturalWidth, ps[3] + img.naturalHeight);
    else this.ctx.drawImage(img, ps[0], ps[1], ps[2] - ps[0], ps[3] - ps[1]);
  };

  setline = (a) => {
    const { color, width, cap, join, close, fill, ps } = a;
    
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = width;
    this.ctx.lineCap = cap; // butt, round, square
    this.ctx.lineJoin = join; // bevel, round, miter

    this.ctx.beginPath();
    ps.forEach((e, i) => {
      if (i) this.ctx.lineTo(e.x, e.y);
      else this.ctx.moveTo(e.x, e.y);
    });
    if (close) this.ctx.closePath();
    this.ctx.stroke();
    if (fill !== undefined) {
      this.ctx.fillStyle = fill;
      this.ctx.fill();
    }

    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Hello, HTML5!', 32, 32);
  };

  setrect = (a) => {
    const { ps, color } = a;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(ps[0], ps[1], ps[2], ps[3]);
  };
}

export class Messag {
  constructor(a) {
    const { name, type, width, height, color, title, content, time, xy } = a;
    // title: {font, size, color, xy} content: {font, size, color, xy}
  }
}
