const FS = require('fs');

module.exports = {
	file: v => {
		const { res, req, path } = v;

		v.p = path === '/' ? '/main' : path;

		FS.readFile(__dirname + `/www/ctx${v.p}.html`, (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(data);
		});
	},

	require: v => {
		const { res, req, path } = v;

		v.p = path === '/' ? '/main' : path;
		res.writeHead(200, { 'Content-Type': 'text/html' });

		v.data = require(`./www/ctx${v.p}`).html;
		res.end(v.data);
	}
};
