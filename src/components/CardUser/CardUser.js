import React, { useState, useEffect } from "react";
import { Button, Card, Col, Modal, Image, FormGroup } from "react-bootstrap";
import defaultProfile from "../../images/Profile.WebP";
import cardUserStyle from "./CardUser.module.css";
import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import getAllUser from "../../api/getAllUserAPI";
import axios from "axios";

const CardUser = () => {
  const [allUser, setAllUser] = useState([]);
  const [showModal, setShowModal] = useState(null);

  const imageError = (e) => {
    e.target.src = defaultProfile;
  };

  useEffect(() => {
    getAllUser().then((response) => {
      setAllUser(response.data);
      console.log(response.data);
    });
  }, []);

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
            Authorization: `Bearer ${getJWT}`,
            apiKey: process.env.REACT_APP_APIKEY,
          },
        }
      )
      .then((response) => {
        console.log(response);
        getAllUser().then((response) => {
          setAllUser(response.data);
          console.log(response.data);
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Select Role!");
      });
  };

  const Select = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="mb-3">
        <label htmlFor={props.id || props.name}>{label}</label>
        <select className="form-select" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className={cardUserStyle.error}>
            {meta.error} Admin can't change another Admin role
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      {allUser &&
        allUser.map((res) => {
          return (
            <React.Fragment key={res.id}>
              <Col>
                <Card className="shadow">
                  <Card.Body className="p-3">
                    <div className={cardUserStyle.imagePosition}>
                      <Image
                        src={
                          res.profilePictureUrl
                            ? res.profilePictureUrl
                            : defaultProfile
                        }
                        onError={imageError}
                        className={cardUserStyle.imageSize}
                        alt={res.name}
                      />
                    </div>
                    <div>
                      <h6 className="text-center text-truncate mt-2 fw-bold">
                        {res.name}
                      </h6>
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
                        <p className="ms-2 mb-0 text-truncate">{res.email}</p>
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
                        <p className="ms-2 mb-0">{res.phoneNumber}</p>
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
                        <p className="ms-2 mb-0">{res.role}</p>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button
                      variant="warning border-secondary"
                      className="fw-light"
                      onClick={() => setShowModal(res.id)}
                    >
                      Edit Role
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
              {/* Modal */}
              {showModal === res.id && (
                <Modal
                  show={showModal}
                  centered
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Role</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Formik
                      initialValues={{
                        role: res.role,
                        id: res.id,
                      }}
                      enableReinitialize={true}
                      validationSchema={Yup.object({
                        role: Yup.string().oneOf(
                          ["admin", "general"],
                          "Invalid Job Type"
                        ),
                      })}
                      onSubmit={handleSubmit}
                    >
                      <Form>
                        <FormGroup className="py-2" id="role">
                          <Select label="Role" name="role">
                            <option value="">Select a Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </Select>
                        </FormGroup>
                        <div className="text-center py-2">
                          <Button type="submit" variant="primary">
                            Save Changes
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
    </>
  );
};

export default CardUser;
