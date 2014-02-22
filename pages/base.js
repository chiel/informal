'use strict';

var pageIndex = 0;

/**
 * @param {object} spec
 */
var PageBase = function(spec){
	this.groups = [];
	this.index = pageIndex++;
	this.spec = spec;
};

/**
 * Append a group
 * @param {object} group
 */
PageBase.prototype.appendGroup = function(group){
	this.build();
	group.attach(this.groupContainer);
};

/**
 * Attach page to an element
 * @param {element} parent
 */
PageBase.prototype.attach = function(parent){
	this.build();
	this.wrap.insert(parent);
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
