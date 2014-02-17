'use strict';

var prime = require('prime'),
	zen = require('elements/zen');

var PagerTabbed = prime({
	/**
	 *
	 */
	constructor: function(spec){
		this.spec = spec;
	},

	/**
	 *
	 */
	build: function(){
		this.wrap = zen('ul');

		var i, len = this.spec.pages.length;
		for (i = 0; i < len; i++){
			zen('li')
				.data('index', i)
				.text(this.spec.pages[i].name)
				.insert(this.wrap);
		}
	},

	/**
	 *
	 */
	attach: function(parent){
		this.build();
		this.wrap.insert(parent);
	}
});

module.exports = PagerTabbed;
