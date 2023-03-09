import React, { useState } from "react";
import { Col, Card, Button } from "react-bootstrap";
import cardFavoriteStyle from "./FavoriteFood.module.css";

const CardFood = ({ name, imageUrl, totalLikes, rating }) => {
  return (
    <>
      <Col>
        <Card className="shadow" style={{ width: "100%" }}>
          <div className={"cardUserStyle.imagePosition"}>
            <Card.Img
              src={imageUrl}
              className={cardFavoriteStyle.imageSize}
              alt={name}
            />
          </div>
          <Card.Body className="p-0">
            <div>
              <h6 className="fw-bold text-center text-truncate px-2">{name}</h6>
            </div>
            <div className="d-flex gap-3 ps-2">
              <span className="d-flex align-items-center text-secondary fw-lighter gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
                {totalLikes}
              </span>
              <span className="d-flex align-items-center text-secondary fw-lighter gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="orange"
                  className="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                {rating}
              </span>
            </div>
          </Card.Body>
          <Card.Footer className="text-center">
            <Button variant="warning border-secondary sm" className="fw-light">
              See details
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default CardFood;
