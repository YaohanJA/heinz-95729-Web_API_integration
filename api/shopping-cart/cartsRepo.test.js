const dep = require('../test.js')
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
chai.use(chaiAsPromised);
const should = chai.should();
let Cart;
let cartsRepoFactory;
let testItem;
let testItem2;
let testItem3;
let repo;
let db;

describe('CartRepo Test Suite', function () {
  before(function (done) {
    // DB dependency required for cartsRepo
    db = dep.connect();
    db.on('error', (err) => {
      console.log(err)
    });
    db.once('open', function () {
      done()
    });

    // compose the dependencies for cartsRepo.js
    // Cart dependency required for cartsRepo
    Cart = require('./Cart.js').factory(dep.blueprint, dep.immutable, dep.mongodb.ObjectID)

    // Cart Repository (Object under test)
    cartsRepoFactory = require('./cartsRepo').factory
    repo = cartsRepoFactory(db, Cart, dep.blueprint)

    // Sample carts to be used for testing
    testCart = {
      "uid": "some_complex_uid3",
      "total": 40.46,
      "items": [
        {
          "name": "new book 11",
          "quantity": 2,
          "price": 20.23,
          "item_uid": "some_item_uid"
        }
      ]
    }

    testItem1 = {
      "name": "new book 12",
      "quantity": 1,
      "price": 10.27,
      "uid": "some_complex_uid3",
      "item_uid": "some_item_uid_12"
    }

    testItem2 = {
      "name": "new book 13",
      "quantity": 1,
      "price": 10.27,
      "uid": 12893,
      "item_uid": "some_item_uid_12"
    }

    testItem3 = {
      "quantity": 5,
      "uid": "some_complex_uid3",
      "item_uid": "some_item_uid_12"
    }

    testCartInfo = {
      "uid": "some_complex_uid3",
      "total": "172.83"
    }


  });

  describe('Create cart', function () {
    it('should create a new cart', function () {
      return Promise.resolve(repo.create(testCart))
        .then(cart => {
          cart.ops[0].uid.should.equal(testCart.uid)
        })
    });
  });

  describe('Add a item to an exsisting cart', function () {
    it('should a item to an exsisting cart', function () {
      return Promise.resolve(repo.add(testItem1))
        .then(doc => {
          doc.lastErrorObject.updatedExisting.should.equal(true)
        })
    });
  });

  describe('Update item quantity in the cart', function () {
    it('should update the item quantity in the cart', function () {
      return Promise.resolve(repo.updateItemQuantity(testItem3))
        .then(doc => {
          doc.modifiedCount.should.equal(1)
        })
    });
  });

  describe('Delete item in the cart', function () {
    it('should delete the item in the cart', function () {
      return Promise.resolve(repo.deleteCartItem(testItem1))
        .then(doc => {
          doc.modifiedCount.should.equal(1)
        })
    });
  });

  describe('Update the total in the cart', function () {
    it('should update the total in the cart', function () {
      return Promise.resolve(repo.updateCartTotal(testCartInfo.uid,testCartInfo.total))
        .then(doc => {
          doc.lastErrorObject.updatedExisting.should.equal(true)
        })
    });
  });

  describe('Get the cart', function () {
    it('should get the cart', function () {
      return Promise.resolve(repo.get(testCart.uid))
        .then(cart => {
          cart.uid.should.equal(testCart.uid)
        })
    });
  });

  describe('Create cart with empty item', function () {
    it('it should reject the promise', function () {
      return expect(repo.create())
        .to.be.rejectedWith('A payload is required to create a Cart');
    });
  });

  describe('Add item to cart with empty item', function () {
    it('it should reject the promise', function () {
      return expect(repo.add(testItem2))
        .to.be.rejectedWith('A uid is required to get a Cart');
    });
  });

  describe('Update item with empty item', function () {
    it('it should reject the promise', function () {
      return expect(repo.updateItemQuantity({}))
        .to.be.rejectedWith('A uid is required to get a Cart');
    });
  });

  describe('Delete item with empty item', function () {
    it('it should reject the promise', function () {
      return expect(repo.deleteCartItem({}))
        .to.be.rejectedWith('A uid is required to get a Cart');
    });
  });

  describe('Delete cart with empty item', function () {
    it('it should reject the promise', function () {
      return expect(repo.deleteCart({}))
        .to.be.rejectedWith('A uid is required to get a Cart');
    });
  });

  describe('Update cart total with empty item', function () {
    it('it should reject the promise', function () {
      return expect(repo.updateCartTotal({}))
        .to.be.rejectedWith('A uid is required to get a Cart');
    });
  });

  describe('Update cart total with empty item', function () {
    it('it should reject the promise', function () {
      return expect(repo.get())
        .to.be.rejectedWith('A uid is required to get a Cart');
    });
  });

  // Test delete the whole cart at the end of the test
  describe('Delete cart', function () {
    it('should delete the cart', function () {
      return Promise.resolve(repo.deleteCart(testCart.uid))
        .then(doc => {
          doc.deletedCount.should.equal(1)
        })
    });
  });

});
