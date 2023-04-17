import React from "react";
import { Col, Row } from "react-bootstrap";
import benefitStyle from "./BenefitComp.module.css";

const BenefitComp = () => {
  return (
    <>
      <div className={benefitStyle.containerBenefit}>
        <div>
          <h2 className={benefitStyle.benefitTitle}>Benefits With Us</h2>
        </div>
        <Row xs={1} sm={1} md={3} className="mx-auto mt-3 text-center gy-5">
          <Col>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="orange"
                className="bi bi-camera-reels-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path d="M9 6a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                <path d="M9 6h.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h7z" />
              </svg>
              <div className="mt-4 pt-3">
                <h3 className={benefitStyle.benefitText}>Record Your</h3>
                <h3 className={benefitStyle.benefitText}>Own Recipes</h3>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="orange"
                className="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
              <div className="mt-4 pt-3">
                <h3 className={benefitStyle.benefitText}>Get Your</h3>
                <h3 className={benefitStyle.benefitText}>Favorite Recipes</h3>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="orange"
                className="bi bi-clipboard2-data-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z" />
              </svg>
              <div className="mt-4 pt-3">
                <h3 className={benefitStyle.benefitText}>Rate</h3>
                <h3 className={benefitStyle.benefitText}>Our Recipes</h3>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BenefitComp;
