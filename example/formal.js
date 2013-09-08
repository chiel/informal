(function (modules) {
    var cache = {}, require = function (id) {
            var module = cache[id];
            if (!module) {
                module = cache[id] = {};
                var exports = module.exports = {};
                modules[id].call(exports, require, module, exports, typeof window == 'undefined' ? {} : window);
            }
            return module.exports;
        };
    window['formal'] = require('0');
}({
    '0': function (require, module, exports, global) {
        'use strict';
        var pageTypes = require('1'), groupTypes = require('3'), fieldTypes = require('4');
        pageTypes.register('main', require('5'));
        groupTypes.register('main', require('17'));
        fieldTypes.register('text', require('18'));
        fieldTypes.register('single-option', require('19'));
        module.exports = { Form: require('1a') };
    },
    '1': function (require, module, exports, global) {
        'use strict';
        module.exports = new (require('2'))('page');
    },
    '2': function (require, module, exports, global) {
        'use strict';
        var Factory = function (type) {
            if (!(this instanceof Factory)) {
                return new Factory(type);
            }
            this.type = type;
            this.types = {};
        };
        Factory.prototype.register = function (type, definition) {
            this.types[type] = definition;
        };
        Factory.prototype.fetch = function (type) {
            if (!this.types[type]) {
                throw new Error('Unknown ' + this.type + ' type: ' + type);
            }
            return this.types[type];
        };
        module.exports = Factory;
    },
    '3': function (require, module, exports, global) {
        'use strict';
        module.exports = new (require('2'))('group');
    },
    '4': function (require, module, exports, global) {
        'use strict';
        module.exports = new (require('2'))('field');
    },
    '5': function (require, module, exports, global) {
        'use strict';
        var prime = require('6'), PageBase = require('e'), zen = require('h');
        require('p');
        var PageMain = prime({
                inherits: PageBase,
                constructor: function (root, spec) {
                    if (!(this instanceof PageMain)) {
                        return new PageMain(root, spec);
                    }
                    PageBase.call(this, root, spec);
                },
                build: function () {
                    this.wrap = zen('section.page.page-' + this.index).insert(this.root);
                    this.groupContainer = this.wrap;
                }
            });
        module.exports = PageMain;
    },
    '6': function (require, module, exports, global) {
        'use strict';
        var hasOwn = require('7'), forIn = require('8'), mixIn = require('9'), filter = require('b'), create = require('c'), type = require('d');
        var defineProperty = Object.defineProperty, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        try {
            defineProperty({}, '~', {});
            getOwnPropertyDescriptor({}, '~');
        } catch (e) {
            defineProperty = null;
            getOwnPropertyDescriptor = null;
        }
        var define = function (value, key, from) {
            defineProperty(this, key, getOwnPropertyDescriptor(from, key) || {
                writable: true,
                enumerable: true,
                configurable: true,
                value: value
            });
        };
        var copy = function (value, key) {
            this[key] = value;
        };
        var implement = function (proto) {
            forIn(proto, defineProperty ? define : copy, this.prototype);
            return this;
        };
        var verbs = /^constructor|inherits|mixin$/;
        var prime = function (proto) {
            if (type(proto) === 'function')
                proto = { constructor: proto };
            var superprime = proto.inherits;
            var constructor = hasOwn(proto, 'constructor') ? proto.constructor : superprime ? function () {
                    return superprime.apply(this, arguments);
                } : function () {
                };
            if (superprime) {
                mixIn(constructor, superprime);
                var superproto = superprime.prototype;
                var cproto = constructor.prototype = create(superproto);
                constructor.parent = superproto;
                cproto.constructor = constructor;
            }
            if (!constructor.implement)
                constructor.implement = implement;
            var mixins = proto.mixin;
            if (mixins) {
                if (type(mixins) !== 'array')
                    mixins = [mixins];
                for (var i = 0; i < mixins.length; i++)
                    constructor.implement(create(mixins[i].prototype));
            }
            return constructor.implement(filter(proto, function (value, key) {
                return !key.match(verbs);
            }));
        };
        module.exports = prime;
    },
    '7': function (require, module, exports, global) {
        'use strict';
        var hasOwnProperty = Object.hasOwnProperty;
        var hasOwn = function (self, key) {
            return hasOwnProperty.call(self, key);
        };
        module.exports = hasOwn;
    },
    '8': function (require, module, exports, global) {
        'use strict';
        var has = require('7');
        var forIn = function (self, method, context) {
            for (var key in self)
                if (method.call(context, self[key], key, self) === false)
                    break;
            return self;
        };
        if (!{ valueOf: 0 }.propertyIsEnumerable('valueOf')) {
            var buggy = 'constructor,toString,valueOf,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString'.split(',');
            var proto = Object.prototype;
            forIn = function (self, method, context) {
                for (var key in self)
                    if (method.call(context, self[key], key, self) === false)
                        return self;
                for (var i = 0; key = buggy[i]; i++) {
                    var value = self[key];
                    if ((value !== proto[key] || has(self, key)) && method.call(context, value, key, self) === false)
                        break;
                }
                return self;
            };
        }
        module.exports = forIn;
    },
    '9': function (require, module, exports, global) {
        'use strict';
        var forOwn = require('a');
        var copy = function (value, key) {
            this[key] = value;
        };
        var mixIn = function (self) {
            for (var i = 1, l = arguments.length; i < l; i++)
                forOwn(arguments[i], copy, self);
            return self;
        };
        module.exports = mixIn;
    },
    'a': function (require, module, exports, global) {
        'use strict';
        var forIn = require('8'), hasOwn = require('7');
        var forOwn = function (self, method, context) {
            forIn(self, function (value, key) {
                if (hasOwn(self, key))
                    return method.call(context, value, key, self);
            });
            return self;
        };
        module.exports = forOwn;
    },
    'b': function (require, module, exports, global) {
        'use strict';
        var forIn = require('8');
        var filter = function (self, method, context) {
            var results = {};
            forIn(self, function (value, key) {
                if (method.call(context, value, key, self))
                    results[key] = value;
            });
            return results;
        };
        module.exports = filter;
    },
    'c': function (require, module, exports, global) {
        'use strict';
        var create = function (self) {
            var constructor = function () {
            };
            constructor.prototype = self;
            return new constructor();
        };
        module.exports = create;
    },
    'd': function (require, module, exports, global) {
        'use strict';
        var toString = Object.prototype.toString, types = /number|object|array|string|function|date|regexp|boolean/;
        var type = function (object) {
            if (object == null)
                return 'null';
            var string = toString.call(object).slice(8, -1).toLowerCase();
            if (string === 'number' && isNaN(object))
                return 'null';
            if (types.test(string))
                return string;
            return 'object';
        };
        module.exports = type;
    },
    'e': function (require, module, exports, global) {
        'use strict';
        var prime = require('6'), groupTypes = require('3'), GroupBase = require('f'), pageIndex = 1;
        var PageBase = prime({
                groups: [],
                constructor: function (root, spec) {
                    this.index = pageIndex++;
                    this.root = root;
                    this.spec = spec;
                    this.build();
                    this.hide();
                    var i, groupSpec, group;
                    for (i = 0; i < this.spec.groups.length; i++) {
                        groupSpec = this.spec.groups[i];
                        group = new (groupTypes.fetch(groupSpec.type))(this.groupContainer, groupSpec);
                        group.attach();
                        this.addGroup(group);
                    }
                },
                addGroup: function (group) {
                    if (!(group instanceof GroupBase)) {
                        throw new Error('group needs to extend GroupBase');
                    }
                    this.groups.push(group);
                },
                show: function () {
                    this.wrap[0].style.display = 'block';
                },
                hide: function () {
                    this.wrap[0].style.display = 'none';
                }
            });
        module.exports = PageBase;
    },
    'f': function (require, module, exports, global) {
        'use strict';
        var prime = require('6'), fieldTypes = require('4'), FieldBase = require('g'), groupIndex = 1;
        var GroupBase = prime({
                fields: [],
                constructor: function (root, spec) {
                    this.index = groupIndex++;
                    this.root = root;
                    this.spec = spec;
                    this.build();
                    var i, fieldSpec;
                    for (i = 0; i < this.spec.fields.length; i++) {
                        fieldSpec = this.spec.fields[i];
                        this.addField(new (fieldTypes.fetch(fieldSpec.type))(this.fieldContainer, fieldSpec));
                    }
                },
                addField: function (field) {
                    if (!(field instanceof FieldBase)) {
                        throw new Error('field needs to extend FieldBase');
                    }
                    this.fields.push(field);
                },
                attach: function () {
                    this.wrap.insert(this.root);
                },
                detach: function () {
                    this.wrap.remove();
                }
            });
        module.exports = GroupBase;
    },
    'g': function (require, module, exports, global) {
        'use strict';
        var prime = require('6'), type = require('d'), groupTypes = require('3'), fieldIndex = 1;
        var FieldBase = prime({
                activeGroups: [],
                builtGroups: {},
                constructor: function (root, spec) {
                    this.index = fieldIndex++;
                    this.root = root;
                    this.spec = spec;
                    this.build();
                },
                checkTriggers: function () {
                    var values = this.getValue(), value, i, groupSpec;
                    if (type(values) != 'array') {
                        values = [values];
                    }
                    while (this.activeGroups.length) {
                        this.activeGroups.pop().detach();
                    }
                    while (values.length) {
                        value = values.shift();
                        if (value in this.spec.triggers) {
                            if (!(value in this.builtGroups)) {
                                this.builtGroups[value] = [];
                                for (i = 0; i < this.spec.triggers[value].length; i++) {
                                    groupSpec = this.spec.triggers[value][i];
                                    this.builtGroups[value].push(new (groupTypes.fetch(groupSpec.type))(this.wrap, groupSpec));
                                }
                            }
                            for (i = 0; i < this.builtGroups[value].length; i++) {
                                this.builtGroups[value][i].attach();
                                this.activeGroups.push(this.builtGroups[value][i]);
                            }
                        }
                    }
                },
                getValue: function () {
                    return this.input.value();
                }
            });
        module.exports = FieldBase;
    },
    'h': function (require, module, exports, global) {
        'use strict';
        var $ = require('i'), parse = require('o'), forEach = require('j'), map = require('k');
        module.exports = function (expression, doc) {
            return $(map(parse(expression), function (expression) {
                var previous, result;
                forEach(expression, function (part, i) {
                    var node = (doc || document).createElement(part.tag);
                    if (part.id)
                        node.id = part.id;
                    if (part.classList)
                        node.className = part.classList.join(' ');
                    if (part.attributes)
                        forEach(part.attributes, function (attribute) {
                            node.setAttribute(attribute.name, attribute.value);
                        });
                    if (part.pseudos)
                        forEach(part.pseudos, function (pseudo) {
                            var n = $(node), method = n[pseudo.name];
                            if (method)
                                method.call(n, pseudo.value);
                        });
                    if (i === 0) {
                        result = node;
                    } else if (part.combinator === ' ') {
                        previous.appendChild(node);
                    } else if (part.combinator === '+') {
                        var parentNode = previous.parentNode;
                        if (parentNode)
                            parentNode.appendChild(node);
                    }
                    previous = node;
                });
                return result;
            }));
        };
    },
    'i': function (require, module, exports, global) {
        'use strict';
        var prime = require('6'), forEach = require('j'), map = require('k'), filter = require('l'), every = require('m'), some = require('n');
        var uniqueIndex = 0;
        var uniqueID = function (n) {
            return n === global ? 'global' : n.uniqueNumber || (n.uniqueNumber = 'n:' + (uniqueIndex++).toString(36));
        };
        var instances = {};
        var $ = prime({
                constructor: function $(n, context) {
                    if (n == null)
                        return this && this.constructor === $ ? new elements() : null;
                    var self = n;
                    if (n.constructor !== elements) {
                        self = new elements();
                        var uid;
                        if (typeof n === 'string') {
                            if (!self.search)
                                return null;
                            self[self.length++] = context || document;
                            return self.search(n);
                        }
                        if (n.nodeType || n === global) {
                            self[self.length++] = n;
                        } else if (n.length) {
                            var uniques = {};
                            for (var i = 0, l = n.length; i < l; i++) {
                                var nodes = $(n[i], context);
                                if (nodes && nodes.length)
                                    for (var j = 0, k = nodes.length; j < k; j++) {
                                        var node = nodes[j];
                                        uid = uniqueID(node);
                                        if (!uniques[uid]) {
                                            self[self.length++] = node;
                                            uniques[uid] = true;
                                        }
                                    }
                            }
                        }
                    }
                    if (!self.length)
                        return null;
                    if (self.length === 1) {
                        uid = uniqueID(self[0]);
                        return instances[uid] || (instances[uid] = self);
                    }
                    return self;
                }
            });
        var elements = prime({
                inherits: $,
                constructor: function elements() {
                    this.length = 0;
                },
                unlink: function () {
                    return this.map(function (node, i) {
                        delete instances[uniqueID(node)];
                        return node;
                    });
                },
                forEach: function (method, context) {
                    return forEach(this, method, context);
                },
                map: function (method, context) {
                    return map(this, method, context);
                },
                filter: function (method, context) {
                    return filter(this, method, context);
                },
                every: function (method, context) {
                    return every(this, method, context);
                },
                some: function (method, context) {
                    return some(this, method, context);
                }
            });
        module.exports = $;
    },
    'j': function (require, module, exports, global) {
        'use strict';
        var forEach = function (self, method, context) {
            for (var i = 0, l = self.length >>> 0; i < l; i++) {
                if (method.call(context, self[i], i, self) === false)
                    break;
            }
            return self;
        };
        module.exports = forEach;
    },
    'k': function (require, module, exports, global) {
        'use strict';
        var map = function (self, method, context) {
            var length = self.length >>> 0, results = Array(length);
            for (var i = 0, l = length; i < l; i++) {
                results[i] = method.call(context, self[i], i, self);
            }
            return results;
        };
        module.exports = map;
    },
    'l': function (require, module, exports, global) {
        'use strict';
        var filter = function (self, method, context) {
            var results = [];
            for (var i = 0, l = self.length >>> 0; i < l; i++) {
                var value = self[i];
                if (method.call(context, value, i, self))
                    results.push(value);
            }
            return results;
        };
        module.exports = filter;
    },
    'm': function (require, module, exports, global) {
        'use strict';
        var every = function (self, method, context) {
            for (var i = 0, l = self.length >>> 0; i < l; i++) {
                if (!method.call(context, self[i], i, self))
                    return false;
            }
            return true;
        };
        module.exports = every;
    },
    'n': function (require, module, exports, global) {
        'use strict';
        var some = function (self, method, context) {
            for (var i = 0, l = self.length >>> 0; i < l; i++) {
                if (method.call(context, self[i], i, self))
                    return true;
            }
            return false;
        };
        module.exports = some;
    },
    'o': function (require, module, exports, global) {
        'use strict';
        var escapeRe = /([-.*+?^${}()|[\]\/\\])/g, unescapeRe = /\\/g;
        var escape = function (string) {
            return (string + '').replace(escapeRe, '\\$1');
        };
        var unescape = function (string) {
            return (string + '').replace(unescapeRe, '');
        };
        var slickRe = RegExp('^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:(["\']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:(["\'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)'.replace(/<combinator>/, '[' + escape('>+~`!@$%^&={}\\;</') + ']').replace(/<unicode>/g, '(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])').replace(/<unicode1>/g, '(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])'));
        var Part = function Part(combinator) {
            this.combinator = combinator || ' ';
            this.tag = '*';
        };
        Part.prototype.toString = function () {
            if (!this.raw) {
                var xpr = '', k, part;
                xpr += this.tag || '*';
                if (this.id)
                    xpr += '#' + this.id;
                if (this.classes)
                    xpr += '.' + this.classList.join('.');
                if (this.attributes)
                    for (k = 0; part = this.attributes[k++];) {
                        xpr += '[' + part.name + (part.operator ? part.operator + '"' + part.value + '"' : '') + ']';
                    }
                if (this.pseudos)
                    for (k = 0; part = this.pseudos[k++];) {
                        xpr += ':' + part.name;
                        if (part.value)
                            xpr += '(' + part.value + ')';
                    }
                this.raw = xpr;
            }
            return this.raw;
        };
        var Expression = function Expression() {
            this.length = 0;
        };
        Expression.prototype.toString = function () {
            if (!this.raw) {
                var xpr = '';
                for (var j = 0, bit; bit = this[j++];) {
                    if (j !== 1)
                        xpr += ' ';
                    if (bit.combinator !== ' ')
                        xpr += bit.combinator + ' ';
                    xpr += bit;
                }
                this.raw = xpr;
            }
            return this.raw;
        };
        var replacer = function (rawMatch, separator, combinator, combinatorChildren, tagName, id, className, attributeKey, attributeOperator, attributeQuote, attributeValue, pseudoMarker, pseudoClass, pseudoQuote, pseudoClassQuotedValue, pseudoClassValue) {
            var expression, current;
            if (separator || !this.length) {
                expression = this[this.length++] = new Expression();
                if (separator)
                    return '';
            }
            if (!expression)
                expression = this[this.length - 1];
            if (combinator || combinatorChildren || !expression.length) {
                current = expression[expression.length++] = new Part(combinator);
            }
            if (!current)
                current = expression[expression.length - 1];
            if (tagName) {
                current.tag = unescape(tagName);
            } else if (id) {
                current.id = unescape(id);
            } else if (className) {
                var unescaped = unescape(className);
                var classes = current.classes || (current.classes = {});
                if (!classes[unescaped]) {
                    classes[unescaped] = escape(className);
                    var classList = current.classList || (current.classList = []);
                    classList.push(unescaped);
                    classList.sort();
                }
            } else if (pseudoClass) {
                pseudoClassValue = pseudoClassValue || pseudoClassQuotedValue;
                ;
                (current.pseudos || (current.pseudos = [])).push({
                    type: pseudoMarker.length == 1 ? 'class' : 'element',
                    name: unescape(pseudoClass),
                    escapedName: escape(pseudoClass),
                    value: pseudoClassValue ? unescape(pseudoClassValue) : null,
                    escapedValue: pseudoClassValue ? escape(pseudoClassValue) : null
                });
            } else if (attributeKey) {
                attributeValue = attributeValue ? escape(attributeValue) : null;
                ;
                (current.attributes || (current.attributes = [])).push({
                    operator: attributeOperator,
                    name: unescape(attributeKey),
                    escapedName: escape(attributeKey),
                    value: attributeValue ? unescape(attributeValue) : null,
                    escapedValue: attributeValue ? escape(attributeValue) : null
                });
            }
            return '';
        };
        var Expressions = function Expressions(expression) {
            this.length = 0;
            var self = this;
            while (expression)
                expression = expression.replace(slickRe, function () {
                    return replacer.apply(self, arguments);
                });
        };
        Expressions.prototype.toString = function () {
            if (!this.raw) {
                var expressions = [];
                for (var i = 0, expression; expression = this[i++];)
                    expressions.push(expression);
                this.raw = expressions.join(', ');
            }
            return this.raw;
        };
        var cache = {};
        var parse = function (expression) {
            if (expression == null)
                return null;
            expression = ('' + expression).replace(/^\s+|\s+$/g, '');
            return cache[expression] || (cache[expression] = new Expressions(expression));
        };
        module.exports = parse;
    },
    'p': function (require, module, exports, global) {
        'use strict';
        var $ = require('i');
        require('q');
        require('u');
        require('11');
        require('16');
        require('13');
        module.exports = $;
    },
    'q': function (require, module, exports, global) {
        'use strict';
        var $ = require('i'), clean = require('r'), forEach = require('j'), filter = require('l'), indexOf = require('t');
        $.implement({
            setAttribute: function (name, value) {
                return this.forEach(function (node) {
                    node.setAttribute(name, value);
                });
            },
            getAttribute: function (name) {
                var attr = this[0].getAttributeNode(name);
                return attr && attr.specified ? attr.value : null;
            },
            hasAttribute: function (name) {
                var node = this[0];
                if (node.hasAttribute)
                    return node.hasAttribute(name);
                var attr = node.getAttributeNode(name);
                return !!(attr && attr.specified);
            },
            removeAttribute: function (name) {
                return this.forEach(function (node) {
                    var attr = node.getAttributeNode(name);
                    if (attr)
                        node.removeAttributeNode(attr);
                });
            }
        });
        var accessors = {};
        forEach([
            'type',
            'value',
            'name',
            'href',
            'title',
            'id'
        ], function (name) {
            accessors[name] = function (value) {
                return value !== undefined ? this.forEach(function (node) {
                    node[name] = value;
                }) : this[0][name];
            };
        });
        forEach([
            'checked',
            'disabled',
            'selected'
        ], function (name) {
            accessors[name] = function (value) {
                return value !== undefined ? this.forEach(function (node) {
                    node[name] = !!value;
                }) : !!this[0][name];
            };
        });
        var classes = function (className) {
            var classNames = clean(className).split(' '), uniques = {};
            return filter(classNames, function (className) {
                if (className !== '' && !uniques[className])
                    return uniques[className] = className;
            }).sort();
        };
        accessors.className = function (className) {
            return className !== undefined ? this.forEach(function (node) {
                node.className = classes(className).join(' ');
            }) : classes(this[0].className).join(' ');
        };
        $.implement({
            attribute: function (name, value) {
                var accessor = accessors[name];
                if (accessor)
                    return accessor.call(this, value);
                if (value != null)
                    return this.setAttribute(name, value);
                if (value === null)
                    return this.removeAttribute(name);
                if (value === undefined)
                    return this.getAttribute(name);
            }
        });
        $.implement(accessors);
        $.implement({
            check: function () {
                return this.checked(true);
            },
            uncheck: function () {
                return this.checked(false);
            },
            disable: function () {
                return this.disabled(true);
            },
            enable: function () {
                return this.disabled(false);
            },
            select: function () {
                return this.selected(true);
            },
            deselect: function () {
                return this.selected(false);
            }
        });
        $.implement({
            classNames: function () {
                return classes(this[0].className);
            },
            hasClass: function (className) {
                return indexOf(this.classNames(), className) > -1;
            },
            addClass: function (className) {
                return this.forEach(function (node) {
                    var nodeClassName = node.className;
                    var classNames = classes(nodeClassName + ' ' + className).join(' ');
                    if (nodeClassName != classNames)
                        node.className = classNames;
                });
            },
            removeClass: function (className) {
                return this.forEach(function (node) {
                    var classNames = classes(node.className);
                    forEach(classes(className), function (className) {
                        var index = indexOf(classNames, className);
                        if (index > -1)
                            classNames.splice(index, 1);
                    });
                    node.className = classNames.join(' ');
                });
            }
        });
        $.prototype.toString = function () {
            var tag = this.tag(), id = this.id(), classes = this.classNames();
            var str = tag;
            if (id)
                str += '#' + id;
            if (classes.length)
                str += '.' + classes.join('.');
            return str;
        };
        var textProperty = document.createElement('div').textContent == null ? 'innerText' : 'textContent';
        $.implement({
            tag: function () {
                return this[0].tagName.toLowerCase();
            },
            html: function (html) {
                return html !== undefined ? this.forEach(function (node) {
                    node.innerHTML = html;
                }) : this[0].innerHTML;
            },
            text: function (text) {
                return text !== undefined ? this.forEach(function (node) {
                    node[textProperty] = text;
                }) : this[0][textProperty];
            },
            data: function (key, value) {
                return value !== undefined ? this.setAttribute('data-' + key, value) : this.getAttribute('data-' + key);
            }
        });
        module.exports = $;
    },
    'r': function (require, module, exports, global) {
        'use strict';
        var trim = require('s');
        var clean = function (self) {
            return trim((self + '').replace(/\s+/g, ' '));
        };
        module.exports = clean;
    },
    's': function (require, module, exports, global) {
        'use strict';
        var trim = function (self) {
            return (self + '').replace(/^\s+|\s+$/g, '');
        };
        module.exports = trim;
    },
    't': function (require, module, exports, global) {
        'use strict';
        var indexOf = function (self, item, from) {
            for (var l = self.length >>> 0, i = from < 0 ? Math.max(0, l + from) : from || 0; i < l; i++) {
                if (self[i] === item)
                    return i;
            }
            return -1;
        };
        module.exports = indexOf;
    },
    'u': function (require, module, exports, global) {
        'use strict';
        var $ = require('i'), prime = require('6'), Emitter = require('v');
        var html = document.documentElement;
        var addEventListener = html.addEventListener ? function (node, event, handle) {
                node.addEventListener(event, handle, false);
                return handle;
            } : function (node, event, handle) {
                node.attachEvent('on' + event, handle);
                return handle;
            };
        var removeEventListener = html.removeEventListener ? function (node, event, handle) {
                node.removeEventListener(event, handle, false);
            } : function (node, event, handle) {
                node.detachEvent('on' + event, handle);
            };
        $.implement({
            on: function (event, handle) {
                return this.forEach(function (node) {
                    var self = $(node);
                    Emitter.prototype.on.call(self, event, handle);
                    var domListeners = self._domListeners || (self._domListeners = {});
                    if (!domListeners[event])
                        domListeners[event] = addEventListener(node, event, function (e) {
                            self.emit(event, e || window.event, Emitter.EMIT_SYNC);
                        });
                });
            },
            off: function (event, handle) {
                return this.forEach(function (node) {
                    var self = $(node);
                    var domListeners = self._domListeners, domEvent, listeners = self._listeners, events;
                    if (domListeners && (domEvent = domListeners[event]) && listeners && (events = listeners[event])) {
                        Emitter.prototype.off.call(self, event, handle);
                        var empty = true, k, l;
                        for (k in events) {
                            empty = false;
                            break;
                        }
                        if (empty) {
                            removeEventListener(node, event, domEvent);
                            delete domListeners[event];
                            for (l in domListeners) {
                                empty = false;
                                break;
                            }
                            if (empty)
                                delete self._domListeners;
                        }
                    }
                });
            },
            emit: function (event) {
                var args = arguments;
                return this.forEach(function (node) {
                    Emitter.prototype.emit.apply($(node), args);
                });
            }
        });
        module.exports = $;
    },
    'v': function (require, module, exports, global) {
        'use strict';
        var prime = require('6'), defer = require('w'), uid = require('x'), slice = require('10');
        var EID = 0;
        var Emitter = prime({
                on: function (event, fn) {
                    var listeners = this._listeners || (this._listeners = {}), events = listeners[event] || (listeners[event] = {});
                    for (var k in events)
                        if (events[k] === fn)
                            return this;
                    events[uid()] = fn;
                    return this;
                },
                off: function (event, fn) {
                    var listeners = this._listeners, events, key, length = 0;
                    if (listeners && (events = listeners[event])) {
                        for (var k in events) {
                            length++;
                            if (key == null && events[k] === fn)
                                key = k;
                            if (key && length > 1)
                                break;
                        }
                        if (key) {
                            delete events[key];
                            if (length === 1) {
                                delete listeners[event];
                                for (var l in listeners)
                                    return this;
                                delete this._listeners;
                            }
                        }
                    }
                    return this;
                },
                emit: function (event) {
                    var self = this, args = slice(arguments, 1);
                    var emit = function () {
                        var listeners = self._listeners, events;
                        if (listeners && (events = listeners[event])) {
                            var copy = {}, k;
                            for (k in events)
                                copy[k] = events[k];
                            for (k in copy) {
                                var res = copy[k].apply(self, args);
                                if (res === false)
                                    break;
                            }
                        }
                    };
                    if (args[args.length - 1] === Emitter.EMIT_SYNC) {
                        args.pop();
                        emit();
                    } else {
                        defer(emit);
                    }
                    return this;
                }
            });
        Emitter.EMIT_SYNC = {};
        module.exports = Emitter;
    },
    'w': function (require, module, exports, global) {
        'use strict';
        var type = require('d'), uid = require('x'), now = require('y'), count = require('z');
        var callbacks = {
                timeout: {},
                frame: {},
                immediate: {}
            };
        var push = function (collection, callback, context, defer) {
            var unique = uid();
            var iterator = function () {
                iterate(collection);
            };
            if (count(collection, 0))
                defer(iterator);
            collection[unique] = {
                callback: callback,
                context: context
            };
            return function () {
                delete collection[unique];
            };
        };
        var iterate = function (collection) {
            var time = now();
            var exec = {}, key;
            for (key in collection) {
                exec[key] = collection[key];
                delete collection[key];
            }
            for (key in exec) {
                var entry = exec[key];
                entry.callback.call(entry.context, time);
            }
        };
        var defer = function (callback, argument, context) {
            return type(argument) === 'number' ? defer.timeout(callback, argument, context) : defer.immediate(callback, argument);
        };
        if (global.process && process.nextTick) {
            defer.immediate = function (callback, context) {
                return push(callbacks.immediate, callback, context, process.nextTick);
            };
        } else if (global.setImmediate) {
            defer.immediate = function (callback, context) {
                return push(callbacks.immediate, callback, context, setImmediate);
            };
        } else if (global.postMessage && global.addEventListener) {
            addEventListener('message', function (event) {
                if (event.source === global && event.data === '@deferred') {
                    event.stopPropagation();
                    iterate(callbacks.immediate);
                }
            }, true);
            defer.immediate = function (callback, context) {
                return push(callbacks.immediate, callback, context, function () {
                    postMessage('@deferred', '*');
                });
            };
        } else {
            defer.immediate = function (callback, context) {
                return push(callbacks.immediate, callback, context, function (iterator) {
                    setTimeout(iterator, 0);
                });
            };
        }
        var requestAnimationFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame || function (callback) {
                setTimeout(callback, 1000 / 60);
            };
        defer.frame = function (callback, context) {
            return push(callbacks.frame, callback, context, requestAnimationFrame);
        };
        var clear;
        defer.timeout = function (callback, ms, context) {
            var ct = callbacks.timeout;
            if (!clear)
                clear = defer.immediate(function () {
                    clear = null;
                    callbacks.timeout = {};
                });
            return push(ct[ms] || (ct[ms] = {}), callback, context, function (iterator) {
                setTimeout(iterator, ms);
            });
        };
        module.exports = defer;
    },
    'x': function (require, module, exports, global) {
        'use strict';
        var UID = 0;
        module.exports = function () {
            return (UID++).toString(36);
        };
    },
    'y': function (require, module, exports, global) {
        'use strict';
        var now = Date.now || function () {
                return new Date().getTime();
            };
        module.exports = now;
    },
    'z': function (require, module, exports, global) {
        'use strict';
        var forIn = require('8');
        var count = function (self, n) {
            var length = 0;
            forIn(self, function () {
                if (++length === n || n === 0)
                    return false;
            });
            return n != null ? n === length : length;
        };
        module.exports = count;
    },
    '10': function (require, module, exports, global) {
        'use strict';
        var slice = function (self, begin, end) {
            var length = self.length, end_;
            if (begin == null)
                begin = 0;
            end = end == null ? length : (end_ = end % length) < 0 ? end_ + length : end;
            var slit = [];
            for (var i = begin; i < end; i++)
                slit.push(self[i]);
            return slit;
        };
        module.exports = slice;
    },
    '11': function (require, module, exports, global) {
        'use strict';
        var $ = require('u'), Map = require('12');
        require('13');
        $.implement({
            delegate: function (event, selector, handle) {
                return this.forEach(function (node) {
                    var self = $(node);
                    var delegation = self._delegation || (self._delegation = {}), events = delegation[event] || (delegation[event] = {}), map = events[selector] || (events[selector] = new Map());
                    var action = function (e) {
                        var target = $(e.target), match = target.matches(selector) ? target : target.parent(selector);
                        var res;
                        if (match)
                            res = handle.call(self, e, match);
                        return res;
                    };
                    map.set(handle, action);
                    self.on(event, action);
                });
            },
            undelegate: function (event, selector, handle) {
                return this.forEach(function (node) {
                    var self = $(node), delegation, events, map;
                    if (!(delegation = self._delegation) || !(events = delegation[event]) || !(map = events[selector]))
                        return;
                    var action = map.get(handle);
                    if (action) {
                        self.off(event, action);
                        map.remove(handle);
                        if (!map.count())
                            delete events[selector];
                        var e1 = true, e2 = true, x;
                        for (x in events) {
                            e1 = false;
                            break;
                        }
                        if (e1)
                            delete delegation[event];
                        for (x in delegation) {
                            e2 = false;
                            break;
                        }
                        if (!e2)
                            delete self._delegation;
                    }
                });
            }
        });
        module.exports = $;
    },
    '12': function (require, module, exports, global) {
        'use strict';
        var prime = require('6'), indexOf = require('t');
        var Map = prime({
                constructor: function Map() {
                    if (!this instanceof Map)
                        return new Map();
                    this.length = 0;
                    this._values = [];
                    this._keys = [];
                },
                set: function (key, value) {
                    var index = indexOf(this._keys, key);
                    if (index === -1) {
                        this._keys.push(key);
                        this._values.push(value);
                        this.length++;
                    } else {
                        this._values[index] = value;
                    }
                    return this;
                },
                get: function (key) {
                    var index = indexOf(this._keys, key);
                    return index === -1 ? null : this._values[index];
                },
                count: function () {
                    return this.length;
                },
                forEach: function (method, context) {
                    for (var i = 0, l = this.length; i < l; i++) {
                        if (method.call(context, this._values[i], this._keys[i], this) === false)
                            break;
                    }
                    return this;
                },
                map: function (method, context) {
                    var results = new Map();
                    this.forEach(function (value, key) {
                        results.set(key, method.call(context, value, key, this));
                    }, this);
                    return results;
                },
                filter: function (method, context) {
                    var results = new Map();
                    this.forEach(function (value, key) {
                        if (method.call(context, value, key, this))
                            results.set(key, value);
                    }, this);
                    return results;
                },
                every: function (method, context) {
                    var every = true;
                    this.forEach(function (value, key) {
                        if (!method.call(context, value, key, this))
                            return every = false;
                    }, this);
                    return every;
                },
                some: function (method, context) {
                    var some = false;
                    this.forEach(function (value, key) {
                        if (method.call(context, value, key, this))
                            return !(some = true);
                    }, this);
                    return some;
                },
                indexOf: function (value) {
                    var index = indexOf(this._values, value);
                    return index > -1 ? this._keys[index] : null;
                },
                remove: function (value) {
                    var index = indexOf(this._values, value);
                    if (index !== -1) {
                        this._values.splice(index, 1);
                        this.length--;
                        return this._keys.splice(index, 1)[0];
                    }
                    return null;
                },
                unset: function (key) {
                    var index = indexOf(this._keys, key);
                    if (index !== -1) {
                        this._keys.splice(index, 1);
                        this.length--;
                        return this._values.splice(index, 1)[0];
                    }
                    return null;
                },
                keys: function () {
                    return this._keys.slice();
                },
                values: function () {
                    return this._values.slice();
                }
            });
        module.exports = Map;
    },
    '13': function (require, module, exports, global) {
        'use strict';
        var $ = require('i'), map = require('k'), slick = require('14');
        var walk = function (combinator, method) {
            return function (expression) {
                var parts = slick.parse(expression || '*');
                expression = map(parts, function (part) {
                    return combinator + ' ' + part;
                }).join(', ');
                return this[method](expression);
            };
        };
        $.implement({
            search: function (expression) {
                if (this.length === 1)
                    return $(slick.search(expression, this[0], new $()));
                var buffer = [];
                for (var i = 0, node; node = this[i]; i++)
                    buffer.push.apply(buffer, slick.search(expression, node));
                return $(buffer).sort();
            },
            find: function (expression) {
                if (this.length === 1)
                    return $(slick.find(expression, this[0]));
                var buffer = [];
                for (var i = 0, node; node = this[i]; i++)
                    buffer.push(slick.find(expression, node));
                return $(buffer);
            },
            sort: function () {
                return slick.sort(this);
            },
            matches: function (expression) {
                return slick.matches(this[0], expression);
            },
            contains: function (node) {
                return slick.contains(this[0], node);
            },
            nextSiblings: walk('~', 'search'),
            nextSibling: walk('+', 'find'),
            previousSiblings: walk('!~', 'search'),
            previousSibling: walk('!+', 'find'),
            children: walk('>', 'search'),
            firstChild: walk('^', 'find'),
            lastChild: walk('!^', 'find'),
            parent: function (expression) {
                for (var i = 0, node; node = this[i]; i++)
                    while (node = node.parentNode) {
                        if (!expression || slick.matches(node, expression))
                            return $(node);
                    }
                return null;
            },
            parents: function (expression) {
                var buffer = [];
                for (var i = 0, node; node = this[i]; i++)
                    while (node = node.parentNode) {
                        if (!expression || slick.matches(node, expression))
                            buffer.push(node);
                    }
                return $(buffer);
            }
        });
        module.exports = $;
    },
    '14': function (require, module, exports, global) {
        'use strict';
        module.exports = 'document' in global ? require('15') : { parse: require('o') };
    },
    '15': function (require, module, exports, global) {
        'use strict';
        var parse = require('o');
        var uniqueIndex = 0;
        var uniqueID = function (node) {
            return node.uniqueNumber || (node.uniqueNumber = 's:' + uniqueIndex++);
        };
        var uniqueIDXML = function (node) {
            var uid = node.getAttribute('uniqueNumber');
            if (!uid) {
                uid = 's:' + uniqueIndex++;
                node.setAttribute('uniqueNumber', uid);
            }
            return uid;
        };
        var isArray = Array.isArray || function (object) {
                return Object.prototype.toString.call(object) === '[object Array]';
            };
        var HAS = {
                GET_ELEMENT_BY_ID: function (test, id) {
                    test.innerHTML = '<a id="' + id + '"></a>';
                    return !!this.getElementById(id);
                },
                QUERY_SELECTOR: function (test) {
                    test.innerHTML = '_<style>:nth-child(2){}</style>';
                    test.innerHTML = '<a class="MiX"></a>';
                    return test.querySelectorAll('.MiX').length === 1;
                },
                EXPANDOS: function (test, id) {
                    test._custom_property_ = id;
                    return test._custom_property_ === id;
                },
                MATCHES_SELECTOR: function (test) {
                    test.className = 'MiX';
                    var matches = test.matchesSelector || test.mozMatchesSelector || test.webkitMatchesSelector;
                    if (matches)
                        try {
                            matches.call(test, ':slick');
                        } catch (e) {
                            return matches.call(test, '.MiX') ? matches : false;
                        }
                    return false;
                },
                GET_ELEMENTS_BY_CLASS_NAME: function (test) {
                    test.innerHTML = '<a class="f"></a><a class="b"></a>';
                    if (test.getElementsByClassName('b').length !== 1)
                        return false;
                    test.firstChild.className = 'b';
                    if (test.getElementsByClassName('b').length !== 2)
                        return false;
                    test.innerHTML = '<a class="a"></a><a class="f b a"></a>';
                    if (test.getElementsByClassName('a').length !== 2)
                        return false;
                    return true;
                },
                GET_ATTRIBUTE: function (test) {
                    var shout = 'fus ro dah';
                    test.innerHTML = '<a class="' + shout + '"></a>';
                    return test.firstChild.getAttribute('class') === shout;
                }
            };
        var Finder = function Finder(document) {
            this.document = document;
            var root = this.root = document.documentElement;
            this.tested = {};
            this.uniqueID = this.has('EXPANDOS') ? uniqueID : uniqueIDXML;
            this.getAttribute = this.has('GET_ATTRIBUTE') ? function (node, name) {
                return node.getAttribute(name);
            } : function (node, name) {
                var node = node.getAttributeNode(name);
                return node && node.specified ? node.value : null;
            };
            this.hasAttribute = root.hasAttribute ? function (node, attribute) {
                return node.hasAttribute(attribute);
            } : function (node, attribute) {
                node = node.getAttributeNode(attribute);
                return !!(node && node.specified);
            };
            this.contains = document.contains && root.contains ? function (context, node) {
                return context.contains(node);
            } : root.compareDocumentPosition ? function (context, node) {
                return context === node || !!(context.compareDocumentPosition(node) & 16);
            } : function (context, node) {
                do {
                    if (node === context)
                        return true;
                } while (node = node.parentNode);
                return false;
            };
            this.sorter = root.compareDocumentPosition ? function (a, b) {
                if (!a.compareDocumentPosition || !b.compareDocumentPosition)
                    return 0;
                return a.compareDocumentPosition(b) & 4 ? -1 : a === b ? 0 : 1;
            } : 'sourceIndex' in root ? function (a, b) {
                if (!a.sourceIndex || !b.sourceIndex)
                    return 0;
                return a.sourceIndex - b.sourceIndex;
            } : document.createRange ? function (a, b) {
                if (!a.ownerDocument || !b.ownerDocument)
                    return 0;
                var aRange = a.ownerDocument.createRange(), bRange = b.ownerDocument.createRange();
                aRange.setStart(a, 0);
                aRange.setEnd(a, 0);
                bRange.setStart(b, 0);
                bRange.setEnd(b, 0);
                return aRange.compareBoundaryPoints(Range.START_TO_END, bRange);
            } : null;
            this.failed = {};
            var nativeMatches = this.has('MATCHES_SELECTOR');
            if (nativeMatches)
                this.matchesSelector = function (node, expression) {
                    if (this.failed[expression])
                        return null;
                    try {
                        return nativeMatches.call(node, expression);
                    } catch (e) {
                        if (slick.debug)
                            console.warn('matchesSelector failed on ' + expression);
                        this.failed[expression] = true;
                        return null;
                    }
                };
            if (this.has('QUERY_SELECTOR')) {
                this.querySelectorAll = function (node, expression) {
                    if (this.failed[expression])
                        return true;
                    var result, _id, _expression, _combinator, _node;
                    if (node !== this.document) {
                        _combinator = expression[0].combinator;
                        _id = node.getAttribute('id');
                        _expression = expression;
                        if (!_id) {
                            _node = node;
                            _id = '__slick__';
                            _node.setAttribute('id', _id);
                        }
                        expression = '#' + _id + ' ' + _expression;
                        if (_combinator.indexOf('~') > -1 || _combinator.indexOf('+') > -1) {
                            node = node.parentNode;
                            if (!node)
                                result = true;
                        }
                    }
                    if (!result)
                        try {
                            result = node.querySelectorAll(expression);
                        } catch (e) {
                            if (slick.debug)
                                console.warn('querySelectorAll failed on ' + (_expression || expression));
                            result = this.failed[_expression || expression] = true;
                        }
                    if (_node)
                        _node.removeAttribute('id');
                    return result;
                };
            }
        };
        Finder.prototype.has = function (FEATURE) {
            var tested = this.tested, testedFEATURE = tested[FEATURE];
            if (testedFEATURE != null)
                return testedFEATURE;
            var root = this.root, document = this.document, testNode = document.createElement('div');
            testNode.setAttribute('style', 'display: none;');
            root.appendChild(testNode);
            var TEST = HAS[FEATURE], result = false;
            if (TEST)
                try {
                    result = TEST.call(document, testNode, 's:' + uniqueIndex++);
                } catch (e) {
                }
            if (slick.debug && !result)
                console.warn('document has no ' + FEATURE);
            root.removeChild(testNode);
            return tested[FEATURE] = result;
        };
        var combinators = {
                ' ': function (node, part, push) {
                    var item, items;
                    var noId = !part.id, noTag = !part.tag, noClass = !part.classes;
                    if (part.id && node.getElementById && this.has('GET_ELEMENT_BY_ID')) {
                        item = node.getElementById(part.id);
                        if (item && item.getAttribute('id') === part.id) {
                            items = [item];
                            noId = true;
                            if (part.tag === '*')
                                noTag = true;
                        }
                    }
                    if (!items) {
                        if (part.classes && node.getElementsByClassName && this.has('GET_ELEMENTS_BY_CLASS_NAME')) {
                            items = node.getElementsByClassName(part.classList);
                            noClass = true;
                            if (part.tag === '*')
                                noTag = true;
                        } else {
                            items = node.getElementsByTagName(part.tag);
                            if (part.tag !== '*')
                                noTag = true;
                        }
                        if (!items || !items.length)
                            return false;
                    }
                    for (var i = 0; item = items[i++];)
                        if (noTag && noId && noClass && !part.attributes && !part.pseudos || this.match(item, part, noTag, noId, noClass))
                            push(item);
                    return true;
                },
                '>': function (node, part, push) {
                    if (node = node.firstChild)
                        do {
                            if (node.nodeType == 1 && this.match(node, part))
                                push(node);
                        } while (node = node.nextSibling);
                },
                '+': function (node, part, push) {
                    while (node = node.nextSibling)
                        if (node.nodeType == 1) {
                            if (this.match(node, part))
                                push(node);
                            break;
                        }
                },
                '^': function (node, part, push) {
                    node = node.firstChild;
                    if (node) {
                        if (node.nodeType === 1) {
                            if (this.match(node, part))
                                push(node);
                        } else {
                            combinators['+'].call(this, node, part, push);
                        }
                    }
                },
                '~': function (node, part, push) {
                    while (node = node.nextSibling) {
                        if (node.nodeType === 1 && this.match(node, part))
                            push(node);
                    }
                },
                '++': function (node, part, push) {
                    combinators['+'].call(this, node, part, push);
                    combinators['!+'].call(this, node, part, push);
                },
                '~~': function (node, part, push) {
                    combinators['~'].call(this, node, part, push);
                    combinators['!~'].call(this, node, part, push);
                },
                '!': function (node, part, push) {
                    while (node = node.parentNode)
                        if (node !== this.document && this.match(node, part))
                            push(node);
                },
                '!>': function (node, part, push) {
                    node = node.parentNode;
                    if (node !== this.document && this.match(node, part))
                        push(node);
                },
                '!+': function (node, part, push) {
                    while (node = node.previousSibling)
                        if (node.nodeType == 1) {
                            if (this.match(node, part))
                                push(node);
                            break;
                        }
                },
                '!^': function (node, part, push) {
                    node = node.lastChild;
                    if (node) {
                        if (node.nodeType == 1) {
                            if (this.match(node, part))
                                push(node);
                        } else {
                            combinators['!+'].call(this, node, part, push);
                        }
                    }
                },
                '!~': function (node, part, push) {
                    while (node = node.previousSibling) {
                        if (node.nodeType === 1 && this.match(node, part))
                            push(node);
                    }
                }
            };
        Finder.prototype.search = function (context, expression, found) {
            if (!context)
                context = this.document;
            else if (!context.nodeType && context.document)
                context = context.document;
            var expressions = parse(expression);
            if (!expressions || !expressions.length)
                throw new Error('invalid expression');
            if (!found)
                found = [];
            var uniques, push = isArray(found) ? function (node) {
                    found[found.length] = node;
                } : function (node) {
                    found[found.length++] = node;
                };
            if (expressions.length > 1) {
                uniques = {};
                var plush = push;
                push = function (node) {
                    var uid = uniqueID(node);
                    if (!uniques[uid]) {
                        uniques[uid] = true;
                        plush(node);
                    }
                };
            }
            var node, nodes, part, ctx;
            main:
                for (var i = 0; expression = expressions[i++];) {
                    if (!slick.noQSA && this.querySelectorAll) {
                        nodes = this.querySelectorAll(context, expression);
                        if (nodes !== true) {
                            if (nodes && nodes.length)
                                for (var j = 0; node = nodes[j++];)
                                    if (node.nodeName > '@') {
                                        push(node);
                                    }
                            continue main;
                        }
                    }
                    if (expression.length === 1) {
                        part = expression[0];
                        combinators[part.combinator].call(this, context, part, push);
                    } else {
                        var cs = [context], c, f, u, p = function (node) {
                                var uid = uniqueID(node);
                                if (!u[uid]) {
                                    u[uid] = true;
                                    f[f.length] = node;
                                }
                            };
                        for (var j = 0; part = expression[j++];) {
                            f = [];
                            u = {};
                            for (var k = 0; c = cs[k++];)
                                combinators[part.combinator].call(this, c, part, p);
                            if (!f.length)
                                continue main;
                            if (j === expression.length)
                                found = f;
                            else
                                cs = f;
                        }
                    }
                    if (!found.length)
                        continue main;
                }
            if (uniques && found && found.length > 1)
                this.sort(found);
            return found;
        };
        Finder.prototype.sort = function (nodes) {
            return this.sorter ? Array.prototype.sort.call(nodes, this.sorter) : nodes;
        };
        var pseudos = {
                'empty': function () {
                    var child = this.firstChild;
                    return !(this && this.nodeType === 1) && !(this.innerText || this.textContent || '').length;
                },
                'not': function (expression) {
                    return !slick.match(this, expression);
                },
                'contains': function (text) {
                    return (this.innerText || this.textContent || '').indexOf(text) > -1;
                },
                'first-child': function () {
                    var node = this;
                    while (node = node.previousSibling)
                        if (node.nodeType == 1)
                            return false;
                    return true;
                },
                'last-child': function () {
                    var node = this;
                    while (node = node.nextSibling)
                        if (node.nodeType == 1)
                            return false;
                    return true;
                },
                'only-child': function () {
                    var prev = this;
                    while (prev = prev.previousSibling)
                        if (prev.nodeType == 1)
                            return false;
                    var next = this;
                    while (next = next.nextSibling)
                        if (next.nodeType == 1)
                            return false;
                    return true;
                },
                'first-of-type': function () {
                    var node = this, nodeName = node.nodeName;
                    while (node = node.previousSibling)
                        if (node.nodeName == nodeName)
                            return false;
                    return true;
                },
                'last-of-type': function () {
                    var node = this, nodeName = node.nodeName;
                    while (node = node.nextSibling)
                        if (node.nodeName == nodeName)
                            return false;
                    return true;
                },
                'only-of-type': function () {
                    var prev = this, nodeName = this.nodeName;
                    while (prev = prev.previousSibling)
                        if (prev.nodeName == nodeName)
                            return false;
                    var next = this;
                    while (next = next.nextSibling)
                        if (next.nodeName == nodeName)
                            return false;
                    return true;
                },
                'enabled': function () {
                    return !this.disabled;
                },
                'disabled': function () {
                    return this.disabled;
                },
                'checked': function () {
                    return this.checked || this.selected;
                },
                'selected': function () {
                    return this.selected;
                },
                'focus': function () {
                    var doc = this.ownerDocument;
                    return doc.activeElement === this && (this.href || this.type || slick.hasAttribute(this, 'tabindex'));
                },
                'root': function () {
                    return this === this.ownerDocument.documentElement;
                }
            };
        Finder.prototype.match = function (node, bit, noTag, noId, noClass) {
            if (!slick.noQSA && this.matchesSelector) {
                var matches = this.matchesSelector(node, bit);
                if (matches !== null)
                    return matches;
            }
            if (!noTag && bit.tag) {
                var nodeName = node.nodeName.toLowerCase();
                if (bit.tag === '*') {
                    if (nodeName < '@')
                        return false;
                } else if (nodeName != bit.tag) {
                    return false;
                }
            }
            if (!noId && bit.id && node.getAttribute('id') !== bit.id)
                return false;
            var i, part;
            if (!noClass && bit.classes) {
                var className = this.getAttribute(node, 'class');
                if (!className)
                    return false;
                for (part in bit.classes)
                    if (!RegExp('(^|\\s)' + bit.classes[part] + '(\\s|$)').test(className))
                        return false;
            }
            var name, value;
            if (bit.attributes)
                for (i = 0; part = bit.attributes[i++];) {
                    var operator = part.operator, escaped = part.escapedValue;
                    name = part.name;
                    value = part.value;
                    if (!operator) {
                        if (!this.hasAttribute(node, name))
                            return false;
                    } else {
                        var actual = this.getAttribute(node, name);
                        if (actual == null)
                            return false;
                        switch (operator) {
                        case '^=':
                            if (!RegExp('^' + escaped).test(actual))
                                return false;
                            break;
                        case '$=':
                            if (!RegExp(escaped + '$').test(actual))
                                return false;
                            break;
                        case '~=':
                            if (!RegExp('(^|\\s)' + escaped + '(\\s|$)').test(actual))
                                return false;
                            break;
                        case '|=':
                            if (!RegExp('^' + escaped + '(-|$)').test(actual))
                                return false;
                            break;
                        case '=':
                            if (actual !== value)
                                return false;
                            break;
                        case '*=':
                            if (actual.indexOf(value) === -1)
                                return false;
                            break;
                        default:
                            return false;
                        }
                    }
                }
            if (bit.pseudos)
                for (i = 0; part = bit.pseudos[i++];) {
                    name = part.name;
                    value = part.value;
                    if (pseudos[name])
                        return pseudos[name].call(node, value);
                    if (value != null) {
                        if (this.getAttribute(node, name) !== value)
                            return false;
                    } else {
                        if (!this.hasAttribute(node, name))
                            return false;
                    }
                }
            return true;
        };
        Finder.prototype.matches = function (node, expression) {
            var expressions = parse(expression);
            if (expressions.length === 1 && expressions[0].length === 1) {
                return this.match(node, expressions[0][0]);
            }
            if (!slick.noQSA && this.matchesSelector) {
                var matches = this.matchesSelector(node, expressions);
                if (matches !== null)
                    return matches;
            }
            var nodes = this.search(this.document, expression, { length: 0 });
            for (var i = 0, res; res = nodes[i++];)
                if (node === res)
                    return true;
            return false;
        };
        var finders = {};
        var finder = function (context) {
            var doc = context || document;
            if (doc.document)
                doc = doc.document;
            else if (doc.ownerDocument)
                doc = doc.ownerDocument;
            if (doc.nodeType !== 9)
                throw new TypeError('invalid document');
            var uid = uniqueID(doc);
            return finders[uid] || (finders[uid] = new Finder(doc));
        };
        var slick = function (expression, context) {
            return slick.search(expression, context);
        };
        slick.search = function (expression, context, found) {
            return finder(context).search(context, expression, found);
        };
        slick.find = function (expression, context) {
            return finder(context).search(context, expression)[0] || null;
        };
        slick.getAttribute = function (node, name) {
            return finder(node).getAttribute(node, name);
        };
        slick.hasAttribute = function (node, name) {
            return finder(node).hasAttribute(node, name);
        };
        slick.contains = function (context, node) {
            return finder(context).contains(context, node);
        };
        slick.matches = function (node, expression) {
            return finder(node).matches(node, expression);
        };
        slick.sort = function (nodes) {
            if (nodes && nodes.length > 1)
                finder(nodes[0]).sort(nodes);
            return nodes;
        };
        slick.parse = parse;
        module.exports = slick;
    },
    '16': function (require, module, exports, global) {
        'use strict';
        var $ = require('i');
        $.implement({
            appendChild: function (child) {
                this[0].appendChild($(child)[0]);
                return this;
            },
            insertBefore: function (child, ref) {
                this[0].insertBefore($(child)[0], $(ref)[0]);
                return this;
            },
            removeChild: function (child) {
                this[0].removeChild($(child)[0]);
                return this;
            },
            replaceChild: function (child, ref) {
                this[0].replaceChild($(child)[0], $(ref)[0]);
                return this;
            }
        });
        $.implement({
            before: function (element) {
                element = $(element)[0];
                var parent = element.parentNode;
                if (parent)
                    this.forEach(function (node) {
                        parent.insertBefore(node, element);
                    });
                return this;
            },
            after: function (element) {
                element = $(element)[0];
                var parent = element.parentNode;
                if (parent)
                    this.forEach(function (node) {
                        parent.insertBefore(node, element.nextSibling);
                    });
                return this;
            },
            bottom: function (element) {
                element = $(element)[0];
                return this.forEach(function (node) {
                    element.appendChild(node);
                });
            },
            top: function (element) {
                element = $(element)[0];
                return this.forEach(function (node) {
                    element.insertBefore(node, element.firstChild);
                });
            }
        });
        $.implement({
            insert: $.prototype.bottom,
            remove: function () {
                return this.forEach(function (node) {
                    var parent = node.parentNode;
                    if (parent)
                        parent.removeChild(node);
                });
            },
            replace: function (element) {
                element = $(element)[0];
                element.parentNode.replaceChild(this[0], element);
                return this;
            }
        });
        module.exports = $;
    },
    '17': function (require, module, exports, global) {
        'use strict';
        var prime = require('6'), GroupBase = require('f'), zen = require('h');
        require('p');
        var GroupMain = prime({
                inherits: GroupBase,
                constructor: function (root, spec) {
                    if (!(this instanceof GroupMain)) {
                        return new GroupMain(root, spec);
                    }
                    GroupBase.call(this, root, spec);
                },
                build: function () {
                    this.wrap = zen('fieldset');
                    this.fieldContainer = zen('ul').insert(this.wrap);
                    this.wrap.insert(this.root);
                }
            });
        module.exports = GroupMain;
    },
    '18': function (require, module, exports, global) {
        'use strict';
        var prime = require('6'), forOwn = require('a'), FieldBase = require('g'), zen = require('h');
        require('p');
        var FieldText = prime({
                inherits: FieldBase,
                constructor: function (root, spec) {
                    if (!(this instanceof FieldText)) {
                        return new FieldText(root, spec);
                    }
                    FieldBase.call(this, root, spec);
                },
                build: function () {
                    this.wrap = zen('li');
                    zen('label').text(this.spec.label || '').insert(this.wrap);
                    this.input = zen('input').insert(this.wrap);
                    if (this.spec.name) {
                        this.input.attribute('name', this.spec.name);
                    }
                    if (this.spec.value) {
                        this.input.value(this.spec.value);
                    }
                    if (this.spec.required && this.spec.required === true) {
                        this.input.attribute('required', true);
                    }
                    if (this.spec.attributes) {
                        forOwn(this.spec.attributes, function (value, key) {
                            this.input.attribute(key, value);
                        }.bind(this));
                    }
                    if (this.spec.triggers) {
                        this.input.on('input', this.checkTriggers.bind(this));
                        this.checkTriggers();
                    }
                    this.wrap.insert(this.root);
                }
            });
        module.exports = FieldText;
    },
    '19': function (require, module, exports, global) {
        'use strict';
        var prime = require('6'), forOwn = require('a'), indexOf = require('t'), FieldBase = require('g'), zen = require('h'), $ = require('p');
        var FieldSingleOption = prime({
                inherits: FieldBase,
                styles: [
                    'select',
                    'radio'
                ],
                constructor: function (root, spec) {
                    if (!(this instanceof FieldSingleOption)) {
                        return new FieldSingleOption(root, spec);
                    }
                    FieldBase.call(this, root, spec);
                },
                build: function () {
                    this.style = this.spec.style || 'select';
                    if (indexOf(this.styles, this.style) == -1) {
                        throw new Error('Invalid style selected');
                    }
                    this.wrap = zen('li');
                    zen('label').text(this.spec.label || '').insert(this.wrap);
                    switch (this.style) {
                    case 'select':
                        this.buildSelect();
                        break;
                    case 'radio':
                        this.buildRadio();
                        break;
                    }
                    this.wrap.insert(this.root);
                },
                buildSelect: function () {
                    this.input = zen('select').insert(this.wrap);
                    var i, opt, option = zen('option').value('').text('...').insert(this.input);
                    for (i = 0; i < this.spec.options.length; i++) {
                        opt = this.spec.options[i];
                        option = zen('option').value(opt.value).text(opt.text).insert(this.input);
                        if (this.spec.value && this.spec.value == opt.value) {
                            option.attribute('selected', true);
                        }
                    }
                    if (this.spec.name) {
                        this.input.attribute('name', this.spec.name);
                    }
                    if (this.spec.required && this.spec.required === true) {
                        this.input.attribute('required', true);
                    }
                    if (this.spec.attributes) {
                        forOwn(this.spec.attributes, function (value, key) {
                            this.input.attribute(key, value);
                        }.bind(this));
                    }
                },
                buildRadio: function () {
                    var inputs = [], fieldset = zen('fieldset.options').insert(this.wrap), ul = zen('ul').insert(fieldset), i, opt, li, option, applyAttribute = function (value, key) {
                            option.attribute(key, value);
                        }.bind(this);
                    for (i = 0; i < this.spec.options.length; i++) {
                        opt = this.spec.options[i];
                        li = zen('li').insert(ul);
                        option = zen('input[type=radio]').insert(li);
                        zen('label').text(opt.text).insert(li);
                        if (this.spec.name) {
                            option.attribute('name', this.spec.name);
                        }
                        if (this.spec.value && this.spec.value == opt.value) {
                            option.attribute('checked', true);
                        }
                        if (this.spec.required) {
                            option.attribute('required', true);
                        }
                        if (this.spec.attributes) {
                            forOwn(this.spec.attributes, applyAttribute);
                        }
                    }
                    this.input = $(inputs);
                }
            });
        module.exports = FieldSingleOption;
    },
    '1a': function (require, module, exports, global) {
        'use strict';
        var type = require('d'), pageTypes = require('1'), PageBase = require('e'), zen = require('h');
        require('p');
        var Form = function (root, spec) {
            if (!(this instanceof Form)) {
                return new Form(root, spec);
            }
            if (type(spec) != 'object') {
                throw new Error('pages needs to be an array');
            }
            this.root = root;
            this.spec = spec;
            this.pages = {};
            this.pageCount = this.spec.pages.length;
            this.build();
            if (this.pageCount > 1) {
                this.buildPaging();
                this.activePage = -1;
                this.showPage(0);
            }
        };
        Form.prototype.addPage = function (page) {
            if (!(page instanceof PageBase)) {
                throw new Error('page needs to extend PageBase');
            }
            this.pages.push(page);
        };
        Form.prototype.build = function () {
            this.wrap = zen('form').attribute('method', this.spec.method || 'post').attribute('action', this.spec.action || '#');
            this.pageContainer = this.wrap;
        };
        Form.prototype.buildPaging = function () {
            var i, html = '<ul><li><a href="#prev">Previous</a></li>';
            for (i = 0; i < this.pageCount; i++) {
                html += '<li><a href="#' + i + '">' + (i + 1) + '</a></li>';
            }
            html += '<li><a href="#next">Next</a></li></ul>';
            this.paging = zen('nav').html(html).insert(this.root);
            this.paging.delegate('click', 'a', function (e, el) {
                e.preventDefault();
                var index = el.attribute('href').replace(/^[^#]*#/, '');
                switch (index) {
                case 'next':
                    this.showPage(this.activePage + 1);
                    break;
                case 'prev':
                    this.showPage(this.activePage - 1);
                    break;
                default:
                    this.showPage(index);
                }
            }.bind(this));
        };
        Form.prototype.showPage = function (index) {
            index = parseInt(index, 0);
            if (type(index) != 'number') {
                return;
            }
            if (index < 0 || index > this.pageCount - 1) {
                return;
            }
            if (!(index in this.pages)) {
                var pageSpec = this.spec.pages[index];
                this.pages[index] = new (pageTypes.fetch(pageSpec.type))(this.pageContainer, pageSpec);
            }
            if (this.activePage >= 0) {
                this.hidePage(this.activePage);
            }
            this.pages[index].show();
            this.activePage = index;
        };
        Form.prototype.hidePage = function (index) {
            index = parseInt(index, 0);
            if (type(index) != 'number') {
                return;
            }
            if (!(index in this.pages)) {
                return;
            }
            this.pages[index].hide();
        };
        Form.prototype.attach = function () {
            this.wrap.insert(this.root);
        };
        module.exports = Form;
    }
}));