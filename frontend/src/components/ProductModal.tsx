import React, { useEffect, useState } from "react";
import { createProduct, editProduct } from "../services/productsService";
import { X } from "lucide-react";
import Input from "./Input";
import Button from "./Button";

const ProductModal = ({ onClose, mode, product, fetchData, handleOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (product && mode === "edit") {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  const token = localStorage.getItem("jwt");

  const onSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      price: price ?? 0,
      category,
      imgUrl: "teste",
    };

    // if (product) {
    //   productData.id = product.id;
    // }

    if (!product) return;

    try {
      if (!token) return;

      const response =
        mode == "create"
          ? await createProduct(productData, token)
          : await editProduct(product.id, productData, token);

      console.log("response", response);

      resetForm();
      onClose();
      fetchData();
    } catch (err) {
      console.log("err", err);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setCategory("");
  };

  return (
    <div
      id='modalOverlay'
      className=' fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
    >
      <div className='bg-white rounded-xl shadow-xl max-w-md w-full p-4 transform transition-all'>
        <form onSubmit={onSubmit} className='flex flex-col'>
          <div className='flex justify-between mb-4'>
            <p></p>
            <h2>{mode == "create" ? "Adicionar" : "Editar"} Produto</h2>
            <X onClick={onClose} className='cursor-pointer' />
          </div>
          <Input
            type='text'
            value={name}
            placeholder='Nome do Produto'
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type='text'
            value={description}
            placeholder='Descrição do Produto'
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            type='text'
            value={category}
            placeholder='Categoria'
            onChange={(e) => setCategory(e.target.value)}
          />

          <Input
            type='number'
            value={price}
            placeholder='Preço'
            min={0}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <Button
            variant='default'
            text={`${mode == "create" ? "Adicionar" : "Editar"} Produto`}
            type='submit'
          />
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
