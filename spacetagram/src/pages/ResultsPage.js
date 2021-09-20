import React, { useState, useEffect } from "react";
import Resultcard from "../components/ResultCard";
import {
  OverlayTrigger,
  Tooltip,
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
  const [error, setError] = useState("");
  const [dates, setDates] = useState(["2011-01-09", "2011-02-09"]);
  useEffect(() => {
    getApods();
  }, [dates]);

  const getApods = async () => {
    setLoading(true);
    const API_KEY = process.env.REACT_APP_API_KEY;
    let startDateURL = `start_date=${dates[0]}&`;
    let endDateURL = `end_date=${dates[1]}&`;
    let thumbURL = "thumbs=true&";
    const url = `https://api.nasa.gov/planetary/apod?${startDateURL}${endDateURL}${thumbURL}api_key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      setResults(response.data);
    } catch (error) {
      console.log(error);
      setError(error.response.status);
    }
    setLoading(false);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2}>
            <Formik
              initialValues={{
                startDate: "2011-01-09",
                endDate: "2011-02-09",
              }}
              validationSchema={Yup.object().shape({
                startDate: Yup.date(),
                endDate: Yup.date().min(
                  Yup.ref("startDate"),
                  "end date can't be before start date"
                ),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setDates([values.startDate, values.endDate]);
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit}>
                  <Form.Label>
                    Welcome to Spacetagram! Browse photos form the NASA API
                    between the dates below!
                  </Form.Label>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={props.values.startDate}
                    onChange={(e) =>
                      props.setFieldValue("startDate", e.target.value)
                    }
                    isInvalid={props.errors.startDate}
                    helperText="{touched.email ? errors.email :"
                  />
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={props.values.endDate}
                    onChange={(e) =>
                      props.setFieldValue("endDate", e.target.value)
                    }
                    isInvalid={props.errors.endDate}
                  />
                  <OverlayTrigger
                    key={"bottom"}
                    placement={"bottom"}
                    overlay={
                      <Tooltip>Click to get photos!</Tooltip>
                    }
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ margin: 10 }}
                    >
                      Get Photos Between These Dates!
                    </Button>
                  </OverlayTrigger>
                </Form>
              )}
            </Formik>
          </Col>
          <Col md={10}>
            {!error ? (
              <div
                style={{
                  height: window.innerHeight * 0.94,
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
                              date={result.date}
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
                      display: "flex",
                      "justify-content": "center",
                      "align-items": "center",
                      height: "inherit",
                    }}
                  >
                    <Spinner animation="grow" />
                  </div>
                )}
              </div>
            ) : (
              <NotFoundPage status={error} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResultsPage;
