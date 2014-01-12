'use strict';

var prime = require('prime'),
	groupTypes = require('./../groups'),
	pageIndex = 0;

var PageBase = prime({
	/**
	 * @param {Object} spec
	 */
	constructor: function(spec){
		this.index = pageIndex++;
		this.spec = spec;
		this.groupCount = this.spec.groups.length;
	},

	/**
	 *
	 */
	groupsToHTML: function(){
		var html = '', i, groupSpec, group;
		for (i = 0; i < this.groupCount; i++){
			groupSpec = this.spec.groups[i];
			group = new (groupTypes.fetch(groupSpec.type))(groupSpec);
			html += group.toHTML();
		}
		return html;
	}
});

module.exports = PageBase;

