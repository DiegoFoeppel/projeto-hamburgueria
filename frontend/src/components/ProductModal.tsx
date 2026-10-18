import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
} from "react";
import { createProduct, editProduct } from "../services/productsService";
import { X } from "lucide-react";
import Input from "./Input";
import Button from "./Button";
import { api } from "../api/axios";

const ProductModal = ({ onClose, mode, product, fetchData, handleOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(undefined);
  const [category, setCategory] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const getCategories = async () => {
    try {
      const response = await api.get("/api/categories");

      setCategories(response.data.categories);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (product && mode === "edit") {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setCategoryId(product.categoryId);
      setImgUrl(product.imgUrl);
    }
  }, [product]);

  useEffect(() => {
    getCategories();
  }, []);

  const token = localStorage.getItem("jwt");

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log("teste");

    const formData = new FormData();

    const productData = {
      name,
      description,
      price,
      category,
      categoryId,
      imgUrl,
    };

    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (!productData) return;

    if (productImg) {
      formData.append("image", productImg);
    }

    console.log("teste");

    try {
      if (!token) return;

      const response =
        mode == "create"
          ? await createProduct(formData, token)
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
    setPrice(undefined);
    setCategory("");
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
    <div
      id='modalOverlay'
      className=' fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
    >
      <div className='bg-[#24201A] rounded-xl shadow-xl max-w-2xl w-full p-4 transform transition-all'>
        <form onSubmit={onSubmit} className='flex flex-col'>
          <div className='flex justify-between mb-4 text-white'>
            <p></p>
            <h2>{mode == "create" ? "Adicionar" : "Editar"} Produto</h2>
            <X onClick={onClose} className='cursor-pointer' />
          </div>

          <div className='max-w-10 w-full'>
            {mode == "create" ? (
              <Input
                type='file'
                id='foto-produto'
                accept='image/*'
                onChange={handleFileChange}
              />
            ) : (
              <Input
                type='text'
                id='product-name'
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
              />
            )}
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
                categories.map((c) => (
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
              type='text'
              value={category}
              placeholder='Categoria'
              onChange={(e) => setCategory(e.target.value)}
            />

            <Input
              type='number'
              value={price}
              step={0.1}
              placeholder='Preço'
              onChange={(e) => setPrice(price && Number(e.target.value))}
            />
            <Button
              variant='default'
              text={`${mode == "create" ? "Adicionar" : "Editar"} Produto`}
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
