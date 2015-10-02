'use strict';

/**
 * DefaultGroup
 *
 * @param {Object} spec
 */
var DefaultGroup = function(spec) {
	this.spec = spec;
	this.build();
};

/**
 * Build the group
 */
DefaultGroup.prototype.build = function() {
	if (this.wrap) return;

	var wrap = document.createElement('fieldset');
	wrap.classList.add('informal__group');

	if (this.spec.name) {
		var legend = document.createElement('legend');
		legend.classList.add('informal__group-name');
		legend.textContent = this.spec.name;
		wrap.appendChild(legend);
		this.legend = legend;
	}

	this.wrap = wrap;
};

module.exports = DefaultGroup;
