'use strict';

import { Vector3, Vector2, Color } from 'three';

import { PerspectiveCamera } from 'three'; // camera
import { Scene, Fog } from 'three'; // scene
import { WebGLRenderer, PCFSoftShadowMap, sRGBEncoding } from 'three'; // renderer
import { DirectionalLight, HemisphereLight, SpotLight } from 'three'; // lights
import { GridHelper, AxesHelper, ArrowHelper, CameraHelper } from 'three'; // helpers
import { PlaneGeometry, BufferGeometry, ExtrudeGeometry, ShapeGeometry } from 'three';
import { MeshBasicMaterial, LineBasicMaterial, MeshPhongMaterial, Mesh, Group, DoubleSide } from 'three';
import { FileLoader, SplineCurve, Line } from 'three'; // spline
import { TextureLoader } from 'three'; // texture

import { GLTFLoader } from 'GLTFLoader';
import { DRACOLoader } from 'DRACOLoader';
import { TTFLoader } from 'TTFLoader';
import { Font } from 'FontLoader';
import { TextGeometry } from 'TextGeometry';
import { SVGLoader } from 'SVGLoader';

import { plot } from './plot.js';
import { play } from './play.js';
import { emoji } from '../lib/fonts/emoji.js';

///
/// c o n s t r u c t o r
///
const prop = function (p) {
	return new prop.fn.init(p);
};

prop.fn = prop.prototype = {
	constructor: prop,

	ver: '22-0929-1541',
	length: 0
};

const init = (prop.fn.init = function (p) {
	if (!p) {
		return this;
	}

	// if (typeof _t === "string") { // 문자열을 나타낸다
	// } else { // 배열을 나타낸다
	// }

	return p;
});

init.prototype = prop.fn;
export { prop };

///
/// p r e _ s e t
///
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

///
/// t h r e e _ l o a d & s e t
///
const aspect = window.innerWidth / window.innerHeight;
// const camera = new OrthographicCamera(- 1 * aspect, 1 * aspect, 1, - 1, 0.1, 100)

const camera = new PerspectiveCamera(45, aspect, 0.25, 500);
prop.prototype.camera = camera;
/// fov: 45~75, aspect: near: 0.1 far: 500~2000
camera.updateProjectionMatrix();
camera.position.set(0, 350, 0);
camera.lookAt(new Vector3(0, 0, 0));

const scene = new Scene();
prop.prototype.scene = scene;
scene.background = new Color('skyblue');
scene.fog = new Fog(0xe0e0e0, 55, 105);

const renderer = new WebGLRenderer({ alpha: true, antialias: true, logarithmicDepthBuffer: true });
prop.prototype.renderer = renderer;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.outputEncoding = sRGBEncoding;
renderer.physicallyCorrectLights = true;
// renderer.sortObjects = true;
// renderer.context.depthFunc(renderer.context.LEQUAL);

const lights = {};
prop.prototype.loghts = lights;
lights.ambientLight = new HemisphereLight(0xffffff, 0x888888, 2.5); // sky color, ground color, intensity
lights.mainLight = new DirectionalLight(0xffffff, 2);
lights.mainLight.position.set(0, 32, 0);
// lights.mainLight.target.position.set(0, 0, 0);
lights.mainLight.castShadow = true;
lights.mainLight.shadow.camera.top = 32;
lights.mainLight.shadow.camera.bottom = -32;
lights.mainLight.shadow.camera.left = -32;
lights.mainLight.shadow.camera.right = 32;

lights.mainLight.shadow.mapSize.width = 1024;
lights.mainLight.shadow.mapSize.height = 1024;
lights.mainLight.shadow.camera.near = 8;
lights.mainLight.shadow.camera.far = 33;
// lights.mainLight.shadow.focus = 2;

// lights.mainLight.decay = 0.1;
// lights.mainLight.distance = 100000;
// lights.mainLight.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects
// lights.mainLight.intensity = 1.2;
// lights.mainLight.angle = 0.45;
// lights.mainLight.penumbra = 0.3;

lights.spotLight = new SpotLight('white');
lights.spotLight.position.set(0, 8, 0);
// lights.spotLight.target.position.set(0, 0, 0);
lights.spotLight.intensity = 3;
lights.spotLight.angle = 1.0;
// lights.spotLight.penumbra = 0.3;
lights.spotLight.castShadow = true;
lights.spotLight.shadow.mapSize.width = 512;
lights.spotLight.shadow.mapSize.height = 512;
lights.spotLight.shadow.camera.near = 5;
lights.spotLight.shadow.camera.far = 9;
// lights.spotLight.shadow.focus = 0.5;

