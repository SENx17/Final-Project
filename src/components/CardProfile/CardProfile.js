import { React } from "react";
import { Container, Image, Button } from "react-bootstrap";
import testImageProfile from "../../images/FriedEgg.jpg";
import profileCardStyle from "./CardProfile.module.css";

const CardProfile = () => {
  return (
    <>
      <Container className={profileCardStyle.container}>
        <div className={profileCardStyle.profileContainer}>
          <div className={profileCardStyle.profileTitle}>
            <Image
              src={testImageProfile}
              className={profileCardStyle.imageThumbnail}
              roundedCircle
            />
          </div>
          <div className={profileCardStyle.profileContent}>
            <div className={profileCardStyle.profileContentWrapper}>
              <div>
                <h2 className="fw-bold fs-4">Name</h2>
                <p className="fw-bold text-secondary">Test</p>
              </div>
              <div>
                <h2 className="fw-bold fs-4">Email</h2>
                <p className="fw-bold text-secondary">Test</p>
              </div>
              <div>
                <h2 className="fw-bold fs-4">Role</h2>
                <p className="fw-bold text-secondary">Test</p>
              </div>
              <div>
                <h2 className="fw-bold fs-4">Phone Number</h2>
                <p className="fw-bold text-secondary">Test</p>
              </div>
              <Button variant="warning" size="lg" className="mt-4">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CardProfile;
