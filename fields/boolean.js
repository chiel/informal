'use strict';

var forOwn = require('mout/object/forOwn'),
	zen = require('elements/zen'),
	FieldBase = require('./base');

/**
 * @param {Object} spec
 */
var FieldBoolean = function(spec, value){
	if (!(this instanceof FieldBoolean)){
		return new FieldBoolean(spec, value);
	}
	FieldBase.call(this, spec, value);
};

FieldBoolean.prototype = Object.create(FieldBase.prototype);
FieldBoolean.prototype.constructor = FieldBoolean;

/**
 *
 */
FieldBoolean.prototype.build = function(){
	this.wrap = zen('li');
	zen('label').text(this.spec.label || '').insert(this.wrap);
	this.input = zen('input[type=checkbox]').insert(this.wrap);

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
};

module.exports = FieldBoolean;
