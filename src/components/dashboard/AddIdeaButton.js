import React, { useState } from "react";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function AddIdeaButton({ currentIdea }) {
  const [open, setOpen] = useState(false);
  const [idea, setIdea] = useState("");
  const [impact, setImpact] = useState(1);
  const [ease, setEase] = useState(1);
  const [confidence, setConfidence] = useState(1);
  var [avg, setAvg] = useState(1);
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentIdea == null) return;
    database.ideas.add({
      idea,
      parentId: currentIdea.id,
      userId: currentUser.uid,
      createdAt: database.getCurrentTimeStamp(),
      impact,
      ease,
      confidence,
      avg,
    });
    setIdea("");
    setImpact(1);
    setEase(1);
    setConfidence(1);
    setAvg(1);
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="xl">
        <FontAwesomeIcon icon={faPlusCircle} />
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <InputGroup style={{ alignItems: "flex-end", flexWrap: "wrap" }}>
              <Form.Control
                type="text"
                required
                value={idea}
                placeholder="Write here your idea!"
                style={{ width: "400px" }}
                onChange={(e) => setIdea(e.target.value)}
              />
              <div className="quantity">
                <h6 className="text-center">Impact</h6>
                <Form.Control
                  name="impact"
                  type="number"
                  min={1}
                  max={10}
                  step={1}
                  required
                  value={impact}
                  onChange={(e) => {
                    setImpact(e.target.value);
                    const avg = (
                      (parseInt(e.target.value) +
                        parseInt(ease) +
                        parseInt(confidence)) /
                      3
                    ).toFixed(1);
                    setAvg(avg);
                  }}
                ></Form.Control>
              </div>

              <div className="quantity">
                <h6 className="text-center">Ease</h6>
                <Form.Control
                  name="ease"
                  type="number"
                  min={1}
                  max={10}
                  step={1}
                  required
                  value={ease}
                  onChange={(e) => {
                    setEase(e.target.value);
                    const avg = (
                      (parseInt(impact) +
                        parseInt(e.target.value) +
                        parseInt(confidence)) /
                      3
                    ).toFixed(1);
                    setAvg(avg);
                  }}
                ></Form.Control>
              </div>

              <div className="quantity">
                <h6 className="text-center">Confidence</h6>
                <FormControl
                  name="confidence"
                  type="number"
                  min={1}
                  max={10}
                  step={1}
                  required
                  value={confidence}
                  onChange={(e) => {
                    setConfidence(e.target.value);
                    const avg = (
                      (parseInt(impact) +
                        parseInt(ease) +
                        parseInt(e.target.value)) /
                      3
                    ).toFixed(1);
                    setAvg(avg);
                  }}
                ></FormControl>
              </div>

              <div style={{ flexDirection: "column" }}>
                <h6 className="text-center">Avg.</h6>
                <div style={{ maxWidth: "60px" }}>
                  <Form.Control name="avg" id="avg" value={avg}></Form.Control>
                </div>
              </div>

              <Button variant="outline-success" type="submit" size="xl">
                 Save
              </Button>
            </InputGroup>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}
