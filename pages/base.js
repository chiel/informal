'use strict';

var prime = require('prime'),
	groupTypes = require('./../groups'),
	GroupBase = require('./../groups/base'),
	pageIndex = 1;

/**
 * Extendable base for pages
 */
var PageBase = prime({
	groups: [],

	/**
	 * @param {Element} root
	 * @param {Object} spec
	 */
	constructor: function(root, spec){
		this.index = pageIndex++;
		this.root = root;
		this.spec = spec;
		this.build();
		this.hide();

		var i, groupSpec, group;
		for (i = 0; i < this.spec.groups.length; i++){
			groupSpec = this.spec.groups[i];
			group = new (groupTypes.fetch(groupSpec.type))(this.groupContainer, groupSpec);
			group.attach();
			this.addGroup(group);
		}
	},

	/**
	 * Add a new group
	 * @param {Object} group
	 */
	addGroup: function(group){
		if (!(group instanceof GroupBase)){
			throw new Error('group needs to extend GroupBase');
		}
		this.groups.push(group);
	},

	/**
	 * Show page
	 */
	show: function(){
		this.wrap[0].style.display = 'block';
	},

	/**
	 * Hide page
	 */
	hide: function(){
		this.wrap[0].style.display = 'none';
	}
});

module.exports = PageBase;

