import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Modal,
  Row,
  Form,
} from "react-bootstrap";
import { ArrowDownSquareFill, StarFill } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import detailStyle from "./FoodDetail.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

import defaultProfile from "../../images/Profile.WebP";

const errorStyle = { color: "red", fontSize: "12px" };
const FoodDetail = () => {
  const [foods, setFoods] = useState([]);
  const [rate, setRate] = useState([]);

  const [showModal, setShowModal] = useState(null);

  let { ID } = useParams();
  const getJWT = localStorage.getItem("Token");

  const imageError = (e) => {
    e.target.src = defaultProfile;
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/v1/foods/${ID}`, {
        headers: {
          apiKey: process.env.REACT_APP_APIKEY,
          Authorization: `Bearer ${getJWT}`,
        },
      })
      .then((response) => {
        setFoods(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ID, getJWT]);

  const getRate = () => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/v1/food-rating/${ID}`, {
        headers: {
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
      .then((response) => {
        setRate(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/v1/food-rating/${ID}`, {
        headers: {
          apiKey: process.env.REACT_APP_APIKEY,
        },
      })
      .then((response) => {
        setRate(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ID]);

  const handleSubmitRate = () => {
    const values = formik.values;
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/rate-food/${ID}`,
        {
          rating: values.rating,
          review: values.review,
        },
        {
          headers: {
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: `Bearer ${getJWT}`,
          },
        }
      )
      .then((response) => {
        getRate();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      rating: 0,
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, "Minimum rate is 1")
        .max(5, "Maximum rate is 5")
        .required("Give some rate minimum 1 and maximum 5"),
      review: Yup.string().required("Give some review for our food recipe"),
    }),
  });

  return (
    <>
      <Container>
        <h1 className="mt-4 mb-3 fw-bold text-center text-warning fs-sm-5">
          Detail {foods.name}
        </h1>
        <Card className="mx-5">
          <Card.Img
            variant="top"
            src={foods.imageUrl}
            style={{
              width: "152px",
              height: "150px",
              margin: "20px auto",
              borderRadius: "50%",
              border: "2px solid orange",
            }}
          />
          <Card.Body className="pt-1">
            <Card.Title className="fw-bolder text-center mb-4">
              {foods.name}
            </Card.Title>
            <Col className="text-center">
              <Card.Subtitle className="text-truncate mb-4">
                <div className="fw-bolder" style={{ fontSize: "18px" }}>
                  Description
                </div>
                <div>
                  <ArrowDownSquareFill />
                </div>
                <span>{`${foods.description}`}</span>
              </Card.Subtitle>
              <Card.Subtitle className="text-truncate">
                <div className="fw-bolder" style={{ fontSize: "18px" }}>
                  Ingredients
                </div>
                <div>
                  <ArrowDownSquareFill />
                </div>
                <span>{`${foods.ingredients}`.split(",").join(", ")}</span>
              </Card.Subtitle>
            </Col>
          </Card.Body>
          <Card.Footer className="text-center">
            <Card.Text className="fw-bold m-0">{foods.createdAt}</Card.Text>
            <Card.Text className="fw-bold">{foods.createdAt}</Card.Text>
          </Card.Footer>

          <Card.Footer>
            <Button
              variant="success"
              size="sm"
              className="d-flex align-items-center justfy-content-center mx-auto"
              onClick={() => setShowModal(foods.id)}
            >
              <StarFill width={14} height={14} className="me-2" /> Rate Food
            </Button>
            {/* Modal */}
            {showModal === foods.id && (
              <Modal
                show={showModal}
                centered
                onHide={() => setShowModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Rate {foods.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={() => handleSubmitRate(foods.id)}>
                    <div className="py-2 form-group" id="rating">
                      <div className="form-label">Rating 1 - 5</div>
                      <input
                        name="rating"
                        className="form-control"
                        type="number"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <Form.Text style={errorStyle}>
                        {formik.touched.rating && formik.errors.rating}
                      </Form.Text>
                    </div>
                    <div className="py-2 form-group" id="review">
                      <div className="form-label">Write Your Review</div>
                      <textarea
                        name="review"
                        className="form-control"
                        value={formik.values.review}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <Form.Text style={errorStyle}>
                        {formik.touched.review && formik.errors.review}
                      </Form.Text>
                    </div>
                    <div className="text-center py-2">
                      <button type="submit" className="btn btn-success">
                        Submit Rate
                      </button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>
            )}
          </Card.Footer>
        </Card>
        <div className={detailStyle.divider}></div>
        <h1 className="mt-4 mb-3 fw-bold text-center text-warning">
          Rating {foods.name}
        </h1>
        {rate.map((res) => {
          return (
            <Card className="mx-5 mb-4" key={res.id}>
              <Card.Body>
                <Row className="gap-3">
                  <Col
                    md={4}
                    sm={12}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Image
                      src={
                        res.user.profilePictureUrl
                          ? res.user.profilePictureUrl
                          : defaultProfile
                      }
                      onError={imageError}
                      style={{
                        width: "82px",
                        height: "80px",
                        border: "2px solid orange",
                      }}
                      roundedCircle
                    />
                  </Col>
                  <Col
                    md={4}
                    sm={12}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <h6>{res.review}</h6>
                  </Col>
                  <Col
                    key={res.id}
                    md={3}
                    sm={12}
                    className="d-flex align-items-center justify-content-center"
                  >
                    {Array(5)
                      .fill()
                      .map((_, i) => {
                        const ratingValue = i + 1;
                        return (
                          <div key={i}>
                            <StarFill
                              className="star"
                              color={
                                ratingValue <= res.rating
                                  ? "#ffc107"
                                  : "#e4e5e9"
                              }
                              size={14}
                            />
                          </div>
                        );
                      })}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default FoodDetail;
