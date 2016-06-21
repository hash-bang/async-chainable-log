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
		var calledAs = this._getOverload(arguments);

		switch (calledAs) {
			case 'object':
				this._struct.push({
					type: 'logDefaults',
					options: arguments[0],
				});
				break;
			case 'function':
				this._struct.push({
					type: 'logDefaults',
					options: {callback: arguments[0]},
				});
				break;
			default:
				throw new Error('Unknown async-chainable-log#logDefaults() style: ' + calledAs);
		}

		return this;
	};
	// }}}
};
