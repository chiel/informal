'use strict';

var groupTypes = require('./../groups'),
	pageIndex = 0;

/**
 * @param {Object} spec
 */
var PageBase = function(spec, data){
	this.groups = [];
	this.index = pageIndex++;
	this.spec = spec;
	this.data = data;
	this.groupCount = this.spec.groups.length;
};

/**
 *
 */
PageBase.prototype.buildGroups = function(){
	var i, spec, group;
	for (i = 0; i < this.groupCount; i++){
		spec = this.spec.groups[i];
		spec.type = spec.type || 'default';
		group = new (groupTypes.fetch(spec.type))(spec, this.data);
		group.attach(this.groupContainer);
		this.groups.push(group);
	}
};

/**
 *
 */
PageBase.prototype.attach = function(parent){
	this.build();
	this.wrap.insert(parent);
	return this;
};

/**
 *
 */
PageBase.prototype.show = function(){
	this.wrap[0].style.display = 'block';
	return this;
};

/**
 *
 */
PageBase.prototype.hide = function(){
	this.wrap[0].style.display = 'none';
	return this;
};

module.exports = PageBase;
