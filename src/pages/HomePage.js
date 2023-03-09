import AboutComp from "../components/AboutComs/AboutComp";
import BenefitComp from "../components/BenefitComs/BenefitComp";
import FooterComp from "../components/FooterComs/FooterComp";
import HeroComp from "../components/HeroComs/HeroComp";
import NavbarComp from "../components/NavbarComs/NavbarComp";

const HomePage = () => {
  return (
    <>
      <NavbarComp />
      <HeroComp />
      <BenefitComp />
      <AboutComp />
      <FooterComp />
    </>
  );
};

export default HomePage;
