import React from "react";
import { Row } from "react-bootstrap";
import CardUser from "../components/CardUser/CardUser";
import FooterComp from "../components/FooterComs/FooterComp";
import NavbarComp from "../components/NavbarComs/NavbarComp";

const ListUserPage = () => {
  return (
    <>
      <NavbarComp />
      <div className="container-fluid my-4 px-5 min-vh-100">
        <h1 className="mb-4 fw-bold text-center text-warning">All User</h1>
        <Row className="g-5" xs={1} sm={1} md={3} lg={6}>
          <CardUser />
        </Row>
      </div>
      <FooterComp />
    </>
  );
};

export default ListUserPage;
