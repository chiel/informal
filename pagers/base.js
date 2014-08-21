'use strict';

var prime = require('prime');

module.exports = prime({
	constructor: function(spec){
		this.spec = spec;
	},

	attach: function(parent){
		this.build();
		this.wrap.insert(parent);
		return this;
	}
});
