'use strict';

/**
 * Numbered page tabs
 */
var Numbered = function(spec){
	if (!(this instanceof Numbered)) return new Numbered(spec);

	this.spec = spec;
	this.build();
};

/**
 *
 */
Numbered.prototype.build = function(){
	this.wrap = document.createElement('ul');
	var i, html = [];
	for (i = 0; i < this.spec.length; i++){
		html.push('<li data-index="' + i + '">' + (i + 1) + '</li>');
	}
	this.wrap.innerHTML = html.join('');
};

module.exports = Numbered;
