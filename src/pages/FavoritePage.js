import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import getFavorite from "../api/getFavoriteAPI";

import FavoriteFood from "../components/CardFoods/FavoriteFood";
import FooterComp from "../components/FooterComs/FooterComp";
import NavbarComp from "../components/NavbarComs/NavbarComp";

const RecipePage = () => {
  const [allFavorite, setAllFavorite] = useState([]);

  useEffect(() => {
    getFavorite().then((response) => {
      setAllFavorite(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <NavbarComp />
      <div className="container-fluid my-4 px-5 min-vh-100">
        <h1 className="mb-4 fw-bold text-center text-warning">
          Favorite Foods
        </h1>
        <Row className="g-5" xs={1} sm={1} md={2} lg={3} xl={5} xxl={6}>
          {allFavorite.map((listFavorite) => (
            <FavoriteFood key={listFavorite.id} {...listFavorite} />
          ))}
        </Row>
      </div>
      <FooterComp />
    </>
  );
};

export default RecipePage;
