module.exports = () => {
  'use strict';

  window.scale = window.scale || 1;
  const cvs = document.querySelector('#canvas-rbs');

  let wh = { w: 1500, h: 750 };
  const dpr = window.devicePixelRatio;
  cvs.style.width = `${wh.w}px`;
  cvs.style.height = `${wh.h}px`;
  cvs.width = wh.w * dpr;
  cvs.height = wh.h * dpr;

  const ctx = cvs.getContext('2d');

  let xy = { x: 35 * dpr, y: 30 * dpr, r: 24 * dpr, o: 12, d: 128 * dpr };
  let dots = [];
  let leng = xy.o * 6;

  // ctx.beginPath();
  let circle = new Path2D();
  for (let i = 0; i < leng; i++) {
    let x = (i % xy.o) * xy.d + xy.x;
    let y = parseInt(i / xy.o) * xy.d + xy.y;
    circle.moveTo(x + xy.r, y);
    circle.arc(x, y, xy.r, 0, 2 * Math.PI, false);
    dots.push({ x: x, y: y, r: xy.r, cc: true });
  }
  ctx.fillStyle = 'green';
  ctx.fill(circle);
  ctx.lineWidth = 4 * dpr;
  ctx.strokeStyle = 'pink';
  ctx.stroke(circle);

  const drawTangents = (p1, p2) => {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= Math.abs(p2.r - p1.r)) return;

    let a1 = Math.atan2(dy, dx);
    let a2 = Math.acos((p1.r - p2.r) / dist);

    let line = new Path2D();
    if (p1.cc) line.moveTo(p1.x + p1.r * Math.cos(a1 + a2), p1.y + p1.r * Math.sin(a1 + a2));
    else line.moveTo(p1.x + p1.r * Math.cos(a1 - a2), p1.y + p1.r * Math.sin(a1 - a2));

    if (p2.cc) line.lineTo(p2.x + p2.r * Math.cos(a1 + a2), p2.y + p2.r * Math.sin(a1 + a2));
    else line.lineTo(p2.x + p2.r * Math.cos(a1 - a2), p2.y + p2.r * Math.sin(a1 - a2));

    ctx.stroke(line);
  };

  const isIn = (p1, p2, p3, p) => {
    /// barycentric coordinates
    let b1 = ((p2.y - p3.y) * (p.x - p3.x) + (p3.x - p2.x) * (p.y - p3.y)) / ((p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y));
    let b2 = ((p3.y - p1.y) * (p.x - p3.x) + (p1.x - p3.x) * (p.y - p3.y)) / ((p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y));
    let b3 = 1.0 - b1 - b2;

    return b1 > 0 && b2 > 0 && b3 > 0;
  };

  const clockwise = (p1, p2, p3) => {
    let r1 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    let r2 = Math.atan2(p3.y - p2.y, p3.x - p2.x);
    let r0 = Math.abs(r2 - r1);

    let r = r2 - r1 < 0 ? true : false;
    r = r0 > Math.PI ? !r : r;
    r = r0 == 0 || r0 == Math.PI ? p1.cc : r;

    return r;
  };

  const setTangents = (a) => {
    let l = a.length - 1;
    
    a.forEach((e, i) => {
      let r = false;
      let i1 = (i + 1) % a.length;
      let i2 = (i + 2) % a.length;

      r = clockwise(a[i], a[i1], a[i2]);
      a[i1].cc = r;
    });

    a.forEach((e, i) => {
      let r = false;
      let i1 = (i + 1) % a.length;
      let i2 = (i + 2) % a.length;

      r = clockwise(a[i], a[i1], a[i2]);
      a[i1].cc = r;

      drawTangents(a[i], a[i1]);
    });
  };

  let dotsClick = [];
  cvs.addEventListener('mousedown', (e) => {
    let x = (e.clientX - cvs.getBoundingClientRect().left) * window.scale;
    let y = (e.clientY - cvs.getBoundingClientRect().top) * window.scale;

    if (ctx.isPointInPath(circle, x * dpr, y * dpr)) {
      let n = parseInt((x * dpr) / xy.d) + 1 + 12 * parseInt((y * dpr) / xy.d) - 1;
      if (dotsClick.indexOf(n) < 0) {
        dotsClick.push(n);
      } else {
        let d = [];
        dotsClick.forEach((e) => {
          d.push(dots[e]);
        });
        if(d.length > 1) setTangents(d);
        dotsClick = [];
      }
    }
  });
};
