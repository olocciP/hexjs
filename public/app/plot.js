'use strict';

import { FileLoader } from 'three';

///
/// c o n s t r u c t o r
///
const plot = function (p) {
	return new plot.fn.init(p);
};

plot.fn = plot.prototype = {
	constructor: plot,

	ver: '22-0929-1541',
	length: 0
};

const init = (plot.fn.init = function (p) {
	if (!p) {
		return this;
	}

	// if (
	// } else { /// 배열을 나타낸다
	// }

	return p;
});

init.prototype = plot.fn;
export { plot };

///
/// s t o r y
///
const story = {};
plot.prototype.story = story;

/// x m l
plot.prototype.xml = async k => {
	// file xml
	const loader = new FileLoader();
	k.xml = await loader.loadAsync(k.file); /// xml

	return xmlPaser(k); /// file
};

const xmlPaser = (...a) => {
	/// [{ xml: obj }]
	a.push({});
	a[1].parser = new DOMParser();
	a[1].xmlDoc = a[1].parser.parseFromString(a[0].xml, 'text/xml');

	a[1].story = a[1].xmlDoc.querySelector('story'); // 스토리는 몇 개의 시퀀스로 나타낸다
	a[1].value = JSON.parse(a[1].story.childNodes[0].nodeValue); // tagName은 'story'를 나타낸다
	for (let name in a[1].value) {
		story[name] = a[1].value[name];
		// if (value.hasOwnProperty(name)) { }
	}
	story.current.sequence = 0;
	story.current.scene = 0;
	story.current.situation = 0;
	story.current.play = false;

	a[1].sequenceNodeList = a[1].story.querySelectorAll('sequence'); // 실질적으로 배열이 아닌 NodeList 데이터를 나타낸다

	a[1].length = 0;
	a[1].scenes = [];
	a[1].sequenceNodeList.forEach(sequenceNode => {
		a[1].length++;
		a[1].value = JSON.parse(sequenceNode.childNodes[0].nodeValue);
		a[1].index = sequenceNode.tagName + a[1].value.code;

		a[1].scenes.push(sequenceNode.querySelectorAll('scene')); // 배열에 나타낸다
		if (story[sequenceNode.tagName] === undefined) story[sequenceNode.tagName] = {};
		story[sequenceNode.tagName][a[1].index] = a[1].value; // 시퀀스는 몇 개의 씬으로 나타낸다
		story[sequenceNode.tagName].length = a[1].length;
	});

	a[1].length = 0;
	a[1].situations = [];
	a[1].scenes.forEach(sceneNodeList => {
		sceneNodeList.forEach(sceneNode => {
			a[1].length++;
			a[1].value = JSON.parse(sceneNode.childNodes[0].nodeValue);
			a[1].index = sceneNode.tagName + a[1].value.code;

			a[1].situations.push(sceneNode.querySelectorAll('situation')); // 배열에 나타낸다
			if (story[sceneNode.tagName] === undefined) story[sceneNode.tagName] = {};
			story[sceneNode.tagName][a[1].index] = a[1].value; // 씬은 몇 개의 시추에이션으로 나타낸다
			story[sceneNode.tagName].length = a[1].length;
		});
	});

  a[1].ctxs = (...a) => {
    /// [{ node: obj, code: '' }]
    a.push({});

		a[1].length = 0;
		a[0].node.forEach(ctxsNode => {
			a[1].length++;
			a[1].value = JSON.parse(ctxsNode.childNodes[0].nodeValue);
      a[1].value.name = a[1].value.name + '-' + a[1].length;
      a[1].value.code = a[0].code + '-' + a[1].length;
			a[1].index = ctxsNode.tagName + a[1].value.code;

			if (story[ctxsNode.tagName] === undefined) story[ctxsNode.tagName] = {};
			story[ctxsNode.tagName][a[1].index] = a[1].value; // 콘텐츠는 실질적인 데이터를 나타낸다
			story[ctxsNode.tagName].length = a[1].length;
		});
	};

	a[1].length = 0;
	// a[1].ctxs = [];
	a[1].situations.forEach(situationNodeList => {
		situationNodeList.forEach(situationNode => {
			a[1].length++;
			a[1].value = JSON.parse(situationNode.childNodes[0].nodeValue);
			a[1].index = situationNode.tagName + a[1].value.code;
	
			if (story[situationNode.tagName] === undefined) story[situationNode.tagName] = {};
			story[situationNode.tagName][a[1].index] = a[1].value; // 시추에이션은 다양한 콘텐츠로 나타낸다
			story[situationNode.tagName].length = a[1].length;

			a[1].ctxs({ node: situationNode.querySelectorAll('ctx'), code: a[1].value.code}); // 실질적으로 배열이 아닌 NodeList 데이터를 나타낸다
		});
	});

	// console.log(story);
	return a[0];
};
