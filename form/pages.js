'use strict';

var prime = require('prime'),
	bind = require('mout/function/bind'),
	zen = require('elements/zen'),
	$ = require('elements'),
	pagers = require('../pagers'),
	pages = require('../pages');

module.exports = prime({
	buildPage: function(index){
		var spec = this.spec.pages[index], page, i, group;
		spec.type = spec.type || 'default';
		page = new pages[spec.type](spec);

		for (i = 0; i < spec.groups.length; i++){
			group = this.buildGroup(spec.groups[i]);
			page.appendGroup(group);
		}

		this.pages[index] = page;
		return page;
	},

	buildPager: function(){
		var activeTab;
		this.pagerWrap = zen('nav.nav-pager.type-' + this.spec.pager.type + '.position-' + this.spec.pager.position);
		this.pagerWrap.delegate('click', 'li', bind(function(e, el){
			e.preventDefault();
			activeTab.removeClass('active');
			el.addClass('active');
			activeTab = el;
			this.showPage(el.data('index'));
		}, this));

		this.pager = new pagers[this.spec.pager.type](this.spec, this.data);
		this.pager.attach(this.pagerWrap);

		activeTab = $(this.pagerWrap.search('li')[0]);
		activeTab.addClass('active');

		var method = this.spec.pager.position == 'top' ? 'before' : 'after';
		this.pagerWrap[method](this.pageContainer);
	},

	showPage: function(index){
		index = parseInt(index, 0);
		if (isNaN(index) || !this.spec.pages[index] || index == this.activepage) return;

		if (!(index in this.pages)) {
			var page = this.buildPage(index);
			page.attach(this.pageContainer);
		}

		if (this.activePage > -1) {
			this.hidePage(this.activePage);
		}

		this.pages[index].show();
		this.activePage = index;
	},

	hidePage: function(index){
		index = parseInt(index, 0);
		if (isNaN(index) || !(index in this.pages)) return;

		this.pages[index].hide();
	}
});
