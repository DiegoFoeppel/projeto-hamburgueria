import type { Product, MenuProps } from "../../types/types";
import { ProductItem } from "./ProductItem";

const Products = ({ data }: MenuProps) => {
  console.log("data", data);

  return (
    <div className='w-[747px] mx-auto my-4 '>
      {data.length > 0 ? (
        data.map((category) => (
          <div key={category.id}>
            <h2 className='text-[#F2DAAC] mb-2'>{category.name}</h2>
            {category.products.map((product: Product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ))
      ) : (
        <div className=' w-[747px] mx-auto my-4 flex items-center text-bege'>
          <p>Nenhum produto disponível</p>
        </div>
      )}
    </div>
  );
};

export default Products;
