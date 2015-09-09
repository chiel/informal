'use strict';

/**
 * DefaultGroup
 *
 * @param {Object} spec
 */
var DefaultGroup = function(spec){
	this.build(spec);
};

/**
 * Build the group
 *
 * @param {Object} spec
 */
DefaultGroup.prototype.build = function(spec){
	if (this.wrap) return;

	var wrap = document.createElement('fieldset');
	wrap.classList.add('informal-group');

	var legend = document.createElement('legend');
	legend.textContent = spec.name;
	wrap.appendChild(legend);

	this.wrap = wrap;
};

module.exports = DefaultGroup;
