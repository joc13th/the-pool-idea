import React from "react";
import {Container} from "react-bootstrap"

export default function CenteredContainer({children}) {
  return (
    <div style={{ background: "#01a84c" }}>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >{children}
        <div className="w-300"></div>
      </Container>
    </div>
  );
}
