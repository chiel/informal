'use strict';

var fieldIndex = 0;

/**
 * @param {object} spec
 * @param {mixed} value
 */
var FieldBase = function(spec, value){
	this.index = fieldIndex++;
	this.spec = spec;
	this.value = value;

	this.spec.attributes = this.spec.attributes || {};
};

/**
 * Attach field to an element
 * @param {element} parent
 */
FieldBase.prototype.attach = function(parent){
	this.build();
	this.wrap.insert(parent);
};

module.exports = FieldBase;
