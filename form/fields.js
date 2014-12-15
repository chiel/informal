'use strict';

var prime = require('prime'),
	delve = require('delve'),
	isArray = require('mout/lang/isArray'),
	fields = require('../fields');

module.exports = prime({
	links: {},

	buildField: function(name){
		var spec = this.spec.fields[name], fieldName, field;
		if (!spec.name) spec.name = name;

		fieldName = spec.name.replace('][', '.').replace('[', '.').replace(/\]$/, '');
		field = new fields[spec.type](spec, delve(this.data, fieldName));

		if (spec.link){
			if (!isArray(spec.link)){
				spec.link = [spec.link];
			}

			var i, len = spec.link.length, conn;
			for (i = 0; i < len; i++){
				conn = spec.link[i];
				if (!this.links[conn]){
					this.links[conn] = [];
				}
				this.links[conn].push(name);
				if (field.notify){
					field.notify(conn, delve(this.data, conn));
				}
			}
		}

		var self = this;
		field.on('change', function(value){
			if (!self.links[name]) return;

			var i, len = self.links[name].length, f;
			for (i = 0; i < len; i++){
				f = self.fields[self.links[name][i]];
				if (f && f.notify){
					f.notify(name, value);
				}
			}
		});
		this.fields[name] = field;
		return field;
	}
});
