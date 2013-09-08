'use strict';

var prime = require('prime'),
	type = require('prime/type'),
	groupTypes = require('./../groups'),
	fieldIndex = 1;

/**
 * Extendable base for fields
 */
var FieldBase = prime({
	activeGroups: [],
	builtGroups: {},

	/**
	 * @param {Element} root
	 * @param {Object} spec
	 */
	constructor: function(root, spec){
		this.index = fieldIndex++;
		this.root = root;
		this.spec = spec;
		this.build();
	},

	/**
	 * Check if any groups should be triggered
	 */
	checkTriggers: function(){
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
	},

	/**
	 * Get value
	 * @return {Mixed}
	 */
	getValue: function(){
		return this.input.value();
	}
});

module.exports = FieldBase;

