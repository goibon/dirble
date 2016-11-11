[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Dirble
A NodeJS wrapper for the [dirble API](https://dirble.com/developer/).

## Usage
Install using `npm install --save dirble`

Then just include it using your dirble API key.

```js
// Get your api key from 'https://dirble.com/developer/'
const dirble = require('dirble')(API_KEY)
```

Every method returns a promise so you can use them like this:


```js
dirble.getStations()
.then( (response) => {
  // Parse JSON response
})
```

## Contributing
Contributions are always welcome!
If you have any questions or comments feel free to [open up an issue](https://github.com/goibon/dirble/issues/new) or even better, [create a pull request](https://github.com/goibon/dirble/pulls).
