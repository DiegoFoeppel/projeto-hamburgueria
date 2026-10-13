import { Minus, Plus, Trash } from "lucide-react";
import React, { useContext } from "react";
import CartContext, { CartProductsContext } from "../context/CartContex";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/data";

const CartItem = ({ item }) => {
  const { remove, changeQuantity } = useCart();

  return (
    <div className='flex justify-between mb-3 gap-2'>
      <img
        src={item.product.imgUrl}
        alt='teste'
        width='100'
        height='85'
        className='rounded-md'
      />
      <div className='flex gap-2 my-2 flex-1'>
        <div className='flex flex-col justify-between'>
          <p className='text-sm font-bold'>{item.product.name}</p>
          <div className='flex gap-4  items-center'>
            <div className='flex gap-2 justify-center items-center'>
              <Minus
                className='cursor-pointer'
                size={18}
                onClick={() => changeQuantity(item.id, -1)}
              />
              {item.qtd}
              <Plus
                className='cursor-pointer'
                size={18}
                onClick={() => changeQuantity(item.id, +1)}
              />
            </div>
            <Trash
              className='cursor-pointer'
              size={18}
              onClick={() => remove(item.product)}
            />
          </div>
        </div>
      </div>

      <p className='text-sm my-2'>{formatPrice(item.product.price)}</p>
    </div>
  );
};

export default CartItem;
