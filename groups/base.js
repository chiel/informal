'use strict';

var prime = require('prime'),
	groupIndex = 0;

module.exports = prime({
	constructor: function(spec){
		this.fields = [];
		this.index = groupIndex++;
		this.spec = spec;
	},

	appendField: function(field){
		this.build();
		field.attach(this.fieldContainer);
	},

	attach: function(parent){
		this.build();
		this.wrap.insert(parent);
	}
});
