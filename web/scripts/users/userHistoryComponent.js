module.exports = {
  scope: 'heinz',
  name: 'userHistoryComponent',
  dependencies: ['Vue'],
  factory: (Vue) => {
    'use strict'

    var state = { products: [] }

    const component = Vue.component('history', {
      template: `
        <div class="products-component history-component">
          <div class="row">
            <div v-for="product in products">
              <div class="col-sm-6 col-md-4 product-col">
                <div class="thumbnail">
                  <a class="thumbnail-img" href="javascript:void(0);" v-on:click="product.viewDetails">
                    <img :src="product.thumbnailLink" :alt="product.thumbnailAlt">
                  </a>

                  <div class="caption">
                    <h3><a href="javascript:void(0);" v-on:click="product.viewDetails">{{product.title}}</a></h3>
                    <div class="description">{{product.description}}</div>
                    <div class="overlay"></div>
                    <a class="buy-now" href="javascript:void(0);" v-on:click="product.addToCart">{{product.price}}</a>
                  </div>
                </div>
              </div>
            </div> <!-- /products -->
          </div><!-- /row -->
        </div><!-- /component -->`,
      data: () => {
        return state
      },
    })

    const setProducts = (searchResults) => {
      state = searchResults
    }

    return { component, setProducts }
  }
}
