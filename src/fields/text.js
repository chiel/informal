'use strict';

var Base = require('./base');

/**
 * Text input
 * @param {Object} spec
 * @param {String} value
 */
var Text = function(spec, value){
	if (!(this instanceof Text)) return new Text(spec, value);
	Base.call(this, spec, value);
};

require('inherits')(Text, Base);

/**
 * Textfield specific
 */
Text.prototype.build = function(){
	Base.prototype.build.call(this);
	this.input.setAttribute('type', this.spec.type);
	this.input.value = this.value || this.spec.value || '';
};

module.exports = Text;
