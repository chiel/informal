'use strict';

var prime = require('prime'),
	bind = require('mout/function/bind'),
	isArray = require('mout/lang/isArray'),
	isObject = require('mout/lang/isObject'),
	$ = require('elements'),
	zen = require('elements/zen'),
	pageTypes = require('./pages');

require('elements/attributes');
require('elements/delegation');
require('elements/insertion');
require('elements/traversal');

var Form = prime({
	/**
	 * @param {object} pages
	 * @param {object} data
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

		this.pages = {};
		this.spec = spec;
		this.data = data || {};
		this.pageCount = this.spec.pages.length;

		this.spec.method = this.spec.method || 'get';
		this.spec.action = this.spec.action || '#';
		this.spec.attributes = this.spec.attributes || {};

	},

	/**
	 * Build up required elements for the base form
	 */
	build: function(){
		if (this.wrap) return;
		this.wrap = zen('form.informal')
			.attribute('method', this.spec.method)
			.attribute('action', this.spec.action);
		this.pageContainer = zen('div.pages').insert(this.wrap);

		if (this.pageCount > 1){
			this.activePage = -1;
			this.showPage(0);
		}
	},

	/**
	 *
	 */
	},

	/**
	 * Attach the form to a dom node
	 * @param {element} parent
	 */
	attach: function(parent){
		this.build();
		this.wrap.insert(parent);
	},

	/**
	 * Show a page by index
	 * @param {number} index
	 */
	showPage: function(index){
		index = parseInt(index, 0);
		if (isNaN(index) || !this.spec.pages[index] || index == this.activepage) return;

		if (!(index in this.pages)) {
			var spec = this.spec.pages[index], page;
			spec.type = spec.type || 'default';
			page = new (pageTypes.fetch(spec.type))(spec, this.data);
			page.attach(this.pageContainer);
			this.pages[index] = page;
		}

		if (this.activePage > -1) {
			this.hidePage(this.activePage);
		}

		this.pages[index].show();
		this.activePage = index;
	},

	/**
	 * Hide a page by index
	 * @param {number} index
	 */
	hidePage: function(index){
		index = parseInt(index, 0);
		if (isNaN(index) || !(index in this.pages)) return;

		this.pages[index].hide();
	}
});

module.exports = Form;
