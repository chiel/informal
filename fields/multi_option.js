'use strict';

var forOwn = require('mout/object/forOwn');

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

	var clearBtn = document.createElement('button');
	clearBtn.type = 'button';
	clearBtn.tabIndex = -1;
	clearBtn.textContent = 'clear selection';
	label.appendChild(clearBtn);
	this.clearBtn = clearBtn;

	var inputWrap = document.createElement('div');
	inputWrap.classList.add('informal-input');
	wrap.appendChild(inputWrap);

	var input = document.createElement('select');
	input.name = this.spec.name || this.name;
	input.multiple = true;
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
MultiOptionField.prototype.setEvents = function(){
	var self = this;

	self.clearBtn.addEventListener('click', function(e){
		self.clear();
	});
};

/**
 * Clear selection
 */
MultiOptionField.prototype.clear = function(){
	this.input.selectedIndex = -1;
};

module.exports = MultiOptionField;
