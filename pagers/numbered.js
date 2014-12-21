'use strict';

var inherits = require('inherits'),
	zen = require('elements/zen'),
	PagerBase = require('./base');

var PagerDefault = function(spec){
	if (!(this instanceof PagerDefault)){
		return new PagerDefault(spec);
	}
	PagerBase.call(this, spec);
};

inherits(PagerDefault, PagerBase);

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