/// e l e m e n t s _ l o a d & s e t
const els = {};
prop.prototype.els = els;

const setSize = () => {
	camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
};

///
/// f o n t _ l o a d & s e t
///
const fonts = {};
prop.prototype.fonts = fonts;

const font = {};
prop.prototype.font = font;

font.load = async (k = {}) => {
	const loader = new TTFLoader();
	k.json = await loader.loadAsync(k.file);
	fonts[k.name] = new Font(k.json);

	if (fonts[k.name] === undefined) {
		loader.load(k.file, json => {
			fonts[k.name] = new Font(json);
		});
	}

	return k.name;
};

font.set = (...a) => {
	a.push({});

	/* 
	a[1].geometry = new TextGeometry(_t, {
    font: fonts[_n],
    size: 5,
    height: 1,
    curveSegments: 10,
    bevelEnabled: false,
    bevelOffset: 0,
    bevelSegments: 1,
    bevelSize: 0.3,
    bevelThickness: 1
	});
	a[1].geometry.center();

	a[1].materials = [
	  new MeshPhongMaterial({ color: 0xff6600 }), // front
	  new MeshPhongMaterial({ color: 0x0000ff }) // side
	];

	a[1].mesh = new Mesh(a[1].geometry, a[1].materials);
	a[1].mesh.castShadow = true
 */

	a[1].material = new MeshBasicMaterial({
		color: a[0].color, // '#000000' or 0x000000
		transparent: true,
		opacity: 1,
		side: DoubleSide
	});

	if (a[0].value[0] === 'emoji') {
		a[1].value = emoji().tangram[a[0].value[1]].idle;
	} else {
		a[1].value = a[0].value[1];
	}

	a[1].shapes = fonts[a[0].file].generateShapes(a[1].value, 20);
	a[1].geometry = new ShapeGeometry(a[1].shapes);
	a[1].geometry.computeBoundingBox();
	a[1].xMid = -0.5 * (a[1].geometry.boundingBox.max.x - a[1].geometry.boundingBox.min.x);
	a[1].geometry.translate(a[1].xMid, 0, 0);
	// geometry.center();

	// make shape ( N.B. edge view not visible )
	a[1].mesh = new Mesh(a[1].geometry, a[1].material);
	a[1].mesh.rotation.x = -Math.PI * 0.5;
	a[1].mesh.scale.set(a[0].scale.x, a[0].scale.y, a[0].scale.z);
	a[1].mesh.position.set(a[0].pos.x, a[0].pos.y, a[0].pos.z);

	a[1].mesh.name = a[0].name;
	a[1].a = a[0].code.split('-'); /// -1-1-1-1
	play().group[`scene-${a[1].a[1]}-${a[1].a[2]}`][a[0].class][a[0].name] = {
		mesh: a[1].mesh
	};
	scene.add(a[1].mesh);
	return a[1].mesh;
};

///
/// h e l p e r _ l o a d & s e t
///
const helpers = {};
prop.prototype.helpers = helpers;

const helper = {};
prop.prototype.helper = helper;

helper.grid = (...a) => {
	// [{ size: 64, division: 32 }]
	a.push({});

	a[1].grid = new GridHelper(a[0].size, a[0].division, 0x000000, 0x000000);
	a[1].grid.material.opacity = 0.2;
	a[1].grid.material.transparent = true;

	scene.add(a[1].grid);
	return a[1];
};

helper.axes = (...a) => {
	// [{ size: 5 }]
	a.push({});

	a[1].axes = new AxesHelper(a[0].size);

	scene.add(a[1].axes);
	return a[1];
};

helper.camera = (...a) => {
	// [{}]
	a.push({});

	a[1].camera = new CameraHelper(camera);

	scene.add(a[1].camera);
	return a[1];
};

///
/// s v g _ l o a d & s e t
///
const svgs = {};
const paths = {};
prop.prototype.svgs = svgs;
prop.prototype.paths = paths;

const svg = {};
prop.prototype.svg = svg;

