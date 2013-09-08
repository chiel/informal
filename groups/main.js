'use strict';

var prime = require('prime'),
	GroupBase = require('./base'),
	zen = require('elements/zen');

require('./../elements');

/**
 *
 */
var GroupMain = prime({
	inherits: GroupBase,

	/**
	 * @param {Element} root
	 * @param {Object} spec
	 */
	constructor: function(root, spec){
		if (!(this instanceof GroupMain)){
			return new GroupMain(root, spec);
		}
		GroupBase.call(this, root, spec);
	},

	/**
	 * Build up the elements for this group
	 */
	build: function(){
		this.wrap = zen('fieldset');
		this.fieldContainer = zen('ul').insert(this.wrap);
		this.wrap.insert(this.root);
	}
});

module.exports = GroupMain;

