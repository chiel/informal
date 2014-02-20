'use strict';

var zen = require('elements/zen'),
	PagerBase = require('./base');

/**
 * @param {object} spec
 */
var PagerDefault = function(spec){
	if (!(this instanceof PagerDefault)){
		return new PagerDefault(spec);
	}
	PagerBase.call(this, spec);
};

PagerDefault.prototype = Object.create(PagerBase.prototype);
PagerDefault.prototype.constructor = PagerDefault;

/**
 *
 */
PagerDefault.prototype.build = function(){
	this.wrap = zen('ul');

	var i, len = this.spec.pages.length;
	for (i = 0; i < len; i++){
		zen('li')
			.data('index', i)
			.text(i + 1)
			.insert(this.wrap);
	}
};

module.exports = PagerDefault;
