'use strict';

var type = require('prime/type'),
	groupTypes = require('./../groups'),
	fieldIndex = 1;

/**
 * Extendable base for fields
 * @param {Object} spec
 */
var FieldBase = function(root, spec){
	this.index = fieldIndex++;
	this.root = root;
	this.spec = spec;
	this.activeGroups = [];
	this.builtGroups = {};
	this.build();
};

/**
 * Check if any groups should be triggered
 */
FieldBase.prototype.checkTriggers = function(){
	var values = this.getValue(),
		value, i, groupSpec;

	if (type(values) != 'array') {
		values = [values];
	}

	while (this.activeGroups.length) {
		this.activeGroups.pop().detach();
	}

	while (values.length) {
		value = values.shift();
		if (value in this.spec.triggers) {
			if (!(value in this.builtGroups)) {
				this.builtGroups[value] = [];
				for (i = 0; i < this.spec.triggers[value].length; i++) {
					groupSpec = this.spec.triggers[value][i];
					this.builtGroups[value].push(new (groupTypes.fetch(groupSpec.type))(this.wrap, groupSpec));
				}
			}
			for (i = 0; i < this.builtGroups[value].length; i++) {
				this.builtGroups[value][i].attach();
				this.activeGroups.push(this.builtGroups[value][i]);
			}
		}
	}
};

/**
 * Get value
 * @return {Mixed}
 */
FieldBase.prototype.getValue = function(){
	return this.input.value();
};

module.exports = FieldBase;

