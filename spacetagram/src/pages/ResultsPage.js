import React, { useState, useEffect } from "react";
import Resultcard from "../components/ResultCard";
import { Button, Form, Container, Row, Spinner, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import { parse, isDate } from "date-fns";
const ResultsPage = (props) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dates, setDates] = useState(["2021-07-01", "2021-08-01"]);
  useEffect(() => {
    getApods();
  }, [dates]);
  let today = new Date();
  function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());
  
    return parsedDate;
  }
  const getApods = async () => {
    setLoading(true);
    const API_KEY = process.env.REACT_APP_API_KEY;
    let startDateURL = `start_date=${dates[0]}&`;
    let endDateURL = `end_date=${dates[1]}&`;
    let thumbURL = "thumbs=True&";
    const url = `https://api.nasa.gov/planetary/apod?${startDateURL}${endDateURL}${thumbURL}api_key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      setResults(response.data);
    } catch (error) {
      setLoading(false);
      setError(error.response.status);
    }
    setLoading(false);
  };

  return (
    <>
      <Container style={{ marginTop: "1em" }} fluid>
        <Row>
          <Col md={2} style={{ marginTop: "1em" }}>
            <Formik
              initialValues={{
                startDate: "2021-07-01",
                endDate: "2021-08-01",
              }}
              validationSchema={Yup.object().shape({
                startDate: Yup.date().min("1995-06-16").required(),
                endDate: Yup.date()
                  .min(
                    Yup.ref("startDate"),
                    "end date can't be before start date"
                  ).transform(parseDateString).max(today)
                  .required(),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setDates([values.startDate, values.endDate]);
                setError("");
                setSubmitting(false);
              }}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit}>
                  <Form.Label>
                    Welcome to Spacetagram! Browse photos from the NASA API
                    using the dates below!
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
                    disabled={loading ? true : false}
                  />
                  {props.errors.startDate && (
                    <Form.Text style={{ color: "red" }}>
                      Start date must be on or after 1995-06-16
                    </Form.Text>
                  )}
                  <br/>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={props.values.endDate}
                    onChange={(e) =>
                      props.setFieldValue("endDate", e.target.value)
                    }
                    isInvalid={props.errors.endDate}
                    disabled={loading ? true : false}
                  />
                  {props.errors.endDate && (
                    <Form.Text style={{ color: "red" }}>
                      End date must be on or later than start date. End date
                      cannot be later than today.
                    </Form.Text>
                  )}
                  <Button
                    variant="dark"
                    type="submit"
                    style={{ margin: 10 }}
                    disabled={loading ? true : false}
                  >
                    {!loading
                      ? "Click to get Photos Between These Dates!"
                      : "Getting Photos..."}
                  </Button>
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
                          (<Col key={index}>
                            <Resultcard
                              copyright={result.copyright}
                              img={result.thumbnail_url ? result.thumbnail_url : result.url}
                              title={result.title}
                              explanation={result.explanation}
                              date={result.date}
                            />
                          </Col>)
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
                      justifyContent: "center",
                      alignItems: "center",
                      height: "inherit",
                    }}
                  >
                    <Spinner animation="border" />
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
