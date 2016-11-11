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
    return new Promise(function (resolve, reject) {
      var query = `/stations?${querystring.stringify({ page: page, per_page: perPage, offset: offset, token: apiKey })}`

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

  /*
      Returns a list of recently added radio stations
      @param {number} [page = 0] show which per_page stations to show
      @param {number} [perPage = 20] How many stations per page to show
      @param {number} [offset = 0]
  */
  dirble.getRecentlyAddedStations = function (page, perPage, offset) {
    return new Promise(function (resolve, reject) {
      var query = `/stations/recent?${querystring.stringify({ page: page, per_page: perPage, offset: offset, token: apiKey })}`

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

  /*
      Returns a list of popular radio stations
      @param {number} [page = 0] show which per_page stations to show
      @param {number} [perPage = 20] How many stations per page to show
      @param {number} [offset = 0]
  */
  dirble.getPopularStations = function (page, perPage, offset) {
    return new Promise(function (resolve, reject) {
      var query = `/stations/popular?${querystring.stringify({ page: page, per_page: perPage, offset: offset, token: apiKey })}`

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

  /*
      Returns a radio station with the given id
      @param {number} [id] Id of a radio station
  */
  dirble.getStation = function (id) {
    return new Promise(function (resolve, reject) {
      var query = `/station/${id}?${querystring.stringify({ token: apiKey })}`

      if (!id || id < 0) {
        reject('You must supply a valid id')
      }

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