svg.load = async (...a) => {
	/// [{...}]
	a.push({});

	if (svgs[a[0].name] === undefined) {
		a[1].loader = new FileLoader();
		svgs[a[0].name] = await a[1].loader.loadAsync(a[0].file); // svg
	}

	await svg.set(a[0]);
	return a[0].name; // data svg, type path, name path
};

svg.set = async (...a) => {
	/// [{...}]
	a.push({});

	a[1].svgLoader = new SVGLoader();
	a[1].svgData = a[1].svgLoader.parse(svgs[a[0].name]);

	a[1].svgData.paths.forEach((path, i) => {
		a[1].shapes = SVGLoader.createShapes(path);
		// a[1].color = path.color;
		a[1].color = a[0].color;
	});

	a[1].shapes.forEach((shape, i) => {
		if (a[0].mode === 'mesh') {
			/// mesh
			a[1].geometry = new ExtrudeGeometry(shape, {
				depth: 20,
				bevelEnabled: false
			});
			a[1].geometry.computeVertexNormals();
			// a[1].geometry.computeBoundingBox();
			// a[1].xMid = - 0.5 * ( a[1].geometry.boundingBox.max.x - a[1].geometry.boundingBox.min.x );
			// a[1].geometry.translate( a[1].xMid, 0, 0 );

			a[1].material = new MeshBasicMaterial({ color: a[1].color });
			a[1].mesh = new Mesh(a[1].geometry, a[1].material);
		} else {
			/// path
			a[1].points = shape.getPoints(5);
			a[1].geometry = new BufferGeometry().setFromPoints(a[1].points);
			a[1].material = new LineBasicMaterial({
				color: a[1].color,
				transparent: true,
				opacity: 1,
				side: DoubleSide
			});

			a[1].mesh = new Line(a[1].geometry, a[1].material);
		}
	});

	if (a[1].points !== undefined) {
		// stages.paths[a[0].name] = shape; // Shape is SplinCurve, npc 이동경로를 나타낸다
		a[1].points.forEach((point, i) => {
			point.x *= a[0].scale.x;
			point.y *= a[0].scale.y;
		});

		paths[a[0].name] = new SplineCurve(a[1].points); /// 이동 경로를 나타낸다
	}

	// a[1].geometry.center();
	// a[1].mesh.scale.setScalar(0.5);
	a[1].mesh.position.set(a[0].pos.x, a[0].pos.y, a[0].pos.z);
	a[1].mesh.scale.set(a[0].scale.x, a[0].scale.y, a[0].scale.z);
	a[1].mesh.rotation.x = Math.PI * 0.5;

	/* 
	CUSTOM FROM FILE
	const fileLoader = new FileLoader();
	fileLoader.load( 'models/svg/hexagon.svg', function ( svg ) {
    const node = document.createElementNS( 'http://www.w3.org/2000/svg', 'g' );
    const parser = new DOMParser();
    const doc = parser.parseFromString( svg, 'image/svg+xml' );

    node.appendChild( doc.documentElement );

    const object = new SVGObject( node );
    object.position.x = 500;
    scene.add( object );
	} );
 */

	a[1].mesh.name = a[0].name;
	a[1].a = a[0].code.split('-');
	play().group[`scene-${a[1].a[1]}-${a[1].a[2]}`][a[0].class][a[0].name] = {
		mesh: a[1].mesh
	};
	scene.add(a[1].mesh);
	return a[1].mesh;
};

///
/// g l b _ l o a d & s e t
///
const glbs = {};
prop.prototype.glvs = glbs;

const glb = {};
prop.prototype.glb = glb;

glb.load = async (...a) => {
  /// [{...}]
  a.push({});

	a[1].loader = new GLTFLoader();
	a[1].dracoLoader = new DRACOLoader();

	a[1].dracoLoader.setDecoderPath('../lib/three/example/js/libs/draco/gltf/');
	a[1].loader.setDRACOLoader(a[1].dracoLoader);

	a[0].group = await a[1].loader.loadAsync(a[0].file);
	glbs[a[0].name] = a[0].group;
	await glb.set(a[0]);

	return a[0].name;
};

