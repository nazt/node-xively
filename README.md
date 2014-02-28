


Xively API wrapper for nodejs

## Getting Started
Install the module with: `npm install xively`

```javascript
var node_xively = require('node-xively');
```

## Documentation
_(Coming soon)_

## Examples
```
var XivelyClient = require('xively');
var x = new XivelyClient();
x.setKey('blahblah');
var dp = {
      "version":"1.0.0",
       "datastreams" : [
	  {
	      "id" : "temperature",
	      "current_value" : 30
	  }
	]
}
x.feed.new('522171645', {
      data_point: dp,
      callback: function(e) { console.log(e); }
}); 
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2014 Nat  
Licensed under the MIT license.
