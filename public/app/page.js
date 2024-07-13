'use strict';

import { plot } from './plot.js';
import { prop } from './prop.js';
import { play } from './play.js';

///
/// c o n s t r u c t o r
///
const page = function (p) {
	return new page.fn.init(p);
};

page.fn = page.prototype = {
	constructor: page,

	ver: '22-0929-1541',
	length: 0
};

const init = (page.fn.init = function (p) {
	if (!p) {
		return this;
	}

	// if (
	// } else { /// 배열을 나타낸다
	// }

	return p;
});

init.prototype = page.fn;
export { page };

///
/// p r e _ s e t
///
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const index = {
	dim: 20,
	sub: 21,
	main: 22
};

const nav = {
	current: ['', ''],
	scroll: 0,
	zoom: 0,
	dir: 0,
	home: {
		nabillela: 'nabillela|',
		ludens: 'ludens|놀이',
		loquens: 'loquens|언어',
		laborans: 'laborans|업무',
		about: 'about|'
	},
	ludens: { tangram: 'tangram|칠교', tangtris: 'tangtris|칠교 테트리스' },
	loquens: { koreaalphabet: 'korea alphabet|한글', nabillela: 'nabillela|나빌레라', azalea: 'azalea|진달래 꽃' },
	laborans: { communication: '|소통' },
	about: {}
};

///
/// t t s
///
const tts = {};
tts.voices = [];

tts.setVoiceList = () => {
	tts.voices = window.speechSynthesis.getVoices();
};
tts.setVoiceList();
if (window.speechSynthesis.onvoiceschanged !== undefined) {
	window.speechSynthesis.onvoiceschanged = tts.setVoiceList;
}

tts.dic = {
	requst: async (...a) => {},

	words: (...a) => {
		/// [{ word: '', lang: '', rate: 0}]
		a.push({});

		// a[1].word = encodeURIComponent(a[0].word);
		// ctx.els.create({ id: 'tts', type: 'iframe', text: `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${a[1].word}&tl=en&client=tw-ob`, parent: '' });
		// ctx.els.style({ id: 'tts' });
		// a[1].audio = new Audio;
		// var url = `https://translate.google.com.vn/translate_tts?ie=UTF-8&q=${a[0].word}&tl=en&client=tw-ob`;
		// a[1].audio = document.body.querySelector('#tts');
		// a[1].audio.attr('src', url).get(0).play();

		if (!window.speechSynthesis) {
			/// 음성 재생을 지원하지 않는 브라우저를 나타낸다
			return;
		}

		a[1].speech = new SpeechSynthesisUtterance(a[0].word);
		a[1].speech.onend = function (e) {
			// console.log('end');
		};

		a[1].speech.onerror = function (e) {
			console.log('error', e);
		};

		a[1].voiceFound = false;
		for (var i = 0; i < tts.voices.length; i++) {
			a[1].lang = tts.voices[i].lang;
			if (a[1].lang.indexOf(a[0].lang) >= 0 || a[1].lang.indexOf(a[0].lang.replace('-', '_')) >= 0) {
				a[1].speech.voice = tts.voices[i];
				a[1].voiceFound = true;
			}
		}
		if (!a[1].voiceFound) {
			return;
		}

		a[1].speech.lang = a[0].lang;
		a[1].speech.pitch = 1;
		a[1].speech.rate = a[0].rate; //속도
		// a[1].speech.voice = tts.voices[139];
		window.speechSynthesis.speak(a[1].speech);
	},

	sounds: () => {}
};

///
/// c t x
///
const ctx = {};
page.prototype.ctx = ctx;

ctx.body = {
	html: ``,

	style: (...a) => {
		// [{}]
		a.push({});

		a[1].style = document.createElement('style');
		a[1].style.innerHTML = `
      body {
        margin: 0px;
        padding: 0px;
        overflow:hidden;
      }
    `;

		document.head.appendChild(a[1].style);
	}
};

