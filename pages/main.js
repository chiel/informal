'use strict';

var prime = require('prime'),
	PageBase = require('./base'),
	zen = require('elements/zen');

require('./../elements');

/**
 *
 */
var PageMain = prime({
	inherits: PageBase,

	/**
	 * @param {Element} root
	 * @param {Object} spec
	 */
	constructor: function(root, spec){
		if (!(this instanceof PageMain)){
			return new PageMain(root, spec);
		}
		PageBase.call(this, root, spec);
	},

	/**
	 * Build up the elements for the page
	 */
	build: function(){
		this.wrap = zen('section.page.page-' + this.index).insert(this.root);
		this.groupContainer = this.wrap;
	}
});

module.exports = PageMain;

