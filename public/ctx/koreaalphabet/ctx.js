'use strict';

import { page } from '../../app/page.js';

///
/// c o n s t r u c t o r
///
const ctx = function (p) {
	return new ctx.fn.init(p);
};

ctx.fn = ctx.prototype = {
	constructor: ctx,

	ver: '22-0929-1541',
	length: 0
};

const init = (ctx.fn.init = function (p) {
	if (!p) {
		return this;
	}

	// if (
	// } else { /// 배열을 나타낸다
	// }

	return p;
});

init.prototype = ctx.fn;
export { ctx };

///
/// p r e _ s e t
///