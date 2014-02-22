'use strict';

var zen = require('elements/zen'),
	GroupBase = require('./base');

/**
 * @param {object} spec
 */
var GroupDefault = function(spec){
	if (!(this instanceof GroupDefault)){
		return new GroupDefault(spec);
	}
	GroupBase.call(this, spec);
};

GroupDefault.prototype = Object.create(GroupBase.prototype);
GroupDefault.prototype.constructor = GroupDefault;

/**
 * Build required elements for the group
 */
GroupDefault.prototype.build = function(){
	if (this.wrap) return;
	this.wrap = zen('fieldset');
	if (this.spec.name){
		zen('legend').text(this.spec.name).insert(this.wrap);
	}
	this.fieldContainer = zen('ul').insert(this.wrap);
};

module.exports = GroupDefault;
