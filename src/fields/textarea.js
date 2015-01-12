'use strict';

var Base = require('./base');

/**
 * Textarea
 * @param {Object} spec
 * @param {String} value
 */
var Textarea = function(spec, value){
	if (!(this instanceof Textarea)) return new Textarea(spec, value);
	this.tag = 'textarea';
	Base.call(this, spec, value);
};

require('inherits')(Textarea, Base);

/**
 * Textfield specific
 */
Textarea.prototype.build = function(){
	Base.prototype.build.call(this);
	this.input.value = this.value || this.spec.value || '';
};

module.exports = Textarea;
