const lotto = {};

const ball = class {
	constructor(jo) {
		let { name, num, color, trans, frequency } = jo;
		this.name = name;
		this.num = num;
		this.color = color;
		this.trans = trans;
		this.frequency = frequency;

		// Object.entries(o).forEach(([k, v]) => {
		//   this[k] = v;
		//   if(dev) console.log(`${k} : ${v}`);
		// });
	}

	get = () => {};

	set = () => {};

	put = () => {};

	out = () => {};
};

const balls = {};
lotto.init = jo => {
	let { total, elect, hf, lf } = jo;
	balls.total = total;
	balls.elect = elect;
	balls.hf = hf; /// Height Frequency
	balls.lf = lf; /// Low Frequency

	balls.arr = [];
	for (let i = 0; i < total; i++) {
		/// Basic Balls
		balls.arr.push(
			new ball({
				name: `${i + 1}`,
				num: i,
				color: '#000000',
				trans: { x: 0, y: 0, r: 0, top: 0, left: 0 },
				frequency: 1.0
			})
		);
	}

	for (let i = 0; i < hf.length; i++) {
		/// Win Balls
		balls.arr.push(
			new ball({
				name: `${hf[i]}`,
				num: hf[i] - 1,
				color: '#000000',
				trans: { x: 0, y: 0, r: 0, top: 0, left: 0 },
				frequency: 1.0
			})
		);
	}

	return balls;
};

lotto.set = jo => {
	let { min, max } = jo;
	let f = Math.random() * (max - min) + min;
	let dr = f * 100.0; /// 0.0 ~ 100.0

	let rate = 0.0;
	for (let i = 0; i < balls.arr.length; i++) {
		rate += (balls.arr[i].frequency * 100) / balls.arr.length;
		if (dr <= rate) {
			let num = balls.arr.length - 1 - i;
			return balls.arr[num].name;
		}
	}
};

lotto.wins = async (_a) => {
  const { num } = _a;
  const url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${num}`
  // await fetch(url).then(function (response) {
	// 	return response.json();
	// }).then(function (data) {
	// 	console.log('Async Fetch', data);
	// });
	// console.log('Async Message');

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export { lotto };
