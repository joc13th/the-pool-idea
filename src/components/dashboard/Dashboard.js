import React from "react";
import { Container, Button } from "react-bootstrap";
import Navbar from "./Navbar";
import AddIdeaButton from "./AddIdeaButton";
import { useIdea } from "../../hooks/useIdea";
import IdeaInput from "./IdeaInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../firebase";

export default function Dashboard() {
  const { idea, childIdeas } = useIdea("BiKqQxysH1Xhvx65V6i1");

  const onRemove = async (childIdea) => {
    if (window.confirm("Are you sure you want to delete this idea?"))
      try {
        await database.ideas.doc(childIdea).delete();
      } catch (error) {
        console.log(error);
      }
  };
  
  return (
    <>
      <Navbar />
      <Container>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>My Ideas</h1>
          <AddIdeaButton currentIdea={idea} />
        </div>
        <hr
          style={{
            marginTop: "10px",
            marginBottom: "40px",
            border: "0",
            height: "1px",
            background: "#717171",
            borderBottom: "1px  #313030",
          }}
        ></hr>
        {childIdeas.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {childIdeas.map((childIdea) => (
              <div
                key={childIdea.id}
                style={{ display: "flex", margin: "5px" }}
                className="p-10"
              >
                {/* Add button */}
                <IdeaInput idea={childIdea} />

                {/* Edit button */}
                <Button
                  variant="outline-success"
                  size="sm"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                
                {/* Delete button */}
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => onRemove(childIdea.id)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
