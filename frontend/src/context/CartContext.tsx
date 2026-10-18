import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../types/types";
import { useAuth } from "../hooks/useAuth";

type ProductsList = {
  id?: number;
  product: Product;
  qtd: number;
};

interface CartContextType {
  cartProducts: ProductsList[];
  add: (product: Product) => void;
  remove: (product: Product) => void;
  changeQuantity: (id: Number, delta: number) => void;
  total: number;
  clearCart: () => void;
  qtdProd: number;
}

export const CartProductsContext = createContext<CartContextType | undefined>(
  undefined,
);

const CartContext = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<ProductsList[]>(
    JSON.parse(localStorage.getItem("cart")) ?? [],
  );

  // na vdd reduce baseado na qtd de cada elemento
  const qtdProd = cartProducts.reduce((qtdTotal, produto) => {
    return produto.qtd + qtdTotal;
  }, 0);

  useEffect(() => {
    saveToLocalStorage();
  }, [cartProducts]);

  console.log("cart", cartProducts);

  const add = (product: Product) => {
    let item = { id: product.id, product, qtd: 1 };

    const exists = cartProducts.some((i) => i.id === product.id);

    const next = exists
      ? cartProducts.map((i) =>
          i.id == product.id ? { ...i, quantity: i.qtd + item.qtd } : i,
        )
      : [...cartProducts, item];

    setCartProducts(next);
  };

  const total = cartProducts.reduce((acc, curr) => {
    const value = curr.product.price * curr.qtd;
    return value + acc;
  }, 0);

  console.log("total", total);

  const changeQuantity = (id: Number, delta: number) => {
    const next = cartProducts
      .map((i) => (i.id === id ? { ...i, qtd: i.qtd + delta } : i))
      .filter((i) => i.qtd > 0); // chegou a 0, remove

    setCartProducts(next);
    // saveCart(user?.id ?? null, next);
  };

  const clearCart = () => {
    setCartProducts([]);
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  };

  const remove = (product: Product) => {
    if (!product) return;

    const id = product.id;

    const filteredProducts = cartProducts.filter((p) => p.id !== id);

    setCartProducts(filteredProducts);
  };

  return (
    <CartProductsContext.Provider
      value={{
        cartProducts,
        add,
        remove,
        changeQuantity,
        total,
        clearCart,
        qtdProd,
      }}
    >
      {children}
    </CartProductsContext.Provider>
  );
};

export default CartContext;
