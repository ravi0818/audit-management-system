import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Button, Table, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Error from "./Error";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  let val;
  const x = localStorage.getItem("token");
  console.log(x);
  const renderData = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(e.target[0].checked, e.target[1].checked);
    val = e.target[0].checked === true ? "Internal" : "SOX";

    let config = {
      method: "get",
      url: `http://localhost:8200/checklist/auditchecklistquestions/${val}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((response) => {
        console.log(response.data);
        setData([...response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setError(error);
        setLoading(false);
      });
  };

  const handelChoice = (index, val) => {
    console.log(index, val);
    let tempData = data;
    tempData[index].response = val;
    console.log(tempData);
    setData([...tempData]);
    console.log(data);
  };

  const handelSubmit = () => {
    let flag = true;
    data.forEach((el) => {
      if (el.response === "") flag = false;
    });
    if (flag === true) navigate("/severity", { state: data });
    else alert("Please answer all the questions to submit!!");
    console.log(flag);
  };
  return (
    <>
      <Nav />

      <div className="d-flex justify-content-around mt-4">
        <Card className="shadow" style={{ width: "70%" }}>
          <Form onSubmit={renderData} className="p-4 row">
            <Form.Group className="d-flex justify-content-around col-lg-8">
              <Form.Label>Choose Audit Type</Form.Label>
              <Form.Check
                name="type"
                type="radio"
                label="Internal"
              ></Form.Check>
              <Form.Check name="type" type="radio" label="SOX"></Form.Check>

              {/* <Form.Select>
                <option>Internal</option>
                <option>SOX</option>
              </Form.Select> */}
            </Form.Group>
            <div className="col-lg-4">
              <Button type="submit">Get Data</Button>
            </div>
          </Form>
        </Card>
      </div>
      {loading === true && (
        <div style={{ paddingTop: "10%" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {data !== null && (
        <div className="d-flex justify-content-around pt-4">
          <Card className="shadow" style={{ width: "70%" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Choice</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{element.question}</td>
                      <td>
                        <Button
                          variant="success"
                          onClick={() => handelChoice(index, "Yes")}
                          className="mx-1"
                        >
                          Yes
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handelChoice(index, "No")}
                          className="mx-1"
                        >
                          No
                        </Button>
                      </td>
                      <td>{element.response} </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button onClick={() => handelSubmit()}>Submit</Button>
          </Card>
        </div>
      )}
      {error !== null && !loading && <Error error={error} />}
    </>
  );
};

export default Dashboard;
