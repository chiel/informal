'use strict';

var prime = require('prime'),
	forOwn = require('mout/object/forOwn'),
	zen = require('elements/zen'),
	FieldBase = require('./base');

var FieldBoolean = prime({
	inherits: FieldBase,

	constructor: function(spec, value){
		if (!(this instanceof FieldBoolean)){
			return new FieldBoolean(spec, value);
		}
		FieldBase.call(this, spec, value);
	},

	build: function(){
		this.wrap = zen('li');
		zen('label').text(this.spec.label || '').insert(this.wrap);
		this.input = zen('input[type=checkbox]').insert(this.wrap);
		this.input.value(true);

		if (this.spec.name){
			this.input.attribute('name', this.spec.name);
		}
		if (this.spec.required && this.spec.required === true){
			this.input.attribute('required', true);
		}
		if (this.spec.attributes){
			forOwn(this.spec.attributes, function(value, key){
				this.input.attribute(key, value);
			}.bind(this));
		}
		this.input.checked(this.value === true);
	}
});

module.exports = FieldBoolean;
