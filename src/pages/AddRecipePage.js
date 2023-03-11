import { React } from "react";
import { Image } from "react-bootstrap";
import AddFood from "../components/CardFoods/AddFood";
import FooterComp from "../components/FooterComs/FooterComp";
import NavbarComp from "../components/NavbarComs/NavbarComp";
import AddFoodBG from "../images/AddFoodBG.WebP";

const AddRecipePage = () => {
  return (
    <>
      <NavbarComp />

      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Image
          src={AddFoodBG}
          style={{
            position: "absolute",
            zIndex: "-3",
            width: "100%",
            objectFit: "cover",
            minHeight: "100vh",
          }}
        />
        <AddFood />
      </div>
      <FooterComp />
    </>
  );
};

export default AddRecipePage;
