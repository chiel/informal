'use strict';

var prime = require('prime'),
	isArray = require('mout/lang/isArray'),
	isObject = require('mout/lang/isObject'),
	pageTypes = require('./pages');

var Form = prime({
	/**
	 * @param {Object} pages
	 * @param {Object} data
	 */
	constructor: function(spec, data){
		if (!(this instanceof Form)){
			return new Form(spec);
		}

		if (!isObject(spec)){
			throw new Error('Spec needs to be an object');
		}

		if (!isArray(spec.pages)){
			throw new Error('No pages found in spec');
		}

		this.pages = [];
		this.spec = spec;
		this.data = data || {};
		this.pageCount = this.spec.pages.length;

		this.spec.method = this.spec.method || 'get';
		this.spec.action = this.spec.action || '#';
		this.spec.attributes = this.spec.attributes || {};

		this.createPages();
	},

	/**
	 *
	 */
	createPages: function(){
		var i, pageSpec;
		for (i = 0; i < this.pageCount; i++){
			pageSpec = this.spec.pages[i];
			pageSpec.type = pageSpec.type || 'default';
			this.pages.push(new (pageTypes.fetch(pageSpec.type))(pageSpec, this.data));
		}
	},

	/**
	 *
	 */
	isValid: function(){
		for (var i = 0; i < this.pageCount; i++){
			if (!this.pages[i].isValid()){
				return false;
			}
		}
		return true;
	},

	/**
	 *
	 */
	pagesToHTML: function(){
		var html = '', i;
		for (i = 0; i < this.pageCount; i++){
			html += this.pages[i].toHTML();
		}
		return html;
	},

	/**
	 *
	 */
	toHTML: function(){
		var html = '<form method="' + this.spec.method + '"';
		html += ' action="' + this.spec.action + '"';
		if (this.spec.attributes.classes){
			html += ' class="' + this.spec.attributes.classes.join(' ') + '"';
		}
		html += '>';
		html += this.pagesToHTML();
		html += '<input type="submit" value="Save">';
		html += '</form>';
		return html;
	}

});

module.exports = Form;
