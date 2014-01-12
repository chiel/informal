'use strict';

var prime = require('prime'),
	GroupBase = require('./base');

var GroupMain = prime({
	inherits: GroupBase,

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec, data){
		if (!(this instanceof GroupMain)){
			return new GroupMain(spec, data);
		}
		GroupBase.call(this, spec, data);
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

