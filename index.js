const querystring = require('querystring')
const request = require('request')
const hostname = 'http://api.dirble.com/v2'

module.exports = function (apiKey) {
  if (!apiKey) {
    throw new Error('You must supply an API key!')
  }
  var dirble = {}

  /*
      Returns a list of radio stations
      @param {number} [page = 0] show which per_page stations to show
      @param {number} [perPage = 20] How many stations per page to show
      @param {number} [offset = 0]
  */
  dirble.getStations = function (page, perPage, offset) {
    var query = '/stations?' + querystring.stringify({ page: page, per_page: perPage, offset: offset, token: apiKey })

    return new Promise(function (resolve, reject) {
      request(hostname + query, function (error, response, body) {
        if (error) {
          reject(error)
        }
        if (response.statusCode !== 200) {
          reject(response.statusMessage)
        }

        resolve(body)
      })
    })
  }

  return dirble
}
