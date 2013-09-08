'use strict';

var GroupBase = require('./base'),
	zen = require('elements/zen');

require('./../elements');

/**
 *
 */
var GroupMain = function(root, spec){
	if (!(this instanceof GroupMain)){
		return new GroupMain(root, spec);
	}
	GroupBase.call(this, root, spec);
};

GroupMain.prototype = Object.create(GroupBase.prototype);

/**
 * Build up the elements for this group
 */
GroupMain.prototype.build = function(){
	this.wrap = zen('fieldset');
	this.fieldContainer = zen('ul').insert(this.wrap);
	this.wrap.insert(this.root);
};

module.exports = GroupMain;

