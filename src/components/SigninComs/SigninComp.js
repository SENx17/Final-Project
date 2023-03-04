import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Image } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import SigninStyle from "./SigninComp.module.css";
import Logo from "../../images/SignLogo.WebP";
import SignBG from "../../images/SignBackground.WebP";

const errorStyle = { color: "red", fontSize: "12px" };

const SigninComp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/login`,
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              apiKey: process.env.REACT_APP_APIKEY,
            },
          }
        )
        .then((response) => {
          const token = response.data.token;
          const role = response.data.user.role;
          const name = response.data.user.name;
          localStorage.setItem("Token", token);
          localStorage.setItem("Role", role);
          localStorage.setItem("Name", name);
          alert("Login Success");
          navigate("/home");
        });
    },
  });
  return (
    <>
      <div className={SigninStyle.container}>
        <Image src={SignBG} className={SigninStyle.backgroundImage} />
        <div
          className={SigninStyle.formContainer}
          onSubmit={formik.handleSubmit}
        >
          <Form>
            <Form.Group className="text-center mb-3">
              <Image src={Logo} width="120px" />
            </Form.Group>
            <Form.Group className="mb-3 text-start" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <div className={SigninStyle.errorStyled}>
                <Form.Text style={errorStyle}>
                  {formik.touched.email && formik.errors.email}
                </Form.Text>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 text-start" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <div className={SigninStyle.errorStyled}>
                <Form.Text style={errorStyle}>
                  {formik.touched.password && formik.errors.password}
                </Form.Text>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Text>
                Don't have an account? Sign up{" "}
                <a href="/signup" style={{ textDecoration: "none" }}>
                  here
                </a>
              </Form.Text>
            </Form.Group>
            <Form.Group className="text-center">
              <Button
                variant="light px-4 border-dark"
                type="submit"
                disabled={!formik.isValid || isLoading}
              >
                Sign In
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SigninComp;
