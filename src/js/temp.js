module.exports = () => {
  'use strict';
  
  const els = {};
  const edit = {};
  window.edit = edit;

  els.body = document.querySelector('.con_body');
  els.head = els.body.querySelector('.con_head');
  els.contents = document.querySelector('.con_contents');

  const findofnode = (node, reg) => {
    let n = 0;
    node.forEach((e) => {
      let i = e.getAttribute('id');
      let c = e.getAttribute('class');
      if (i !== undefined || c !== undefined) {
        if (reg.test(i) || reg.test(c)) n++;
      }
    });

    return n;
  };

  const el_crt = (a) => {
    let { id, num, cls, data, tct, ue } = a;

    let el = document.createElement('div');
    if (id != '') el.setAttribute('id', `${id}${num > -1 ? num + 1 : ''}`);
    if (cls != '') el.setAttribute('class', cls);
    if (data != '') el.setAttribute('data-' + id, data);
    if (tct != '') el.textContent = ctxt;
    ue.appendChild(el); // Up Element
  };

  const el_des = (a) => {
    let { qs, num, ue } = a;

    qs = num ? `${qs}${num}` : qs;
    let el = ue.querySelector(qs);
    el.replaceChildren();
    ue.removeChild(el);
  };

  const btn_crt = (a) => {
    let { id, num, cls, data, tct, ue } = a;

    let el = document.createElement('button');
    el.setAttribute('data', data);
    el.setAttribute('id', `${id}${num + 1}`);
    el.setAttribute('onclick', 'edit.' + cls + '(this)');
    el.textContent = cls.toUpperCase() + tct;
    ue.appendChild(el);

    return el;
  };

  const btn_des = (a) => {
    let { qs, num, ue } = a;
    let el = ue.querySelector(`${qs}${num}`);
    ue.removeChild(el);
  };

  document.addEventListener('mousedown', (e) => {
    // console.log(e.clientX * window.scale, e.clientY * window.scale);
  });

  ///
  ///
  /// Edit table of contents
  ///
  ///

  const edittable = () => {
    els.table = document.createElement('div');
    els.table.setAttribute('id', 'edit-table');
    els.table.setAttribute('style', 'position: fixed; left: 80px; top: 160px; ');
    els.contents.appendChild(els.table);

    let el = document.createElement('input');
    el.setAttribute('id', 'head-title');
    el.setAttribute('style', 'font-size: 1em');
    els.table.appendChild(el);
  };
  edittable();

  ///
  ///
  /// Layer
  ///
  ///

  els.layeraddbtn = document.createElement('button');
  els.layeraddbtn.setAttribute('data', 'true');
  els.layeraddbtn.setAttribute('onclick', 'edit.layer(this)');
  els.layeraddbtn.textContent = 'LAYER+';
  els.table.appendChild(els.layeraddbtn);

  els.layerdesbtn = document.createElement('button');
  els.layerdesbtn.setAttribute('data', 'false');
  els.layerdesbtn.setAttribute('onclick', 'edit.layer(this)');
  els.layerdesbtn.textContent = 'LAYER-';
  els.table.appendChild(els.layerdesbtn);

  edit.layer = (btn) => {
    let b = JSON.parse(btn.getAttribute('data'));
    let node = els.contents.childNodes;
    let n = findofnode(node, /layer/);

    if (b) layer_crt(n);
    else layer_des(n);
  };

  const layer_crt = (n) => {
    if (n > 0) return;
    tabbtn(true, n);
    el_crt({ id: 'layer', num: n, cls: 'layer', data: '', tct: '', ue: els.contents });
  };

  const layer_des = (n) => {
    if (n > 0) {
      tabbtn(false, n);

      let el = els.contents.querySelector('.tabmenu');
      el_des({ qs: '.tabmenu', num: 0, ue: els.contents });
      el_des({ qs: '#layer', num: n, ue: els.contents });
    }
  };

  ///
  ///
  /// Button of Tab
  ///
  ///

  const tabbtn = (b, n) => {
    if (b) tabbtn_crt(n);
    else tabbtn_des(n);
  };

  const tabbtn_crt = (n) => {
    let add = btn_crt({id: 'tabaddbtn', num: n, cls: 'tab', data: 'true', tct: '+', ue: els.table});
    let del = btn_crt({id: 'tabdelbtn', num: n, cls: 'tab', data: 'false', tct: '-', ue: els.table});

    add.click();
  };

  const tabbtn_des = (n) => {
    btn_des({qs: '#tabaddbtn', num: n, ue: els.table});
    btn_des({qs: '#tabdelbtn', num: n, ue: els.table});
  };

  edit.tab = (btn) => {
    let id = btn.getAttribute('id');
    let b = JSON.parse(btn.getAttribute('data'));

    let el = els.contents.querySelector('.tabmenu');

    let n = 0;
    if (el != null) {
      let node = el.childNodes;
      n = findofnode(node, /button/);
    }

    if (b) tab_add(n, els.contents);
    else tab_del(n, els.contents);
  };

  const tab_add = (n, ul) => {
    if (!n) {
      let el = document.createElement('div');
      el.setAttribute('id', 'tab1');
      el.setAttribute('class', 'tabmenu sub-page1');
      el.setAttribute('data-tabmenu', '');
      ul.appendChild(el);
      ul.insertBefore(el, ul.firstChild);

      let dl1 = document.createElement('div');
      dl1.setAttribute('class', 'button active');
      dl1.setAttribute('data-button', "displayTarget: '#content1'; onlyShow: true; hideTarget: '#layer1 > div';");
      dl1.textContent = '#1 탭 제목';
      el.appendChild(dl1);

      let dl2 = document.createElement('div');
      dl2.setAttribute('class', 'button');
      dl2.setAttribute('data-button', "displayTarget: '#content2'; onlyShow: true; hideTarget: '#layer1 > div';");
      dl2.textContent = '#2 탭 제목';
      el.appendChild(dl2);
    } else {
      let el = document.createElement('div');
      el.setAttribute('class', `button`);
      el.setAttribute('data-button', `displayTarget: '#content${n + 1}'; onlyShow: true; hideTarget: '#layer1 > div';`);
      el.textContent = `#${n + 1} 탭 제목`;
      ul.querySelector('.tabmenu').appendChild(el);
    }
  };

  const tab_del = (n, ue) => {
    if (n > 1) {
      let el = ue.querySelector('.tabmenu').querySelectorAll(`.button`);
      ue.querySelector('.tabmenu').removeChild(el[n - 1]);

      if (n == 2) {
        el_des({ qs: '#tab', num: 1, ue: ue });
        el_des({ qs: '#layer', num: 1, ue: els.contents });
        btn_des({ qs: '#tabaddbtn', num: 1, ue: els.table});
        btn_des({ qs: '#tabdelbtn', num: 1, ue: els.table});
      }
    }
  };

  ///
  ///
  /// Constent
  ///
  ///

  els.contentaddbtn = document.createElement('button');
  els.contentaddbtn.setAttribute('data', 'true');
  els.contentaddbtn.setAttribute('onclick', 'edit.content(this)');
  els.contentaddbtn.textContent = 'CONTENT+';
  els.table.appendChild(els.contentaddbtn);

  els.contentdesbtn = document.createElement('button');
  els.contentdesbtn.setAttribute('data', 'false');
  els.contentdesbtn.setAttribute('onclick', 'edit.content(this)');
  els.contentdesbtn.textContent = 'CONTENT-';
  els.table.appendChild(els.contentdesbtn);

  edit.content = (btn) => {
    let b = JSON.parse(btn.getAttribute('data'));
    let node = els.contents.childNodes;
    let el = els.contents.querySelector('#layer1');
    if (el != null) node = el.childNodes;
    let n = findofnode(node, /content/);
    console.log(el, n);

    if (b) content_crt(n);
    else content_des(n);
  };

  const content_crt = (n) => {
    swiperbtn(true, n);

    let cls = 'flex-center';
    cls = !n ? cls + ' show' : cls;
    let el = els.contents.querySelector('#layer1');
    if (el != null) el_crt({ id: 'content', num: n, cls: cls, data: '', tct: '', ue: el });
    else el_crt({ id: 'content', num: n, cls: cls, data: '', tct: '', ue: els.contents });
  };

  const content_des = (n) => {
    if (n > 0) {
      swiperbtn(false, n);

      let el = els.contents.querySelector('#layer1');
      if (el != null) el_des({ qs: '#content', num: n, ue: el }); // let { qs, num , ue } = a;
      else el_des({ qs: '#content', num: n, ue: els.contents });
    }
  };

  ///
  ///
  /// swiper in content
  ///
  ///

  const swiperbtn = (b, n) => {
    if (b) swiperbtn_crt(n);
    else swiperbtn_des(n);
  };

  const swiperbtn_crt = (n) => {
    let add = document.createElement('button');
    add.setAttribute('data', 'true');
    add.setAttribute('id', `swiperaddbtn${n + 1}`);
    add.setAttribute('onclick', 'edit.swiper(this)');
    add.textContent = 'SWIPER+';
    els.table.appendChild(add);

    let del = document.createElement('button');
    del.setAttribute('data', 'false');
    del.setAttribute('id', `swiperdelbtn${n + 1}`);
    del.setAttribute('onclick', 'edit.swiper(this)');
    del.textContent = 'SWIPER-';
    els.table.appendChild(del);
  };

  const swiperbtn_des = (n) => {
    let add = els.table.querySelector(`#swiperaddbtn${n}`);
    els.table.removeChild(add);
    let del = els.table.querySelector(`#swiperdelbtn${n}`);
    els.table.removeChild(del);
  };

  edit.swiper = (btn) => {
    let id = btn.getAttribute('id');
    let b = JSON.parse(btn.getAttribute('data'));

    let ul = els.contents.querySelector('#content' + id.slice(-1));
    let el = ul.querySelector('.swiper-wrapper');

    let n = 0;
    if (el != null) {
      let node = el.childNodes;
      n = findofnode(node, /slide/);
    }

    if (b) swiper_add(n, ul);
    else swiper_del(n, ul);
  };

  const swiper_add = (n, ul) => {
    if (!n) {
      let el = document.createElement('div');
      el.setAttribute('id', 'swiper1');
      el.setAttribute('class', 'swiper sub-page2');
      el.setAttribute('data-swiper', "speed: 600; navigation: {'nextEl': '#swiper1 .swiper-button-next', 'prevEl': '#swiper1 .swiper-button-prev'}; pagination: {'el': '#swiper1 .swiper-pagination'};");
      ul.appendChild(el);

      let dl1 = document.createElement('div');
      dl1.setAttribute('class', 'swiper-content');
      el.appendChild(dl1);

      let dl2 = document.createElement('div');
      dl2.setAttribute('class', 'swiperBtn swiper-button-next');
      // dl2.insertAdjacentHTML('afterbegin', '다음');
      el.appendChild(dl2);

      let dl3 = document.createElement('div');
      dl3.setAttribute('class', 'swiperBtn swiper-button-prev');
      // dl3.insertAdjacentHTML('afterbegin', '이전');
      el.appendChild(dl3);

      let dl4 = document.createElement('div');
      dl4.setAttribute('class', 'swiperBtn swiper-pagination ball2');
      el.appendChild(dl4);

      let dl11 = document.createElement('div');
      dl11.setAttribute('class', 'swiper-wrapper');
      dl1.appendChild(dl11);

      let dl111 = document.createElement('div');
      dl111.setAttribute('class', 'swiper-slide slide1');
      dl111.textContent = '#1 슬라이드 내용';
      dl11.appendChild(dl111);

      let dl112 = document.createElement('div');
      dl112.setAttribute('class', 'swiper-slide slide2');
      dl112.textContent = '#2 슬라이드 내용';
      dl11.appendChild(dl112);
    } else {
      let el = document.createElement('div');
      el.setAttribute('class', `swiper-slide slide${n + 1}`);
      el.textContent = `#${n + 1} 슬라이드 내용`;
      ul.querySelector('.swiper-wrapper').appendChild(el);
    }
  };

  const swiper_del = (n, ul) => {
    if (n > 1) {
      let el = ul.querySelector(`.slide${n}`);
      ul.querySelector('.swiper-wrapper').removeChild(el);

      if (n == 2) {
        let el = ul.querySelector('#swiper1');
        el.replaceChildren();
        ul.removeChild(el);
      }
    }
  };

  ///
  ///
  /// Style of elements
  ///
  ///

  const stl = () => {
    let el = document.createElement('style');
    els.contents.appendChild(el);
  };

  ///
  ///
  /// Generate template of contents
  ///
  ///

  els.templatebtn = document.createElement('button');
  els.templatebtn.setAttribute('onclick', 'edit.template()');
  els.templatebtn.textContent = 'TEMPLATE';
  els.table.appendChild(els.templatebtn);

  edit.template = () => {
    // stl();

    let title = els.table.querySelector('#head-title').value;
    els.head.querySelector('h1').textContent = title;

    let h = document.body.innerHTML; //textContent;

    // let h0 = h.replace(/(?<=<div id=\"edit-table\")(.*?)(?=<\/div>)/g, '');
    let h0 = h.replace(/(<div id=\"edit-table\")(.*?)(<\/div>)/g, '');

    // h = h.replace(/\s\s/g, '');
    // let h1 = h.replace(/<div id="edit-table".*$/, '');
    // let h2 = els.contents.querySelector('#tab1') != null
    // ? h.match(/<div id="tab1".*$/, '')
    // : h.match(/<div id="content1".*$/, '');

    // let h0 = h2 != null ? h1 + h2 : h1 + '</div>';

    const blob = new Blob([h0], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const copytemp = document.createElement('a');
    copytemp.style.display = 'none';
    copytemp.href = url;

    copytemp.download = 'template';
    document.body.appendChild(copytemp);

    copytemp.click();

    setTimeout(() => {
      document.body.removeChild(copytemp);
      window.URL.revokeObjectURL(url);
    }, 100);
  };
};
