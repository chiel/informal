'use strict';

var indexOf = require('mout/array/indexOf'),
	zen = require('elements/zen'),
	FieldBase = require('./base');

/**
 * @param {Object} spec
 */
var FieldSingleOption = function(spec){
	if (!(this instanceof FieldSingleOption)){
		return new FieldSingleOption(spec);
	}
	FieldBase.call(this, spec);

	this.styles = ['select', 'radio'];

	this.style = this.spec.style || 'select';
	if (indexOf(this.styles, this.style) == -1){
		throw new Error('Invalid style selected');
	}
};

FieldSingleOption.prototype = Object.create(FieldBase.prototype);
FieldSingleOption.prototype.constructor = FieldSingleOption;

/**
 *
 */
FieldSingleOption.prototype.build = function(){
	this.wrap = zen('li');
	zen('label').text(this.spec.label || '').insert(this.wrap);

	switch (this.style){
		case 'select': this.buildSelect(); break;
		case 'radio': this.buildRadio(); break;
	}
};

/**
 *
 */
FieldSingleOption.prototype.buildSelect = function(){
	this.input = zen('select').insert(this.wrap);
	zen('option').value('').text('...').insert(this.input);

	if (this.spec.name){
		this.input.attribute('name', this.spec.name);
	}

	var i, len = this.spec.options.length, opt;
	for (i = 0; i < len; i++){
		opt = this.spec.options[i];
		zen('option').value(opt.value).text(opt.label).insert(this.input);
	}
};

/**
 *
 */
FieldSingleOption.prototype.buildRadio = function(){
	var fieldset = zen('fieldset.options').insert(this.wrap),
		ul = zen('ul').insert(fieldset),
		i, len = this.spec.options.length, opt, li;

	for (i = 0; i < len; i++){
		opt = this.spec.options[i];
		li = zen('li').insert(ul);
		zen('input[type=radio]').attribute('name', this.spec.name).value(opt.value).insert(li);
		zen('label').text(opt.label).insert(li);
	}
};

module.exports = FieldSingleOption;
