import { Edit, Trash } from "lucide-react";
import type { Product, Menu } from "../types/types";
import { deleteProduct } from "../services/productsService";
import { useContext } from "react";
import { AuthContext } from "../context/UserContext";
import { useAuth } from "../hooks/useAuth";

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

  const { user } = useAuth();

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
        <div className='text-end'>
          <span className='text-bege'>
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
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
