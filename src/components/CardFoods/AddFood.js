import React from "react";
import { Formik, Form, Field, FieldArray, useField } from "formik";
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
        alert("Food added to our recipe page");
        navigate("/recipe");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add your food recipe!");
      });
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
    <>
      <div className={addFoodStyle.container}>
        <Formik
          initialValues={{
            name: "",
            description: "",
            imageUrl: "",
            ingredients: [""],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
            imageUrl: Yup.string().required("Image URL is required"),
          })}
          onSubmit={handleSubmit}
        >
          <Form>
            <h1 className="text-center mb-4 fs-4 fw-bold">Add Recipe</h1>
            <Input label="Name" name="name" type="text" />
            <Input label="Description" name="description" type="text" />
            <Input label="Image URL" name="imageUrl" type="text" />

            <div className="form-label">Ingredients</div>
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
              <button className=" btn btn-success fw-light">
                Add <span className="fw-bold">+</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default AddFood;
