'use strict';

var groupIndex = 0;

/**
 * @param {object} spec
 */
var GroupBase = function(spec){
	this.fields = [];
	this.index = groupIndex++;
	this.spec = spec;
};

/**
 * Append a field
 * @param {object} field
 */
GroupBase.prototype.appendField = function(field){
	this.build();
	field.attach(this.fieldContainer);
};

/**
 * Attach group to an element
 * @param {element} parent
 */
GroupBase.prototype.attach = function(parent){
	this.build();
	this.wrap.insert(parent);
};

module.exports = GroupBase;
