import React, { useState } from "react";
import { Card} from "react-bootstrap";
import { AiFillRocket } from "react-icons/ai";
const Resultcard = (props) => {
  return (
    <>
      <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={props.img} />
          <Card.Body>
            <Card.Title
              style={{ color: "black", height: "75px", overflow: "hidden" }}
            >
              {props.name}
            </Card.Title>
            <Card.Text style={{}}>
              <li
                style={{
                  listStyleType: "none",
                  fontSize: "30px",
                  color: "black",
                }}
              >
                {props.price}
              </li>
              <li
                style={{
                  listStyleType: "none",
                  fontSize: "20px",
                  color: "green",
                }}
              >
                {props.organic === 1 ? "Organic" : ""}
              </li>
              <li
                style={{
                  listStyleType: "none",
                  fontSize: "20px",
                  color: "green",
                }}
              >
                {props.sale === 1 ? "On Sale!" : ""}
              </li>
            </Card.Text>
          </Card.Body>

      </Card>
    </>
  );
};

export default Resultcard;
