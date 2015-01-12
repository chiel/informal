'use strict';

/**
 * @param {Object} spec
 */
var Base = function(spec){
	this.spec = spec;
	this.build();
};

/**
 * Build shared page elements
 */
Base.prototype.build = function(){
	this.wrap = document.createElement('div');
	this.wrap.classList.add('informal--page');
};

/**
 * Hide this page
 */
Base.prototype.hide = function(){
	this.wrap.style.display = 'none';
};

/**
 * Show this page
 */
Base.prototype.show = function(){
	this.wrap.style.display = 'block';
};

module.exports = Base;
