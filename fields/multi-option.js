'use strict';

var prime = require('prime'),
	type = require('prime/type'),
	forOwn = require('prime/object/forOwn'),
  indexOf = require('prime/array/indexOf'),
	FieldBase = require('./base'),
	zen = require('elements/zen'),
	$ = require('./../elements');

/**
 *
 */
var FieldMultiOption = prime({
	inherits: FieldBase,

	styles: ['select', 'checkbox'],

	/**
	 * @param {Element} root
	 * @param {Object} spec
	 */
	constructor: function(root, spec){
    if (!(this instanceof FieldMultiOption)){
			return new FieldMultiOption(root, spec);
		}
		FieldBase.call(this, root, spec);
	},

	/**
	 *
	 */
	build: function(){
		this.style = this.spec.style || 'select';
		if (indexOf(this.styles, this.style) == -1){
			throw new Error('Invalid style selected');
		}

		if (this.spec.value && type(this.spec.value) != 'array'){
			this.spec.value = [this.spec.value];
		}

		this.wrap = zen('li');
		zen('label').text(this.spec.label || '').insert(this.wrap);

		switch (this.style){
			case 'select': this.buildSelect(); break;
			case 'checkbox': this.buildCheckbox(); break;
		}

		// if (this.spec.triggers){
		// 	this.input.on('input', this.checkTriggers.bind(this));
		// 	this.checkTriggers();
		// }

		this.wrap.insert(this.root);
	},

	/**
	 * Build select-style input
	 */
	buildSelect: function(){
		this.input = zen('select[multiple=true]').insert(this.wrap);

		var i, opt, option;
		for (i = 0; i < this.spec.options.length; i++){
			opt = this.spec.options[i];
			option = zen('option').value(opt.value).text(opt.text).insert(this.input);
			if (this.spec.value && indexOf(this.spec.value, opt.value) != -1){
				option.attribute('selected', true);
			}
		}

		if (this.spec.name){
			this.input.attribute('name', this.spec.name + '[]');
		}
		if (this.spec.required && this.spec.required === true){
			this.input.attribute('required', true);
		}
		if (this.spec.attributes){
			forOwn(this.spec.attributes, function(value, key){
				this.input.attribute(key, value);
			}.bind(this));
		}
	},

	/**
	 * Build checkbox-style inputs
	 */
	buildCheckbox: function(){
		var inputs = [],
			fieldset = zen('fieldset.options').insert(this.wrap),
			ul = zen('ul').insert(fieldset),
			i, opt, li, option;

		for (i = 0; i < this.spec.options.length; i++){
			opt = this.spec.options[i];
			li = zen('li').insert(ul);
			option = zen('input[type=checkbox]').insert(li);
			zen('label').text(opt.text).insert(li);

			if (this.spec.name){
				option.attribute('name', this.spec.name + '[]');
			}
			if (this.spec.value && indexOf(this.spec.value, opt.value) != -1){
				option.attribute('checked', true);
			}
			if (this.spec.required){
				option.attribute('required', true);
			}
		}

		if (this.spec.attributes){
			forOwn(this.spec.attributes, function(value, key){
				fieldset.attribute(key, value);
			}.bind(this));
		}

		this.input = $(inputs);
	}
});

module.exports = FieldMultiOption;

