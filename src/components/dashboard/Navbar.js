import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

export default function NavbarComponent() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory;
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div>
      <Navbar
        
        expand="ms"
        style={{
          backgroundColor: "#01a84c",
          fontWeight: "bold",
          color: "white",
        }}
      >
        
        <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>
        <img
          className="img-pr"
          alt=""
          src="https://i.imgur.com/kEEeXeO.png"
          style={{ width: "25px", margin: "10px" }}
        />The Idea Pool
        </Navbar.Brand>
        <Nav>
          {error && <Alert variant="danger">{error}</Alert>}
          {currentUser.email}
          <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
        </Nav>
        
      </Navbar>
    </div>
  );
}
