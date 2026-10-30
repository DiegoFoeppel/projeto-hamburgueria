import React, { useState, type ChangeEvent } from "react";
import Input from "../Input";
import type { Category, Product } from "../../types/types";
import Button from "../Button";
import { useCategoriesQuery } from "../../hooks/useCategories";
import { X } from "lucide-react";
import {
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "../../hooks/products";

type ProductFormProps = {
  product: Product | undefined;
  onDone: () => void;
};

const ProductForm = ({ product, onDone }: ProductFormProps) => {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? "");
  const [productImg, setProductImg] = useState("");

  console.log("product", product);
  const { data: categories = [], isLoading, error } = useCategoriesQuery();

  const { mutate: update, isPending: isPendingUpdate } = useUpdateProduct();
  const { mutate: create, isPending: isPendingCreate } = useCreateProduct();
  //   const { mutate: del, isPending: isPendingDelete } = useDeleteProduct();

  const onSubmit = async (e: FormEven) => {
    e.preventDefault();

    const formData = new FormData();

    const productData = {
      name,
      description,
      price,
      categoryId,
    };

    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (!productData) return;

    if (productImg) {
      formData.append("image", productImg);
    }

    console.log("formData", formData);

    const value = Number(price.replace(",", "."));
    if (!price || Number.isNaN(value) || value <= 0) {
      // mostrar erro
      return;
    }

    try {
      if (product) {
        update({ id: product.id, ...productData }, { onSuccess: onDone });
      } else {
        create(formData, { onSuccess: onDone });
      }

      resetForm();
      //   onDone();
      //   useProductsQuery();
    } catch (err) {
      console.log("err", err);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    // setCategory("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProductImg(file);
    }
  };

  const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col'>
      <div className='flex justify-between mb-4 text-white'>
        <p></p>
        <h2>{product ? "Editar" : "Adicionar"} Produto</h2>
        <X onClick={onDone} className='cursor-pointer' />
      </div>

      <div className='max-w-10 w-full'>
        <Input
          type='file'
          id='foto-produto'
          accept='image/*'
          onChange={handleFileChange}
        />
        {/* ) : (
          <Input
            type='text'
            id='product-name'
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
          />
        )} */}
      </div>

      <div className='flex flex-col'>
        <Input
          type='text'
          value={name}
          placeholder='Nome do Produto'
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className='bg-white my-2'
          id='categoryId'
          name='categoryId'
          value={categoryId}
          onChange={changeCategory}
        >
          {!categoryId && <option value=''>Selecione uma categoria</option>}
          {categories.length &&
            categories.map((c: Category) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>

        <Input
          type='text'
          value={description}
          placeholder='Descrição do Produto'
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          type='number'
          step='0.01'
          min='0'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button
          variant='default'
          text={`${product ? "Editar" : "Adicionar"} Produto`}
          type='submit'
        />
      </div>
    </form>
  );
};

export default ProductForm;
