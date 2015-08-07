'use strict';

var informal = require('.');

informal.tabs.default = require('./tabs/default');

informal.groups.default = require('./groups/default');

informal.fields.single_option = require('./fields/single_option');
informal.fields.text = require('./fields/text');
informal.fields.textarea = require('./fields/textarea');

module.exports = informal;
