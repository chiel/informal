'use strict';

var prime = require('prime'),
	fieldTypes = require('./../fields'),
	groupIndex = 0;

var GroupBase = prime({
	fields: [],

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec, data){
		this.index = groupIndex++;
		this.spec = spec;
		this.data = data;
		this.fieldCount = this.spec.fields.length;

		this.createFields();
	},

	/**
	 *
	 */
	createFields: function(){
		var i, fieldSpec;
		for (i = 0; i < this.fieldCount; i++){
			fieldSpec = this.spec.fields[i];
			this.fields.push(new (fieldTypes.fetch(fieldSpec.type))(fieldSpec, this.data[fieldSpec.name]));
		}
	},

	/**
	 *
	 */
	isValid: function(){
		for (var i = 0; i < this.fieldCount; i++){
			if (!this.fields[i].isValid()){
				return false;
			}
		}
		return true;
	},

	/**
	 *
	 */
	fieldsToHTML: function(){
		var html = '', i;
		for (i = 0; i < this.fieldCount; i++){
			html += this.fields[i].toHTML();
		}
		return html;
	}
});

module.exports = GroupBase;
