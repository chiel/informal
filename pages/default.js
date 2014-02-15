'use strict';

var prime = require('prime'),
	PageBase = require('./base');

var PageDefault = prime({
	inherits: PageBase,

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec, data){
		if (!(this instanceof PageDefault)){
			return new PageDefault(spec, data);
		}
		PageBase.call(this, spec, data);
	},

	/**
	 *
	 */
	toHTML: function(){
		var html = '<section class="page" data-formal-page-index="' + this.index + '">';
		html += this.spec.name ? '<h3>' + this.spec.name + '</h3>' : '';
		html += this.groupsToHTML();
		html += '</section>';
		return html;
	}
});

module.exports = PageDefault;
