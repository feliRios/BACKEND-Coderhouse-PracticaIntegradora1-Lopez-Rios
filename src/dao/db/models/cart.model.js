import mongoose from "mongoose";

const cartCollection = "cart";  // El nombre de la coleccion en la DB

const cartSchema = new mongoose.Schema({
  // Se definen todos los campos que tiene un carrito (el documento a insertar) en la
  // coleccion
  products: {
    // Cada propiedad va a contener una serie de opciones
    type: Array,
    required: true,
    default: [""]
  }
})

export const cartModel = mongoose.model(cartCollection, cartSchema);