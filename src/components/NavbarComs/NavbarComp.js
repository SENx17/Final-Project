import React from "react";
import { Container, Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import navbarStyle from "./NavbarComp.module.css";
import Logo from "../../images/SignLogo.WebP";
import { useNavigate } from "react-router-dom";

function NavbarComp() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="light"
        sticky="top"
        className={navbarStyle.navbarColor}
      >
        <Container>
          <Navbar.Brand>
            <Image src={Logo} width={80} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/recipe">Recipe</Nav.Link>

              {localStorage.getItem("Role") === "admin" ? (
                <Nav.Link href="addRecipe">Add Recipe</Nav.Link>
              ) : null}

              <Nav.Link href="/favorite">Favorites</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                title={localStorage.getItem("Name")}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                {localStorage.getItem("Role") === "admin" ? (
                  <NavDropdown.Item href="/listUser">
                    List User
                  </NavDropdown.Item>
                ) : null}

                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem("Token");
                    localStorage.removeItem("Role");
                    localStorage.removeItem("Name");
                    navigate("/");
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
