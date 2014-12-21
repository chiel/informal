'use strict';

var pageIndex = 0;

var PageBase = function(spec){
	this.groups = [];
	this.index = pageIndex++;
	this.spec = spec;
};

PageBase.prototype.appendGroup = function(group){
	this.build();
	group.attach(this.groupContainer);
};

PageBase.prototype.attach = function(parent){
	this.build();
	this.wrap.insert(parent);
};

PageBase.prototype.show = function(){
	this.wrap[0].style.display = 'block';
};

PageBase.prototype.hide = function(){
	this.wrap[0].style.display = 'none';
};

module.exports = PageBase;
