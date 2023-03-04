import { React } from "react";
import { Image, Button } from "react-bootstrap";
import profileCardStyle from "./CardProfile.module.css";
import dummyProfile from "../../images/SignLogo.WebP";

const CardProfile = () => {
  return (
    <>
      <div className={profileCardStyle.container}>
        <div className={profileCardStyle.profileContainer}>
          <div className={profileCardStyle}>
            <Image
              src={dummyProfile}
              className={profileCardStyle.imageThumbnail}
              roundedCircle
            />
          </div>
          <div className={profileCardStyle.profileContent}>
            <div className={profileCardStyle.profileContentWrapper}>
              <div>
                <h5 className="fw-bold ">Name</h5>
                <p className="fw-bold text-secondary">Test</p>
              </div>
              <div>
                <h5 className="fw-bold ">Email</h5>
                <p className="fw-bold text-secondary">Test</p>
              </div>
              <div>
                <h5 className="fw-bold">Role</h5>
                <p className="fw-bold text-secondary">Test</p>
              </div>
              <div>
                <h5 className="fw-bold">Phone Number</h5>
                <p className="fw-bold text-secondary">Test</p>
              </div>
            </div>
            <div className="text-center pt-5">
              <Button
                variant="outline-warning"
                size="md"
                className="px-4 py-2 text-dark border-dark"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfile;
