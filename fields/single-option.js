'use strict';

var prime = require('prime'),
	forOwn = require('prime/object/forOwn'),
  indexOf = require('prime/array/indexOf'),
	FieldBase = require('./base'),
	zen = require('elements/zen'),
	$ = require('./../elements');

/**
 *
 */
var FieldSingleOption = prime({
	inherits: FieldBase,

	styles: ['select', 'radio'],

	/**
	 * @param {Element} root
	 * @param {Object} spec
	 */
	constructor: function(root, spec){
    if (!(this instanceof FieldSingleOption)){
			return new FieldSingleOption(root, spec);
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

		this.wrap = zen('li');
		zen('label').text(this.spec.label || '').insert(this.wrap);

		switch (this.style){
			case 'select': this.buildSelect(); break;
			case 'radio': this.buildRadio(); break;
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
		this.input = zen('select').insert(this.wrap);

		var i, opt,
			option = zen('option').value('').text('...').insert(this.input);
		for (i = 0; i < this.spec.options.length; i++){
			opt = this.spec.options[i];
			option = zen('option').value(opt.value).text(opt.text).insert(this.input);
			if (this.spec.value && this.spec.value == opt.value){
				option.attribute('selected', true);
			}
		}

		if (this.spec.name){
			this.input.attribute('name', this.spec.name);
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
	 * Build radio-style inputs
	 */
	buildRadio: function(){
		var inputs = [],
			fieldset = zen('fieldset.options').insert(this.wrap),
			ul = zen('ul').insert(fieldset),
			i, opt, li, option,
			applyAttribute = function(value, key){
				option.attribute(key, value);
			}.bind(this);

		for (i = 0; i < this.spec.options.length; i++){
			opt = this.spec.options[i];
			li = zen('li').insert(ul);
			option = zen('input[type=radio]').insert(li);
			zen('label').text(opt.text).insert(li);

			if (this.spec.name){
				option.attribute('name', this.spec.name);
			}
			if (this.spec.value && this.spec.value == opt.value){
				option.attribute('checked', true);
			}
			if (this.spec.required){
				option.attribute('required', true);
			}
			if (this.spec.attributes){
				forOwn(this.spec.attributes, applyAttribute);
			}
		}

		this.input = $(inputs);
	}
});

module.exports = FieldSingleOption;

