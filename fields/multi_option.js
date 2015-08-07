'use strict';

/**
 * MultiOptionField
 *
 * @param {String} name
 * @param {Object} spec
 * @param {String} spec.name - Name of the field if you want to change it
 * @param {String} spec.label - The label for the field
 * @param {Array} spec.options - Options for the multi option field
 *
 * @return {MultiOptionField}
 */
var MultiOptionField = function(name, spec){
	if (!(this instanceof MultiOptionField)){
		return new MultiOptionField(spec);
	}

	this.name = name;
	this.spec = spec;
	this.build();
};

/**
 * Build the field
 */
MultiOptionField.prototype.build = function(){
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
	input.name = this.spec.name || this.name;
	input.multiple = true;
	inputWrap.appendChild(input);

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
};

module.exports = MultiOptionField;
