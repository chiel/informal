'use strict';

var zen = require('elements/zen'),
	GroupBase = require('./base');

/**
 * @param {object} spec
 */
var GroupDefault = function(spec, data){
	if (!(this instanceof GroupDefault)){
		return new GroupDefault(spec, data);
	}
	GroupBase.call(this, spec, data);
};

GroupDefault.prototype = Object.create(GroupBase.prototype);
GroupDefault.prototype.constructor = GroupDefault;

/**
 *
 */
GroupDefault.prototype.build = function(){
	if (this.wrap) return;
	this.wrap = zen('fieldset');
	if (this.spec.name){
		zen('legend').text(this.spec.name).insert(this.wrap);
	}
	this.fieldContainer = zen('ul').insert(this.wrap);
	this.buildFields();
};

module.exports = GroupDefault;
