'use strict';

///
/// Canvas Path2D for Tangram /// /// /// /// /// /// /// /// ///
///

///
/// O B J E C T - S C R I P T /// /// /// /// /// /// /// /// ///
///

let ver = '22-0929-1541';
let ism = Number(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

const epta = function (p) { return new epta.fn.init(p); };
epta.fn = epta.prototype = {
  constructor: epta,

  ver: ver,
  length: 0,
  ism: ism
};

const init = (epta.fn.init = function (p) {
  if (!p) { return this; }

  // if (
  // } else { /// 배열을 나타낸다
  // }

  return p;
});

init.prototype = epta.fn;
export { epta };

///
/// S E T - I N I T /// /// /// /// /// /// /// /// ///
///

const msg = [];
const w = 768;
const h = 768;
const dot = 49; /// 7x7

const dpr = window.devicePixelRatio; /// 해상도에 따른 실제 크기 설정
const cvs = document.createElement('canvas');
cvs.style.width = `${w}px`; /// 해상도에 맞춘 디스플레이 크기 설정
cvs.style.height = `${h}px`;
cvs.width = w * dpr;
cvs.height = h * dpr;

const ctx = document.body.appendChild(cvs).getContext('2d');
ctx.globalCompositeOperation = 'destination-over'; /// 먼저 그린게 앞에 보임
ctx.scale(dpr, dpr); /// dpr 맞게 scale 변경

const offset = { x: 0, y: 0 }; /// fRESIZE()

///
/// C L A S S - T A N G R A M /// /// /// /// /// /// /// /// ///
///

const tans = []; /// tangrams
tans.lst = []; /// list 
tans.rtt = [{ x: 0, y: 0, a: 0 }]; /// rotate
tans.tcn = [0, 3]; /// thickness
tans.clr = [ /// color
  '#ee7439', '#e62d8b', '#e9d226', '#7caa2a', '#45537b', '#2d91b7', '#e71223',
  '#ffffff', '#000000'
];
tans.size = [256, 128, 64];
tans.align = [{ w: 0, h: 0, x: 0.5, y: 0.5 }, { w: 0, h: 0, x: 0, y: 0 }];

class Tan {
  constructor(...a) {
    a.push({});
    let a0 = a[0];
    let a1 = a[1];

    this.frm = [ /// form
      { x: 0, y: 0, r: a0.r, c: a0.c, t: a0.t }, /// x, y, rotate, color, thickness
      { x: 0, y: 0, r: a0.r, c: a0.c, t: a0.t },
      { x: 0, y: 0, r: 0, c: tans.clr[8], t: tans.tcn[0] }
    ];

    this.pth = new Path2D(); /// path
    this.vtx = []; /// vertex

    this.size = a0.size;
    this.align = a0.align;

    a1.ox = (w - this.size) * this.align.x; /// 캔버스 중앙
    a1.oy = (h - this.size) * this.align.y;

    a1.c = { x: 0, y: 0 }; /// center 조각 무게 중심
    a1.l = a0.pth.length; /// length 조각의 선 갯수
    a1.a = 0; /// area 무게 중심을 구하기 위한 영역

    a0.pth.forEach((e, i) => { /// element, index
      let j = (i + 1) % a1.l;
      a1.p = { x: a0.pth[j].x * this.size, y: a0.pth[j].y * this.size };
      a1.v = { x: e.x * this.size, y: e.y * this.size };

      a1.a += a1.v.x * a1.p.y;
      a1.a -= a1.v.y * a1.p.x;
      a1.c.x += (a1.v.x + a1.p.x) * (a1.v.x * a1.p.y - a1.v.y * a1.p.x);
      a1.c.y += (a1.v.y + a1.p.y) * (a1.v.x * a1.p.y - a1.v.y * a1.p.x);

      if (i) this.pth.lineTo(a1.v.x + a1.ox, a1.v.y + a1.oy); else this.pth.moveTo(a1.v.x + a1.ox, a1.v.y + a1.oy);

      this.vtx.push({ x: a1.v.x + a1.ox, y: a1.v.y + a1.oy });
    });

    // a1.a *= 0.5;
    a1.a = Math.abs(a1.a * 0.5);
    a1.c.x = a1.c.x / (6.0 * a1.a);
    a1.c.y = a1.c.y / (6.0 * a1.a);
    this.frm[0].x = a1.c.x + a1.ox; /// 무게 중심점
    this.frm[0].y = a1.c.y + a1.oy;

    this.pth.closePath();
    ctx.fillStyle = a0.c;
    ctx.fill(this.pth);
    if (a0.t) {
      ctx.strokeStyle = clr[7];
      ctx.lineWidth = a0.t;
      ctx.stroke(this.pth.lineTo);
    }
  }
}

///
/// C R E A T E - T A N G R A M /// /// /// /// /// /// /// /// ///
///

const fox = {};
fox.idle = [];
let _t = [1, 0.75, 0.5, 0.25];
let _p = [
  [{ x: 0, y: 0 }, { x: _t[0], y: 0 }, { x: _t[2], y: _t[2] }],
  [{ x: 0, y: _t[0] }, { x: 0, y: 0 }, { x: _t[2], y: _t[2] }],
  [{ x: _t[0], y: 0 }, { x: _t[0], y: _t[2] }, { x: _t[1], y: _t[1] }, { x: _t[1], y: _t[3] }],
  [{ x: _t[1], y: _t[3] }, { x: _t[1], y: _t[1] }, { x: _t[2], y: _t[2] }],
  [{ x: _t[2], y: _t[2] }, { x: _t[1], y: _t[1] }, { x: _t[2], y: _t[0] }, { x: _t[3], y: _t[1] }],
  [{ x: 0, y: _t[0] }, { x: _t[3], y: _t[1] }, { x: _t[2], y: _t[0] }],
  [{ x: _t[2], y: _t[0] }, { x: _t[0], y: _t[2] }, { x: _t[0], y: _t[0] }]
];

// let _p = [
//   [{ x: 0, y: 0 }, { x: _tan[0], y: 0 }, { x: _tan[0], y: _tan[0] }, { x: 0, y: _tan[0] }]
// ];

_p.forEach((e, i) => { /// element, index
  /// angle, color, thickness, size, align, path
  fox.idle.push(new Tan({ r: tans.rtt[0], c: tans.clr[i], t: tans.tcn[0], size: tans.size[0], align: tans.align[0], pth: e }));
});

tans.push(fox.idle); /// tans[0][0]

///
/// A C T I O N - D R A W /// /// /// /// /// /// /// /// ///
///

const fDRAW = () => {
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  ctx.font = '18px Arial';
  ctx.fillStyle = tans.clr[7];
  ctx.textAlign = 'right';
  // if (msg.length) ctx.fillText('ROTATE: ' + msg[0], cvs.width/dpr - 24, 24);
  ctx.fillText('www.eptagram.com', cvs.width / dpr - 24, 24);

  ctx.save();
  tans.forEach(tan => {
    tan.forEach(e => {
      if (emt.tic > emt.toc) fROTATE(e); else fMOVE(e);
    });
  });
  ctx.restore();

  let _dot = new Path2D();
  for (let i = 0; i < dot; i++) {
    let _x = (((i + 1) % 7) + 1) * 64 + 128;
    let _y = (parseInt(i / 7) + 1) * 64 + 128;

    _dot.moveTo(_x - 2, _y - 2);
    _dot.lineTo(_x + 2, _y + 2);
    _dot.moveTo(_x - 2, _y + 2);
    _dot.lineTo(_x + 2, _y - 2);
  }
  ctx.strokeStyle = tans.clr[7];
  ctx.stroke(_dot);

  let _back = new Path2D();
  ctx.fillStyle = tans.clr[8]; /// 배경색
  _back.rect(0, 0, cvs.width, cvs.height);
  ctx.fill(_back);

  // ctx.fillRect(0, 0, cvs.width, cvs.height);
};

///
/// A C T I O N - M O V E & R O T A T E /// /// /// /// /// /// /// /// ///
///

const fMOVE = (...a) => { /// [{}]
  a.push({});
  let a0 = a[0];
  let a1 = a[1];

  a0.pth = new Path2D();

  a0.vtx.forEach((e, i) => { /// element, index
    e.x += a0.frm[1].x;
    e.y += a0.frm[1].y;

    if (i) a0.pth.lineTo(e.x, e.y); else a0.pth.moveTo(e.x, e.y);
  });
  a0.pth.closePath();

  ctx.fillStyle = a0.frm[1].c;
  ctx.fill(a0.pth);
  if (a0.frm[1].t) {
    ctx.strokeStyle = clr[7];
    ctx.lineWidth = a0.frm[1].t;
    ctx.stroke(a0.pth);
  }

  a0.frm[0].x += a0.frm[1].x;
  a0.frm[0].y += a0.frm[1].y;
  a0.frm[1].x = 0;
  a0.frm[1].y = 0;
};

const fROTATE = (...a) => { /// [{}]
  a.push({});
  let a0 = a[0];
  let a1 = a[1];

  a0.pth = new Path2D();

  a1.dx = a0.frm[1].r.x - a0.frm[0].x;
  a1.dy = a0.frm[1].r.y - a0.frm[0].y;
  a1.d = Math.sqrt(Math.abs(a1.dx * a1.dx) + Math.abs(a1.dy * a1.dy));
  a1.a = parseInt(a1.d / (128 + 128 * ism)) * (a1.dx > 0 ? 15 : -15); /// 1: ism(isMobile) true
  // a1.a = parseInt(emt.tic / emt.toc) * (a1.dx > 0 ? 15 : -15);

  a1.r = ((a1.a - a0.frm[1].r.a) * Math.PI) / 180;
  a1.cos = Math.cos(a1.r);
  a1.sin = Math.sin(a1.r);

  a0.vtx.forEach((e, i) => { /// element, index
    if (a0.frm[1].r.x && a0.frm[1].r.y && a1.r !== 0) {
      let nx = a1.cos * (e.x - a0.frm[0].x) + a1.sin * (e.y - a0.frm[0].y) + a0.frm[0].x;
      let ny = a1.cos * (e.y - a0.frm[0].y) - a1.sin * (e.x - a0.frm[0].x) + a0.frm[0].y;

      e.x = nx; /// 주소 복사 되면 간섭 생김
      e.y = ny;
    }

    if (i) a0.pth.lineTo(e.x, e.y); else a0.pth.moveTo(e.x, e.y);
  });

  a0.frm[1].r.a = a1.a;

  a0.pth.closePath();
  ctx.fillStyle = a0.frm[1].c;
  ctx.fill(a0.pth);
  if (a0.frm[1].t) {
    ctx.strokeStyle = tans.clr[7];
    ctx.lineWidth = a0.frm[1].t;
    ctx.stroke(a0.pth);
  }

  a0.frm[1].r.x += a0.frm[1].x;
  a0.frm[1].r.y += a0.frm[1].y;
  a0.frm[1].x = 0;
  a0.frm[1].y = 0;
};

///
/// E V E N T - M O U S E & T O U C H /// /// /// /// /// /// /// /// ///
///

const emt = {
  x: 0,
  y: 0,
  off: [], /// [{x:0, y:0}]
  dn: [],
  up: [], /// [{tan:tans.fox.idle[0], by:{x:0, y:0}, to:{x:0, y:0}}]
  tic: 0,
  toc: 24
};

cvs.addEventListener('touchstart', e => { e.preventDefault(); fMSDN({ x: e.touches[0].clientX, y: e.touches[0].clientY })});
cvs.addEventListener('mousedown', e => fMSDN({ x: e.clientX, y: e.clientY }));
const fMSDN = (...a) => {
  a.push({});
  let a0 = a[0];
  let a1 = a[1];

  if (tans.length) {
    emt.off = [];
    emt.dn = [];
    emt.up = [];
    emt.x = a0.x - offset.x;
    emt.y = a0.y - offset.y;

    a1.items = [];
    tans.forEach(tan => {
      tan.forEach((e, i) => { /// element, index
        a1.x = emt.x - e.frm[1].x;
        a1.y = emt.y - e.frm[1].y;
        if (ctx.isPointInPath(e.pth, a1.x * dpr, a1.y * dpr)) {
          emt.tic = 1;
          e.frm[1].r = { x: e.frm[0].x, y: e.frm[0].y, a: 0 };

          a1.offx = a1.x - e.frm[0].x;
          a1.offy = a1.y - e.frm[0].y;
          emt.off.push({ x: a1.offx, y: a1.offy });

          a1.by = { x: e.frm[0].x, y: e.frm[0].y };
          emt.dn.push({ tan: e, by: a1.by });
          emt.up.push({ tan: e, by: a1.by, to: { x: e.frm[0].x, y: e.frm[0].y } });

          a1.items.push(i);
          cvs.style.cursor = 'none';
        }
      });

      a1.items.forEach((e, i) => { /// element, index
        const item = tan.splice(e, 1); /// start, delete count, add item
        tan.splice(i, 0, item[0]);
      });
    });
  }
};

cvs.addEventListener('touchmove', e => fMSMV({ x: e.touches[0].clientX, y: e.touches[0].clientY }));
cvs.addEventListener('mousemove', e => fMSMV({ x: e.clientX, y: e.clientY }));
const fMSMV = (...a) => {
  a.push({});
  let a0 = a[0];
  let a1 = a[1];

  if (emt.dn.length) {
    a1.mx = a0.x - offset.x;
    a1.my = a0.y - offset.y;

    a1.dx = emt.x - a1.mx;
    a1.dy = emt.y - a1.my;
    a1.d = Math.sqrt(Math.abs(a1.dx * a1.dx) + Math.abs(a1.dy * a1.dy));
    if (emt.tic < emt.toc && a1.d > 3) emt.tic = 0;

    emt.dn.forEach((e, i) => { /// element, index
      a1.x = a1.mx - e.tan.frm[0].x;
      a1.y = a1.my - e.tan.frm[0].y;
      emt.up[i].to.x = a1.x - emt.off[i].x;
      emt.up[i].to.y = a1.y - emt.off[i].y;

      e.tan.frm[1].x = emt.up[i].to.x;
      e.tan.frm[1].y = emt.up[i].to.y;
    });
  }
};

cvs.addEventListener('touchend', e => fMSUP({}));
cvs.addEventListener('mouseup', e => fMSUP({}));
cvs.addEventListener('mouseout', e => fMSUP({}));
const fMSUP = (...a) => {
  // a.push({});
  // let a0 = a[0];
  // let a1 = a[1];

  if (emt.dn.length) {
    emt.dn.forEach(e => {
      e.tan.frm[1].t = 0;
      e.tan.frm[1].r = { x: 0, y: 0, a: 0 };
    });

    emt.off = [];
    emt.dn = [];
    emt.up = [];
    emt.tic = 0;

    cvs.style.cursor = 'default';
  }
};

///
/// E V E N T - R E S I Z E /// /// /// /// /// /// /// /// ///
///

const fRESIZE = () => {
  let _b = cvs.getBoundingClientRect();
  offset.x = _b.left;
  offset.y = _b.top;
};
fRESIZE();

window.onscroll = function (e) { fRESIZE(); };
window.onresize = function (e) { fRESIZE(); };

///
/// U P D A T E /// /// /// /// /// /// /// /// ///
///

const fUPDATE = () => {
  if (emt.tic > emt.toc && emt.dn.length)
    emt.dn.forEach(e => {
      e.tan.frm[1].t = 8;
    });

  emt.tic = emt.tic ? ++emt.tic : emt.tic;

  msg.push(('00000000' + emt.tic).slice(-8));

  fDRAW();

  requestAnimationFrame(fUPDATE);
};
fUPDATE();
