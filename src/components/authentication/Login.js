import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in");
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
          <h1>The Idea Pool</h1> <h2 className="mb-4">Log In</h2>
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
            <Button
              disabled={loading}
              type="submit"
              className="w-100 text-center mt-2"
              style={{ background: "#01a84c", border: "none" }}
            >
              LOG IN
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-2">
          Don't have an account?<Link to="/signup"> Sign up!</Link>
        </div>
      </Card>
    </CenteredContainer>
  );
}
