import React, { useState, useEffect } from "react";
import Resultcard from "../components/ResultCard";
import { Button, Form, Container, Row, Spinner, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {uid} from 'react-uid';

const ResultsPage = (props) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getApods();
  }, []);

  const getApods = async () => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    let startDateURL = "start_date=2019-01-09&";
    let endDateURL = "end_date=2019-02-09&";
    let countURL = "";
    let dateURL = "";
    const url = `https://api.nasa.gov/planetary/apod?${startDateURL}${endDateURL}${countURL}${dateURL}api_key=${API_KEY}`;

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
        <Row>
          <Col md={10}>
            <Row className="justify-content-md-center">
              {results ? (
                results.map((result, index) => (
                  <Resultcard
                    key={index}
                    copyright={result.copyright}
                    img={result.hdurl}
                    title={result.title}
                    explanation={result.explanation}
                    id={ uid(result) }
                  />
                ))
              ) : (
                <p>No Results</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResultsPage;
