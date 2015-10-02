'use strict';

/**
 * DefaultTab
 *
 * @param {Object} spec
 */
var DefaultTab = function(spec) {
	this.build(spec);
};

/**
 * Build the page
 *
 * @param {Object} spec
 */
DefaultTab.prototype.build = function(spec) {
	if (this.wrap) return;

	var wrap = document.createElement('article');
	wrap.classList.add('informal__tab', 'informal__tab-default');

	this.wrap = wrap;
};

module.exports = DefaultTab;
