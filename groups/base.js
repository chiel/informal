'use strict';

var prime = require('prime'),
	fieldTypes = require('./../fields'),
	groupIndex = 0;

var GroupBase = prime({
	/**
	 * @param {Object} spec
	 */
	constructor: function(spec, data){
		this.fields = [];
		this.index = groupIndex++;
		this.spec = spec;
		this.data = data;
		this.fieldCount = this.spec.fields.length;
	},

	/**
	 *
	 */
	buildFields: function(){
		var i, spec, field;
		for (i = 0; i < this.fieldCount; i++){
			spec = this.spec.fields[i];
			field = new (fieldTypes.fetch(spec.type))(spec, this.data[spec.name]);
			field.attach(this.fieldContainer);
			this.fields.push(field);
		}
	},

	/**
	 *
	 */
	attach: function(parent){
		this.build();
		this.wrap.insert(parent);
	}
});

module.exports = GroupBase;
