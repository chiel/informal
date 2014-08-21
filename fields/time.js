'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldTime = prime({
	inherits: FieldText,

	constructor: function(spec, value){
		if (!(this instanceof FieldTime)){
			return new FieldTime(spec, value);
		}
		FieldText.call(this, spec, value);
		this.type = 'time';
	}
});

module.exports = FieldTime;
