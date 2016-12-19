'use strict';

var Base = require('./base');

/**
 * Text input
 * @param {Object} spec
 * @param {String} value
 */
var Text = function(spec, value, subValues){
	if (!(this instanceof Text)) return new Text(spec, value);
	Base.call(this, spec, value);
	this.subValues = subValues;
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

Text.prototype.notify = function(field, value) {
	if(!this.spec.subscribe) return;
	var subscriptions = typeof this.spec.subscribe === 'string' ? [this.spec.subscribe] : this.spec.subscribe;
	var subValues = this.subValues;
	var glue = this.spec['joinWith'] || ' ';
	var reg = new RegExp('^(' + glue + ')+$');
	var old = subscriptions.map( function(sub){ return subValues[sub] } ).join(glue);

	if(this.input.value !== old.replace(reg, '')) return;

	subValues[field] = value;

	this.input.value = subscriptions.map( function(sub){ return subValues[sub] } ).join(glue);
}

module.exports = Text;
