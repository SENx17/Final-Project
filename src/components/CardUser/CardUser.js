import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Modal,
  Image,
  Form,
  FormGroup,
} from "react-bootstrap";
import defaultProfile from "../../images/Profile.WebP";
import cardUserStyle from "./CardUser.module.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const CardUser = ({
  id,
  name,
  email,
  role,
  profilePictureUrl,
  phoneNumber,
}) => {
  const navigate = useNavigate();
  const [imageBroken, setImageBroken] = useState(profilePictureUrl);
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imageError = () => {
    setImageBroken(defaultProfile);
  };

  const handleSubmit = (values) => {
    const getJWT = localStorage.getItem("Token");
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/api/v1/update-user-role/${values.id}`,
        {
          role: values.role,
        },
        {
          headers: {
            apiKey: process.env.REACT_APP_APIKEY,
            Authorization: `Bearer ${getJWT}`,
          },
        }
      )
      .then((response) => {
        alert(response.message);
        navigate("/listUser");
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        navigate("/listUser");
        setIsLoading(false);
      });
  };

  return (
    <>
      <Col>
        <Card className="shadow">
          <Card.Body className="p-3">
            <div className={cardUserStyle.imagePosition}>
              <Image
                src={imageBroken ? imageBroken : defaultProfile}
                onError={imageError}
                className={cardUserStyle.imageSize}
                alt={name}
              />
            </div>
            <div>
              <h6 className="text-center text-truncate mt-2 fw-bold">{name}</h6>
            </div>
            <div className="mt-4">
              <div className="d-flex flex-row align-items-center mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
                <p className="ms-2 mb-0 text-truncate">{email}</p>
              </div>
              <div className="d-flex flex-row align-items-center mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-telephone"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg>
                <p className="ms-2 mb-0">{phoneNumber}</p>
              </div>
              <div className="d-flex flex-row align-items-center mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                </svg>
                <p className="ms-2 mb-0">{role}</p>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="text-center">
            <Button
              variant="warning border-secondary"
              className="fw-light"
              onClick={handleShow}
            >
              Edit Role
            </Button>
            {/* Modal */}
            <Modal show={show} onHide={handleClose} animation={true} centered>
              <Modal.Title className="py-2 text-center">Edit Role</Modal.Title>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <FormGroup className="py-2" controlId="role">
                    <Form.Label>Role Select</Form.Label>
                    <Form.Select>
                      <option>Select Role</option>
                      <option>Admin</option>
                      <option>User</option>
                    </Form.Select>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default CardUser;
