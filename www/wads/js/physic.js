'use strict';

///
/// c o n s t r u c t o r
///
const physic = function (p) {
	return new physic.fn.init(p);
};

physic.fn = physic.prototype = {
	constructor: physic,

	ver: '22-0929-1541',
	length: 0
};

const init = (physic.fn.init = function (p) {
	if (!p) {
		return this;
	}

	// if (typeof get.anme === "string") { //. 문자열을 나타낸다
	// } else { //. 배열을 나타낸다
	// }

	return p;
});

init.prototype = physic.fn;
window.physic = physic;
export { physic };