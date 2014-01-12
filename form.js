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

		this.spec = spec;
		this.data = data;
		this.pageCount = this.spec.pages.length;

		this.spec.method = this.spec.method || 'get';
		this.spec.action = this.spec.action || '#';
		this.spec.attributes = this.spec.attributes || {};
	},

	/**
	 *
	 */
	pagesToHTML: function(){
		var html = '', i, pageSpec, page;
		for (i = 0; i < this.pageCount; i++){
			pageSpec = this.spec.pages[i];
			page = new (pageTypes.fetch(pageSpec.type))(pageSpec);
			html += page.toHTML();
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

