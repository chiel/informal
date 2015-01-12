'use strict';

var Base = require('./base');

/**
 * @param {Object} spec
 */
var Default = function(spec){
	if (!(this instanceof Default)) return new Default(spec);

	Base.call(this, spec);
};

require('inherits')(Default, Base);

module.exports = Default;
