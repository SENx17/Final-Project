import React, { useState } from "react";
import { Form, Image, Button } from "react-bootstrap";
import Logo from "../../images/SignLogo.WebP";
import SignupStyle from "./SignupComp.module.css";
import SignBG from "../../images/SignBackground.WebP";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

const errorStyle = { color: "red", fontSize: "12px" };

const SignupComp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      profilePictureUrl: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Input valid email address")
        .required("Email is Required"),
      password: Yup.string().required("Password is required"),
      passwordRepeat: Yup.string().required(
        "Password confirmation is required"
      ),
      role: Yup.string().required("Role is required"),
      profilePictureUrl: Yup.string().required("Profile Image URL is required"),
      phoneNumber: Yup.number().required("Phone number is required"),
    }),
    onSubmit: (values) => {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/register`,
          {
            name: values.name,
            email: values.email,
            password: values.password,
            passwordRepeat: values.passwordRepeat,
            role: values.role,
            profilePictureUrl: values.profilePictureUrl,
            phoneNumber: values.phoneNumber,
          },
          {
            headers: {
              apiKey: process.env.REACT_APP_APIKEY,
            },
          }
        )
        .then((response) => {
          console.log(response);
          alert("Successfully Registered");
          navigate("/");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          alert("Register Failed");
          navigate("/signup");
          setIsLoading(false);
        });
    },
  });

  return (
    <>
      <div className={SignupStyle.container}>
        <Image className={SignupStyle.backgroundImage} src={SignBG} />
        <div className={SignupStyle.formContainer}>
          <Form className="row" onSubmit={formik.handleSubmit}>
            <Form.Group className="text-center mb-3">
              <Image src={Logo} width="120px" />
            </Form.Group>
            <div className="col d-flex flex-column">
              <Form.Group className="mb-3 text-start" controlId="name">
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <div className={SignupStyle.errorStyled}>
                  <Form.Text style={errorStyle}>
                    {formik.touched.name && formik.errors.name}
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
                <div className={SignupStyle.errorStyled}>
                  <Form.Text style={errorStyle}>
                    {formik.touched.password && formik.errors.password}
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="passwordRepeat"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.passwordRepeat}
                />
                <div className={SignupStyle.errorStyled}>
                  <Form.Text style={errorStyle}>
                    {formik.touched.passwordRepeat &&
                      formik.errors.passwordRepeat}
                  </Form.Text>
                </div>
              </Form.Group>
            </div>
            <div className="col d-flex flex-column">
              <Form.Group className="mb-3 text-start" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <div className={SignupStyle.errorStyled}>
                  <Form.Text style={errorStyle}>
                    {formik.touched.email && formik.errors.email}
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 text-start" controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.role}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Form.Select>
                <div className={SignupStyle.errorStyled}>
                  <Form.Text style={errorStyle}>
                    {formik.touched.role && formik.errors.role}
                  </Form.Text>
                </div>
              </Form.Group>
              <Form.Group className="mb-3 text-start" controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
                <div className={SignupStyle.errorStyled}>
                  <Form.Text style={errorStyle}>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber}
                  </Form.Text>
                </div>
              </Form.Group>
            </div>
            <Form.Group
              className="mb-3 text-start"
              controlId="profilePictureUrl"
            >
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.profilePictureUrl}
              />
              <div className={SignupStyle.errorStyled}>
                <Form.Text style={errorStyle}>
                  {formik.touched.profilePictureUrl &&
                    formik.errors.profilePictureUrl}
                </Form.Text>
              </div>
            </Form.Group>
            <Form.Group className="mb-3 text-center">
              <Form.Text>
                Already have an account? Sign in{" "}
                <a href="/" style={{ textDecoration: "none" }}>
                  here
                </a>
              </Form.Text>
            </Form.Group>
            <Form.Group className="text-center">
              <Button
                className="px-4 border-dark"
                variant="light"
                type="submit"
                disabled={!formik.isValid || isLoading}
              >
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignupComp;
