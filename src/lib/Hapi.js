/**
 * # Hapi.js
 *
 * This class interfaces with Hapi.com using the rest api
 * see [http://hapijs.com/api](http://hapijs.com/api)
 *
 * Singleton module see: https://k94n.com/es6-modules-single-instance-pattern
 */
'use strict'

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import CONFIG from './config'
import _ from 'underscore'
import Backend from './Backend'

export class Hapi extends Backend {
  /**
   * ## Hapi.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  initialize (token) {
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw new Error('TokenMissing')
    }
    this._sessionToken =
      _.isNull(token) ? null : token.sessionToken

    this.API_BASE_URL = CONFIG.backend.hapiLocal
          ? CONFIG.HAPI.local.url
          : CONFIG.HAPI.remote.url
  }
  /**
   * ### signup
   *
   * @param data object
   *
   * {username: "barton", email: "foo@gmail.com", password: "Passw0rd!"}
   *
   * @return
   * if ok, res.json={createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA",
   *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async signup (data) {
    console.log('Запрос на регистрацию, боди:')
    console.log(data)
    return await this._fetch({
      method: 'POST',
      url: '/register',
      body: data
    })
      .then((res) => {
        console.log('Запрос на регистрацию, ответ:')
        console.log(res)
        console.log(res.json)
        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw res.json
        }
      })
      .catch((error) => {
        console.log('Запрос на регистрацию, ошибка:')
        console.log(error)
        throw (error)
      })
  }
  /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {username: "barton", password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * objectId: "Z4yvP19OeL"
   * email: "barton@foo.com"
   * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * username: "barton"
   *
   */
  async login (data) {
    return await this._fetch({
      method: 'POST',
      url: '/login',
      body: data
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  /**
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * if good:
   * {createdAt: "2015-12-30T15:29:36.611Z"
   *  email: "barton@acclivyx.com"
   *  objectId: "Z4yvP19OeL"
   *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
   *  updatedAt: "2015-12-30T15:29:36.611Z"
   *  username: "barton"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async getProfile () {
    return await this._fetch({
      method: 'GET',
      url: '/user/profile'
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId  _id
   * @param data object:
   * {username: "barton", email: "barton@foo.com"}
   */
  async updateProfile (userId, data) {
    return await this._fetch({
      method: 'POST',
      url: '/profile/' + userId,
      body: data
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return {}
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  async getTasklist (sessionToken) {
    return await this._fetch({
      method: 'GET',
      url: '/tasks'
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  async addTask (data) {
    return await this._fetch({
      method: 'POST',
      url: '/tasks',
      body: data
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return {}
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  async getEnvdList (sessionToken) {
    return await this._fetch({
      method: 'GET',
      url: '/envd'
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  async getEnvd (id) {
    return await this._fetch({
      method: 'GET',
      url: '/envd/' + id
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  async editENVD (id) {
    return await this._fetch({
      method: 'POST',
      url: '/envd/' + id,
      body: {
        ifns: '',
        okved: '',
        k1: 0,
        k2: 0,
        factors: [0, 0, 0],
        taxBase: 0,
        taxRate: 0,
        insurancePayments: 0,
        taxDecrease: 0,
        taxBeforeInsurance: 0,
        taxToPay: 0
      }
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return {}
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  async addEvndStart (body) {
    return await this._fetch({
      method: 'POST',
      url: '/envd',
      body: {
        id: 4,
        year: 2016,
        quarter: 4,
        activityType: 1
      }
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return {}
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }

  /**
   * ### _fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  {code: response.code,
   *   status: response.status,
   *   json: response.json()
   */
  async _fetch (opts) {
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts)

    var reqOpts = {
      method: opts.method,
      headers: {
      }
    }

    if (this._sessionToken) {
      reqOpts.headers['Authorization'] = 'Bearer ' + this._sessionToken
    }

    if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'DELETE') {
      reqOpts.headers['Accept'] = 'application/json'
      reqOpts.headers['Content-Type'] = 'application/json'
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body)
    }

    let url = this.API_BASE_URL + opts.url
    let res = {}

    let response = await fetch(url, reqOpts)
    res.status = response.status
    res.code = response.code

    return response.json()
      .then((json) => {
        res.json = json
        return res
      })
  }
}
// The singleton variable
export let hapi = new Hapi()
