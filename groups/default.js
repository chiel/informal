'use strict';

var prime = require('prime'),
	zen = require('elements/zen'),
	GroupBase = require('./base');

var GroupDefault = prime({
	inherits: GroupBase,

	constructor: function(spec){
		if (!(this instanceof GroupDefault)){
			return new GroupDefault(spec);
		}
		GroupBase.call(this, spec);
	},

	build: function(){
		if (this.wrap) return;
		this.wrap = zen('fieldset');
		if (this.spec.name){
			zen('legend').text(this.spec.name).insert(this.wrap);
		}
		this.fieldContainer = zen('ul').insert(this.wrap);
	}
});

module.exports = GroupDefault;
