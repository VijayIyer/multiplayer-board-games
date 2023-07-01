import React from "react";
import { useContext, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { appContext } from "./../../AppContext";
import { Link } from "react-router-dom";
import axios from "axios";

export function Registration() {
  const { setUser, setUserName } = useContext(appContext);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const url = process.env.REACT_APP_SERVER_URL;
  const signup = () => {
    console.log("signing up user");
    axios
      .post(url + "/signup", {
        email: email,
        name: name,
        password: password,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(`token - ${JSON.stringify(res)}`);
        if (res.hasOwnProperty("token")) {
          window.sessionStorage.setItem("token", res.token);
          setUser(window.sessionStorage.getItem("token"));
          return res.token;
        } else {
          throw new Error(`no token property found in res - ${res}`);
        }
      })
      .then((token) => {
        console.log(`getting details of user with ${token}`);
        axios
          .get(url + "/user", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            console.log(JSON.stringify(res));
            setUserName(res.data.name);
            navigate("/");
          });
      })
      .catch((err) => {
        console.log(`signup failed with err: ${JSON.stringify(err)}`);
        setError(`Sign up failed!! ${err}`);
      });
  };
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <Row className='vh-100 d-flex justify-content-center align-items-center'>
          <Col md={8} lg={6} xs={12}>
            <Card className='px-4'>
              <Card.Body>
                <div className='mb-3 mt-md-4'>
                  <h2 className='fw-bold mb-2 text-center text-uppercase '>
                    Logo
                  </h2>
                  <div className='mb-3'>
                    <Form>
                      <Form.Group className='mb-3' controlId='Name'>
                        <Form.Label className='text-center'>Name</Form.Label>
                        <Form.Control
                          onChange={(e) => setName(e.target.value)}
                          type='text'
                          placeholder='Enter Name'
                        />
                      </Form.Group>

                      <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='text-center'>
                          Email address
                        </Form.Label>
                        <Form.Control
                          onChange={(e) => setEmail(e.target.value)}
                          type='email'
                          placeholder='Enter email'
                        />
                      </Form.Group>

                      <Form.Group
                        className='mb-3'
                        controlId='formBasicPassword'
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          onChange={(e) => setPassword(e.target.value)}
                          type='password'
                          placeholder='Enter Password here'
                        />
                      </Form.Group>

                      <Form.Group
                        className='mb-3'
                        controlId='formBasicCheckbox'
                      ></Form.Group>
                      {error && <div className='text-danger'>{error}</div>}
                      <div className='d-grid'>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            signup();
                          }}
                          variant='primary'
                          type='submit'
                        >
                          Create Account
                        </Button>
                      </div>
                    </Form>
                    <div className='mt-3'>
                      <p className='mb-0  text-center'>
                        Already have an account??{" "}
                        <Link to='/login' className='text-primary fw-bold'>
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
