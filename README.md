async-chainable-log
===================
Plugin for [async-chainable](https://github.com/hash-bang/async-chainable) that provides simple logging.


	var asyncChainable = require('async-chainable');
	var asyncChainableLog = require('async-chainable-log');

	asyncChainable()
		.use(asyncChainableLog)

		.log('Waiting 1000ms')
		.then(function(next) {
			setTimeout(next, 1000);
		})

		.logDefaults({prefix: '\t\t'})
		.log('This will be indented with two tabs')

		.end();


API
===
The async-chainable-log API exposes two API calls `log()` and `logDefaults()` the first simply logs and the second takes an object with the following parameters:

| Option             | Description                                                                                                                     |
|--------------------|----------------------------------------------------------------------------------------|
| `callback`         | Optional callback function to use for logging. The default is `console.log`            |
| `prefix`           | Optional prefix to prepend to all logging output before it is passed to the `callback` |
| `suffix`           | Optional suffix to append to all logging output before it is passed to the `callback`  |
