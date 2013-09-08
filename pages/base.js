'use strict';

var groupTypes = require('./../groups'),
	GroupBase = require('./../groups/base'),
	pageIndex = 1;

/**
 * Extendable base for pages
 * @param {Element} root
 * @param {Object} spec
 */
var PageBase = function(root, spec){
	this.index = pageIndex++;
	this.root = root;
	this.spec = spec;
	this.groups = [];
	this.build();
	this.hide();

	var i, groupSpec, group;
	for (i = 0; i < this.spec.groups.length; i++){
		groupSpec = this.spec.groups[i];
		group = new (groupTypes.fetch(groupSpec.type))(this.groupContainer, groupSpec);
		group.attach();
		this.addGroup(group);
	}
};

/**
 * Add a new group
 * @param {Object} group
 */
PageBase.prototype.addGroup = function(group){
	if (!(group instanceof GroupBase)){
		throw new Error('group needs to extend GroupBase');
	}
	this.groups.push(group);
};

/**
 * Show page
 */
PageBase.prototype.show = function(){
	this.wrap[0].style.display = 'block';
};

/**
 * Hide page
 */
PageBase.prototype.hide = function(){
	this.wrap[0].style.display = 'none';
};

module.exports = PageBase;

