'use strict';

var inherits = require('inherits'),
	zen = require('elements/zen'),
	PagerBase = require('./base');

var PagerNamed = function(spec){
	if (!(this instanceof PagerNamed)){
		return new PagerNamed(spec);
	}
	PagerBase.call(this, spec);
};

inherits(PagerNamed, PagerBase);

PagerNamed.prototype.build = function(){
	this.wrap = zen('ul');
	var i, len = this.spec.pages.length;
	for (i = 0; i < len; i++){
		zen('li')
			.data('index', i)
			.text(this.spec.pages[i].name)
			.insert(this.wrap);
	}
};

module.exports = PagerNamed;
