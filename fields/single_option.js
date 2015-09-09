'use strict';

var forOwn = require('mout/object/forOwn');

/**
 * SingleOptionField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 * @param {Array} spec.options - Options for the single option field
 *
 * @return {SingleOptionField}
 */
var SingleOptionField = function(spec){
	if (!(this instanceof SingleOptionField)){
		return new SingleOptionField(spec);
	}

	this.spec = spec;
	this.build();
};

require('util').inherits(SingleOptionField, require('events').EventEmitter);

/**
 * Build the field
 */
SingleOptionField.prototype.build = function(){
	if (this.wrap) return;

	var wrap = document.createElement('div');
	wrap.classList.add('informal-field');

	var label = document.createElement('label');
	label.textContent = this.spec.label;
	wrap.appendChild(label);

	var inputWrap = document.createElement('div');
	inputWrap.classList.add('informal-input');
	wrap.appendChild(inputWrap);

	var input = document.createElement('select');
	input.name = this.spec.name;
	inputWrap.appendChild(input);

	if (this.spec.attributes){
		forOwn(this.spec.attributes, function(value, attribute){
			input.setAttribute(attribute, value);
		});
	}

	if (this.spec.options){
		var opt;
		var option;
		for (var i = 0; i < this.spec.options.length; i++){
			opt = this.spec.options[i];
			option = document.createElement('option');
			option.value = opt.value || opt.label;
			option.textContent = opt.label || opt.value;
			input.appendChild(option);
		}
	}

	this.input = input;
	this.wrap = wrap;
	this.setEvents();
};


/**
 * Set events
 */
SingleOptionField.prototype.setEvents = function(){
	var self = this;

	self.input.addEventListener('change', function(){
		self.emit('change', self.input.value);
	});
};

module.exports = SingleOptionField;
