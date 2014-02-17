'use strict';

var prime = require('prime'),
	zen = require('elements/zen'),
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
	build: function(){
		if (this.wrap) return;
		this.wrap = zen('section.page.page-' + this.index);
		this.groupContainer = this.wrap;
		this.buildGroups();
	}
});

module.exports = PageDefault;