ctx.els = {
	create: (...a) => {
		/// [{ id: '', type: '', text: '', parent: '' }, {}]
		a.push({});

		a[1].els = document.createElement(a[0].type);
		a[1].els.setAttribute('id', a[0].id);
		if (a[0].type === 'iframe' || a[0].type === 'audio') a[1].els.setAttribute('src', a[0].text);

		if (a[0].text) {
			a[1].node = document.createTextNode(a[0].text);
			a[1].els.appendChild(a[1].node);
		}

		if (a[0].parent) {
			document.body.querySelector(`#${a[0].parent}`).appendChild(a[1].els);
		} else {
			document.body.appendChild(a[1].els);
		}
	},

	style: (...a) => {
		/// [{ id: '', width: '', height: ''}]
		a.push({});

		a[1].els = document.body.querySelector(`#${a[0].id}`); /// id

		a[1].css = {
			scene: `
        width: 100%;
        height: 100%;
        background: whith;
        border: 0px;

        @font-face {
          font-family: "PlayTangram M";
          src: url("../lib/fonts/PlayTangram.ttf") format("truetype");
          font-weight: normal;
        }
      `,

			dim: `
        position: absolute;
        font-size: 16px;
        z-index: ${index.dim};
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.7);
      `,

			button: `
        background: transparent;
        border: 0;
        border: 1px solid rgb(255, 255, 255);
        border-radius: 4px;
        color: #ffffff;
        width: 48%;
        height: 8%;
        display : flex;
        justify-content : center;
        align-items : center;
        font-family: "PlayTangram M";
        font-size: 6vh;
        padding: 12px 18px;
        text-transform: uppercase;
      `,

			chapters: `
        background-color: transparent;
        position: absolute;
        width: ${a[0].width};
        height: ${a[0].height};
        bottom: ${isMobile ? '144px' : '48px'};
        right: ${isMobile ? '192px' : '48px'};
        font-family: "PlayTangram M";
        text-align: center;
        letter-spacing: 0.05em;
        box-shadow: 3px 3px 10px rgba(0,0,0,.2);
        transform: ${isMobile ? 'scale(2)' : 'scale(1)'};
      `,
      /// transform: translate(-50%, -50%);
			tts: `
        position:absolute;
        width: 50%;
        height: 10%;
        top:50%; 
        left:50%;
      `
		};

		a[1].els.style.cssText = a[1].css[a[0].id];
	}
};

///
/// u i
///
const ui = {};
page.prototype.ui = ui;

