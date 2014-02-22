'use strict';

var zen = require('elements/zen'),
	PageBase = require('./base');

/**
 * @param {object} spec
 */
var PageDefault = function(spec){
	if (!(this instanceof PageDefault)){
		return new PageDefault(spec);
	}
	PageBase.call(this, spec);
};

PageDefault.prototype = Object.create(PageBase.prototype);
PageDefault.prototype.constructor = PageDefault;

/**
 * Build required elements for the page
 */
PageDefault.prototype.build = function(){
	if (this.wrap) return;
	this.wrap = zen('section.page.page-' + this.index);
	this.groupContainer = this.wrap;
};

module.exports = PageDefault;
