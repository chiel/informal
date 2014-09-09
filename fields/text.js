'use strict';

var prime = require('prime'),
	zen = require('elements/zen'),
	forOwn = require('mout/object/forOwn'),
	FieldBase = require('./base');

var FieldText = prime({
	inherits: FieldBase,
	type: 'text',

	constructor: function(spec, value){
		if (!(this instanceof FieldText)){
			return new FieldText(spec, value);
		}
		FieldBase.call(this, spec, value);
	},

	build: function(){
		this.wrap = zen('li');
		zen('label').text(this.spec.label || '').insert(this.wrap);
		this.input = zen('input[type=' + this.type + ']').insert(this.wrap);

		if (this.spec.name){
			this.input.attribute('name', this.spec.name);
		}
		if (this.spec.value){
			this.input.value(this.spec.value);
		}
		if (this.spec.required && this.spec.required === true){
			this.input.attribute('required', true);
		}
		if (this.spec.attributes){
			forOwn(this.spec.attributes, function(value, key){
				this.input.attribute(key, value);
			}.bind(this));
		}
		if (this.value){
			this.input.value(this.value);
		}
	}
});

module.exports = FieldText;
