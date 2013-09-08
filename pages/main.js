'use strict';

var PageBase = require('./base'),
	zen = require('elements/zen');

require('./../elements');

/**
 *
 */
var PageMain = function(root, spec){
	if (!(this instanceof PageMain)){
		return new PageMain(root, spec);
	}
	PageBase.call(this, root, spec);
};

PageMain.prototype = Object.create(PageBase.prototype);

/**
 * Build up the elements for the page
 */
PageMain.prototype.build = function(){
	this.wrap = zen('section.page.page-' + this.index).insert(this.root);
	this.groupContainer = this.wrap;
};

module.exports = PageMain;