ui.menu = {
	create: (...a) => {
		a.push({});
		a[1].id = a[0].id.split('|')[0];
		a[1].nav = a[0].id.split('|')[1];

		a[1].els = document.createElement('div');
		a[1].els.setAttribute('id', a[1].id);
		a[1].els.prepend(''); /// 현재 위치를 나타낸다

		a[1].html = `<nav><div class = "hamburger"></div>`;
		for (const k in nav[a[1].nav]) {
			a[1].html += `<a>${nav[a[1].nav][k].split('|')[0].toUpperCase()}</a>`;
		}

		if (a[1].id === 'main') {
			a[1].weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			a[1].date = new Date();
			a[1].day = `${a[1].date.getDate().toString().padStart(2, '0')} / ${
				a[1].weekday[a[1].date.getDay()]
			}<br>${a[1].date.toLocaleString('en-US', { month: 'long' })}`;
			a[1].html += `<p>${a[1].day}</p></nav>`;
		}
		a[1].els.insertAdjacentHTML('beforeend', a[1].html);

		// a[1].node = document.createTextNode(a[1].html);
		// a[1].els.appendChild(a[1].node);
		if (a[0].parent) {
			document.body.querySelector(`#${a[0].parent}`).appendChild(a[1].els);
		} else {
			document.body.appendChild(a[1].els);
		}
	},

	behavior: (...a) => {
		/// [{ e: e, set: true}]
		a.push({});

		a[1].id = a[0].e.target.id;
		a[1].tag = a[0].e.target.tagName;
		if (a[1].id) {
		} else {
			a[0].set = false;
			a[1].id = a[0].e.target.parentNode.id ? a[0].e.target.parentNode.id : a[0].e.target.parentNode.parentNode.id; /// nav, a, p
		}

		a[1].els = document.body.querySelector(`#${a[1].id}`);
		a[1].nav = a[1].els.querySelector('nav');

		if (a[1].tag === 'A') {
			a[1].path = a[0].e.target.firstChild.data.toLowerCase();
			tts.dic.words({ word: a[1].path, lang: 'en-US', rate: 0.8 });

			if (a[1].id === 'main') {
				a[1].data = nav.current[0].slice(0, 8) + a[1].path.toUpperCase();
				nav.current[0] = a[1].data;

				a[1].menu = document.body.querySelector('#sub');
				if (a[1].menu) a[1].menu.remove();

				ui.menu.create({ id: `sub|${a[1].path}`, parent: 'menus' });
				ui.menu.style({ id: 'sub', pos: [30, 60], em: 1 });
			} else {
				a[1].data = nav.current[1].slice(0, 8) + a[1].path.toUpperCase().replace(/(\s)/g, '\u00a0');
				nav.current[1] = a[1].data;

				/// 콘텐츠를 나타낸다
				prop().contents.done = false;
				plot().story.current.play = false;
				prop().clear({});
				set({ path: a[1].path.replace(/(\s)/g, '') });
				// a[1].path = a[1].path.toUpperCase() === document.title.toUpperCase() ? '/' : a[1].path;
				// setTimeout(() => (location.href = a[1].path), 500);
			}
		}

		if (a[1].data === undefined) {
			if (a[1].id === 'main') {
				a[1].data = nav.current[0];
			} else {
				a[1].data = nav.current[1];
			}
		}

		if (!a[0].set) {
			/// 내용 숨김을 나타낸다
			a[1].els.style.transform = 'rotate(0deg)';
			a[1].nav.style.backgroundColor = 'transparent';
			a[1].nav.style.display = 'none';
			a[1].nav.style.boxShadow = '0 0 0px black';
			a[1].els.firstChild.data = a[1].data;
		} else {
			/// 내용을 나타낸다
			a[1].els.style.transform = 'rotate(-90deg)';
			a[1].nav.style.backgroundColor = 'red';
			a[1].nav.style.display = 'block';
			a[1].nav.style.boxShadow = '0 0 16px black';
			a[1].data = a[1].els.firstChild.data;
			a[1].els.firstChild.data = '';
		}
	},

	style: (...a) => {
		a.push({});
		a[1].data = '';

		a[1].tab = '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0';
		a[1].title = a[1].tab + window.location.pathname.replace(/\//g, '').toUpperCase();
		a[1].menu = document.body.querySelector(`#${a[0].id}`); // id
		if (a[0].id === 'main') {
			a[1].data = a[1].title === a[1].tab ? a[1].tab + document.title.toUpperCase() : a[1].title;
			a[1].menu.firstChild.data = a[1].data;
			nav.current[0] = a[1].data; /// 현재 메인 메뉴 위치를 나타낸다
		} else {
			// a[1].data = a[1].title === a[1].tab ? a[1].tab + document.title.toUpperCase() : a[1].title;
			a[1].data = a[1].tab + a[1].data;
			a[1].menu.firstChild.data = a[1].data;
			nav.current[1] = a[1].data; /// 현재 서브 메뉴 위치를 나타낸다
		}

		a[1].menu.style.cssText = `
      pointer-events: auto;
      z-index: ${index[a[0].id]};
      top: ${isMobile ? a[0].pos[0] * 2 : a[0].pos[0]}px;
      left: ${isMobile ? a[0].pos[1] * 2 : a[0].pos[1]}px;
      width: ${isMobile ? 60 : 30}px;
      height: ${isMobile ? 60 : 30}px;
      position: fixed;
      rotate: 90deg;
      cursor: pointer;
      user-select: none;
      background-color: red;
      transform-origin: ${isMobile ? 30 : 15}px ${isMobile ? 30 : 15}px;
      transition: all 0.3s ease;
      font-family: 'Gowun Dodum', sans-serif;
      display: block;
      margin-bottom: ${isMobile ? 30 : 15}px;
      text-decoration: none;
      color: Tan;
      text-align: left;
      line-height: ${isMobile ? 60 : 30}px;
      font-size: ${isMobile ? a[0].em * 2 : a[0].em}em;
    `;

		a[1].menu.addEventListener('click', e => {
			if (a[1].menu.style.transform === 'rotate(-90deg)') {
				ui.menu.behavior({ e: e, set: false, data: a[1].data }); /// 내용을 숨김을 나타낸다
			} else {
				ui.menu.behavior({ e: e, set: true, data: '' }); /// 내용을 나타낸다
			}
		});

		a[1].nav = a[1].menu.querySelector('nav'); // tag
		a[1].nav.style.cssText = `
      padding: ${isMobile ? 180 : 90}px ${isMobile ? 30 : 15}px;
      width: ${isMobile ? 30 : 15}vw;
      background-color: transparent;
      box-shadow: 0 0 0px black;
      display: none;
    `;

		a[1].hamburger = a[1].menu.querySelector('.hamburger'); // class
		a[1].hamburger.style.cssText = `
      position: fixed;
      top: 30px;
      left: 30px;
      cursor: pointer;
      user-select: none;
    `;

		a[1].a = a[1].nav.getElementsByTagName('a');
		for (let i of a[1].a) {
			i.style.cssText = `
        font-family: 'Gowun Dodum', sans-serif;
        line-height: 0.6em;
        display: block;
        margin-bottom: ${isMobile ? 30 : 15}px;
        text-decoration: none;
        color: White;
      `;

			i.onmouseover = function () {
				i.style.textDecoration = 'underline';
			};

			i.onmouseout = function () {
				i.style.textDecoration = 'none';
			};
		}

		a[1].p = a[1].nav.getElementsByTagName('p');
		for (let i of a[1].p) {
			i.style.cssText = `
      font-family: 'Gowun Dodum', sans-serif;
      line-height: 1em;
      display: block;
      margin-bottom: ${isMobile ? 30 : 15}px;
      text-decoration: none;
      color: Tan;
      `;
		}

		// for (let i = 0; i < a[1].p.length; i++) {
		// 	a[1].p[i].style.cssText = `
		//     font-family: 'Gowun Dodum', sans-serif;
		//     display: block;
		//     margin-bottom: ${isMobile ? 30 : 15}px;
		//     text-decoration: none;
		//     color: white;
		//   `;
		// }
	},

	read: () => {},

	update: () => {},

	delete: () => {}
};

ui.font = {
	html: (...a) => {
		a.push({});
		a[1].ele = document.createElement('style');
		a[1].ele.innerHTML = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap" rel="stylesheet">
    `;

		document.head.appendChild(a[1].ele);
	},

	load: async (...a) => {
		a.push({});
		/// { name: 'PlayTangram', type: '.ttf' }
		a[1].fonts = {
			playtangram: new FontFace('PlayTangram M', `url(lib/fonts/${a[0].name + a[0].type})`)
		};
    console.log('Font loaded: '+a[0].name);
		a[1].fonts[a[0].name.toLocaleLowerCase()]
			.load()
			.then(function (loadedFont) {
				document.fonts.add(loadedFont);
			})
			.catch(function (err) {
				console.log('/// Failed to load font: ' + err);
			});
	}
};

ui.scroll = {
	bind: (...a) => {},

	start: (...a) => {},

	move: (...a) => {
		a.push({});

		nav.scroll += a[0].scroll;
	},

	stop: (...a) => {}
};

ui.btn = {
	bind: (...a) => {},
	click: (...a) => {}
};

ui.key = {
	bind: (...a) => {
		a.push({});
		a[0].keys.forEach(i => {});
	},

	input: (...a) => {}
};

///
/// c h a p t e r s
///
const chapters = {};
page.prototype.chapters = chapters;

chapters.slide = (...a) => {
	/// [{ els: obj, slides: obj, prev: obj, next: obj, dir: '' }]
	a.push({});

	a[1].posX1 = 0;
	a[1].posX2 = 0;
	a[1].posInitial;
	a[1].posFinal;
	a[1].threshold = 100;
	a[1].slides = a[0].slides.getElementsByClassName('slide');
	a[1].slidesLength = a[1].slides.length;
	a[1].slideSize = a[0].slides.getElementsByClassName('slide')[0].offsetWidth;
	a[1].firstSlide = a[1].slides[0];
	a[1].lastSlide = a[1].slides[a[1].slidesLength - 1];
	a[1].cloneFirst = a[1].firstSlide.cloneNode(true);
	a[1].cloneLast = a[1].lastSlide.cloneNode(true);
	a[1].index = 0;
	a[1].allowShift = true;

	// Clone first and last slide
	a[0].slides.appendChild(a[1].cloneFirst);
	a[0].slides.insertBefore(a[1].cloneLast, a[1].firstSlide);
	a[0].els.classList.add('loaded');

	// Mouse events
	a[0].slides.onmousedown = dragStart;

	// Touch events
	a[0].slides.addEventListener('touchstart', dragStart);
	a[0].slides.addEventListener('touchend', dragEnd);
	a[0].slides.addEventListener('touchmove', dragAction);

	// Click events
	a[0].prev.addEventListener('click', e => {
		e.target.style.transform = 'scale(.8)';
		setTimeout(() => (e.target.style.transform = 'scale(1)'), 128);
		shiftSlide(-1);
	});

	a[0].next.addEventListener('click', e => {
		e.target.style.transform = 'scale(.8)';
		setTimeout(() => (e.target.style.transform = 'scale(1)'), 128);
		shiftSlide(1);
	});

	// Transition events
	a[0].slides.addEventListener('transitionend', e => {
		checkIndex();
	});

	function dragStart(e) {
		e = e || window.event;
		e.preventDefault();
		a[1].posInitial = a[0].slides.offsetLeft;

		if (e.type == 'touchstart') {
			a[1].posX1 = e.touches[0].clientX;
		} else {
			a[1].posX1 = e.clientX;
			document.onmouseup = dragEnd;
			document.onmousemove = dragAction;
		}
	}

	function dragAction(e) {
		e = e || window.event;

		if (e.type == 'touchmove') {
			a[1].posX2 = a[1].posX1 - e.touches[0].clientX;
			a[1].posX1 = e.touches[0].clientX;
		} else {
			a[1].posX2 = a[1].posX1 - e.clientX;
			a[1].posX1 = e.clientX;
		}
		a[0].slides.style.left = a[0].slides.offsetLeft - a[1].posX2 + 'px';
	}

	function dragEnd(e) {
		a[1].posFinal = a[0].slides.offsetLeft;
		if (a[1].posFinal - a[1].posInitial < -a[1].threshold) {
			console.log(a[1].posFinal - a[1].posInitial - -a[1].threshold);
			shiftSlide(1, 'drag');
		} else if (a[1].posFinal - a[1].posInitial > a[1].threshold) {
			shiftSlide(-1, 'drag'); /// shiftSlide(-1, 'drag');
		} else {
			a[0].slides.style.left = a[1].posInitial + 'px';
		}

		document.onmouseup = null;
		document.onmousemove = null;
	}

	function shiftSlide(dir, action) {
		a[0].slides.style.transition = 'left .2s ease-out';

		if (a[1].allowShift) {
			if (!action) {
				a[1].posInitial = a[0].slides.offsetLeft;
			}

			if (dir > 0) {
				a[0].slides.style.left = a[1].posInitial - a[1].slideSize + 'px';
				a[1].index++;
			} else if (dir == -1) {
				a[0].slides.style.left = a[1].posInitial + a[1].slideSize + 'px';
				a[1].index--;
			}
		}

		a[1].allowShift = false;
	}

	function checkIndex() {
		a[0].slides.style.transition = 'none';

		if (a[1].index === -1) {
			a[0].slides.style.left = -(a[1].slidesLength * a[1].slideSize) + 'px';
			a[1].index = a[1].slidesLength - 1;
		}

		if (a[1].index === a[1].slidesLength) {
			a[0].slides.style.left = -(1 * a[1].slideSize) + 'px';
			a[1].index = 0;
		}

		a[1].allowShift = true;
	}
};

chapters.menu = (...a) => {
	/// [{}]
	a.push({});

	a[1].width = 72;
	a[1].height = 72;

	ctx.els.create({ id: 'chapters', type: 'div', text: '', parent: '' }); /// chspter은 xml의 situation를 나타낸다
	ctx.els.style({ id: 'chapters', width: `${a[1].width * 3}px`, height: `${a[1].height}px` });
	a[1].els = document.body.querySelector('#chapters');

	a[1].html = `
    <div class="wrapper">
      <div id="slides" class="slides">
  `;

	a[1].a = plot().story.scene;
	a[1].alength = 2; /// 앞과 뒤 임의 아이템 추가를 위해 나타낸다
	a[1].title = [];
	for (const k in a[1].a) {
		if (typeof a[1].a[k] === 'object') {
			a[1].alength++;
			a[1].html += `
        <span class="slide">${a[1].a[k].title.substr(0, 2)}</span>
      `;
			a[1].title.push(a[1].a[k].title.substr(0, 2)); /// 2자를 나타낸다
		}
	}

	a[1].html += `
      </div>
    </div>
    <a id="prev" class="control prev"></a>
    <a id="next" class="control next"></a>
  `;

	a[1].els.innerHTML = a[1].html;

	/// b u t t o n
	a[1].btn = {};
	a[1].btn.width = 36;
	a[1].btn.height = 36;

	/// p r e v b u t t o n
	a[1].btn.prev = a[1].els.querySelector('#prev');
	a[1].btn.prev.style = `
    position: absolute;
    top: 50%;
    width: ${a[1].btn.width}px;
    height: ${a[1].btn.height}px;
    background: #fff;
    border-radius: ${a[1].btn.height}px;
    margin-top: -${a[1].btn.height * 0.5}px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
    z-index: 2;
    background-size: 22px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    background-image: url(https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronLeft-512.png);
    left: -${a[1].btn.width * 0.5}px;
  `;

	/// n e x t  b u t t o n
	a[1].btn.next = a[1].els.querySelector('#next');
	a[1].btn.next.style = `
    position: absolute;
    top: 50%;
    width: ${a[1].btn.width}px;
    height: ${a[1].btn.height}px;
    background: #fff;
    border-radius: ${a[1].btn.height}px;
    margin-top: -${a[1].btn.height * 0.5}px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
    z-index: 2;
    background-size: 22px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    background-image: url(https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronRight-512.png);
    right: -${a[1].btn.width * 0.5}px;
  `;

	/// w r a p p e r
	a[1].wrapper = a[1].els.querySelector('.wrapper');
	a[1].wrapper.style = `
    width: ${a[1].width * 3}px;
    height: ${a[1].height}px;
    overflow: hidden;
    position: relative;
    z-index: 1;
  `;

	/// s l i d e s ( c o n t a i n e r )
	a[1].slides = a[1].wrapper.querySelector('.slides');
	a[1].slides.style = `
    display: flex;
    position: relative;
    top: 0;
    left: -${a[1].width}px;
    width: ${a[1].width * a[1].alength}px;
    transition: left .2s ease-out;
  `;

	/// s l i d e ( i t e m s )
	a[1].slide = a[1].slides.querySelectorAll('.slide');
	a[1].color = ['#ffcf47', '#7adcef', '#3cff96', '#a78df5', '#ff8686'];
	a[1].count = 0;
	a[1].fontsize = [56, 36, 36, 40, 36, 36];
	a[1].fontnum = 0;
	for (let i of a[1].slide) {
		a[1].count++;
		a[1].fontnum = a[1].title[a[1].count - 1].length - 1;
		i.style = `
    width: ${a[1].width}px;
    height: ${a[1].height}px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 1s;
    position: relative;
    background: ${a[1].color[a[1].count % 3]};
    border-radius: 2px;
    font-size: ${a[1].fontsize[a[1].fontnum]}px;
  `;
	}

  isMobile
	chapters.slide({ els: a[1].els, slides: a[1].slides, prev: a[1].btn.prev, next: a[1].btn.next });
};

///
/// s e t
///
const set = async (...a) => {
	// [{ path: '' }]
	a.push({});

	console.log('%c/// r e a d', 'color: #ff0000');

	a[1].dim = document.body.querySelector('#dim');
	if (a[1].dim) a[1].dim.remove();

	ctx.els.create({ id: 'dim', type: 'div', text: '', parent: '' });
	ctx.els.style({ id: 'dim' });

	ctx.els.create({ id: 'button', type: 'button', text: 'LOAD', parent: 'dim' });
	ctx.els.style({ id: 'button' });

	a[1].dim = document.body.querySelector('#dim');
	a[1].btn = a[1].dim.querySelector('#button');

	await prop().set({ path: `/ctx/${a[0].path}` }); // 오브젝트들을 나타낸다

	/// p l a y
	const done = () => {
		if (prop().contents.done) {
			console.log('%c/// p l a y', 'color: #00ff00');
			play().loop.start();
			a[1].btn.innerHTML = 'PLAY';
			a[1].btn.style.cursor = 'pointer';
			a[1].btn.addEventListener('click', () => {
				a[1].dim.remove();
				chapters.menu({});
			});
		} else {
			console.log('%c/// l o a d', 'color: #ffff00');
			setTimeout(() => done(), 1000);
		}
	};
	done();
};
page.prototype.set = set;
