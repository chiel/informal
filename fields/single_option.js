'use strict';

var prime = require('prime'),
	indexOf = require('mout/array/indexOf'),
	zen = require('elements/zen'),
	FieldBase = require('./base');

require('elements/attributes');

var FieldSingleOption = prime({
	inherits: FieldBase,

	constructor: function(spec, value){
		if (!(this instanceof FieldSingleOption)){
			return new FieldSingleOption(spec, value);
		}
		FieldBase.call(this, spec, value);

		this.styles = ['select', 'radio'];

		this.style = this.spec.style || 'select';
		if (indexOf(this.styles, this.style) == -1){
			throw new Error('Invalid style selected');
		}
	},

	build: function(){
		this.wrap = zen('li');
		zen('label').text(this.spec.label || '').insert(this.wrap);

		switch (this.style){
			case 'select': this.buildSelect(); break;
			case 'radio': this.buildRadio(); break;
		}
	},

	buildSelect: function(){
		this.input = zen('select').insert(this.wrap);
		zen('option').value('').text('...').insert(this.input);

		if (this.spec.name){
			this.input.attribute('name', this.spec.name);
		}

		if (!this.spec.options || !this.spec.options.length) return;

		var i, len = this.spec.options.length, opt;
		for (i = 0; i < len; i++){
			opt = this.spec.options[i];
			zen('option').value(opt.value).text(opt.label || opt.value)
				.selected(opt.value == this.value)
				.insert(this.input);
		}
	},

	buildRadio: function(){
		var fieldset = zen('fieldset.options').insert(this.wrap),
			ul = zen('ul').insert(fieldset);

		if (!this.spec.options || !this.spec.options.length) return;

		var i, len = this.spec.options.length, opt, li;
		for (i = 0; i < len; i++){
			opt = this.spec.options[i];
			li = zen('li').insert(ul);
			zen('input[type=radio]').attribute('name', this.spec.name).value(opt.value).insert(li);
			zen('label').text(opt.label || opt.value).insert(li);
		}
	}
});

module.exports = FieldSingleOption;
