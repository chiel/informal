'use strict';

var prime = require('prime'),
	FieldText = require('./text');

var FieldDate = prime({
	inherits: FieldText,

	constructor: function(spec, value){
		if (!(this instanceof FieldDate)){
			return new FieldDate(spec, value);
		}
		FieldText.call(this, spec, value);
		this.type = 'date';
	}
});

module.exports = FieldDate;
