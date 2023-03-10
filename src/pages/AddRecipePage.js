import { React } from "react";
import AddFood from "../components/CardFoods/AddFood";
import FooterComp from "../components/FooterComs/FooterComp";
import NavbarComp from "../components/NavbarComs/NavbarComp";

const AddRecipePage = () => {
  return (
    <>
      <NavbarComp />
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <AddFood />
      </div>
      <FooterComp />
    </>
  );
};

export default AddRecipePage;
