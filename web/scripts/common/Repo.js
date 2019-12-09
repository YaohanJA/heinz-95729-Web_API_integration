module.exports = {
  scope: 'heinz',
  name: 'Repo',
  dependencies: ['environment', 'storage', 'fetch'],
  factory: function (env, storage, fetch) {
    'use strict'

    var baseUrl = env.get('apiOrigin')

    return Repo

    function Repo (config) {
      var url = baseUrl
      config = Object.assign({}, config)

      return {
        list: list,
        get: get,
        post: post,
        put: put,
        patch: patch,
        remove: remove
      }

      function list (options, callback) {
        return get(options, callback)
      }

      function get (options, callback) {
        options = options || {}
        options.method = 'GET'
        execute(options, callback)
      }

      function post (options, callback) {
        options = options || {}
        options.method = 'POST'

        execute(options, callback)
      }

      function put (options, callback) {
        options = options || {}
        options.method = 'PUT'

        execute(options, callback)
      }

      function patch (options, callback) {
        options = options || {}
        options.method = 'PATCH'

        execute(options, callback)
      }

      function remove (options, callback) {
        options = options || {}
        options.method = 'DELETE'

        execute(options, callback)
      }

      function execute (options, callback) {
        options.headers = ensureHeaders(options)
        url = makeUrl(options.path)
        if (typeof options.body === 'object') {
          options.body = JSON.stringify(options.body)
        }

        fetch(url, options)
          .then(function (res) {
            if (res.status >= 200 && res.status < 300) {
              if (options.responseType){
                return res.blob()
              }
              return res.json()
            } else {
              var error = new Error('The request failed. see data for more information: ' + url)
              error.data = {
                url: url,
                options: options,
                res: res
              }
              throw error
            }
          }).then(function (json) {
            if (config && typeof config.Model === 'function') {
              if (Array.isArray(json)) {
                json = json.map(config.Model)
              } else {
                json = new config.Model(json)
              }
            }
            callback(null, json)
          }).catch(function (ex) {
            callback(ex)
          })
      }

      function ensureHeaders (options) {
        var headers = options.headers || {}
        headers.Authorization = makeAuthorizationHeader()
        headers.Accept = headers.Accept || 'application/json;version=' + env.get('defaultVersion')
        headers['Content-Type'] = headers['Content-Type'] || 'application/json'
        return headers
      }

      function makeAuthorizationHeader () {
        var jwt = storage.get('jwt')

        if (jwt) {
          return `Bearer ${jwt}`
        }
      }

      function makeUrl (path) {
        // TODO: make sure concatenation results in valid / delimiter
        return baseUrl + path
      }
    }
  }
}
