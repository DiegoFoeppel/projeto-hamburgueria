import type { Product, Menu } from "../types/types";

type MenuProps = {
  data: Menu[];
};

type ProductProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductProps) => {
  const { id, name, description, imgUrl, price } = product;

  return (
    <div className='flex gap-2 my-4'>
      <div>
        <img src={imgUrl} alt='Imagem' />
      </div>
      <div className='flex flex-col justify-between  w-full'>
        <div>
          <h3 className='text-title'>{name}</h3>
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

const Products = ({ data }: MenuProps) => {
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
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Products;
