'use strict';

/**
 * DefaultGroup
 *
 * @param {Object} spec
 *
 * @return {DefaultGroup}
 */
var DefaultGroup = function(spec){
	if (!(this instanceof DefaultGroup)){
		return new DefaultGroup(spec);
	}

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
