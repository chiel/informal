'use strict';

var prime = require('prime'),
	forOwn = require('prime/object/forOwn'),
	FieldBase = require('./base'),
	zen = require('elements/zen');

require('./../elements');

/**
 *
 */
var FieldText = prime({
	inherits: FieldBase,

	/**
	 * @param {Element} root
	 * @param {Object} spec
	 */
	constructor: function(root, spec){
		if (!(this instanceof FieldText)){
			return new FieldText(root, spec);
		}
		FieldBase.call(this, root, spec);
	},

	/**
	 *
	 */
	build: function(){
		this.wrap = zen('li');
		zen('label').text(this.spec.label || '').insert(this.wrap);
		this.input = zen('input').insert(this.wrap);

		if (this.spec.name){
			this.input.attribute('name', this.spec.name);
		}
		if (this.spec.value){
			this.input.value(this.spec.value);
		}
		if (this.spec.required && this.spec.required === true){
			this.input.attribute('required', true);
		}
		if (this.spec.attributes){
			forOwn(this.spec.attributes, function(value, key){
				this.input.attribute(key, value);
			}.bind(this));
		}
		if (this.spec.triggers){
			this.input.on('input', this.checkTriggers.bind(this));
			this.checkTriggers();
		}

		this.wrap.insert(this.root);
	}
});

module.exports = FieldText;

