'use strict';

var bind = require('mout/function/bind'),
	forOwn = require('mout/object/forOwn'),
	isArray = require('mout/lang/isArray'),
	isObject = require('mout/lang/isObject'),
	delve = require('delve'),
	$ = require('elements'),
	zen = require('elements/zen'),
	pageTypes = require('./pages'),
	pagerTypes = require('./pagers'),
	groupTypes = require('./groups'),
	fieldTypes = require('./fields');

require('elements/attributes');
require('elements/delegation');
require('elements/insertion');
require('elements/traversal');

/**
 * @param {object} pages
 * @param {object} data
 */
var Form = function(spec, data){
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
	this.groups = {};
	this.fields = {};
	this.spec = spec;
	this.data = data || {};
	this.pageCount = this.spec.pages.length;

	this.spec.method = this.spec.method || 'get';
	this.spec.action = this.spec.action || '#';
	this.spec.attributes = this.spec.attributes || {};

	this.spec.pager = this.spec.pager || {};
	this.spec.pager.position = this.spec.pager.position || 'bottom';
	this.spec.pager.type = this.spec.pager.type || 'default';
};

/**
 * Build up required elements for the base form
 */
Form.prototype.build = function(){
	if (this.wrap) return;
	this.wrap = zen('form.informal')
		.attribute('method', this.spec.method)
		.attribute('action', this.spec.action);
	this.pageContainer = zen('div.pages').insert(this.wrap);

	if (this.pageCount > 1){
		this.buildPager();
		this.activePage = -1;
	}

	this.showPage(0);
};

/**
 * Build up required elements for pagination
 */
Form.prototype.buildPager = function(){
	var activeTab;
	this.pagerWrap = zen('nav.nav-pager.type-' + this.spec.pager.type + '.position-' + this.spec.pager.position);
	this.pagerWrap.delegate('click', 'li', bind(function(e, el){
		e.preventDefault();
		activeTab.removeClass('active');
		el.addClass('active');
		activeTab = el;
		this.showPage(el.data('index'));
	}, this));

	this.pager = new (pagerTypes.fetch(this.spec.pager.type))(this.spec, this.data);
	this.pager.attach(this.pagerWrap);

	activeTab = $(this.pagerWrap.search('li')[0]);
	activeTab.addClass('active');

	var method = this.spec.pager.position == 'top' ? 'before' : 'after';
	this.pagerWrap[method](this.pageContainer);
};

/**
 * Attach the form to a dom node
 * @param {element} parent
 */
Form.prototype.attach = function(parent){
	this.build();
	this.wrap.insert(parent);
};

/**
 * Build group by index
 * @param {number} index
 */
Form.prototype.buildPage = function(index){
	var spec = this.spec.pages[index], page, i, group;
	spec.type = spec.type || 'default';
	page = new (pageTypes.fetch(spec.type))(spec);

	for (i = 0; i < spec.groups.length; i++){
		group = this.buildGroup(spec.groups[i]);
		page.appendGroup(group);
	}

	this.pages[index] = page;
	return page;
};

/**
 * Build group by name
 * @param {string} name
 */
Form.prototype.buildGroup = function(name){
	var spec = this.spec.groups[name], group, i, field;
	spec.type = spec.type || 'default';
	group = new (groupTypes.fetch(spec.type))(spec);

	for (i = 0; i < spec.fields.length; i++){
		field = this.buildField(spec.fields[i]);
		group.appendField(field);
	}

	this.groups[name] = group;
	return group;
};

/**
 * Build a field by name
 * @param {string} name
 */
Form.prototype.buildField = function(name){
	var spec = this.spec.fields[name], field,
		fieldName = spec.name.replace('][', '.').replace('[', '.').replace(/\]$/, '');
	field = new (fieldTypes.fetch(spec.type))(spec, delve(this.data, fieldName));
	this.fields[name] = field;
	return field;
};

/**
 * Show a page by index
 * @param {number} index
 */
Form.prototype.showPage = function(index){
	index = parseInt(index, 0);
	if (isNaN(index) || !this.spec.pages[index] || index == this.activepage) return;

	if (!(index in this.pages)) {
		var page = this.buildPage(index);
		page.attach(this.pageContainer);
	}

	if (this.activePage > -1) {
		this.hidePage(this.activePage);
	}

	this.pages[index].show();
	this.activePage = index;
};

/**
 * Hide a page by index
 * @param {number} index
 */
Form.prototype.hidePage = function(index){
	index = parseInt(index, 0);
	if (isNaN(index) || !(index in this.pages)) return;

	this.pages[index].hide();
};

module.exports = Form;
