'use strict';

var zen = require('elements/zen'),
	PageBase = require('./base');

/**
 * @param {Object} spec
 */
var PageDefault = function(spec, data){
	if (!(this instanceof PageDefault)){
		return new PageDefault(spec, data);
	}
	PageBase.call(this, spec, data);
};

PageDefault.prototype = Object.create(PageBase.prototype);
PageDefault.prototype.constructor = PageDefault;

/**
 *
 */
PageDefault.prototype.build = function(){
	if (this.wrap) return;
	this.wrap = zen('section.page.page-' + this.index);
	this.groupContainer = this.wrap;
	this.buildGroups();
};

module.exports = PageDefault;
