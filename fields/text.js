'use strict';

var prime = require('prime'),
	forOwn = require('mout/object/forOwn'),
	zen = require('elements/zen'),
	FieldBase = require('./base');

var FieldText = prime({
	inherits: FieldBase,

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec, value){
		if (!(this instanceof FieldText)){
			return new FieldText(spec, value);
		}
		FieldBase.call(this, spec, value);
	},

	/**
	 *
	 */
	build: function(){
		this.wrap = zen('li');
		zen('label').text(this.spec.label || '').insert(this.wrap);
		this.input = zen('input[type=text]').insert(this.wrap);

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
	}
});

module.exports = FieldText;
