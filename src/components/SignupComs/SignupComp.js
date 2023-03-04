import React from "react";
import { Form, Image, Button } from "react-bootstrap";
import Logo from "../../images/SignLogo.WebP";
import SignupStyle from "./SignupComp.module.css";
import SignBG from "../../images/SignBackground.WebP";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

const SignupComp = () => {
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confPassword: "",
      role: "",
      imageURL: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Username is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
      confPassword: Yup.string().required("Password confirmation is required"),
      role: Yup.string().required("Role is required"),
      imageURL: Yup.string().required("Image URL is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
    }),
  });
  return (
    <>
      <div className={SignupStyle.container}>
        <Image className={SignupStyle.backgroundImage} src={SignBG} />
        <div className={SignupStyle.formContainer}>
          <Form className="row">
            <Form.Group className="text-center mb-3">
              <Image src={Logo} width="120px" />
            </Form.Group>
            <div className="col d-flex flex-column gap-1">
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicFullname"
              >
                <Form.Label>Fullname</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" autoComplete="false" />
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicConfirmPassword"
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
            </div>
            <div className="col d-flex flex-column gap-5">
              <Form.Group className="mb-3 text-start" controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Select>
                  <option>Admin</option>
                  <option>User</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicImageURL"
              >
                <Form.Label>Image Profile URL</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicPhoneNumber"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </div>
            <Form.Group className="mb-3 text-center">
              <Form.Text>
                Already have an account? Sign in{" "}
                <a href="#Register" style={{ textDecoration: "none" }}>
                  here
                </a>
              </Form.Text>
            </Form.Group>
            <Form.Group className="text-center">
              <Button
                className="px-4 border-dark"
                variant="light"
                type="submit"
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
