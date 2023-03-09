import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import aboutStyle from "./AboutComp.module.css";
import aboutImage from "../../images/AboutBg.WebP";

const AboutComp = () => {
  return (
    <>
      <section>
        <div>
          <h2 className={aboutStyle.aboutTitle}>- About Us -</h2>
        </div>
        <div className={aboutStyle.backgroundStyle}>
          <Row
            xs={1}
            sm={1}
            md={2}
            className="d-flex justify-content-center align-items-center mx-auto mt-3 gy-4"
          >
            <Col>
              <div className="ps-4">
                <p className={aboutStyle.aboutText}>
                  Welcome to our food recipe website! We are a team of food
                  enthusiasts who are passionate about cooking and sharing
                  delicious recipes with others. Our website is dedicated to
                  providing you with a wide variety of recipes that are easy to
                  follow and use everyday ingredients.
                </p>
                <p className={aboutStyle.aboutText}>
                  At our food recipe website, we are committed to providing you
                  with the best possible experience. We strive to create recipes
                  that are not only delicious but also healthy, easy to follow,
                  and use ingredients that are readily available. We hope that
                  you enjoy browsing our website and trying out our recipes, and
                  we look forward to hearing your feedback!
                </p>
              </div>
            </Col>
            <Col className="d-flex justify-content-center">
              <Image
                src={aboutImage}
                className={aboutStyle.imageSizing}
                rounded
              />
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default AboutComp;
