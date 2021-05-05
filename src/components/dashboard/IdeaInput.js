import React from "react";
import { Card,Form } from "react-bootstrap";

export default function IdeaInput({ idea }) {
  return (
    <Card style={{flexDirection:"row", padding:"5px", textAlign:"center", alignItems:"flex-end"}}>
      <Form style={{padding:"5px"}}>{idea.idea}</Form>
      <div>
      <h6 style={{fontSize:"12px", padding:"5px"}}>Impact</h6>
      <Card style={{padding:"5px"}}>{idea.impact}</Card>
      </div>
      <div>
      <h6 style={{fontSize:"12px", padding:"5px"}}>Ease</h6>
      <Card style={{padding:"5px"}}>{idea.ease}</Card>
      </div>
      <div>
      <h6 style={{fontSize:"12px", padding:"5px"}}>Confidence</h6>
      <Card style={{padding:"5px"}}>{idea.confidence}</Card>
      </div>
      <div>
      <h6 style={{fontSize:"12px", padding:"5px"}}>Avg.</h6>
      <Card style={{padding:"5px"}}>{idea.avg}</Card>
      </div>
      
    </Card>
  );
}
