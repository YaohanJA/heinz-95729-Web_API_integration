module.exports = {
  scope: 'heinz',
  name: 'productsComponent',
  dependencies: ['Vue'],
  factory: (Vue) => {
    'use strict'

    var state = { products: [] }

    const component = Vue.component('products', {
      template: `
        <div class="products-component">
          <h2 class="text-center"> All Books </h2>
          <hr />
          <div class="row">
              <div class="col-sm-6 col-md-4 product-col" v-for="product in products">
                <div class="thumbnail">
                  <a class="thumbnail-img" href="javascript:void(0);" v-on:click="product.viewDetails">
                    <img :src="product.thumbnailLink" :alt="product.thumbnailAlt">
                  </a>
                  <div class="caption">
                    <h6><a href="javascript:void(0);" v-on:click="product.viewDetails">{{product.title}}</a></h6>
                    <div class="description">{{product.description | truncate(120)}}</div>
                    <label>$ {{product.price}}</label>
                    <a class="btn btn-sm btn-warning buy-now" href="javascript:void(0);" v-on:click="product.addToCart">
                    <i class="fa fa-shopping-cart"> Add</i>
                    </a>
                  </div>
                </div>
              </div>
          </div><!-- /row -->
        </div><!-- /component -->`,
      data: () => {
        return state
      },
      filters: {
        truncate: function (value, limit) {
          if (value.length > limit) {
            value = value.substring(0, (limit - 3)) + '...';
        }
    
        return value
        }
      }
    })

    const setProducts = (searchResults) => {
      state = searchResults
    }

    return { component, setProducts }
  }
}

