'use strict';

/**
 * @param {object} spec
 */
var PagerBase = function(spec){
	this.spec = spec;
};

/**
 *
 */
PagerBase.prototype.attach = function(parent){
	this.build();
	this.wrap.insert(parent);
	return this;
};

module.exports = PagerBase;
