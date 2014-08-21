'use strict';

var prime = require('prime'),
	zen = require('elements/zen'),
	PageBase = require('./base');

var PageDefault = prime({
	inherits: PageBase,

	constructor: function(spec){
		if (!(this instanceof PageDefault)){
			return new PageDefault(spec);
		}
		PageBase.call(this, spec);
	},

	build: function(){
		if (this.wrap) return;
		this.wrap = zen('section.page.page-' + this.index);
		this.groupContainer = this.wrap;
	}
});

module.exports = PageDefault;
