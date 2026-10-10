import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Filtros from "../components/Filtros";
import Produtos from "../components/Produtos";
import { menu, opcoesCategorias } from "../utils/data";
import { getProducts } from "../services/productsService";
import type { Menu, Product } from "../types/types";

const HomePage = () => {
  const [filtro, setFiltro] = useState<string | null>(null);
  const [menu, setMenu] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();

        setMenu(products);
      } catch (err) {
        console.log("err", err);
      }
    };

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

  return (
    <>
      <Header />
      <Filtros opcoes={categories} onClick={onSelectFiltro} filtro={filtro} />
      <Produtos data={filteredData} />
    </>
  );
};

export default HomePage;
