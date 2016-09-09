'use strict';

var Base = require('./base');

/**
 * Bool input
 * @param {Object} spec
 * @param {String} value
 */
var Bool = function(spec, value){
	if (!(this instanceof Bool)) return new Bool(spec, value);
	Base.call(this, spec, value);
};

require('inherits')(Bool, Base);

/**
 * Bool specific
 */
Bool.prototype.build = function(){
	Base.prototype.build.call(this);
	this.input.setAttribute('type', 'checkbox');
	if ((this.value || this.spec.value)){
		this.input.setAttribute('checked', true);
	}
};

/**
 * Get boolean field value
 */
Bool.prototype.getValue = function(){
	return !!this.input.checked;
};

module.exports = Bool;
