'use strict';

var prime = require('prime'),
	PageBase = require('./base');

var PageMain = prime({
	inherits: PageBase,

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec, data){
		if (!(this instanceof PageMain)){
			return new PageMain(spec, data);
		}
		PageBase.call(this, spec, data);
	},

	/**
	 *
	 */
	toHTML: function(){
		var html = '<section class="page" data-formal-page-index="' + this.index + '">';
		html += this.groupsToHTML();
		html += '</section>';
		return html;
	}
});

module.exports = PageMain;

