import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  PinterestShareButton,
  PinterestIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
const Resultcard = (props) => {
  const [liked, setLiked] = useState(false);

  const onLikeOrUnlike = () => {
    setLiked((prevState) => !prevState);
  };
  return (
    <>
      <Card>
      <Card.Header className="text-center">
            <PinterestShareButton
              url={props.img}
              media={props.img}
              description={props.title}
            >
              <PinterestIcon size={32} round />
            </PinterestShareButton>{" "}
            <LinkedinShareButton
              url={props.img}
              title={`Photo of ${props.title}`}
              summary={`Read about the ${props.title} ${props.description}`}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>{" "}
            <EmailShareButton
              url={props.img}
              subject={"Check out this cool space photo!"}
              body={`I just saw this photo of ${props.title} on the NASA API, let me know what you think!`}
              seperator={":\n"}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>{" "}
            </Card.Header>
        <Card.Img
          style={{
            objectFit: "scale-down",
            height: "50vh",
          }}
          variant="top"
          src={props.img}
          className="justify-content-md-center"
          alt ={ `Photo of ${props.title}`}
        />
        <Card.Body className="text-center">
            <Button variant={liked ? "success": "outline-dark"} onClick={onLikeOrUnlike}>
              {liked ? "I like this!" : "Like"}
            </Button>
        </Card.Body>
        <Card.Body>
          <Card.Title>
            {props.title}{" "}
            {liked ? <AiFillHeart /> : <AiOutlineHeart />}
          </Card.Title>

          <Card.Text>{props.explanation}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {props.copyright && <ListGroupItem>{props.copyright}</ListGroupItem>}
          <ListGroupItem>Date: {props.date}</ListGroupItem>
        </ListGroup>


      </Card>
    </>
  );
};

export default Resultcard;
