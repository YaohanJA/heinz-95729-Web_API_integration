module.exports = {
  scope: 'heinz',
  name: 'userHistoryComponent',
  dependencies: ['Vue', 'storage', 'router'],
  factory: (Vue, storage, router) => {
    'use strict'

    var state = {
      name: "",
      email: ""
    }

    const component = Vue.component('history', {
      template: `
        <div class="history-component">
          
          <h2 class='text-center'>User Profile</h2> 
          <hr />

          <table class="table">
            <tr>
            <td>Name</td>
            <td>{{ name }}</td>
            </tr>
            <tr>
            <td>Email</td>
            <td> {{ email }}</td>
            </tr>
            <tr>
            <td><a class="btn btn-success view" href="/userproducts"> View History </a></td>
            <td colspan='1'><button class="btn btn-warning logout" v-on:click="logout">Log out</button></td>
            </tr>
          </table>
         
          
          </div>
         
        </div><!-- /component -->`,
      data: () => {
        return state
      },
      methods: {
        logout: function(event) {
          storage.remove('jwt')
          storage.remove('user')
          return router.navigate('/login')
        }
      }
    })

    const setUser = (user) => {
      state = user
    }

    return {
      component,
      setUser
    }
  }
}
