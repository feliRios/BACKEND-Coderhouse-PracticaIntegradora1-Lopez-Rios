import { cartModel } from "../models/cart.model.js";
import { NotFoundError } from "../../../utils.js";
import { CastError } from "mongoose";

class CartManager {
  constructor(){}

  async createCart() {
    await cartModel.create({products: []});
  }

  async getCarts() {
    return await cartModel.find();
  }

  async getCartById(cartId){
    const cart = await cartModel.findById(cartId);
      if(cart){
        return cart;
      } else {
        throw new NotFoundError(`No existe ningun carrito con el ID ${cartId} para mostrar`);
      }
  }

  async getCartProducts(cartId) {
    try {
      // Excepcion para manejar error "CastError" como "NotFoundError"
      const cartProducts = await cartModel.findOne({"_id": cartId}, {products: 1});
      if(cartProducts){
        return cartProducts;
      } else {
        throw new NotFoundError(`No existe ningun carrito con el ID ${cartId}`);
      }
    } catch(err) {
      if(err instanceof CastError){
        throw new NotFoundError(`No existe un carrito con el ID '${cartId}'`);
      } else {
        throw err;
      }
    }
  }

  async addProductToCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    const existingProductIndex = cart.products.findIndex(p => p.product_id === productId);
    if(existingProductIndex !== -1){
      cart.products[existingProductIndex].quantity += 1;
    } else {
      cart.products.push({product_id: productId, quantity: 1});
    }
    // await cart.save()
    //   .then(() => {})
    //   .catch((e) => { throw e });
    await cartModel.updateOne({ _id: cartId }, { products: cart.products });
  }
}

export { CartManager };