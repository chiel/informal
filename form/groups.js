'use strict';

var prime = require('prime'),
	groups = require('../groups');

module.exports = prime({
	buildGroup: function(name){
		var spec = this.spec.groups[name], group, i, field;
		spec.type = spec.type || 'default';
		group = new groups[spec.type](spec);

		for (i = 0; i < spec.fields.length; i++){
			field = this.buildField(spec.fields[i]);
			group.appendField(field);
		}

		this.groups[name] = group;
		return group;
	}
});
