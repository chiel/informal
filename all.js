'use strict';

var informal = require('.');

informal.tabs.default = require('./tabs/default');

informal.groups.default = require('./groups/default');

informal.fields.boolean = require('./fields/boolean');
informal.fields.email = require('./fields/email');
informal.fields.multi_option = require('./fields/multi_option');
informal.fields.password = require('./fields/password');
informal.fields.single_option = require('./fields/single_option');
informal.fields.tags = require('./fields/tags');
informal.fields.text = require('./fields/text');
informal.fields.textarea = require('./fields/textarea');

module.exports = informal;
