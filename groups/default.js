'use strict';

var prime = require('prime'),
	zen = require('elements/zen'),
	GroupBase = require('./base');

var GroupDefault = prime({
	inherits: GroupBase,

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec, data){
		if (!(this instanceof GroupDefault)){
			return new GroupDefault(spec, data);
		}
		GroupBase.call(this, spec, data);
	},

	/**
	 *
	 */
	build: function(){
		if (this.wrap) return;
		this.wrap = zen('fieldset');
		if (this.spec.name){
			zen('legend').text(this.spec.name).insert(this.wrap);
		}
		this.fieldContainer = zen('ul').insert(this.wrap);
		this.buildFields();
	}
});

module.exports = GroupDefault;
