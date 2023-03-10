import React from "react";
import { Button, Form, Card } from "react-bootstrap";
import { Formik, Field, FieldArray } from "formik";
import * as Yup from "yup";
import addFoodStyle from "./AddFood.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFood = () => {
  const getJWT = localStorage.getItem("Token");
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/create-food`,
        {
          name: values.name,
          description: values.description,
          imageUrl: values.imageUrl,
          ingredients: values.ingredients,
        },
        {
          headers: {
            Authorization: `Bearer ${getJWT}`,
            apiKey: process.env.REACT_APP_APIKEY,
          },
        }
      )
      .then((response) => {
        response
          ? alert("Add more food recipe?") && navigate("/addRecipe")
          : alert("Food added to our recipe page") && navigate("/recipe");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add your food recipe!");
      });
  };

  //   const FormInput = ({ label, ...props }) => {
  //     const [field, meta] = useField(props);
  //     return (
  //       <div className="row mb-3">
  //         <div className="col-lg-12">
  //           <label
  //             className="form-label fw-bold mb-1"
  //             htmlFor={props.id || props.name}
  //           >
  //             {label}
  //           </label>
  //           <FormControl {...field} {...props} />
  //           {meta.touched && meta.error ? (
  //             <div className="text-danger">{meta.error}</div>
  //           ) : null}
  //         </div>
  //       </div>
  //     );
  //   };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          description: "",
          ingredients: [""],
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          description: Yup.string().required("Required"),
        })}
        onSubmit={handleSubmit}
      >
        <Form className={addFoodStyle.container}>
          <Card.Title className="text-center mb-4 fs-4 fw-bold">
            Add Recipe
          </Card.Title>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" />
          </Form.Group>
          <Form.Group controlId="imageUrl" className="mb-3">
            <Form.Label>Food Image URL</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Label>Ingredients</Form.Label>
          <FieldArray name="ingredients">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { ingredients } = values;
              return (
                <div>
                  {ingredients.map((ingredient, i) => (
                    <div key={i} className="d-flex input-group mb-1">
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
          <div className="text-center mt-4">
            <Button variant="success" className="fw-light">
              Add <span className="fw-bold">+</span>
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default AddFood;
