import { React } from "react";
import heroStyle from "./HeroComp.module.css";
import { Image, Button } from "react-bootstrap";
import HeroImage from "../../images/HeroImage.WebP";
const HeroComp = () => {
  return (
    <>
      <Image src={HeroImage} className={heroStyle.heroContainer} />
      <div className={heroStyle.heroTextContainter}>
        <div className={heroStyle.heroText}>
          {/* Hero Text */}
          <h1>Best Recipes For</h1>
          <h1 className="ps-4 ms-4">Your Best Foods</h1>
        </div>
        {/* Small Hero Text */}
        <div className={heroStyle.smallHeroText}>
          <p>we provide various kinds of recipes and you here can</p>
          <p>find the best recipes, Click button down below to see</p>
          <p>our recipes!</p>
        </div>
        <Button variant="light" className={heroStyle.heroButton}>
          Our Recipe
        </Button>
      </div>
    </>
  );
};

export default HeroComp;
