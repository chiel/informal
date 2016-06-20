'use strict';

var pagers = require('../pagers'),
	pages = require('../pages'),
	groups = require('../groups'),
	fields = require('../fields'),
	get = require('mout/object/get'),
	set = require('mout/object/set'),
	forOwn = require('mout/object/forOwn'),
	kindOf = require('mout/lang/kindOf');

/**
 * Create a new instance of informal
 * @param {Object} spec
 * @param {Object} data
 */
var Form = function(spec, data){
	if (!(this instanceof Form)) return new Form(spec);

	this.spec = spec;
	this.data = data || {};
	this.pages = {};
	this.groups = {};
	this.fields = {};
	this.subscriptions = {};
	this.index = 0;
	this.build();
};

require('inherits')(Form, require('events').EventEmitter);

/**
 * Build all form elements
 */
Form.prototype.build = function(){
	this.wrap = document.createElement('div');
	this.wrap.classList.add('informal');

	var pages = document.createElement('div');
	pages.classList.add('informal--pages');
	this.wrap.appendChild(pages);

	if (kindOf(this.spec.pages) != 'Array'){
		this.spec.pages = [this.spec.pages];
	}

	var i, page;
	for (i = 0; i < this.spec.pages.length; i++){
		page = this.buildPage(i);
		pages.appendChild(page.wrap);
	}

	if (this.spec.pages.length > 1){
		this.buildPager();
	}
};

/**
 * Build pager
 */
Form.prototype.buildPager = function(){
	var spec = this.spec.pager;
	if (!spec){
		spec = this.spec.pager = {};
	}

	if (!spec.type) spec.type = 'numbered';

	var Pager = pagers[spec.type];
	if (!Pager){
		console.error('Pager type `%s` does not exist', spec.type);
		return;
	}

	var pager = new Pager(this.spec.pages),
		wrap = document.createElement('nav'),
		firstTab = pager.wrap.querySelector('[data-index]'),
		self = this, activeTab = firstTab;

	firstTab.classList.add('active');

	wrap.classList.add('informal--pager');
	wrap.classList.add('informal--pager-' + spec.type);
	wrap.addEventListener('click', function(e){
		e.preventDefault();

		var index = e.target.getAttribute('data-index');
		if (index){
			activeTab.classList.remove('active');
			e.target.classList.add('active');
			activeTab = e.target;
			self.showPage(index);
		}
	});

	wrap.appendChild(pager.wrap);

	if (!spec.position) spec.position = 'bottom';

	if (spec.position == 'top'){
		this.wrap.insertBefore(wrap, this.wrap.firstChild);
	} else if (spec.position == 'bottom'){
		this.wrap.appendChild(wrap);
	} else {
		console.error('Invalid position `%s` for pager', spec.position);
	}

	return pager;
};

/**
 * Build a page
 * @param {Number} index
 */
Form.prototype.buildPage = function(index){
	index = parseInt(index, 10);

	if (this.pages[index]) return this.pages[index];

	var spec = this.spec.pages[index];
	if (!spec){
		console.error('Cannot find page with index %d', index);
		return;
	}

	if (!spec.type) spec.type = 'default';

	var Page = pages[spec.type];
	if (!Page){
		console.error('Page type `%s` does not exist', spec.type);
		return;
	}

	var page = new Page(spec);
	this.pages[index] = page;
	if (index !== 0){
		page.hide();
	}
	if (!spec.groups || !spec.groups.length) return page;

	if (kindOf(spec.groups) != 'Array'){
		spec.groups = [spec.groups];
	}

	var i, group, groups = [];
	for (i = 0; i < spec.groups.length; i++){
		group = this.buildGroup(spec.groups[i]);
		page.wrap.appendChild(group.wrap);
		groups.push(group);
	}

	this.emit('page.build', index, page);

	return page;
};

/**
 * Build a group
 * @param {String} name
 */
Form.prototype.buildGroup = function(name){
	if (this.groups[name]) return this.groups[name];

	var spec = this.spec.groups[name];
	if (!spec){
		console.error('Cannot find group by name `%s`', name);
		return;
	}

	if (!spec.type) spec.type = 'default';

	var Group = groups[spec.type];
	if (!Group){
		console.error('Group type `%s` does not exist', spec.type);
		return;
	}

	var group = new Group(spec);
	this.groups[name] = group;
	if (!spec.fields || !spec.fields.length) return group;

	if (kindOf(spec.fields) != 'Array'){
		spec.fields = [spec.fields];
	}

	var i, field, fields = {};
	for (i = 0; i < spec.fields.length; i++){
		field = this.buildField(spec.fields[i]);
		if (field.spec.type === 'wysiwyg') {
			tinyMCE.execCommand('mceAddEditor', true, field.input.id);
		}
		group.wrap.appendChild(field.wrap);
		fields[spec.fields[i]] = field;
	}

	this.emit('group.build', name, group);

	return group;
};

