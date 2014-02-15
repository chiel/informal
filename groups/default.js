'use strict';

var prime = require('prime'),
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
	toHTML: function(){
		var html = '<fieldset class="group" data-formal-group-index="' + this.index + '"><ul>';
		html += this.spec.name ? '<legend>' + this.spec.name + '</legend>' : '';
		html += this.fieldsToHTML();
		html += '</ul></fieldset>';
		return html;
	}
});

module.exports = GroupDefault;
