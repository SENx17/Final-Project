import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import getFoods from "../api/getFoodAPI";
import CardFood from "../components/CardFoods/CardFood";
import FooterComp from "../components/FooterComs/FooterComp";
import NavbarComp from "../components/NavbarComs/NavbarComp";

const RecipePage = () => {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    getFoods().then((response) => {
      setAllUser(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <NavbarComp />
      <div className="container-fluid my-4 px-5 min-vh-100">
        <h1 className="mb-4 fw-bold text-center text-warning">List Foods</h1>
        <Row className="g-5" xs={1} sm={1} md={3} lg={6}>
          {allUser.map((listFoods) => (
            <CardFood key={listFoods.id} {...listFoods} />
          ))}
        </Row>
      </div>
      <FooterComp />
    </>
  );
};

export default RecipePage;