'use strict';

var get = require('mout/object/get');
var isArray = require('mout/lang/isArray');
var isObject = require('mout/lang/isObject');
var map = require('mout/array/map');

/**
 * Form
 *
 * @param {Object} spec
 *
 * @return {Form}
 */
var Form = function(spec, data){
	if (!(this instanceof Form)){
		return new Form(spec);
	}

	this.spec = spec;
	this.data = data || {};
	this.tabs = [];
	this.build(this.spec.tabs);
	this.current = -1;
	this.showTab(0);
};

require('util').inherits(Form, require('events').EventEmitter);

/**
 * Build the form
 *
 * @param {[Object]} tabs
 */
Form.prototype.build = function(tabs){
	var wrap = document.createElement('div');
	wrap.classList.add('informal');

	if (tabs.length > 1){
		var header = document.createElement('header');
		header.classList.add('informal-header');

		var tabWrap = this.buildTabs(map(tabs, function(tab, index){
			return tab.name || index;
		}));
		header.appendChild(tabWrap);
		wrap.appendChild(header);
	}

	var tab;
	for (var i = 0; i < tabs.length; i++){
		tab = this.buildTab(tabs[i]);
		this.tabs.push(tab);
		wrap.appendChild(tab.wrap);
	}

	this.wrap = wrap;
};

/**
 * Build objects
 *
 * @param {Array} objects
 * @param {DOMNode} wrap
 */
Form.prototype.buildObjects = function(objects, wrap){
	var object;
	var group;
	var field;
	var fieldGroup;

	for (var i = 0; i < objects.length; i++){
		object = objects[i];

		// groups
		if (object.objects){
			group = this.buildGroup(object);
			wrap.appendChild(group.wrap);
			continue;
		}

		// field groups
		if (isArray(object)){
			fieldGroup = this.buildFieldGroup(object);
			wrap.appendChild(fieldGroup);
			continue;
		}

		// regular fields
		field = this.buildField(object, this.spec.fields[object]);
		wrap.appendChild(field.wrap);
	}
};

/**
 * Build tabs
 *
 * @param {[String]} tabs
 */
Form.prototype.buildTabs = function(tabs){
	var wrap = document.createElement('nav');
	wrap.classList.add('informal-tabs');
	wrap.classList.add('btn-group');

	this.tabButtons = [];

	var self = this;
	wrap.addEventListener('click', function(e){
		self.showTab(e.target.dataset.index);
	});

	var btn;
	for (var i = 0; i < tabs.length; i++){
		btn = document.createElement('button');
		btn.type = 'button';
		btn.classList.add('btn');
		btn.dataset.index = i;
		btn.textContent = tabs[i];
		this.tabButtons.push(btn);
		wrap.appendChild(btn);
	}

	return wrap;
};

/**
 * Build a tab
 *
 * @param {Object} spec
 *
 * @return {Page}
 */
Form.prototype.buildTab = function(spec){
	var tab = new Form.tabs.default(spec);
	this.buildObjects(spec.objects, tab.wrap);
	return tab;
};

/**
 * Build a group
 *
 * @param {Object} spec
 *
 * @return {Group}
 */
Form.prototype.buildGroup = function(spec){
	var group = new Form.groups.default(spec);
	this.buildObjects(spec.objects, group.wrap);
	return group;
};

/**
 * Build a field group
 *
 * @param {Array} spec
 *
 * @return {FieldGroup}
 */
Form.prototype.buildFieldGroup = function(spec){
	var wrap = document.createElement('div');
	wrap.classList.add('informal-field-group');

	var widths = [];
	var consumedWidth = 0;

	for (var i = 0; i < spec.length; i++){
		if (isObject(spec[i]) && spec[i].width){
			widths.push(spec[i].width * 100);
			consumedWidth += spec[i].width * 100;
		}
	}

	var remainingFields = spec.length - widths.length;
	var remainingWidth = 100 - consumedWidth;
	var widthPerField = remainingWidth / remainingFields;

	var field;
	var fieldName;
	var fieldSpec;
	for (i = 0; i < spec.length; i++){
		fieldName = isObject(spec[i]) ? spec[i].name : spec[i];
		fieldSpec = this.spec.fields[fieldName];
		field = this.buildField(fieldName, fieldSpec);

		var width = widthPerField;
		if (isObject(spec[i]) && spec[i].width){
			width = spec[i].width * 100;
		}

		field.wrap.style.width = width + '%';

		wrap.appendChild(field.wrap);
	}

	return wrap;
};

/**
 * Build a field
 *
 * @param {String} name
 * @param {Object} spec
 *
 * @return {Field}
 */
Form.prototype.buildField = function(name, spec){
	spec.type = spec.type || 'text';

	if (!Form.fields[spec.type]){
		throw new Error('Field type not found: `' + spec.type + '`');
	}

	var field = new Form.fields[spec.type](
		name,
		this.normalizeAttributes(spec),
		get(this.data, name)
	);

	if (!field.wrap){
		throw new Error('Field has no wrap');
	}

	return field;
};

/**
 * Normalize attributes into an attributes object for easy looping
 *
 * @param {Object} spec
 *
 * @return {Object}
 */
Form.prototype.normalizeAttributes = function(spec){
	var attributes = spec.attributes || {};

	var attrs = [ 'placeholder', 'maxlength', 'id' ];
	var attr;
	for (var i = 0; i < attrs.length; i++){
		attr = attrs[i];
		if (!spec[attr]) continue;
		attributes[attr] = spec[attr];
		delete spec[attr];
	}

	spec.attributes = attributes;

	return spec;
};

/**
 * Show a tab by index
 */
Form.prototype.showTab = function(index){
	index = parseInt(index, 10);

	if (isNaN(index) || index < 0) return;

	if (this.current > -1){
		if (this.spec.tabs.length > 1){
			this.tabButtons[this.current].classList.remove('is-active');
		}
		this.tabs[this.current].wrap.classList.remove('is-shown');
	}

	if (this.spec.tabs.length > 1){
		this.tabButtons[index].classList.add('is-active');
	}
	this.tabs[index].wrap.classList.add('is-shown');

	this.current = index;
};

module.exports = Form;
