import Sidebar from "./Sidebar";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Pack from "./Pack";
import axios from "axios";
import CurrentPackContext from "../contexts/CurrentPack";

const Project = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [pack1, setPack1] = useState([]);
  const [pack2, setPack2] = useState([]);
  const [pack3, setPack3] = useState([]);

  const { idCategory, idSubCategory, setIdPack } =
    useContext(CurrentPackContext);

  const packConstructor = (allProducts) => {
    let pack1 = [];
    let pack2 = [];
    let pack3 = [];
    // Premier pack
    pack1 = allProducts.filter((product) => product.id_pack === 1);
    let pack1Price = [];
    pack1Price = pack1.map((product) => parseInt(product.price));
    const reducer = (previousValue, currentValue) =>
      previousValue + currentValue;
    pack1Price = pack1Price.reduce(reducer, 0);
    if (idSubCategory) {
      const pack1Object = {
        title: subcategories.find(
          (subcategory) => subcategory.id_subcategory == idSubCategory
        )?.name,
        picture: subcategories.find(
          (subcategory) => subcategory.id_subcategory == idSubCategory
        ).picture,
        price: pack1Price,
      };
      setPack1(pack1Object);
    } else if (idCategory) {
      const pack1Object = {
        title: categories.find((category) => category.id_category == idCategory)
          ?.name,
        picture: categories.find(
          (category) => category.id_category == idCategory
        ).picture,
        price: pack1Price,
      };
      setPack1(pack1Object);
    }
    // Second pack
    pack2 = allProducts.filter((product) => product.id_pack === 2);
    let pack2Price = [];
    pack2Price = pack2.map((product) => parseInt(product.price));
    pack2Price = pack2Price.reduce(reducer, 0);
    if (idSubCategory) {
      const pack2Object = {
        title: subcategories.find(
          (subcategory) => subcategory.id_subcategory == idSubCategory
        )?.name,
        picture: subcategories.find(
          (subcategory) => subcategory.id_subcategory == idSubCategory
        ).picture,
        price: pack2Price,
      };
      setPack2(pack2Object);
    } else if (idCategory) {
      const pack2Object = {
        title: categories.find((category) => category.id_category == idCategory)
          ?.name,
        picture: categories.find(
          (category) => category.id_category == idCategory
        ).picture,
        price: pack2Price,
      };
      setPack2(pack2Object);
    }
    // Troisième pack
    pack3 = allProducts.filter((product) => product.id_pack === 3);
    let pack3Price = [];
    pack3Price = pack3.map((product) => parseInt(product.price));
    pack3Price = pack3Price.reduce(reducer, 0);
    if (idSubCategory) {
      const pack3Object = {
        title: subcategories.find(
          (subcategory) => subcategory.id_subcategory == idSubCategory
        )?.name,
        picture: subcategories.find(
          (subcategory) => subcategory.id_subcategory == idSubCategory
        ).picture,
        price: pack3Price,
      };
      setPack3(pack3Object);
    } else if (idCategory) {
      const pack3Object = {
        title: categories.find((category) => category.id_category == idCategory)
          ?.name,
        picture: categories.find(
          (category) => category.id_category == idCategory
        ).picture,
        price: pack3Price,
      };
      setPack3(pack3Object);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/categories")
      .then((categorie) => categorie.data)
      .then((categories) => setCategories(categories));

    axios
      .get("http://localhost:4000/api/subcategories")
      .then((subcategorie) => subcategorie.data)
      .then((subcategories) => setSubcategories(subcategories));

    axios
      .get("http://localhost:4000/api/products")
      .then((product) => product.data)
      .then((product) => setAllProducts(product));
  }, []);

  useEffect(() => {
    let basicUrl = `http://localhost:4000/api/products`;
    let changedValue = false;
    if (idCategory !== undefined) {
      basicUrl += `?idcategory=${idCategory}`;
      changedValue = true;
    }
    if (idSubCategory !== undefined) {
      basicUrl += changedValue
        ? `&idsubcategory=${idSubCategory}`
        : `?idsubcategory=${idSubCategory}`;
    }

    axios
      .get(basicUrl)
      .then((product) => product.data)
      .then((product) => {
        setAllProducts(product);
        packConstructor(product);
      });
  }, [idSubCategory, idCategory]);

  return (
    <div className="project">
      <div className="project__sidebar">
        <Sidebar />
      </div>
      <div className="project__pack">
        <h2>Premier prix</h2>
        <Link to="/liste_de_produits" onClick={() => setIdPack(1)}>
          {pack1 && <Pack {...pack1} />}
        </Link>
        <h2>Meilleur rapport qualité/prix</h2>
        <Link to="/liste_de_produits" onClick={() => setIdPack(2)}>
          {pack2 && <Pack {...pack2} />}
        </Link>
        <h2>Top qualité</h2>
        <Link to="/liste_de_produits" onClick={() => setIdPack(3)}>
          {pack3 && <Pack {...pack3} />}
        </Link>
      </div>
    </div>
  );
};

export default Project;
