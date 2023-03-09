import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Card, Button } from "react-bootstrap";
import cardFoodStyle from "./CardFood.module.css";
import { HeartFill } from "react-bootstrap-icons";
import getFoods from "../../api/getFoodAPI";

const CardFood = ({ id, name, imageUrl, totalLikes, rating, isLike }) => {
  const [foods, setFoods] = useState([]);
  const getJWT = localStorage.getItem("Token");

  const handleLikeFood = () => {
    if (!isLike) {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/like`,
          {
            foodId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${getJWT}`,
              apiKey: process.env.REACT_APP_APIKEY,
            },
          }
        )
        .then((response) => {
          getFoods().then((response) => {
            setFoods(response);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/unlike`,
          {
            foodId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${getJWT}`,
              apiKey: process.env.REACT_APP_APIKEY,
            },
          }
        )
        .then((response) => {
          getFoods().then((response) => {
            setFoods(response.data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {foods && (
        <Col>
          <Card className="shadow" style={{ width: "100%" }}>
            <div className={"cardUserStyle.imagePosition"}>
              <Card.Img
                src={imageUrl}
                className={cardFoodStyle.imageSize}
                alt={name}
              />
            </div>
            <Card.Body className="p-0">
              <div>
                <h6 className="fw-bold text-center text-truncate px-2">
                  {name}
                </h6>
              </div>
              <div className="d-flex gap-3 ps-1 pb-2">
                <span className="d-flex align-items-center text-secondary fw-lighter">
                  <button
                    style={{ border: "none", background: "none" }}
                    onClick={() => handleLikeFood()}
                  >
                    {isLike ? (
                      <HeartFill color="red" />
                    ) : (
                      <HeartFill color="gray" />
                    )}
                  </button>
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
              <Button
                variant="warning border-secondary sm"
                className="fw-light"
              >
                See details
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      )}
    </>
  );
};

export default CardFood;