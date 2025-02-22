/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
// import Image from "next/image";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CartProduct extends Product {
  quantity: number;
}

export default function Week11() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const addProductsToCart = (e: any, product: Product) => {
    e.stopPropagation();
    const isInCart = cartProducts.some((item) => item.id === product.id);

    if (isInCart) {
      const updatedCart = cartProducts.filter((item) => item.id !== product.id);
      setCartProducts(updatedCart);
    } else {
      const cartProductWithQuantity: CartProduct = {
        ...product,
        quantity: 1,
      };
      setCartProducts([...cartProducts, cartProductWithQuantity]);
    }
  };

  const increaseQuantity = (id: number) => {
    const productCart = cartProducts.find((cartItem) => cartItem.id === id);
    if (productCart) {
      productCart.quantity += 1;
      setCartProducts([...cartProducts]);
    }
  };

  const decreaseQuantity = (id: number) => {
    const deletedProduct = cartProducts.filter((product) => product.id != id);
    const productCart = cartProducts.find((cartItem) => cartItem.id === id);
    if (productCart) {
      productCart.quantity -= 1;
      setCartProducts([...cartProducts]);
    }
    if (productCart && productCart.quantity === 0) {
      setCartProducts(deletedProduct);
    }
  };

  const totalPrice = (products: CartProduct[]) => {
    let sum = 0;
    products.forEach((product) => {
      sum += product.price * product.quantity;
    });

    return sum;
  };

  return (
    <div className="flex justify-evenly items-start w-full p-12">
      <div className="flex flex-col gap-4 w-96">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg">
            <p className="text-sm ml-2 text-gray-800 absolute">
              Mod: #00{product.id}
            </p>
            <div className="w-full flex justify-center items-center bg-white rounded-t p-2">
              <img
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
              />
            </div>
            <div className="p-4">
              <p className="font-bold text-lg">{product.title}</p>
              <p>$ {product.price}</p>
              <button
                onClick={(e) => addProductsToCart(e, product)}
                className="bg-gray-600 px-2 py-1 rounded mt-2"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-96">
        {cartProducts.map((cartProduct) => (
          <div key={cartProduct.id} className="bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 absolute ml-2">
              Mod: #00{cartProduct.id}
            </p>
            <div className="w-full flex justify-center items-center bg-white rounded-t p-2">
              <img
                src={cartProduct.image}
                alt={cartProduct.title}
                width={100}
                height={100}
              />
            </div>
            <div className="p-4">
              <p className="font-bold text-lg">{cartProduct.title}</p>
              <div className="flex items-center justify-between">
                <p>Unit price: $ {cartProduct.price}</p>
                <div className="flex justify-center items-center gap-2">
                  <button onClick={() => decreaseQuantity(cartProduct.id)}>
                    <MinusCircleIcon className="w-5 h-5" />
                  </button>
                  <span>{cartProduct.quantity}</span>
                  <button onClick={() => increaseQuantity(cartProduct.id)}>
                    <PlusCircleIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p>Total: $ {cartProduct.price}</p>
            </div>
          </div>
        ))}

        {cartProducts.length > 0 && (
          <>
            <p className="text-lg font-bold">
              Total: {totalPrice(cartProducts)}
            </p>
            <button
              onClick={() =>
                console.log(
                  "Products added to cart:",
                  cartProducts,
                  "Total to pay: $",
                  totalPrice(cartProducts)
                )
              }
              className="w-full p-2 bg-gray-600 rounded font-semibold"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
