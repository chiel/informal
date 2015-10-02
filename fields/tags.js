'use strict';

var indexOf = require('mout/array/indexOf');

/**
 * TagsField
 *
 * @param {Object} spec
 * @param {String} spec.name - Name of the field
 * @param {String} spec.label - The label for the field
 * @param {String} spec.unique - Whether the tag values should be unique
 */
var TagsField = function(spec) {
	this.spec = spec;
	this.tags = [];

	if (this.spec.unique === undefined) {
		this.spec.unique = true;
	}

	this.build();
};

/**
 * Build the field
 */
TagsField.prototype.build = function() {
	if (this.wrap) return;

	var wrap = document.createElement('div');
	wrap.classList.add('informal-field');

	if (this.spec.label) {
		var label = document.createElement('label');
		label.textContent = this.spec.label;
		wrap.appendChild(label);
	}

	var inputWrap = document.createElement('div');
	inputWrap.classList.add('informal-input');
	wrap.appendChild(inputWrap);

	var tagWrap = document.createElement('div');
	tagWrap.classList.add('informal-input-tags-wrap');
	inputWrap.appendChild(tagWrap);
	this.tagWrap = tagWrap;

	var tagPlaceholder = document.createElement('span');
	tagPlaceholder.classList.add('informal-input-tags-placeholder');
	tagPlaceholder.textContent = this.spec.attributes.placeholder || '';
	tagWrap.appendChild(tagPlaceholder);
	this.tagPlaceholder = tagPlaceholder;

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
	input.name = this.spec.name;
	tagInput.appendChild(input);

	this.inputWrap = inputWrap;
	this.input = input;
	this.wrap = wrap;
	this.setEvents();
};

/**
 * Set all required events
 */
TagsField.prototype.setEvents = function() {
	var self = this;

	self.input.addEventListener('focus', function(e) {
		self.tagWrap.classList.add('has-focus');
	});
	self.input.addEventListener('blur', function(e) {
		self.tagWrap.classList.remove('has-focus');
	});

	self.input.addEventListener('keydown', function(e) {
		if (e.keyCode === 8 && self.input.selectionStart === 0 && !self.input.value && self.tagsList.lastChild) {
			self.remove(self.tags.length - 1);
		}

		if ([ 9, 13 ].indexOf(e.keyCode) > -1) {
			if (!self.input.value) {
				if (e.keyCode === 13) e.preventDefault();
				return;
			}

			e.preventDefault();
			self.add(self.input.value);
		}
	});

	self.input.addEventListener('input', function(e) {
		self.tagPlaceholder.style.display = self.input.value || self.tags.length ? 'none' : 'block';
		self.tagGhost.textContent = self.input.value;
	});

	self.input.addEventListener('blur', function(e) {
		self.blurTimeout = setTimeout(function() {
			self.add(self.input.value);
		}, 10);
	});

	self.input.addEventListener('focus', function(e) {
		clearTimeout(self.blurTimeout);
	});

	self.tagWrap.addEventListener('click', function(e) {
		if (e.target.dataset.tagRemove !== undefined) {
			self.remove(indexOf(self.tagsList.children, e.target.parentNode));
		}

		self.input.focus();
	});
};

/**
 * Add a new tag to the list
 *
 * @param {String} value
 */
TagsField.prototype.add = function(value) {
	if (!value || (this.spec.unique && this.tags.indexOf(value) > -1)) return;

	var li = document.createElement('li');
	li.innerHTML = '<span>' + value + '</span>' +
		'<button type="button" tabindex="-1" data-tag-remove>remove</button>';
	this.tagsList.appendChild(li);
	this.tags.push(value);

	this.tagGhost.textContent = '';
	this.input.value = '';
};

/**
 * Remove a tag by index
 *
 * @param {Number} index
 */
TagsField.prototype.remove = function(index) {
	index = parseInt(index, 10);
	if (!this.tags[index]) return;

	this.tagsList.removeChild(this.tagsList.children[index]);
	this.tags.splice(index, 1);
	this.tagPlaceholder.style.display = this.input.value || this.tags.length ? 'none' : 'block';
};

module.exports = TagsField;
