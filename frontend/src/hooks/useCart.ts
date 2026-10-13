import { useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { CartProductsContext } from "../context/CartContext";

export function useCart() {
  const context = useContext(CartProductsContext);

  if (context === undefined) {
    throw new Error("useCart must be used within an CartProvider");
  }

  return context;
}
