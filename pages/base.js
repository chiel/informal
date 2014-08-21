'use strict';

var prime = require('prime'),
	pageIndex = 0;

module.exports = prime({
	constructor: function(spec){
		this.groups = [];
		this.index = pageIndex++;
		this.spec = spec;
	},

	appendGroup: function(group){
		this.build();
		group.attach(this.groupContainer);
	},

	attach: function(parent){
		this.build();
		this.wrap.insert(parent);
	},

	show: function(){
		this.wrap[0].style.display = 'block';
	},

	hide: function(){
		this.wrap[0].style.display = 'none';
	}
});
