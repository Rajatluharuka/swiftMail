import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { toggleTheme } from "../../store/theme-slice";

const Navigation = () => {
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.auth.isloggedIn);
  const mode = useSelector((state) => state.theme.mode);
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/");
  };

  const themeToggleHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <header>
      <Navbar
        bg={mode === "light" ? "light" : "dark"}
        variant={mode === "light" ? "light" : "dark"}
        expand="lg"
        sticky="top"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <strong>SwiftMail</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isloggedIn && (
              <>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/home">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/inbox">
                    Mailbox
                  </Nav.Link>
                </Nav>
              </>
            )}
            <div className="ms-auto d-flex">
              <Button
                variant={mode === "light" ? "outline-dark" : "outline-light"}
                className="me-2"
                onClick={themeToggleHandler}
              >
                {mode === "light" ? "🌙" : "🌞"}
              </Button>
              {isloggedIn && (
                <Button variant="danger" onClick={logoutHandler}>
                  Logout
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;
