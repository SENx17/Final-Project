import { React } from "react";
import heroStyle from "./HeroComp.module.css";
import { Button } from "react-bootstrap";
import HeroImage from "../../images/HeroImage.WebP";
const HeroComp = () => {
  return (
    <>
      <img src={HeroImage} className={heroStyle.heroContainer} alt="Hero" />
      <div className={heroStyle.heroBlur}></div>
      <div className={heroStyle.heroTextContainter}>
        <div className={heroStyle.heroText}>
          {/* Hero Text */}
          <h1>Best Recipes For</h1>
          <h1 className="ps-4 ms-sm-2">Your Best Foods</h1>
        </div>
        {/* Small Hero Text */}
        <div className={heroStyle.smallHeroText}>
          <p>we provide various kinds of recipes and here you can</p>
          <p>find the best recipes, Click button down below to see</p>
          <p>our recipes!</p>
        </div>
        <Button variant="light" className={heroStyle.heroButton}>
          <a href="/recipe" className="text-decoration-none text-dark fw-bold">
            Our Recipe
          </a>
        </Button>
      </div>
    </>
  );
};

export default HeroComp;