glb.set = async (...a) => {
  /// [{...}]
  a.push({});

	a[0].group = glbs[a[0].name];

	a[0].length = a[0].group.scene.children.length - 1;
	if (a[0].child) {
		// 특정 오브젝트를 나타낸다
		a[0].num = a[0].child > a[0].length ? a[0].length : a[0].child;
		a[1].mesh = a[0].group.scene.children[a[0].num]; // one model
	} else {
		// 전체 오브젝트를 나타낸다
		a[1].mesh = a[0].group.scene; // group
	}

	a[1].mesh.position.set(a[0].pos.x, a[0].pos.y, a[0].pos.z); // 위치를 나타낸다
	a[1].mesh.scale.set(a[0].scale.x, a[0].scale.y, a[0].scale.z); // 크기를 나타낸다
	a[1].mesh.rotation.set(-Math.PI * a[0].rotate.x, -Math.PI * a[0].rotate.y, -Math.PI * a[0].rotate.z);

	a[1].mesh.traverse(node => {
		if (node.isMesh) {
			node.castShadow = true;
			node.receiveShadow = false;
		}
	});

	a[1].mesh.name = a[0].name;
	a[1].a = a[0].code.split('-');

  a[1].off = '-' + (parseInt(a[1].a[4], 10) + a[0].off); /// 자신의 순서에서 패스까지의 차이로 나타낸다
  a[1].path = a[0].path + a[1].off;

	if (a[0].class === 'players') {
		play().group[`scene-${a[1].a[1]}-${a[1].a[2]}`][a[0].class][a[0].name] = {
			mesh: a[1].mesh,
			pos: a[0].pos,
			scale: a[0].scale,
			rotate: a[0].rotate,
			color: a[0].color,
			deltaMove: new Vector3(),
			deltaRotate: new Vector3(),
			mixer: undefined,
			activeSet: [], // 해야할 행동을 나타낸다 { motion: 'run', speed: 5 }
			activeCurrent: undefined, // 진행 중인 행동을 나타낸다 'run'
			activeDone: false, // 행동 끝남을 나타낸다
			faceSet: [], // 텍스쳐 얼굴 표현을 나타낸다 { texture: 'smaile', speed: 5 }
			faceCurrent: undefined,
			fix: [], // 캐릭터 콘트롤 픽 그라운드, 화면 조이스틱, 키보드 등에 따른 이동 위치을 나타낸다 { pos: [], order: true }
			path: a[1].path
		};
	} else {
		// staffs or stages
		play().group[`scene-${a[1].a[1]}-${a[1].a[2]}`][a[0].class][a[0].name] = {
			mesh: a[1].mesh,
			pos: a[0].pos,
			scale: a[0].scale,
			rotate: a[0].rotate,
			color: a[0].color,
			path: a[1].path,
			active: true
		};
	}

	scene.add(a[1].mesh);
	return a[1].mesh;
};

///
/// t e x t u r e _ l o a d & s e t
///
const textures = {};
const materials = {};
prop.prototype.textures = textures;
prop.prototype.materials = materials;

const texture = {};
prop.prototype.texture = texture;

texture.load = async (...a) => {
  /// [{...}]
  a.push({});

	// file url, texture name
	a[1].loader = new TextureLoader();
	textures[a[0].name] = await a[1].loader.loadAsync(a[0].file);

	textures[a[0].name].flipY = false;
	// k.texture.encoding = THREE.sRGBEncoding;
	materials[a[0].name] = new MeshBasicMaterial({
		map: textures[a[0].name],
		color: a[0].color
	});

	await texture.map(a[0]);
	return a[0].name;
};

texture.map = async (...a) => {
  /// [{...}]
  a.push({});
	a[1].a = a[0].code.split('-');
  a[1].off = '-' + (parseInt(a[1].a[4], 10) + a[0].off); /// 자신의 순서에서 모델까지의 차이로 나타낸다
	a[1].mesh = play().group[`scene-${a[1].a[1]}-${a[1].a[2]}`][a[0].class][a[0].group + a[1].off].mesh;
	a[1].mesh.traverse(node => {
		if (node.isMesh) {
			node.material = materials[a[0].name];
		}
	});
};

///
/// o b j e c t _ s e t
///
const obj = {};
prop.prototype.obj = obj;

