'use strict';

/**
 * @param {Object} spec
 */
var Base = function(spec){
	this.spec = spec;
	this.build();
};

/**
 * Build shared group elements
 */
Base.prototype.build = function(){
	this.wrap = document.createElement('fieldset');
	this.wrap.classList.add('informal--group');

	if (this.spec.name){
		this.legend = document.createElement('legend');
		this.legend.textContent = this.spec.name;
		this.wrap.appendChild(this.legend);
	}
};

module.exports = Base;
