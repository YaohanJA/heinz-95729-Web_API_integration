module.exports = {
  scope: 'heinz',
  name: 'usersController',
  dependencies: ['router', 'storage'],
  factory: (router, storage) => {
    'use strict'

    /**
     * Route binding (controller)
     * @param {Vue} app - the main Vue instance (not the header)
     */
    function registerRoutes (app) {
      router('/login', () => {
        if (storage.exists('jwt')) {
          // TODO: the user is logged in, send them to a profile page
          app.currentView = 'home'
        }else{
          app.currentView = 'login'
        }
      })

      router('/register', () => {
        app.currentView = 'register'
      })
    }

    return { registerRoutes }
  }
}