obj.path = {
	svg: async (...a) => {
		/// [{}]
		a.push({});

		await svg.load({
			mode: a[0].mode, // 'path',
			type: a[0].type, // 'svg', // 이동 경로를 나타낸다
			file: a[0].file, // `${get.path}/src/svg/path.circle.svg`,
			name: a[0].name, // 'circle',
			pos: new Vector3(a[0].pos[0], a[0].pos[1], a[0].pos[2]),
			scale: new Vector3(a[0].scale[0], a[0].scale[1], a[0].scale[2]),
			rotate: new Vector3(a[0].rotate[0], a[0].rotate[1], a[0].rotate[2]),
			color: new Color(a[0].color),
			class: a[0].class, // 'stages',
			code: a[0].code // '-1-1-1-1'
		});
	}
};

obj.mesh = {
	svg: async (...a) => {
		/// [{}]
		a.push({});

		await svg.load({
			mode: a[0].mode,
			type: a[0].type,
			file: a[0].file,
			name: a[0].name,
			pos: new Vector3(a[0].pos[0], a[0].pos[1], a[0].pos[2]),
			scale: new Vector3(a[0].scale[0], a[0].scale[1], a[0].scale[2]),
			rotate: new Vector3(a[0].rotate[0], a[0].rotate[1], a[0].rotate[2]),
			color: new Color(a[0].color),
			class: a[0].class,
			code: a[0].code
		});
	},

	font: async (...a) => {
		/// [{}]
		a.push({});

		await font.set({
			mode: a[0].mode,
			type: a[0].type,
			file: a[0].file,
			value: a[0].value, /// emoji().tangram.evolution.idle, /// fonts['tangram']
			name: a[0].name, /// 'evolution-emoji'
			pos: new Vector3(a[0].pos[0], a[0].pos[1], a[0].pos[2]),
			scale: new Vector3(a[0].scale[0], a[0].scale[1], a[0].scale[2]),
			rotate: new Vector3(a[0].rotate[0], a[0].rotate[1], a[0].rotate[2]),
			color: new Color(a[0].color),
			class: a[0].class,
			code: a[0].code
		});
	},

	glb: async (...a) => {
		/// [{}]
		a.push({});

		await glb.load({
			mode: a[0].mode,
			type: a[0].type,
			file: a[0].file,
			name: a[0].name,
			pos: new Vector3(a[0].pos[0], a[0].pos[1], a[0].pos[2]),
			scale: new Vector3(a[0].scale[0], a[0].scale[1], a[0].scale[2]),
			rotate: new Vector3(a[0].rotate[0], a[0].rotate[1], a[0].rotate[2]),
			color: new Color(a[0].color),
			class: a[0].class,
			code: a[0].code,
			child: a[0].child,
			path: a[0].path,
      off: a[0].off
		});
	}
};

obj.texture = {
	img: async (...a) => {
		/// [{}]
		a.push({});

		await texture.load({
			mode: a[0].mode,
			type: a[0].type,
			file: a[0].file,
			name: a[0].name,
			pos: new Vector3(a[0].pos[0], a[0].pos[1], a[0].pos[2]),
			scale: new Vector3(a[0].scale[0], a[0].scale[1], a[0].scale[2]),
			rotate: new Vector3(a[0].rotate[0], a[0].rotate[1], a[0].rotate[2]),
			color: new Color(a[0].color),
			class: a[0].class,
			code: a[0].code,
			group: a[0].group,
      off: a[0].off
		});
	}
};

///
/// e v e n t s _ s e t
///
const evts = {};
prop.prototype.evts = evts;

evts.time = [];
evts.click = [];

evts.set = (...a) => {
/// [{...}]
a.push({});


}

///
/// C o n t e n t s _ l o a d & s e t
///
const contents = {};
prop.prototype.contents = contents;
contents.done = false;

prop.prototype.load = (...a) => {
	/// [{}]
	a.push({});

	a[1].init = init.prototype; /// 외부에서 참조 되지 않는다
	// a[1].init.element({ name: '#scene' }); /// set elements.container

	els.container = document.querySelector('#scene');
	els.container.append(renderer.domElement);

	scene.add(lights.ambientLight, lights.mainLight);

	play().orbit({ camera: camera, element: renderer.domElement });

	(() => {
		setSize();
		window.addEventListener('resize', () => {
			setSize();
		});
	})();
};

