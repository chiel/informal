'use strict';

var fieldTypes = require('./../fields'),
	FieldBase = require('./../fields/base'),
	groupIndex = 1;

/**
 * Extendable base for groups
 * @param {Object} spec
 */
var GroupBase = function(root, spec){
	this.index = groupIndex++;
	this.root = root;
	this.spec = spec;
	this.fields = [];
	this.build();

	var i, fieldSpec;
	for (i = 0; i < this.spec.fields.length; i++){
		fieldSpec = this.spec.fields[i];
		this.addField(new (fieldTypes.fetch(fieldSpec.type))(this.fieldContainer, fieldSpec));
	}
};

/**
 * Add a new field
 * @param {Object} field
 */
GroupBase.prototype.addField = function(field){
	if (!(field instanceof FieldBase)){
		throw new Error('field needs to extend FieldBase');
	}
	this.fields.push(field);
};

/**
 * Attach group to the dom
 */
GroupBase.prototype.attach = function(){
	this.wrap.insert(this.root);
};

/**
 * Remove group from the dom
 */
GroupBase.prototype.detach = function(){
	this.wrap.remove();
};

module.exports = GroupBase;

