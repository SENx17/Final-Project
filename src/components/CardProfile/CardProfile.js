import React, { useState, useEffect } from "react";
import { Image, Button, Modal, Form, FormGroup } from "react-bootstrap";
import profileCardStyle from "./CardProfile.module.css";
import profilePageBg from "../../images/ProfilePageBackground.WebP";
import getUserLogin from "../../api/getUserLoginAPI";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import defaultProfile from "../../images/Profile.WebP";

const CardProfile = () => {
  const [userLogin, setUserLogin] = useState("");
  const [show, setShow] = useState(false);

  const imageError = (e) => {
    e.target.src = defaultProfile;
  };

  useEffect(() => {
    getUserLogin().then((response) => {
      setUserLogin(response.user);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: userLogin.name,
      email: userLogin.email,
      phoneNumber: userLogin.phoneNumber,
      profilePictureUrl: userLogin.profilePictureUrl,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Input valid email address")
        .required("Email is required"),
      phoneNumber: Yup.number().required("Phone number is required"),
      profilePictureUrl: Yup.string().required("Profile URL is required"),
    }),
    onSubmit: (values) => {
      const getJWT = localStorage.getItem("Token");
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/v1/update-profile`,
          {
            name: values.name,
            email: values.email,
            phoneNumber: values.phoneNumber,
            profilePictureUrl: values.profilePictureUrl,
          },
          {
            headers: {
              apiKey: process.env.REACT_APP_APIKEY,
              Authorization: `Bearer ${getJWT}`,
            },
          }
        )
        .then((response) => {
          getUserLogin().then((response) => {
            setUserLogin(response.user);
          });
          alert("Profile change has been made");
        })
        .catch((err) => {
          console.log(err);
          alert("");
        });
    },
  });

  return (
    <>
      <div className={profileCardStyle.container}>
        <Image
          src={profilePageBg}
          className={profileCardStyle.backgroundImage}
        />
        <div className={profileCardStyle.profileContainer}>
          <div className={profileCardStyle}>
            <Image
              src={
                userLogin.profilePictureUrl
                  ? userLogin.profilePictureUrl
                  : defaultProfile
              }
              className={profileCardStyle.imageThumbnail}
              onError={imageError}
              roundedCircle
            />
          </div>
          <div className={profileCardStyle.profileContent}>
            <div className={profileCardStyle.profileContentWrapper}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
                <p className="fw-bold text-secondary">{userLogin.name}</p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
                <p className="fw-bold text-secondary">{userLogin.email}</p>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-telephone"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg>
                <p className="fw-bold text-secondary">
                  {userLogin.phoneNumber}
                </p>
              </div>
            </div>
            <div className="text-center pt-3">
              <Button
                variant="outline-warning"
                size="md"
                className="px-4 py-2 text-dark border-dark"
                onClick={() => setShow(true)}
              >
                Edit Profile
              </Button>
              <Modal show={show} centered onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={formik.handleSubmit}>
                    <FormGroup controlId="name" className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                    </FormGroup>
                    <FormGroup controlId="email" className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                    </FormGroup>
                    <FormGroup controlId="phoneNumber" className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="number"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                      />
                    </FormGroup>
                    <FormGroup controlId="profilePictureUrl" className="mb-3">
                      <Form.Label>Profile Picture URL</Form.Label>
                      <Form.Control
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.profilePictureUrl}
                      />
                    </FormGroup>
                    <div className="text-center py-2">
                      <Button
                        type="submit"
                        variant="primary"
                        onClick={() => setShow(false)}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfile;