prop.prototype.clear = (...a) => {
	// [{ path: '' }]
	a.push({});

  for (const k in paths) { /// 자동 이동 패스 제거를 나타낸다
		delete paths[k];
	}

	a[1].del = a => {
		if (Object.keys(a).length) {
      for (const k in a) {
        // console.log(a[k].mesh);
        if (a[k].mesh.material) a[k].mesh.material.dispose(); /// 메모리 해제를 나타낸다
        if (a[k].mesh.texture) a[k].mesh.texture.dispose(); /// 메모리 해제를 나타낸다
        scene.remove(a[k].mesh); /// 씬에서 삭제를 나타낸다
        delete a[k]; /// 그룹에서 삭제를 나타낸다
      }
    }
	};

	for (const k in play().group) {
		a[1].e = play().group[k];
		a[1].del(a[1].e.players);
		a[1].del(a[1].e.staffs);
		a[1].del(a[1].e.stages);
    a[1].del(a[1].e.helpers);
	}

  console.log('%c/// r e m o v e', 'color: #000000');
};

prop.prototype.set = (...a) => {
	// [{ path: '' }]
	a.push({});
	(async () => {
		// xmlbinding
		await plot().xml({ file: `${a[0].path}/ctx.xml` });
    
    a[1].path = a[0].path.split('/')[2];
    if(a[1].path === 'main'){
      await font.load({ file: '../lib/fonts/PlayTangram.ttf', name: 'playtangram' });
      await helper.grid({ size: 64, division: 32 });
      await helper.axes({ size: 5 });
      await helper.camera({});
    }

		a[1].sequences = plot().story.current.sequence;
		a[1].sequences = a[1].sequences === 0 ? a[1].sequences + 1 : a[1].sequences;
		a[1].scenes = plot().story.current.scene;
		a[1].scenes = a[1].scenes === 0 ? a[1].scenes + 1 : a[1].scenes;

		a[1].env = plot().story.scene[`scene-${a[1].sequences}-${a[1].scenes}`];
		play().orbit.maxDistance = a[1].env.orbit.max * (isMobile ? 1.5 : 1); /// plot().scene.max
		play().orbit.minDistance = a[1].env.orbit.min * (isMobile ? 5 : 1);
		// play().orbit.maxPolarAngle = (Math.PI / 4) * 3;
		// play().orbit.minPolarAngle = 0; /// H radians 90
		play().orbit.maxPolarAngle = Math.PI / a[1].env.orbit.pi; /// H radians 90
		play().orbit.minAzimuthAngle = -Math.PI / a[1].env.orbit.pi; /// - Math.PI / 2; // V radians 90
		play().orbit.maxAzimuthAngle = Math.PI / a[1].env.orbit.pi; /// Math.PI / 2; // V radians 90

		/// s c e n e _ s e t
		a[1].scene = plot().story.scene;

		async function* scene() {
			for (const k in a[1].scene) {
				if (Object.hasOwnProperty.call(a[1].scene, k)) {
					a[1].s = a[1].scene[k];
					a[1].a = k.split('-');
					Array.isArray(a[1].a);
					if (a[1].a.length > 1) {
						play().group[`scene${a[1].s.code}`] = {
							players: {},
							staffs: {},
							stages: {},
							helpers: {}
						};
					}
				}
				yield k;
			}
		}

		await (async function () {
			for await (let i of scene()) {
				// console.log(i);
			}
		})();

		/// c t x _ l o a d & s e t
		a[1].ctx = plot().story.ctx;
		a[1].func = '';

		async function* ctx() {
			for (const k in a[1].ctx) {
				if (Object.hasOwnProperty.call(a[1].ctx, k)) {
					a[1].c = a[1].ctx[k];
					a[1].a = k.split('-');
					Array.isArray(a[1].a);
					if (a[1].a.length > 1) {
						if (a[1].c.mode !== undefined) {
							a[1].c.current = play().group[`scene-${a[1].a[1]}-${a[1].a[2]}`];
						}

						if (a[1].a[1] === '1' && a[1].a[2] === '1') {
							if (a[1].c.type !== 'font' && a[1].c.file !== undefined) {
								a[1].c.file = a[0].path + a[1].c.file;
							}
							
              if (a[1].c.mode !== 'event') {
                await obj[a[1].c.mode][a[1].c.type](a[1].c); /// 각각의 모델 생성을 나타낸다
              }else{
                console.log(a[1].c.mode); /// 이벤트를 나타낸다
              }
						}
					}
				}
				yield k;
			}
		}

		await (async function () {
			for await (let i of ctx()) {
				// console.log(i);
			}
		})();

		console.log('%c/// b i n d', 'color: #ffff00');
		contents.done = true;
	})();
};
