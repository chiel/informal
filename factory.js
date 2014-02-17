'use strict';

/**
 * Creates a storage factory
 * @param {String} type
 */
var Factory = function(type){
	if (!(this instanceof Factory)){
		return new Factory(type);
	}
	this.type = type;
	this.types = {};
};

/**
 * Register a new type
 * @param {String} type
 * @param {Function} definition
 */
Factory.prototype.register = function(type, definition){
	this.types[type] = definition;
	return this;
};

/**
 * Fetch an existing type
 * @param {String} type
 * @return {Function}
 */
Factory.prototype.fetch = function(type){
	if (!this.types[type]){
		throw new Error('Unknown ' + this.type + ' type: ' + type);
	}
	return this.types[type];
};

module.exports = Factory;
