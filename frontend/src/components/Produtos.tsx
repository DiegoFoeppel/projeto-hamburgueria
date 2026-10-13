import { Edit, ShoppingCart, Trash } from "lucide-react";
import type { Product, Menu } from "../types/types";
import { deleteProduct } from "../services/productsService";
import { useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { useAuth } from "../hooks/useAuth";
import CartContext, { CartProductsContext } from "../context/CartContex";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";
import { formatPrice } from "../utils/data";

type MenuProps = {
  data: Menu[];
  onDelete: (id: number) => void;
};

type ProductProps = {
  product: Product;
  onDelete: (id: number) => void;
};

const ProductItem = ({ product, onDelete, onEdit }: ProductProps) => {
  const { id, name, description, imgUrl, price } = product;

  console.log("price", price, typeof price);

  const { user } = useAuth();

  const { add } = useCart();

  const handleAdd = (product: Product) => {
    add(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className='flex gap-2 my-4'>
      <div>
        <img src={imgUrl} alt='Imagem do produto' />
      </div>
      <div className='flex flex-col justify-between  w-full'>
        <div>
          <div className='flex justify-between'>
            <h3 className='text-title'>{name}</h3>
            {user && user.role === "ADMIN" && (
              <div className='flex gap-2'>
                <Edit
                  color='#f2daac'
                  size={18}
                  onClick={() => onEdit(id)}
                  className='cursor-pointer'
                />
                <Trash
                  color='#c92a0e'
                  size={18}
                  onClick={() => onDelete(id)}
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

const Products = ({ data, onDelete, onEdit }: MenuProps) => {
  console.log("diabns", data);
  if (data.length == 0) {
    return (
      <div>
        <p>Nenhum produto disponível</p>
      </div>
    );
  }

  return (
    <div className='w-[747px] mx-auto my-10 '>
      {data.map((category) => (
        <div key={category.category}>
          <h2 className='text-[#F2DAAC] mb-2'>{category.category}</h2>
          {category.products.map((product: Product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Products;
