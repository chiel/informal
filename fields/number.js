'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldNumber = prime({
	inherits: FieldText,

	constructor: function(spec, value){
		if (!(this instanceof FieldNumber)){
			return new FieldNumber(spec, value);
		}
		FieldText.call(this, spec, value);
		this.type = 'number';
	}
});

module.exports = FieldNumber;
