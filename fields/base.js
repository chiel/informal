'use strict';

var inherits = require('inherits'),
	fieldIndex = 0;

var FieldBase = function(spec, value){
	this.index = fieldIndex++;
	this.spec = spec;
	this.value = value;
	this.language = 0;

	this.spec.attributes = this.spec.attributes || {};
};

inherits(FieldBase, require('events').EventEmitter);

FieldBase.prototype.attach = function(parent){
	this.build();
	if (this.input && this.input.on){
		var self = this;
		this.input.on('change', function(){
			self.emit('change', self.serialize());
		});
	}
	this.wrap.insert(parent);
};

FieldBase.prototype.serialize = function(){
	return this.input.value();
};

FieldBase.prototype.clear = function(){
	if (this.input){
		this.input.value('');
	}
};

module.exports = FieldBase;
