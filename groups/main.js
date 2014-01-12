'use strict';

var prime = require('prime'),
	GroupBase = require('./base');

var GroupMain = prime({
	inherits: GroupBase,

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec){
		if (!(this instanceof GroupMain)){
			return new GroupMain(spec);
		}
		GroupBase.call(this, spec);
	},

	/**
	 *
	 */
	toHTML: function(){
		var html = '<fieldset class="group" data-formal-group-index="' + this.index + '"><ul>';
		html += this.fieldsToHTML();
		html += '</ul></fieldset>';
		return html;
	}
});

module.exports = GroupMain;

