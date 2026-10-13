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

type ModalMode = "edit" | "create";

const HomePage = () => {
  const [filtro, setFiltro] = useState<string | null>(null);
  const [menu, setMenu] = useState<Menu[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>("create");

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
  }, []);

  const onSelectFiltro = (value: string) => {
    setFiltro(filtro === value ? null : value);
  };

  const filteredData =
    menu.length > 0 && filtro
      ? menu.filter((p) => p.category === filtro)
      : menu;

  const categories =
    menu.length > 0
      ? menu.map((p, i) => ({ id: i, category: p.category }))
      : [];

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
        data={filteredData}
        onDelete={handleDelete}
        onEdit={handleEditClick}
      />
    </>
  );
};

export default HomePage;
