'use strict';

(async (a = [{}]) => {
	a.push({});

	console.log('%c/// r e a d', 'color: #ff0000');

	const { page } = await import('../../app/page.js');
	const { prop } = await import('../../app/prop.js');
	const { play } = await import('../../app/play.js');

	page().ctx.body.style({});
	page().ui.font.html({}); /// 기본 Google 폰트 링크
  page().ui.font.load({ name: 'PlayTangram', type: '.ttf' }); /// PlayTangram M 폰트 로드

	page().ctx.els.create({ id: 'scene', type: 'div', text: '', parent: '' });
	page().ctx.els.style({ id: 'scene' });

	page().ctx.els.create({ id: 'dim', type: 'div', text: '', parent: '' });
	page().ctx.els.style({ id: 'dim' });

	page().ctx.els.create({ id: 'button', type: 'button', text: 'LOAD', parent: 'dim' });
	page().ctx.els.style({ id: 'button' });

	page().ctx.els.create({ id: 'menus', type: 'div', text: '', parent: '' });
	page().ctx.els.style({ id: 'menus' });

	page().ui.menu.create({ id: 'main|home', parent: 'menus' });
	page().ui.menu.style({ id: 'main', pos: [30, 30], em: 1 });

	a[1].dim = document.querySelector('#dim');
	a[1].btn = a[1].dim.querySelector('#button');

	page().ui.scroll.bind({});
	document.addEventListener('mousedown', page().ui.scroll.start({}));
	document.addEventListener('touchstart', page().ui.scroll.start({}));
	document.addEventListener('click', page().ui.btn.click({}));

	/// l o a d & s e t
	await prop().load({});

	// await prop().opt({});

	a[1].path = window.location.pathname;
	a[1].path = a[1].path === '/' ? '/main' : a[1].path;
	await prop().set({ path: `/ctx${a[1].path}` }); // 오브젝트들을 나타낸다

	/// p l a y
	const done = () => {
		if (prop().contents.done) {
			console.log('%c/// p l a y', 'color: #00ff00');
			play().loop.start();
			a[1].btn.innerHTML = 'PLAY';
			a[1].btn.style.cursor = 'pointer';
			a[1].btn.addEventListener('click', () => {
				a[1].dim.remove();
        page().chapters.menu({});
			});
		} else {
			console.log('%c/// l o a d', 'color: #ffff00');
			setTimeout(() => done(), 1000);
		}
	};
	done();
})().catch(err => {
	console.log(err);
});
