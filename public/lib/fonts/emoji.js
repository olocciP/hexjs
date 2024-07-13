///
/// c o n s t r u c t o r
///
const emoji = function (get) {
  return new emoji.fn.init(get);
};

emoji.fn = emoji.prototype = {
  constructor: emoji,

  ver: '22-0929-1541',
  length: 0,
};

const init = emoji.fn.init = function (get) {
  if (!get) { return this; }

  // if (typeof _t === "string") { ///. 문자열을 나타낸다
  // } else { ///. 배열을 나타낸다
  // }

  return get;
};

init.prototype = emoji.fn;
export { emoji };

///
/// e m o j i
///
emoji.prototype.tangram = {
  basic: { idle: '갂갃갅갆갋갌갍갎' },
  fox: { idle: '갦갥갣갏갢갡갟갞갘' },
  nabi: { idle: '갧갨갩' },
  evolution: { idle: '갪갫갮갲갳' },
  male: { idle: '' },
  female: { idle: '' }
}