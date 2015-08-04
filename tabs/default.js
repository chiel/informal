'use strict';

/**
 * DefaultPage
 *
 * @param {Object} spec
 */
var DefaultPage = function(spec){
	if (!(this instanceof DefaultPage)){
		return new DefaultPage(spec);
	}

	this.build(spec);
};

/**
 * Build the page
 *
 * @param {Object} spec
 */
DefaultPage.prototype.build = function(spec){
	if (this.wrap) return;

	var wrap = document.createElement('article');
	wrap.classList.add('informal-tab');
	wrap.classList.add('informal-tab-default');

	this.wrap = wrap;
};

module.exports = DefaultPage;
