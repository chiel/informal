'use strict';

/**
 * Named page tabs
 */
var Named = function(spec){
	if (!(this instanceof Named)) return new Named(spec);

	this.spec = spec;
	this.build();
};

/**
 *
 */
Named.prototype.build = function(){
	this.wrap = document.createElement('ul');
	var i, html = [];
	for (i = 0; i < this.spec.length; i++){
		html.push('<li data-index="' + i + '">' + this.spec[i].name + '</li>');
	}
	this.wrap.innerHTML = html.join('');
};

module.exports = Named;
