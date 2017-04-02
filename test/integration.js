/* global describe, it */
const assert = require('assert')
const API_KEY = process.env.DIRBLE_API_KEY
const dirble = require('../index')(API_KEY)
const defaultPageNumber = 0

describe('Calling getStations() with', function () {
  it('no arguments returns a list of stations', function () {
    return dirble.getStations().then((stations) => {
      assert(stations.length > 0)
    })
  })

  it('perPage = 5, returns exactly 5 stations', function () {
    const expectedAmountOfStations = 5
    return dirble.getStations(defaultPageNumber, expectedAmountOfStations).then((stations) => {
      assert.equal(stations.length, expectedAmountOfStations)
    })
  })

  it('offset = 1, returns stations from specified offset', function () {
    const offset = 1
    const amountofStations = 2
    return dirble.getStations(defaultPageNumber, amountofStations).then(function (stations) {
      var expectedStation = stations[offset]
      dirble.getStations(defaultPageNumber, amountofStations, offset).then(function (stations) {
        assert.deepStrictEqual(stations[0], expectedStation)
      })
    })
  })
})
