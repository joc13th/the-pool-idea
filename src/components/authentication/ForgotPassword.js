import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
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
          <h2 className="mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                required
                placeholder="Email"
                ref={emailRef}
              />
            </Form.Group>

            <Button
              disabled={loading}
              type="submit"
              className="w-100 text-center mt-2"
              style={{ background: "#01a84c", border: "none" }}
            >
              RESET PASSWORD{" "}
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="login">Log in</Link>
          </div>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-2">
          Don't have an account?<Link to="/signup"> Sign up!</Link>
        </div>
      </Card>
    </CenteredContainer>
  );
}
