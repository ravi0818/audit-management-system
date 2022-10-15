import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Error from "./Error";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const now = new Date();
    let currDate = JSON.stringify({
      y: now.getFullYear(),
      m: now.getMonth(),
      d: now.getDate(),
    });
    const loginDate = localStorage.getItem("logindate");
    console.log(loginDate, currDate);
    if (currDate !== loginDate) localStorage.clear();
    else {
      if (localStorage.getItem("token") !== null) navigate("/checklist");
    }

    return () => {};
  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(e);
    const user = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    console.log(user);

    let config = {
      method: "post",
      url: `http://localhost:8100/auth/authenticate`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    };
    await axios(config)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data);
        setLoading(false);
        localStorage.setItem("isLoggedIn", true);
        const now = new Date();
        let loginDate = {
          y: now.getFullYear(),
          m: now.getMonth(),
          d: now.getDate(),
        };
        localStorage.setItem("logindate", JSON.stringify(loginDate));
        navigate("/checklist");
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  };
  return (
    <>
      <Nav />
      {loading === true ? (
        <div style={{ paddingTop: "10%" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error === null ? (
        <div className="d-flex justify-content-around">
          <Card className="m-5 p-3 shadow" style={{ width: "30%" }}>
            <h2>Sign in</h2>
            <Form onSubmit={onLogin}>
              <Form.Group style={{ textAlign: "left", padding: "10px" }}>
                <Form.Label>Username</Form.Label>
                <Form.Control></Form.Control>
              </Form.Group>
              <Form.Group style={{ textAlign: "left", padding: "10px" }}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"></Form.Control>
              </Form.Group>
              <div className="p-2">
                <Button type="submit">Login</Button>
              </div>
            </Form>
          </Card>
        </div>
      ) : (
        <Error error={error} />
      )}
    </>
  );
};

export default Login;
