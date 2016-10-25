var argy = require('argy');

module.exports = function() {
	// log() {{{
	this._plugins['log'] = function(params) {
		if (this._logDefaults.prefix) params.content.unshift(this._logDefaults.prefix);
		if (this._logDefaults.suffix) params.content.push(this._logDefaults.suffix);

		this._logDefaults.callback.apply(this, params.content);

		this._execute();
	};

	this.log = function() {
		this._struct.push({
			type: 'log',
			content: Array.prototype.slice.call(arguments, 0),
		});

		return this;
	};
	// }}}

	// logDefaults() {{{
	this._logDefaults = {
		callback: console.log,
	};

	this._plugins['logDefaults'] = function(params) {
		for (var k in params.options)
			this._logDefaults[k] = params.options[k];

		this._execute();
	};

	this.logDefaults = function() {
		var chain = this;

		argy(arguments)
			.ifForm('object', function(settings) {
				chain._struct.push({
					type: 'logDefaults',
					options: settings,
				});
			})
			.ifForm('function', function(callback) {
				chain._struct.push({
					type: 'logDefaults',
					options: {callback: callback},
				});
			})
			.ifFormElse(function(form) {
				throw new Error('Unknown async-chainable-log#logDefaults() style: ' + form);
			});

		return this;
	};
	// }}}
};
