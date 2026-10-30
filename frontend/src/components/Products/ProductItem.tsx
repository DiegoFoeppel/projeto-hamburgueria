import { Edit, ShoppingCart, Trash } from "lucide-react";
import type { Product, ProductProps } from "../../types/types";
import { useAuth } from "../../context/UserContext";
import { useCart } from "../../hooks/useCart";
import toast from "react-hot-toast";
import { formatPrice } from "../../utils/data";
import { useProductModal } from "../../stores/productModal";
import { useDeleteProduct } from "../../hooks/products";

export const ProductItem = ({ product }: ProductProps) => {
  const { id, name, description, imgUrl, price } = product;

  const { user } = useAuth();

  const { add } = useCart();

  const handleAdd = (product: Product) => {
    add(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const openEdit = useProductModal((s) => s.openEdit);

  const { mutate: del, isPending: isPendingDelete } = useDeleteProduct();

  return (
    <div className='flex gap-2 my-4'>
      <div>
        <img
          height={200}
          width={166}
          src={`http://localhost:3000/api/uploads/${imgUrl}`}
          alt='Imagem do produto'
        />
      </div>
      <div className='flex flex-col justify-between  w-full'>
        <div>
          <div className='flex justify-between items-center'>
            <h3 className='text-title'>{name}</h3>
            {user && user.role === "ADMIN" && (
              <div className='flex gap-2'>
                <Edit
                  color='#f2daac'
                  size={18}
                  onClick={() => openEdit(product)}
                  className='cursor-pointer'
                />
                <Trash
                  color='#c92a0e'
                  size={18}
                  onClick={() => del(id)}
                  className='cursor-pointer'
                />
              </div>
            )}
          </div>
          <span className='text-description'>{description}</span>
        </div>
        <div className='flex justify-end gap-2 text-center items-center'>
          <span className='text-bege'>{formatPrice(price)}</span>
          <ShoppingCart
            className='cursor-pointer'
            color='#f2daac'
            size={16}
            onClick={() => handleAdd(product)}
          />
        </div>
      </div>
    </div>
  );
};
