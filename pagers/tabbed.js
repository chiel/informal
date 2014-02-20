'use strict';

var zen = require('elements/zen'),
	PagerBase = require('./base');

var PagerTabbed = function(spec){
	this.spec = spec;
};

PagerTabbed.prototype = Object.create(PagerBase.prototype);
PagerTabbed.prototype.constructor = PagerTabbed;

/**
 *
 */
PagerTabbed.prototype.build = function(){
	this.wrap = zen('ul');

	var i, len = this.spec.pages.length;
	for (i = 0; i < len; i++){
		zen('li')
			.data('index', i)
			.text(this.spec.pages[i].name)
			.insert(this.wrap);
	}
};

module.exports = PagerTabbed;
