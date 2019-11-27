module.exports.name = 'updateCart'
module.exports.dependencies = ['cartsRepo', 'Cart']
module.exports.factory = function (repo, Cart) {
  'use strict'
 
  
  /**
   * Updates the quantity of an item in a shopping cart
   * @param {Object} payload - the cart and item details
   */
  const updateCartItemQuantity = (payload) => (resolve, reject) => {
    return repo.updateItemQuantity(payload)
      .then(resolve)
      .catch(reject)
  }

  

  return { updateCartItemQuantity }
}