/**
 * Build a field
 * @param {String} name
 */
Form.prototype.buildField = function(name){
	if (this.fields[name]) return this.fields[name];

	var spec = this.spec.fields[name];
	if (!spec){
		console.error('Cannot find field by name `%s`', name);
		return;
	}

	if (!spec.type){
		console.error('Field `%s` has no type', spec.type);
		return;
	}

	var Field = fields[spec.type];
	if (!Field){
		console.error('Field type `%s` does not exist', spec.type);
		return;
	}

	if (!spec.name) spec.name = name;

	var subValues = {}, i, fieldName;
	if (spec.subscribe){
		if (kindOf(spec.subscribe) != 'Array') spec.subscribe = [spec.subscribe];

		for (i = 0; i < spec.subscribe.length; i++){
			fieldName = this.spec.fields[spec.subscribe[i]].name || spec.subscribe[i];
			fieldName = fieldName.replace(/\[/g, '.').replace(/\]/g, '');
			subValues[spec.subscribe[i]] = get(this.data, fieldName);
		}
	}

	fieldName = spec.name.replace(/\[/g, '.').replace(/\]/g, '');
	var field = new Field(spec, get(this.data, fieldName), subValues),
		self = this;

	field.on('change', function(value){
		var subs = self.subscriptions[name];
		if (!subs) return;

		for (var i = 0; i < subs.length; i++){
			if (self.fields[subs[i]] && self.fields[subs[i]].notify){
				self.fields[subs[i]].notify(name, value);
			}
		}
	});

	this.fields[name] = field;
	this.processSubscriptions(name);
	this.processTriggers(name);

	setTimeout(function(){
		self.emit('field.build', name, field);
	}, 0);

	return field;
};

/**
 * Show a page by index
 */
Form.prototype.showPage = function(index){
	index = parseInt(index, 10);
	if (!this.pages[index]) return;

	this.pages[this.index].hide();
	this.pages[index].show();
	this.index = index;
};

/**
 * Process subscriptions for a field
 * @param {String} name
 */
Form.prototype.processSubscriptions = function(name){
	var spec = this.spec.fields[name];
	if (!spec || !spec.subscribe) return;

	if (kindOf(spec.subscribe) != 'Array'){
		spec.subscribe = [spec.subscribe];
	}

	for (var i = 0; i < spec.subscribe.length; i++){
		if (!this.subscriptions[spec.subscribe[i]]){
			this.subscriptions[spec.subscribe[i]] = [];
		}

		this.subscriptions[spec.subscribe[i]].push(name);
	}
};

/**
 *
 */
Form.prototype.processTriggers = function(name){
	var spec = this.spec.fields[name];
	if (!spec || !spec.triggers) return;
	var field = this.fields[name],
		activeValues = [],
		groups = {},
		self = this;

	var processValue = function(value){
		if (kindOf(value) != 'Array'){
			value = [value];
		}

		var i, index, groupName, group;
		for (i = 0; i < activeValues.length; i++){
			index = value.indexOf(activeValues[i]);
			if (index != -1) continue;

			groupName = spec.triggers[activeValues[i]];

			setTimeout(function(){
				var wysiwygs = groups[groupName].wrap.querySelectorAll('.wysiwyg');
				for (var i = 0; i < wysiwygs.length; i++) {
					tinyMCE.execCommand('mceRemoveEditor',false, wysiwygs[i].id);
				}
			},100)
			field.wrap.removeChild(groups[groupName].wrap);
			activeValues.splice(i, 1);
		}

		for (i = 0; i < value.length; i++){
			if (!(value[i] in spec.triggers)) continue;
			if (activeValues.indexOf(value[i]) != -1) continue;

			groupName = spec.triggers[value[i]];
			group = groups[groupName];

			if (!group){
				group = self.buildGroup(groupName);
				groups[groupName] = group;
			}
			setTimeout(function(){
				var wysiwygs = group.wrap.querySelectorAll('.wysiwyg');
				for (var i = 0; i < wysiwygs.length; i++) {
					tinyMCE.execCommand('mceAddEditor',true, wysiwygs[i].id);
				}
			},100)

			field.wrap.appendChild(group.wrap);
			activeValues.push(value[i]);
		}
	};

	field.on('change', processValue);
	processValue(field.getValue());
};

/**
 *
 */
Form.prototype.getValues = function(){
	var values = {}, fieldName;

	forOwn(this.fields, function(field, name){
		fieldName = field.spec.name.replace(/\[/g, '.').replace(/\]/g, '');
		set(values, fieldName, field.getValue());
	});

	return values;
};

/**
 *
 */
Form.prototype.clear = function(){
	forOwn(this.fields, function(field){
		field.clear();
	});
};

module.exports = Form;
