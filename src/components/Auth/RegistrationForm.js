import React, { useRef, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/auth-slice";

const RegistrationForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      setIsPasswordMatched(false);
      return;
    }

    setIsPasswordMatched(true);
    setIsLoading(true);
    setStatusMessage("");

    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOEUpZUIvbFfmuHPZ0niHQs5SsPtZaq0c",
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      setStatusMessage("Registration Successful!");
      dispatch(
        authActions.login({
          token: response.data.idToken,
          email: response.data.email,
        })
      );
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response &&
        error.response.data &&
        error.response.data.error.message
          ? error.response.data.error.message
          : "Registration Failed";
      setStatusMessage(errorMessage);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "100%", maxWidth: "400px" }} className="shadow-lg">
        <Card.Body>
          <div className="text-center mb-3">
            <h3>Create Account</h3>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your password"
                ref={confirmPasswordRef}
                required
              />
            </Form.Group>
            {!isPasswordMatched && (
              <Alert variant="danger" className="text-center">
                Passwords do not match!
              </Alert>
            )}
            {statusMessage && (
              <Alert
                variant={
                  statusMessage === "Registration Successful!"
                    ? "success"
                    : "danger"
                }
                className="text-center"
              >
                {statusMessage}
              </Alert>
            )}
            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="w-100"
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </div>
            <p className="mt-3 text-center">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegistrationForm;
