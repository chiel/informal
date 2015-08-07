'use strict';

/**
 * TagsField
 *
 * @param {String} name
 * @param {Object} spec
 * @param {String} spec.name - Name of the field if you want to change it
 * @param {String} spec.label - The label for the field
 *
 * @return {TagsField}
 */
var TagsField = function(name, spec){
	if (!(this instanceof TagsField)){
		return new TagsField(name, spec);
	}

	this.name = name;
	this.spec = spec;
	this.build();
	this.setEvents();
};

/**
 * Build the field
 */
TagsField.prototype.build = function(){
	if (this.wrap) return;

	var wrap = document.createElement('div');
	wrap.classList.add('informal-field');

	var label = document.createElement('label');
	label.textContent = this.spec.label;
	wrap.appendChild(label);

	var inputWrap = document.createElement('div');
	inputWrap.classList.add('informal-input');
	wrap.appendChild(inputWrap);


	var tagWrap = document.createElement('div');
	tagWrap.classList.add('informal-input-tags-wrap');
	inputWrap.appendChild(tagWrap);
	this.tagWrap = tagWrap;

	var tagsList = document.createElement('ul');
	tagsList.classList.add('informal-input-tags-list');
	tagWrap.appendChild(tagsList);
	this.tagsList = tagsList;

	var tagInput = document.createElement('div');
	tagInput.classList.add('informal-input-tags-input');
	tagWrap.appendChild(tagInput);

	var tagGhost = document.createElement('span');
	tagInput.appendChild(tagGhost);
	this.tagGhost = tagGhost;

	tagInput.appendChild(document.createElement('br'));

	var input = document.createElement('input');
	input.name = this.spec.name || this.name;
	tagInput.appendChild(input);

	this.input = input;
	this.wrap = wrap;
};

/**
 * Set all required events
 */
TagsField.prototype.setEvents = function(){
	var self = this;

	self.input.addEventListener('focus', function(e){
		self.tagWrap.classList.add('has-focus');
	});
	self.input.addEventListener('blur', function(e){
		self.tagWrap.classList.remove('has-focus');
	});

	self.input.addEventListener('keydown', function(e){
		if (e.keyCode === 8 && self.input.selectionStart === 0 && !self.input.value && self.tagsList.lastChild){
			self.tagsList.removeChild(self.tagsList.lastChild);
		}

		if ([ 9, 13 ].indexOf(e.keyCode) > -1){
			if (!self.input.value){
				if (e.keyCode === 13) e.preventDefault();
				return;
			}

			e.preventDefault();
			self.add(self.input.value);
		}
	});

	self.input.addEventListener('input', function(e){
		self.tagGhost.textContent = self.input.value;
	});

	self.input.addEventListener('blur', function(e){
		self.blurTimeout = setTimeout(function(){
			self.add(self.input.value);
		}, 10);
	});

	self.input.addEventListener('focus', function(e){
		clearTimeout(self.blurTimeout);
	});

	self.tagWrap.addEventListener('click', function(e){
		if (e.target.dataset.tagRemove !== undefined){
			self.tagsList.removeChild(e.target.parentNode);
		}

		self.input.focus();
	});
};

/**
 * Add a new tag to the list
 *
 * @param {String} value
 */
TagsField.prototype.add = function(value){
	if (!value) return;

	var li = document.createElement('li');
	li.innerHTML = '<span>' + value + '</span>' +
		'<button type="button" data-tag-remove>remove</button>';
	this.tagsList.appendChild(li);

	this.tagGhost.textContent = '';
	this.input.value = '';
};

module.exports = TagsField;
