import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Filtros from "../components/Filtros";
import Produtos from "../components/Produtos";
import { menu, opcoesCategorias } from "../utils/data";
import {
  deleteProduct,
  editProduct,
  getProducts,
} from "../services/productsService";
import type { Menu, Product } from "../types/types";
import CommonSection from "../components/CommonSection";
import { getCategories } from "../services/categoriesService";

type ModalMode = "edit" | "create";

const HomePage = () => {
  const [filtro, setFiltro] = useState<string | null>(null);
  const [menu, setMenu] = useState<Menu[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [categories, setCategories] = useState([]);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const token = localStorage.getItem("jwt") ?? "";

  const fetchData = async () => {
    try {
      const products = await getProducts();

      setMenu(products);
    } catch (err) {
      console.log("err", err);
    }
  };

  console.log("menu", menu);

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();

      setCategories(categories);
    } catch (err) {
      console.log("err", err);
    }
  };

  console.log("IsOpen", isOpen);

  const handleDelete = async (id: number) => {
    try {
      if (!id) return;

      const response = await deleteProduct(id, token);

      console.log("response", response);

      fetchData();
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleSelectedProduct = (id: number) => {};

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const onSelectFiltro = (value: string) => {
    setFiltro(filtro === value ? null : value);
  };

  console.log("filtro", filtro);
  const visible = filtro ? menu.filter((p) => p.id === filtro) : menu;

  console.log("filtro", visible);

  const handleEditClick = (id) => {
    handleOpen();
    const product = menu
      .flatMap((group) => group.products)
      .find((p) => p.id === id);

    if (!product) {
      console.log("deu ruim");
      return;
    }

    console.log("product t", product);

    setSelectedProduct(product);
    setModalMode("edit");
  };

  const onAdd = () => {
    handleOpen();
    setModalMode("create");
  };

  return (
    <>
      {/* <Header /> */}
      {/* <Filtros opcoes={categories} onClick={onSelectFiltro} filtro={filtro} /> */}
      {/* {isModalOpen && <ProductModal onClose={() => setIsModalOpen(false)} />} */}

      <CommonSection
        // onOpen={handleOpen}
        onClick={onSelectFiltro}
        opcoes={categories}
        filtro={filtro}
        onAdd={onAdd}
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleOpen}
        mode={modalMode}
        product={selectedProduct}
        fetchData={fetchData}
        // onClose={() => setIsModalOpen(false)}
      />
      <Produtos
        data={visible}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />
    </>
  );
};

export default HomePage;
