'use strict';

var prime = require('prime'),
	groupTypes = require('./../groups'),
	pageIndex = 0;

var PageBase = prime({
	groups: [],

	/**
	 * @param {Object} spec
	 */
	constructor: function(spec, data){
		this.index = pageIndex++;
		this.spec = spec;
		this.data = data;
		this.groupCount = this.spec.groups.length;

		this.createGroups();
	},

	/**
	 *
	 */
	createGroups: function(){
		var i, groupSpec;
		for (i = 0; i < this.groupCount; i++){
			groupSpec = this.spec.groups[i];
			this.groups.push(new (groupTypes.fetch(groupSpec.type))(groupSpec, this.data));
		}
	},

	/**
	 *
	 */
	groupsToHTML: function(){
		var html = '', i;
		for (i = 0; i < this.groupCount; i++){
			html += this.groups[i].toHTML();
		}
		return html;
	}
});

module.exports = PageBase;

