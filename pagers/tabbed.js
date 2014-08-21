'use strict';

var prime = require('prime'),
	zen = require('elements/zen'),
	PagerBase = require('./base');

var PagerTabbed = prime({
	inherits: PagerBase,

	constructor: function(spec){
		if (!(this instanceof PagerTabbed)){
			return new PagerTabbed(spec);
		}
		PagerBase.call(this, spec);
	},

	build: function(){
		this.wrap = zen('ul');
		var i, len = this.spec.pages.length;
		for (i = 0; i < len; i++){
			zen('li')
				.data('index', i)
				.text(this.spec.pages[i].name)
				.insert(this.wrap);
		}
	}
});

module.exports = PagerTabbed;
