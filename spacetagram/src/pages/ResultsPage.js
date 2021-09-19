import React, { useState, useEffect } from "react";
import Resultcard from "../components/ResultCard";
import { Card, Button, Form, Container, Row, Spinner, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { uid } from "react-uid";

const ResultsPage = (props) => {
  const [results, setResults] = useState([]);
  const [likedResults, setLikedResults] = useState({})
  useEffect(() => {
    getApods();
  }, []);

  const getApods = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    let startDateURL = "start_date=2011-01-09&";
    let endDateURL = "end_date=2011-02-09&";
    let countURL = "";
    let dateURL = "";
    let thumbURL = "thumbs=true&"
    const url = `https://api.nasa.gov/planetary/apod?${startDateURL}${endDateURL}${countURL}${dateURL}${thumbURL}api_key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    
      <Container fluid>
        <Row xs={1} md={3} className="g-4">
              {results ? (
                results.map((result, index) => (
                    <Col>
                  <Resultcard
                    key={index}
                    copyright={result.copyright}
                    img={result.url}
                    title={result.title}
                    explanation={result.explanation}
                    id={uid(result)}
                  />
                  </Col>
                ))
              ) : (
                <p>No Results</p>
              )}
        </Row>
      </Container>
    </>
  );
};

export default ResultsPage;
