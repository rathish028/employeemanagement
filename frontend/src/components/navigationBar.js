import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { getToken, getUser } from "./config";
import { useState } from "react";
import { Button } from "react-bootstrap";

function NavigationBar() {
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 2000)
  };

  return (
    <>
      {token && user && (
        <Navbar collapseOnSelect expand="lg" className=" navigator">
          <Container>
            <Navbar.Brand className="" href="#home">
              Ticket Counter
            </Navbar.Brand>
            <Navbar.Toggle
              className="toggler"
              aria-controls="responsive-navbar-nav"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Item className="mx-3" href="#features">
                  <Link to={"/events"}>Events</Link>
                </Nav.Item>
                <Nav.Item className="mx-3" href="#features">
                  <Link to={"/events"}>Tickets</Link>
                </Nav.Item>
              </Nav>
              <Nav>
                <NavDropdown
                  title={`Signed As : ${user.name}`}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item href="#action3">
                    Email : {user.email}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Mobile : {user.mobile}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5" className="row mx-auto">
                    <Button className="" onClick={handleLogout}>
                      Logout
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
}

export default NavigationBar;
