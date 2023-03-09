import { React } from "react";
import CardProfile from "../components/CardProfile/CardProfile";
import FooterComp from "../components/FooterComs/FooterComp";
import NavbarComp from "../components/NavbarComs/NavbarComp";

const ProfilePage = () => {
  return (
    <>
      <NavbarComp />
      <CardProfile />
      <FooterComp />
    </>
  );
};

export default ProfilePage;
