var asyncChainable = require('async-chainable');
var asyncChainableLog = require('..');
var expect = require('chai').expect;

describe('async-chainable-log - simple logging to console', function() {

	it('should log to the console without any config', function(finish) {
		asyncChainable()
			.use(asyncChainableLog)
			.log('Log entry 1')
			.then(function(next) {
				setTimeout(next, 1000);
			})
			.log('Log entry 2')
			.end(finish);
	});

	it('should log to a custom function', function(finish) {
		var logged = [];

		asyncChainable()
			.use(asyncChainableLog)
			.logDefaults({
				callback: function() {
					var args = Array.prototype.slice.call(arguments, 0);
					console.log('LOG!', args.join(''));
					logged.push(args.join(''));
				},
			})
			.log('Log entry 1')
			.then(function(next) {
				setTimeout(next, 1000);
			})
			.log('Log entry 2')
			.log('Log entry 3')
			.end(function(err) {
				expect(err).to.not.be.ok;
				expect(logged).to.be.an.array;
				expect(logged).to.be.length(3);
				expect(logged).to.deep.equal(['Log entry 1', 'Log entry 2', 'Log entry 3']);
				finish();
			});
	});

	it('should log to a custom function with a prefix + suffix', function(finish) {
		var logged = [];

		asyncChainable()
			.use(asyncChainableLog)
			.logDefaults({
				callback: function(text) {
					var args = Array.prototype.slice.call(arguments, 0);
					console.log('LOG!', args.join(''));
					logged.push(args.join(''));
				},
				prefix: '[[[',
				suffix: ']]]',
			})
			.log('Log entry 1')
			.then(function(next) {
				setTimeout(next, 1000);
			})
			.log('Log entry 2')
			.log('Log entry 3')
			.end(function(err) {
				expect(err).to.not.be.ok;
				expect(logged).to.be.an.array;
				expect(logged).to.be.length(3);
				expect(logged).to.deep.equal(['[[[Log entry 1]]]', '[[[Log entry 2]]]', '[[[Log entry 3]]]']);
				finish();
			});
	});
});
