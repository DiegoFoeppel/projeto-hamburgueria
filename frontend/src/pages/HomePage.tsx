import React from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Filtros from "../components/Filtros";
import Produtos from "../components/Produtos";

const HomePage = () => {
  return (
    <>
      <Header />
      <Filtros />
      <Produtos />
    </>
  );
};

export default HomePage;
