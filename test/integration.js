/* global describe, it */
require('dotenv').load()
const assert = require('assert')
const API_KEY = process.env.DIRBLE_API_KEY
const dirble = require('../index')(API_KEY)

describe('Calling', function () {
  const defaultPageNumber = 0
  const offset = 1
  const defaultPerPage = 2
  const perPage = 5
  this.timeout(5000)
  this.slow(1000)

  describe('getStations() with', function () {
    it('no arguments returns a list of stations', function () {
      return dirble.getStations().then((stations) => {
        assert(stations.length > 0)
      })
    })

    it('perPage = 5, returns exactly 5 stations', function () {
      return dirble.getStations(defaultPageNumber, perPage).then((stations) => {
        assert.equal(stations.length, perPage)
      })
    })

    it('offset = 1, returns stations from specified offset', function () {
      return dirble.getStations(defaultPageNumber, defaultPerPage).then(function (stations) {
        var expectedStation = stations[offset]
        dirble.getStations(defaultPageNumber, defaultPerPage, offset).then(function (stations) {
          assert.deepStrictEqual(stations[0], expectedStation)
        })
      })
    })
  })

  describe('getRecentlyAddedStations() with', function () {
    it('no arguments returns a list of stations', function () {
      return dirble.getRecentlyAddedStations().then((stations) => {
        assert(stations.length > 0)
      })
    })

    it('perPage = 5, returns exactly 5 stations', function () {
      return dirble.getRecentlyAddedStations(defaultPageNumber, perPage).then((stations) => {
        assert.equal(stations.length, perPage)
      })
    })

    it('offset = 1, returns stations from specified offset', function () {
      return dirble.getRecentlyAddedStations(defaultPageNumber, defaultPerPage).then(function (stations) {
        var expectedStation = stations[offset]
        dirble.getRecentlyAddedStations(defaultPageNumber, defaultPerPage, offset).then(function (stations) {
          assert.deepStrictEqual(stations[0], expectedStation)
        })
      })
    })
  })
})
