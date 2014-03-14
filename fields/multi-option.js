'use strict';

var indexOf = require('mout/array/indexOf'),
	zen = require('elements/zen'),
	FieldBase = require('./base');

/**
 * @param {Object} spec
 */
var FieldMultiOption = function(spec, value){
	if (!(this instanceof FieldMultiOption)){
		return new FieldMultiOption(spec, value);
	}
	FieldBase.call(this, spec, value);

	this.styles = ['select', 'checkbox'];

	this.style = this.spec.style || 'select';
	if (indexOf(this.styles, this.style) == -1){
		throw new Error('Invalid style selected');
	}
};

FieldMultiOption.prototype = Object.create(FieldBase.prototype);
FieldMultiOption.prototype.constructor = FieldMultiOption;

/**
 *
 */
FieldMultiOption.prototype.build = function(){
	this.wrap = zen('li');
	zen('label').text(this.spec.label || '').insert(this.wrap);

	switch (this.style){
		case 'select': this.buildSelect(); break;
		case 'checkbox': this.buildCheckbox(); break;
	}
};

/**
 *
 */
FieldMultiOption.prototype.buildSelect = function(){
	this.input = zen('select[multiple]').insert(this.wrap);

	if (this.spec.name){
		this.input.attribute('name', this.spec.name + '[]');
	}

	var i, len = this.spec.options.length, opt;
	for (i = 0; i < len; i++){
		opt = this.spec.options[i];
		zen('option').value(opt.value).text(opt.label)
			.selected(indexOf(this.value, opt.value) != -1)
			.insert(this.input);
	}
};

/**
 *
 */
FieldMultiOption.prototype.buildCheckbox = function(){
	var fieldset = zen('fieldset.options').insert(this.wrap),
		ul = zen('ul').insert(fieldset),
		i, len = this.spec.options.length, opt, li;

	for (i = 0; i < len; i++){
		opt = this.spec.options[i];
		li = zen('li').insert(ul);
		zen('input[type=checkbox]').value(opt.value).insert(li);
		zen('label').text(opt.label).insert(li);
	}
};

module.exports = FieldMultiOption;
