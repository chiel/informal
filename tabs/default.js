'use strict';

/**
 * DefaultPage
 *
 * @param {Object} spec
 */
var DefaultPage = function(spec) {
	this.build(spec);
};

/**
 * Build the page
 *
 * @param {Object} spec
 */
DefaultPage.prototype.build = function(spec) {
	if (this.wrap) return;

	var wrap = document.createElement('article');
	wrap.classList.add('informal__tab', 'informal__tab-default');

	this.wrap = wrap;
};

module.exports = DefaultPage;
