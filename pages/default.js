'use strict';

var inherits = require('inherits'),
	zen = require('elements/zen'),
	PageBase = require('./base');

var PageDefault = function(spec){
	if (!(this instanceof PageDefault)){
		return new PageDefault(spec);
	}
	PageBase.call(this, spec);
};

inherits(PageDefault, PageBase);

PageDefault.prototype.build = function(){
	if (this.wrap) return;
	this.wrap = zen('section.page.page-' + this.index);
	this.groupContainer = this.wrap;
};

module.exports = PageDefault;
