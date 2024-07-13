export class Window {
  constructor(a) {
    const {} = a;
  }
}

export class Doc {
  constructor(a) {
    const {} = a;
  }
}

export class Canvas {
  constructor(a) {
    // 초기값
    const { name, id, type, width, height, color } = a;
    this.name = name;
    this.id = id;
    this.type = type;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dpr = window.devicePixelRatio;
    this.cvs = document.createElement('canvas');
    this.ctx = this.cvs.getContext(this.type);

    document.body.appendChild(this.cvs);

    window.addEventListener('resize', this.setsize );
  }


  set = () => {
    const body = document.body;
    body.style.width = '100%';
    body.style.height = '100%';
    body.style['background-color'] = '#000';
    body.style.margin = '0px';
    body.style.padding = '0px';
    body.style.overflow = 'hidden';

    this.cvs.style.position = 'absolute';
    this.cvs.background = this.color;
    this.setsize();
   
    return this.ctx;
  };

  setsize = () => {
    const w = window.innerWidth / this.width;
    const h = window.innerHeight / this.height;
    const r = w < h ? w: h;

    const x = window.innerWidth - this.width * r;
    const y = window.innerHeight - this.height * r;
    this.cvs.style.left = `${x*0.5}px`;
    this.cvs.style.top = `${y*0.5}px`;

    this.cvs.style.width = `${this.width * r}px`;
    this.cvs.style.height = `${this.height * r}px`;

    this.cvs.width = this.width * this.dpr * r;
    this.cvs.height = this.height * this.dpr * r;

    this.ctx.scale(this.dpr * r, this.dpr * r);
  };
}

export class Input {
  constructor(a) {
    const {} = a;
  }
}

export class Load {
  constructor(a) {
    const {} = a;
  }

  getfile = async (a) => {
    const { src } = a;
    const ext = src.replace(/(\w|-|_|\/)+./, '');
    const res = await fetch(src);

    switch (ext) {
      case '.xml':
        const restext = await res.text();
        return new DOMParser().parseFromString(restext, 'application/xml');
        break;

      default: // case '.png': case '.jpg':
        const resblob = await res.blob();
        const url = URL.createObjectURL(resblob);
        const img = new Image();
        img.src = url;
        return img;
        break;
    }
  };
}
