'use strict';

/**
 * Field base
 * @param {Object} spec
 * @param {Mixed} value
 * @param {Object} subValues
 */
var Base = function(spec, value, subValues){
	if (!(this instanceof Base)) return new Base(spec, value, subValues);
	this.spec = spec;
	this.value = value;
	this.subValues = subValues;
	this.tag = this.tag || 'input';
	this.build();
	this.setEvents();
};

require('inherits')(Base, require('events').EventEmitter);

/**
 * Build shared elements
 */
Base.prototype.build = function(){
	this.wrap = document.createElement('div');
	this.wrap.classList.add('informal--field');
	this.wrap.classList.add('informal--type-' + this.spec.type);

	var label = document.createElement('label');
	this.input = document.createElement(this.tag);

	if (this.spec.label){
		label.innerHTML = this.spec.label;
		
		if(this.spec.tip) {
			label.dataset.tip = this.spec.tip;
		}
	}

	this.setAttributes(this.input, this.spec.attributes);
	this.input.setAttribute('name', this.spec.name);

	if (this.spec.required === true){
		this.input.setAttribute('required', true);
	}

	this.wrap.appendChild(label);
	this.wrap.appendChild(this.input);
};

/**
 * Apply given attributes to given element
 * @param {Element} element
 * @param {Object} attributes
 */
Base.prototype.setAttributes = function(element, attributes){
	if (!attributes) return;

	for (var attribute in this.spec.attributes){
		if (this.spec.attributes.hasOwnProperty(attribute)){
			this.input.setAttribute(attribute, this.spec.attributes[attribute]);
		}
	}
};

/**
 * Add events to the input
 */
Base.prototype.setEvents = function(){
	if (!this.input || !this.input.addEventListener) return;

	var self = this;
	this.input.addEventListener('input', function(){
		self.emit('change', self.getValue());
	});
};

/**
 * Get this field's value
 * @return {String}
 */
Base.prototype.getValue = function(){
	return this.input ? this.input.value : undefined;
};

/**
 * Clear the field's value
 */
Base.prototype.clear = function(){
	this.input.value = '';
	this.emit('change', '');
};

module.exports = Base;
