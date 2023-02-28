import React from "react";
import { Button, Form, Image } from "react-bootstrap";
import SigninStyle from "./SigninComp.module.css";
import Logo from "../../images/SignLogo.WebP";
import SignBG from "../../images/SignBackground.WebP";

const SigninComp = () => {
  return (
    <>
      <div className={SigninStyle.container}>
        <Image src={SignBG} className={SigninStyle.backgroundImage} />
        <div className={SigninStyle.formContainer}>
          <Form>
            <Form.Group className="text-center mb-3">
              <Image src={Logo} width="120px" />
            </Form.Group>
            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group
              className="mb-3 text-start"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Text>
                Don't have an account? Sign up{" "}
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
