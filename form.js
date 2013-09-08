'use strict';

var type = require('prime/type'),
	pageTypes = require('./pages'),
	PageBase = require('./pages/base'),
	zen = require('elements/zen');

require('./elements');

/**
 * Create a new form
 * @param {Array} pages
 */
var Form = function(root, spec){
	if (!(this instanceof Form)){
		return new Form(root, spec);
	}

	if (type(spec) != 'object'){
		throw new Error('pages needs to be an array');
	}

	this.root = root;
	this.spec = spec;
	this.pages = {};
	this.pageCount = this.spec.pages.length;

	this.build();

	if (this.pageCount > 1){
		this.buildPaging();
		this.activePage = -1;
		this.showPage(0);
	}
};

/**
 * Add a new page to the form
 * @param {Object} page
 */
Form.prototype.addPage = function(page){
	if (!(page instanceof PageBase)){
		throw new Error('page needs to extend PageBase');
	}
	this.pages.push(page);
};

/**
 * Build up the form elements
 */
Form.prototype.build = function(){
	this.wrap = zen('form')
		.attribute('method', this.spec.method || 'post')
		.attribute('action', this.spec.action || '#');
	this.pageContainer = this.wrap;
};

/**
 * Build up page navigation
 */
Form.prototype.buildPaging = function(){
	var i, html = '<ul><li><a href="#prev">Previous</a></li>';
	for (i = 0; i < this.pageCount; i++){
		html += '<li><a href="#' + i + '">' + (i + 1) + '</a></li>';
	}
	html += '<li><a href="#next">Next</a></li></ul>';
	this.paging = zen('nav').html(html).insert(this.root);

	this.paging.delegate('click', 'a', function(e, el){
		e.preventDefault();
		var index = el.attribute('href').replace(/^[^#]*#/, '');
		switch (index){
			case 'next': this.showPage(this.activePage + 1); break;
			case 'prev': this.showPage(this.activePage - 1); break;
			default: this.showPage(index);
		}
	}.bind(this));
};

/**
 * Show page by index
 * @param {Number} index
 */
Form.prototype.showPage = function(index){
	index = parseInt(index, 0);
	if (type(index) != 'number') {
		return;
	}

	if (index < 0 || index > (this.pageCount - 1)) {
		return;
	}

	if (!(index in this.pages)) {
		var pageSpec = this.spec.pages[index];
		this.pages[index] = new (pageTypes.fetch(pageSpec.type))(this.pageContainer, pageSpec);
	}

	if (this.activePage >= 0) {
		this.hidePage(this.activePage);
	}

	this.pages[index].show();
	this.activePage = index;
};

/**
 * Hide page by index
 * @param {Number} index
 */
Form.prototype.hidePage = function(index){
	index = parseInt(index, 0);
	if (type(index) != 'number') {
		return;
	}

	if (!(index in this.pages)) {
		return;
	}

	this.pages[index].hide();
};

/**
 *
 */
Form.prototype.attach = function(){
	this.wrap.insert(this.root);
};

module.exports = Form;

