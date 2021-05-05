import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <CenteredContainer>
      <Card className="text-center mb-4">
        <Card.Body>
          <img
            className="img-pr"
            alt=""
            src="https://i.imgur.com/kEEeXeO.png"
            style={{ width: "60px", margin: "10px" }}
          />
          <h1>The Idea Pool</h1>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                required
                placeholder="Email"
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control
                type="password"
                required
                placeholder="Password"
                ref={passwordRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Control
                type="password"
                required
                placeholder="Password confirmation"
                ref={passwordConfirmRef}
              ></Form.Control>
            </Form.Group>
            <Button
              disabled={loading}
              type="submit"
              className="w-100 text-center mt-2"
              style={{ background: "#01a84c", border: "none" }}
            >
              SIGN UP
            </Button>
          </Form>
          <div className="w-100 text-center mt-2 mb-2">
            Already have an account? <Link to="/login">Log In!</Link>
          </div>
        </Card.Body>
      </Card>
    </CenteredContainer>
  );
}
