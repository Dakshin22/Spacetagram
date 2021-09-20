import React, { useState, useEffect } from "react";
import Resultcard from "../components/ResultCard";
import {
  Tabs,
  Tab,
  Card,
  Button,
  Form,
  Container,
  Row,
  Spinner,
  Col,
} from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { uid } from "react-uid";
import NotFoundPage from "./NotFoundPage";
const ResultsPage = (props) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    getApods();
  }, []);

  const getApods = async () => {
    setLoading(true);
    const API_KEY = process.env.REACT_APP_API_KEY;
    let startDateURL = "start_date=2011-01-09&";
    let endDateURL = "end_date=2011-02-09&";
    let countURL = "";
    let dateURL = "";
    let thumbURL = "thumbs=true&";
    const url = `https://api.nasa.gov/planetary/apod?${startDateURL}${endDateURL}${countURL}${dateURL}${thumbURL}api_key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      setResults(response.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <>
      {!error ? (
        <Tabs defaultActiveKey="photos" className="mb-3">
          <Tab eventKey="photos" title="Photos">
            <div
              style={{
                height: window.innerHeight * 0.878,
                overflow: "scroll",
              }}
            >
              {!loading ? (
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
                            date = {result.date}
                            id={uid(result)}
                          />
                        </Col>
                      ))
                    ) : (
                      <p>No Results</p>
                    )}
                  </Row>
                </Container>
              ) : (
                <div
                  style={{
                    "display": "flex",
                    "justify-content": "center",
                    "align-items": "center",
                    "height": "inherit",
                  }}
                >
                  <Spinner animation="grow" />
                </div>
              )}
            </div>
          </Tab>
          <Tab
            eventKey="likedPhotos"
            title="Your Liked Photos"
            disabled={loading}
          ></Tab>
        </Tabs>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default ResultsPage;
