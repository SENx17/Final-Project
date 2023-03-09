import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import getAllUser from "../api/getAllUserAPI";
import CardUser from "../components/CardUser/CardUser";
import FooterComp from "../components/FooterComs/FooterComp";
import NavbarComp from "../components/NavbarComs/NavbarComp";

const ListUserPage = () => {
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    getAllUser().then((response) => {
      setAllUser(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <NavbarComp />
      <div className="container-fluid my-4 px-5 min-vh-100">
        <h1 className="mb-4 fw-bold text-center text-warning">All User</h1>
        <Row className="g-5" xs={1} sm={1} md={3} lg={6}>
          {allUser.map((listUser) => (
            <CardUser key={listUser.id} {...listUser} />
          ))}
        </Row>
      </div>
      <FooterComp />
    </>
  );
};

export default ListUserPage;
