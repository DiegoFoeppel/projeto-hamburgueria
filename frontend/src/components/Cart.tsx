import { Minus, Plus, Trash, X } from "lucide-react";
import React, { useCallback, useContext } from "react";
import Button from "./Button";
import { CartProductsContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { useCart } from "../hooks/useCart";
import { createOrder } from "../services/ordersService";

const Cart = ({ onClose }) => {
  const { cartProducts, total, qtdProd, clearCart } = useCart();

  const token = localStorage.getItem("jwt") ?? "";

  const productsInfo =
    cartProducts.length > 0
      ? cartProducts.map((p) => ({
          productId: p.id,
          price: Number(p.product.price),
          quantity: p.qtd,
        }))
      : [];

  const handleSubmit = async () => {
    try {
      const teste = await createOrder(
        { totalPrice: total, products: productsInfo },
        token,
      );

      console.log("teste", teste);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div
      id='modalOverlay'
      className='fixed inset-0 bg-black/50 flex items-center justify-end z-50'
    >
      <div className='flex flex-col justify-between bg-bege shadow-xl max-w-sm w-full h-full px-4 py-2 transform transition-all'>
        <div className='flex justify-between'>
          <p>Carrinho ({qtdProd})</p>
          <X onClick={onClose} className='cursor-pointer' />
        </div>

        <div className='flex-1 my-3'>
          {cartProducts.length > 0 &&
            cartProducts.map((item) => <CartItem item={item} key={item.id} />)}
        </div>

        <div className='flex justify-between'>
          <p>Total Estimado</p>
          <p>{total.toFixed(2)}</p>
        </div>

        <Button
          type='submit'
          text='Limpar carrinho'
          variant='default'
          onClick={() => clearCart()}
        />

        <Button
          type='submit'
          text='Finalizar Pedido'
          variant='default'
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Cart;
