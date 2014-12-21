'use strict';

var groupIndex = 0;

var GroupBase = function(spec){
	if (!(this instanceof GroupBase)){
		return new GroupBase(spec);
	}
	this.fields = [];
	this.index = groupIndex++;
	this.spec = spec;
};

GroupBase.prototype.appendField = function(field){
	this.build();
	field.attach(this.fieldContainer);
};

GroupBase.prototype.attach = function(parent){
	this.build();
	this.wrap.insert(parent);
};

module.exports = GroupBase;
