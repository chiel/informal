'use strict';

var prime = require('prime'),
	fieldTypes = require('./../fields'),
	groupIndex = 0;

var GroupBase = prime({
	/**
	 * @param {Object} spec
	 */
	constructor: function(spec){
		this.index = groupIndex++;
		this.spec = spec;
		this.fieldCount = this.spec.fields.length;
	},

	/**
	 *
	 */
	fieldsToHTML: function(){
		var html = '', i, fieldSpec, field;
		for (i = 0; i < this.fieldCount; i++){
			fieldSpec = this.spec.fields[i];
			field = new (fieldTypes.fetch(fieldSpec.type))(fieldSpec);
			html += field.toHTML();
		}
		return html;
	}
});

module.exports = GroupBase;

