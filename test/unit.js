/* global describe, it */
const assert = require('assert')
const dirbleWrapper = require('../index')
const API_KEY = process.env.DIRBLE_API_KEY

describe('initializing dirble', function () {
  it('does not throw if provided with a valid api key', function () {
    assert.doesNotThrow(() => {
      dirbleWrapper(API_KEY)
    })
  })

  it('throws if not provided with an api key', function () {
    assert.throws(
      () => {
        dirbleWrapper()
      }
    )
  })

  it('throws if provided with undefined api key', function () {
    assert.throws(
      () => {
        dirbleWrapper(undefined)
      })
  })

  it('throws if provided with null api key', function () {
    assert.throws(
      () => {
        dirbleWrapper(null)
      })
  })

  describe('with api key', function () {
    describe('as a', function () {
      it('object', function () {
        assert.throws(
            () => {
              dirbleWrapper({})
            }
          )
      })

      describe('number', function () {
        it('throws on zero', function () {
          assert.throws(
              () => {
                dirbleWrapper(0)
              }
            )
        })

        it('throws on one', function () {
          assert.throws(
              () => {
                dirbleWrapper(1)
              }
            )
        })
      })

      describe('boolean', function () {
        it('throws on false', function () {
          assert.throws(
              () => {
                dirbleWrapper(false)
              }
            )
        })

        it('throws on true', function () {
          assert.throws(
              () => {
                dirbleWrapper(true)
              }
            )
        })
      })

      describe('string', function () {
        it('throws on empty string', function () {
          assert.throws(
              () => {
                dirbleWrapper('')
              }
            )
        })
      })
    })
  })
})
