'use strict';

var prime = require('prime'),
	indexOf = require('mout/array/indexOf'),
	zen = require('elements/zen'),
	FieldBase = require('./base');

var FieldMultiOption = prime({
	inherits: FieldBase,

	constructor: function(spec, value){
		if (!(this instanceof FieldMultiOption)){
			return new FieldMultiOption(spec, value);
		}
		FieldBase.call(this, spec, value);

		this.styles = ['select', 'checkbox'];

		this.style = this.spec.style || 'select';
		if (indexOf(this.styles, this.style) == -1){
			throw new Error('Invalid style selected');
		}

		if (!this.value) this.value = [];
	},

	build: function(){
		this.wrap = zen('li');
		zen('label').text(this.spec.label || '').insert(this.wrap);

		switch (this.style){
			case 'select': this.buildSelect(); break;
			case 'checkbox': this.buildCheckbox(); break;
		}
	},

	buildSelect: function(){
		this.input = zen('select[multiple]').insert(this.wrap);

		if (this.spec.name){
			this.input.attribute('name', this.spec.name + '[]');
		}

		if (!this.spec.options || !this.spec.options.length) return;

		var i, len = this.spec.options.length, opt;
		for (i = 0; i < len; i++){
			opt = this.spec.options[i];
			zen('option').value(opt.value).text(opt.label || opt.value)
				.selected(indexOf(this.value, opt.value) != -1)
				.insert(this.input);
		}
	},

	buildCheckbox: function(){
		var fieldset = zen('fieldset.options').insert(this.wrap),
			ul = zen('ul').insert(fieldset);

		if (!this.spec.options || !this.spec.options.length) return;

		var i, len = this.spec.options.length, opt, li, input;
		for (i = 0; i < len; i++){
			opt = this.spec.options[i];
			li = zen('li').insert(ul);
			input = zen('input[type=checkbox]').value(opt.value)
				.checked(indexOf(this.value, opt.value) != -1)
				.insert(li);
			if (this.spec.name){
				input.attribute('name', this.spec.name + '[]');
			}
			zen('label').text(opt.label || opt.value).insert(li);
		}
	}
});

module.exports = FieldMultiOption;
