'use strict';

/**
 * DefaultGroup
 *
 * @param {Object} spec
 */
var DefaultGroup = function(spec) {
	this.build(spec);
};

/**
 * Build the group
 *
 * @param {Object} spec
 */
DefaultGroup.prototype.build = function(spec) {
	if (this.wrap) return;

	var wrap = document.createElement('fieldset');
	wrap.classList.add('informal__group');

	if (spec.name) {
		var legend = document.createElement('legend');
		legend.classList.add('informal__group-name');
		legend.textContent = spec.name;
		wrap.appendChild(legend);
		this.legend = legend;
	}

	this.wrap = wrap;
};

module.exports = DefaultGroup;
