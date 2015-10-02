'use strict';

var forOwn = require('mout/object/forOwn');

/**
 * MultiOptionField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 * @param {Array} spec.options - Options for the multi option field
 * @param {Array} values
 */
var MultiOptionField = function(spec, values) {
	this.spec = spec;
	this.values = values;
	this.build();
};

require('util').inherits(MultiOptionField, require('events').EventEmitter);

/**
 * Build the field
 */
MultiOptionField.prototype.build = function() {
	if (this.wrap) return;

	var wrap = document.createElement('div');
	wrap.classList.add('informal-field');

	if (this.spec.label) {
		var label = document.createElement('label');
		label.textContent = this.spec.label;
		wrap.appendChild(label);

		if (this.spec.style !== 'checkbox') {
			var clearBtn = document.createElement('button');
			clearBtn.type = 'button';
			clearBtn.tabIndex = -1;
			clearBtn.textContent = 'clear selection';
			label.appendChild(clearBtn);
			this.clearBtn = clearBtn;
		}
	}

	var inputWrap = document.createElement('div');
	inputWrap.classList.add('informal-input');
	wrap.appendChild(inputWrap);
	this.inputWrap = inputWrap;

	if (this.spec.style === 'checkbox') {
		this.buildCheckboxes();
	} else {
		this.buildSelect();
	}

	this.wrap = wrap;
	this.setEvents();
};

/**
 *
 */
MultiOptionField.prototype.buildSelect = function() {
	var input = document.createElement('select');
	input.name = this.spec.name;
	input.multiple = true;
	this.inputWrap.appendChild(input);

	if (this.spec.attributes) {
		forOwn(this.spec.attributes, function(value, attribute) {
			input.setAttribute(attribute, value);
		});
	}

	this.input = input;

	this.buildSelectOptions(this.spec.options);
};

/**
 *
 */
MultiOptionField.prototype.buildCheckboxes = function() {
	var fieldset = document.createElement('fieldset');
	fieldset.classList.add('informal-input-options');
	this.inputWrap.appendChild(fieldset);
	this.fieldset = fieldset;

	this.buildCheckboxOptions(this.spec.options);

};

/**
 *
 */
MultiOptionField.prototype.buildOptions = function(options) {
	if (this.spec.style === 'checkbox') {
		this.buildCheckboxOptions(options);
	} else {
		this.buildSelectOptions(options);
	}
};

/**
 *
 */
MultiOptionField.prototype.buildSelectOptions = function(options) {
	if (!options) return;

	this.options = [];

	var opt, option;
	for (var i = 0; i < options.length; i++) {
		opt = options[i];
		option = document.createElement('option');
		option.value = opt.value || opt.label;
		option.textContent = opt.label || opt.value;
		option.selected = this.values && this.values.indexOf(opt.value || opt.label) > -1;
		this.options.push(option);
		this.input.appendChild(option);
	}
};

/**
 *
 */
MultiOptionField.prototype.buildCheckboxOptions = function(options) {
	if (!options) return;

	this.inputs = [];

	var opt, label, input, span;
	for (var i = 0; i < options.length; i++) {
		opt = options[i];
		label = document.createElement('label');

		input = document.createElement('input');
		input.type = 'checkbox';
		input.value = opt.value || opt.label;
		input.checked = this.values && this.values.indexOf(opt.value || opt.label) > -1;
		this.inputs.push(input);

		span = document.createElement('span');
		span.textContent = opt.label || opt.value;

		label.appendChild(input);
		label.appendChild(span);
		this.fieldset.appendChild(label);
	}
};

/**
 * Set events
 */
MultiOptionField.prototype.setEvents = function() {
	var self = this;

	if (self.clearBtn) {
		self.clearBtn.addEventListener('click', function(e) {
			self.clear();
		});
	}

	self.inputWrap.addEventListener('change', function() {
		self.emit('change', self.getValue());
	});
};

/**
 * Clear selection
 */
MultiOptionField.prototype.clear = function() {
	if (this.spec.style === 'checkbox') {
		for (var i = 0; i < this.inputs.length; i++) {
			this.inputs[i].checked = false;
		}
	} else {
		this.input.selectedIndex = -1;
	}

	this.emit('change', []);
};

/**
 * Get current value for field
 *
 * @return {String[]}
 */
MultiOptionField.prototype.getValue = function() {
	var values = [];
	if (this.spec.style === 'checkbox') {
		for (var i = 0; i < this.inputs.length; i++) {
			if (this.inputs[i].checked) {
				values.push(this.inputs[i].value);
			}
		}
	} else {
		for (var i = 0; i < this.options.length; i++) {
			if (this.options[i].selected) {
				values.push(this.options[i].value);
			}
		}
	}

	return values;
};

module.exports = MultiOptionField;
