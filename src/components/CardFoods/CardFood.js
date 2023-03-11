import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Card,
  Button,
  Modal,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import cardFoodStyle from "./CardFood.module.css";
import { HeartFill } from "react-bootstrap-icons";
import getFoods from "../../api/getFoodAPI";
import { Field, FieldArray, Form, Formik, useField } from "formik";
import * as Yup from "yup";

const CardFood = () => {
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const getJWT = localStorage.getItem("Token");

  useEffect(() => {
    getFoods().then((response) => {
      setFoods(response.data);
    });
  }, []);

  const handleLikeFood = (id, isLike) => {
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
            setFoods(response.data);
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

  useEffect(() => {
    getFoods().then((response) => {
      setFoods(response.data);
    });
  }, []);

  const handleUpdateFood = (values) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/update-food/${values.id}`,
        {
          name: values.name,
          description: values.description,
          imageUrl: values.imageUrl,
          ingredients: values.ingredients,
        },
        {
          headers: {
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: `Bearer ${getJWT}`,
          },
        }
      )
      .then((response) => {
        getFoods().then((response) => {
          setFoods(response.data);
        });
        alert("Food updated to our recipe page");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update your food recipe!");
      });
  };

  const handleDeleteFood = (id) => {
    if (window.confirm("Delete this food ?")) {
      axios
        .delete(`${process.env.REACT_APP_BASEURL}/api/v1/delete-food/${id}`, {
          headers: {
            Authorization: `Bearer ${getJWT}`,
            apiKey: process.env.REACT_APP_APIKEY,
          },
        })
        .then((response) => {
          getFoods().then((response) => {
            setFoods(response.data);
          });
          alert("Food deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="row mb-3">
        <div className="col-lg-12">
          <label className="form-label mb-3" htmlFor={props.id || props.name}>
            {label}
          </label>
          <input className="form-control" {...field} {...props} />
          {meta.touched && meta.error ? (
            <div className="text-danger">{meta.error}</div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {foods &&
        foods.map((result) => {
          return (
            <React.Fragment key={result.id}>
              <Col>
                <Card className="shadow" style={{ width: "100%" }}>
                  <div>
                    <Card.Img
                      src={result.imageUrl}
                      className={cardFoodStyle.imageSize}
                      alt={result.name}
                    />
                  </div>
                  <Card.Body className="p-0">
                    <div>
                      <h6 className="fw-bold text-center text-truncate px-2">
                        {result.name}
                      </h6>
                    </div>
                    <div className="d-flex gap-3 ps-1 pb-2">
                      <span className="d-flex align-items-center text-secondary fw-lighter gap-1">
                        <HeartFill
                          style={{ color: `${result.isLike ? "red" : "gray"}` }}
                          onClick={() =>
                            handleLikeFood(result.id, result.isLike)
                          }
                        />
                        {result.totalLikes}
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
                        {result.rating}
                      </span>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    {localStorage.getItem("Role") === "admin" ? (
                      <div className="d-flex gap-2 justify-content-center mb-1">
                        <Button
                          variant="success border-secondary"
                          className="fw-light"
                          size="sm"
                          onClick={() => setShowModal(result.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger border-secondary"
                          className="fw-light"
                          size="sm"
                          onClick={() => {
                            handleDeleteFood(result.id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : null}

                    <Button
                      style={{ width: "110px" }}
                      variant="warning border-secondary"
                      size="sm"
                      className="fw-light"
                      href={`/detail/${result.id}`}
                    >
                      See detail
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
              {/* Modal */}
              {showModal === result.id && (
                <Modal
                  show={showModal}
                  centered
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Food</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Formik
                      initialValues={{
                        id: result.id,
                        name: result.name,
                        description: result.description,
                        imageUrl: result.imageUrl,
                        ingredients: result.ingredients,
                      }}
                      validationSchema={Yup.object({
                        name: Yup.string().required("Name is required"),
                        description: Yup.string().required(
                          "Description is required"
                        ),
                        imageUrl: Yup.string().required(
                          "Image URL is required"
                        ),
                      })}
                      onSubmit={handleUpdateFood}
                    >
                      <Form>
                        <FormGroup className="py-2" id="role">
                          <Input label="Name" name="name" type="text" />
                          <Input
                            label="Description"
                            name="description"
                            type="text"
                          />
                          <Input
                            label="Image URL"
                            name="imageUrl"
                            type="text"
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Ingredients</FormLabel>
                          <FieldArray name="ingredients">
                            {(fieldArrayProps) => {
                              const { push, remove, form } = fieldArrayProps;
                              const { values } = form;
                              const { ingredients } = values;
                              return (
                                <div>
                                  {ingredients.map((ingredient, i) => (
                                    <div
                                      key={i}
                                      className="d-flex input-group mb-1"
                                    >
                                      <Field
                                        name={`ingredients[${i}]`}
                                        placeholder={`Ingredient ${i + 1}`}
                                        className="form-control"
                                      />
                                      {i > 0 && (
                                        <button
                                          type="button"
                                          className="btn btn-danger fw-bold"
                                          onClick={() => remove(i)}
                                        >
                                          -
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        className="btn btn-success fw-bold"
                                        onClick={() => push("")}
                                      >
                                        +
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              );
                            }}
                          </FieldArray>
                        </FormGroup>
                        <div className="text-center pt-4">
                          <Button type="submit" variant="success">
                            Update
                          </Button>
                        </div>
                      </Form>
                    </Formik>
                  </Modal.Body>
                </Modal>
              )}
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

export default CardFood;
