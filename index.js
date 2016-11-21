const querystring = require('querystring')
const request = require('request')
const hostname = 'http://api.dirble.com/v2'

module.exports = function (apiKey) {
  if (!apiKey) {
    throw new Error('You must supply an API key!')
  }

  /*
      Makes a request to the dirble api at the given path using the given parameters
      @param {string} path The path the request will be sent to
      @param {object} params Any query parameters that should be sent along with the request
  */
  function makeRequest (path, params) {
    // The api key will always be sent as a query parameter
    params = params || {}
    params.token = apiKey

    return new Promise(function (resolve, reject) {
      request(`${hostname}${path}?${querystring.stringify(params)}`,
        function (error, response, body) {
          if (error) {
            reject(error)
          }
          try {
            var result = JSON.parse(body)
            if (response.statusCode === 200) {
              resolve(result)
            }
            reject(result.error)
          } catch (error) {
            reject(response.statusMessage)
          }
        })
    })
  }

  var dirble = {}

  /*
      Returns a list of radio stations
      @param {number} [page = 0] show which per_page stations to show
      @param {number} [perPage = 20] How many stations per page to show
      @param {number} [offset = 0]
  */
  dirble.getStations = function (page, perPage, offset) {
    return makeRequest('/stations', { page: page, per_page: perPage, offset: offset })
  }

  /*
      Returns a list of recently added radio stations
      @param {number} [page = 0] show which per_page stations to show
      @param {number} [perPage = 20] How many stations per page to show
      @param {number} [offset = 0]
  */
  dirble.getRecentlyAddedStations = function (page, perPage, offset) {
    return makeRequest('/stations/recent', { page: page, per_page: perPage, offset: offset })
  }

  /*
      Returns a list of popular radio stations
      @param {number} [page = 0] show which per_page stations to show
      @param {number} [perPage = 20] How many stations per page to show
      @param {number} [offset = 0]
  */
  dirble.getPopularStations = function (page, perPage, offset) {
    return makeRequest('/stations/popular', { page: page, per_page: perPage, offset: offset })
  }

  /*
      Returns a radio station with the given id
      @param {number} [id] Id of a radio station
  */
  dirble.getStation = function (id) {
    if (!id || id < 0) {
      return new Promise(function (resolve, reject) {
        reject('You must supply a valid id')
      })
    }
    return makeRequest(`/station/${id}`)
  }

  /*
      Returns a list of radio stations that are similar to the radio station with the given id
      @param {number} [id] Id of a radio station
  */
  dirble.getSimilarStations = function (id) {
    if (!id || id < 0) {
      return new Promise(function (resolve, reject) {
        reject('You must supply a valid id')
      })
    }
    return makeRequest(`/station/${id}/similar`)
  }

  /*
      Returns a list of recently played songs from a radio station with the given id
      @param {number} [id] Id of a radio station
  */
  dirble.getSongHistory = function (id) {
    if (!id || id < 0) {
      return new Promise(function (resolve, reject) {
        reject('You must supply a valid id')
      })
    }
    return makeRequest(`/station/${id}/song_history`)
  }

  /*
      Returns a list of recently played songs from all stations
  */
  dirble.getSongHistory = function () {
    return makeRequest('/songs')
  }

  /*
      Returns a list of all categories
  */
  dirble.getCategories = function () {
    return makeRequest('/categories')
  }

  /*
      Returns a list of all primary categories
  */
  dirble.getPrimaryCategories = function () {
    return makeRequest('/categories/primary')
  }

  /*
      Returns a list of all child categories for a given category
      NOTE: Dirble does not seem to respect page, per_page or offset query parameters

      @param {number} id The Id of a category
      @param {number} [page = 0] show which per_page stations to show
      @param {number} [perPage = 20] How many stations per page to show
      @param {number} [offset = 0]
  */
  dirble.getChildCategories = function (id, page, perPage, offset) {
    if (!id || id < 0) {
      return new Promise(function (resolve, reject) {
        reject('You must supply a valid id')
      })
    }
    return makeRequest(`/category/${id}/childs`, { page: page, per_page: perPage, offset: offset })
  }

  /*
      Returns all the categories as a tree structure
  */
  dirble.getCategoryTree = function () {
    return makeRequest('/categories/tree')
  }

  /*
      Returns a list of radio stations for a given category
      @param {number} id The id of a category
      @param {number} [page = 0] show which per_page stations to show
      @param {number} [perPage = 20] How many stations per page to show
      @param {number} [offset = 0]
  */
  dirble.getStationsWithCategory = function (id, page, perPage, offset) {
    if (!id || id < 0) {
      return new Promise(function (resolve, reject) {
        reject('You must supply a valid id')
      })
    }
    return makeRequest(`/category/${id}/stations`, { page: page, per_page: perPage, offset: offset })
  }

  /*
      Returns a list of radio stations based on a search query
      @param {string} query A string to search for
  */
  dirble.search = function (query) {
    if (!query) {
      return new Promise(function (resolve, reject) {
        reject('You must supply a valid query')
      })
    }
    return makeRequest(`/search/${query}`)
  }

  /*
      Returns a list of all countries
  */
  dirble.getCountries = function () {
    return makeRequest('/countries')
  }

  /*
      Returns a list of all continents
  */
  dirble.getContinents = function () {
    return makeRequest('/continents')
  }

  /*
      Returns a list of countries for a given continent
      @param {number} id The id of a continent
  */
  dirble.getCountriesInContinent = function (id) {
    if (!id || id < 0) {
      return new Promise(function (resolve, reject) {
        reject('You must supply a valid id')
      })
    }
    return makeRequest(`/continents/${id}/countries`)
  }

  /*
      Returns a list of radio stations for a given country
      @param {string} countryCode The code for a country, eg. 'US'
      @param {number} [page = 0] show which per_page stations to show
      @param {number} [perPage = 20] How many stations per page to show
      @param {number} [offset = 0]
  */
  dirble.getStationsInCountry = function (countryCode, page, perPage, offset) {
    if (!countryCode) {
      return new Promise(function (resolve, reject) {
        reject('You must supply a valid country code')
      })
    }
    return makeRequest(`/countries/${countryCode}/stations`, { page: page, per_page: perPage, offset: offset })
  }

  return dirble
}
