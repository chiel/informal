'use strict';

var forOwn = require('mout/object/forOwn');

/**
 * TextareaField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 * @param {Boolean} spec.expand - Whether you want the field to expand when a user types in it
 */
var TextareaField = function(spec) {
	this.spec = spec;
	this.build();
};

/**
 * Build the field
 */
TextareaField.prototype.build = function() {
	if (this.wrap) return;

	var wrap = document.createElement('div');
	wrap.classList.add('informal__field');

	if (this.spec.label) {
		var label = document.createElement('label');
		label.classList.add('informal__label');
		label.textContent = this.spec.label;
		wrap.appendChild(label);
	}

	var inputWrap = document.createElement('div');
	inputWrap.classList.add('informal__input');
	wrap.appendChild(inputWrap);

	var input = document.createElement('textarea');
	input.name = this.spec.name || this.name;

	if (this.spec.expand) {
		var expandWrap = document.createElement('div');
		expandWrap.classList.add('informal__input-textarea_expandable');
		var pre = document.createElement('pre');
		var span = document.createElement('span');
		pre.appendChild(span);
		pre.appendChild(document.createElement('br'));
		expandWrap.appendChild(input);
		expandWrap.appendChild(pre);
		inputWrap.appendChild(expandWrap);

		input.addEventListener('input', function() {
			span.textContent = input.value;
		});
	} else {
		inputWrap.appendChild(input);
	}

	if (this.spec.attributes) {
		forOwn(this.spec.attributes, function(value, attribute) {
			input.setAttribute(attribute, value);
		});
	}

	this.inputWrap = inputWrap;
	this.input = input;
	this.wrap = wrap;
};

module.exports = TextareaField;
