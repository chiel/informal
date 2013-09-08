'use strict';

var prime = require('prime'),
	fieldTypes = require('./../fields'),
	FieldBase = require('./../fields/base'),
	groupIndex = 1;

/**
 * Extendable base for groups
 */
var GroupBase = prime({
	fields: [],

	/**
	 * @param {Element} root
	 * @param {Object} spec
	 */
	constructor: function(root, spec){
		this.index = groupIndex++;
		this.root = root;
		this.spec = spec;
		this.build();

		var i, fieldSpec;
		for (i = 0; i < this.spec.fields.length; i++){
			fieldSpec = this.spec.fields[i];
			this.addField(new (fieldTypes.fetch(fieldSpec.type))(this.fieldContainer, fieldSpec));
		}
	},

	/**
	 * Add a new field
	 * @param {Object} field
	 */
	addField: function(field){
		if (!(field instanceof FieldBase)){
			throw new Error('field needs to extend FieldBase');
		}
		this.fields.push(field);
	},

	/**
	 * Attach group to the dom
	 */
	attach: function(){
		this.wrap.insert(this.root);
	},

	/**
	 * Remove group from the dom
	 */
	detach: function(){
		this.wrap.remove();
	}
});

module.exports = GroupBase;

