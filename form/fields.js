'use strict';

var prime = require('prime'),
	delve = require('delve'),
	fields = require('../fields');

module.exports = prime({
	buildField: function(name){
		var spec = this.spec.fields[name], fieldName, field;
		if (!spec.name) spec.name = name;

		fieldName = spec.name.replace('][', '.').replace('[', '.').replace(/\]$/, '');
		field = new fields[spec.type](spec, delve(this.data, fieldName));
		this.fields[name] = field;
		return field;
	}
});
