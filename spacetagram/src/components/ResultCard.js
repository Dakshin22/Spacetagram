import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
const Resultcard = (props) => {

  const [liked, setLiked] = useState(false);
  return (
    <>
      <Card>
        <Card.Img
          style={{
            objectFit: "scale-down",
            height: "50vh",
          }}
          variant="top"
          src={props.img}
          className="justify-content-md-center"
        />
        <Card.Body>
        <Button></Button>
          <Card.Title>
            {props.title} {props.id}
          </Card.Title>
          <Card.Text>{props.explanation}</Card.Text>
        </Card.Body>
        {props.copyright && (
          <ListGroup className="list-group-flush">
            <ListGroupItem>{props.copyright}</ListGroupItem>
          </ListGroup>
        )}
      </Card>
    </>
  );
};

export default Resultcard;
