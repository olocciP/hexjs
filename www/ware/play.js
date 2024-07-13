'use strict';

import { Clock } from 'three'; // loop

import { Raycaster, Matrix3, Vector3, Vector2 } from 'three'; // orbit
import { OrbitControls } from 'OrbitControls';

import { plot } from './plot.js';
import { prop } from './prop.js';

const raycaster = new Raycaster();

///
/// c o n s t r u c t o r
///
const play = function (p) {
	return new play.fn.init(p);
};

play.fn = play.prototype = {
	constructor: play,

	ver: '22-0929-1541',
	length: 0
};

const init = (play.fn.init = function (p) {
	if (!p) {
		return this;
	}

	// if (typeof get.anme === 'string') { //. 문자열을 나타낸다
	// } else { //. 배열을 나타낸다
	// }

	return p;
});

init.prototype = play.fn;
export { play };

///
/// p l a y
///
const group = {};
play.prototype.group = group;

/*
group['scene-1-1'].players = {}; //. 유저 객체들을 나타낸다
group['scene-1-1'].stages = {}; //. 단순 배경 객체들을 니타내다
group['scene-1-1'].staffs = {}; //. 이벤트 객체들을 나타낸다
group['scene-1-1'].helpers = {}; //. 객체 도움 객체들을 나타낸다
*/

///
/// l o o p
///
const clock = new Clock();
const times = {};
times.base = Date.now();

const updatables = [];
play.prototype.updatables = updatables;

const tick = (k = {}) => {
	// { camera, element }
	const delta = clock.getDelta();

	k.current = plot().story.current;
	k.group = group[`scene-${k.current.sequence}-${k.current.scene}`];

	if (k.group !== undefined) {
		k.players = k.group.players;
		for (let i in k.players) {
			k.mixer = k.players[i].mixer;
			if (k.mixer !== undefined) k.mixer.update(delta);

			if (k.players[i].movements.length > 0) {
				// mMdl().moveModel(players[i]);
			}
		}

		k.staffs = k.group.staffs;
		for (let i in k.staffs) {
			if (k.staffs[i].path !== '' && k.staffs[i].active) {
				times.current = Date.now();
				const deltaTime = times.current - times.base;
				times.base = times.current;

				behavior.staffs({
					name: i,
					mesh: k.staffs[i].mesh,
					path: k.staffs[i].path,
					time: times.base
				});
			}
		}
	}

	for (const object of updatables) {
		object.tick(delta);
	}
};

play.prototype.loop = {
	start: () => {
		plot().story.current.sequence = 1;
		plot().story.current.scene = 1;
		plot().story.current.situation = 1;
		plot().story.current.play = true;

		prop().renderer.setAnimationLoop(() => {
			tick(); // tell every animated object to tick forward one frame
			prop().renderer.render(prop().scene, prop().camera); // render a frame
		});
	},

	stop: () => {
		prop().renderer.setAnimationLoop(null);
	}
};

/// o r b i t
/// { camera, element }
/// 카메라 콘트롤 조건을 나타낸다
play.prototype.orbit = (...a) => {
  /// [{ camera: camera, element: renderer.domElement }]
  a.push({});

	a[1].init = init.prototype;
	a[1].init.orbit = new OrbitControls(a[0].camera, a[0].element);

	// a[1].init.orbit.maxDistance = 25;
	// a[1].init.orbit.minDistance = 15;
	// a[1].init.orbit.maxPolarAngle = (Math.PI / 4) * 3;
	a[1].init.orbit.minPolarAngle = 0; // H radians 90
	a[1].init.orbit.maxPolarAngle = Math.PI / 24; // H radians 90
	a[1].init.orbit.minAzimuthAngle = -Math.PI / 24; // - Math.PI / 2; // V radians 90
	a[1].init.orbit.maxAzimuthAngle = Math.PI / 24; // Math.PI / 2; // V radians 90
	a[1].init.orbit.autoRotate = false;
	a[1].init.orbit.autoRotateSpeed = 0;
	a[1].init.orbit.enableRotate = true;
	a[1].init.orbit.rotateSpeed = 0.4;

	a[1].init.orbit.enableDamping = true;
	a[1].init.orbit.dampingFactor = 0.1;
	a[1].init.orbit.enableZoom = true;
	a[1].init.orbit.enablePan = false;

	a[1].init.orbit.tick = () => a[1].init.orbit.update();

	updatables.push(a[1].init.orbit);
	// return k;
};

/// b e h a v i o r _ s e t
const behavior = {
	staffs: (...a) => {
    /// [{ mesh, name, path, time }]
    a.push({});

		if (!plot().story.current.play) return;
    if (!Object.keys(prop().paths).length) return;

		a[0].time = a[0].time * 0.0001;
		a[0].loc = prop().paths[a[0].path].getPointAt(a[0].time % 1, new Vector3());
		a[0].mesh.position.set(a[0].loc.x, a[0].mesh.position.y, a[0].loc.y);

		a[0].point = prop().paths[a[0].path].getPointAt((a[0].time - 0.01) % 1, new Vector3());

		a[0].mesh.lookAt(new Vector3(a[0].point.x, a[0].mesh.position.y, a[0].point.y)); // 보는 방향 회전을 나타낸다
		a[0].mesh.rotateX(Math.PI * 0.5);
	}
};
