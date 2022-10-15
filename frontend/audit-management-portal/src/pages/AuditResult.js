import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table, Button, Modal, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Error from "./Error";

const AuditResult = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  useEffect(() => {
    const getData = () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      var data = JSON.stringify({
        projectName: user.projectName,
        managerName: user.name,
        auditDetail: {
          auditType: location.state[0].auditType,
          auditDate: new Date(),
          auditQuestions: location.state,
        },
      });
      console.log(data);
      var config = {
        method: "post",
        url: "http://localhost:8300/severity/projectexecutionstatus",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
          setResult(response.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setError(error);
          setLoading(false);
        });
    };
    if (localStorage.getItem("isLoggedIn") === null) navigate("/");
    else getData();

    return () => {};
  }, []);

  return (
    <>
      <Nav />
      {loading === true ? (
        <div style={{ paddingTop: "10%" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        result !== null && (
          <div className="d-flex justify-content-around mt-4">
            <Card style={{ width: "70%" }}>
              <Card.Header>
                <h2>Audit Result</h2>
              </Card.Header>
              <Card.Body>
                <div style={{ textAlign: "left", padding: "10px" }}>
                  <h3>Project Details</h3>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Audit-Tracking-Id</th>
                      <th>Project-Manager Name</th>
                      <th>Project Name</th>
                    </tr>
                  </thead>
                  {result !== null && (
                    <tbody>
                      <tr>
                        <td>{result.auditId}</td>
                        <td>{result.managerName}</td>
                        <td>{result.projectName}</td>
                      </tr>
                    </tbody>
                  )}
                </Table>

                <div style={{ textAlign: "left", padding: "10px" }}>
                  <h3>Audit-Details</h3>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Project Execution Status</th>
                      <th>Remedial Action</th>
                    </tr>
                  </thead>
                  {result !== null && (
                    <tbody>
                      <tr>
                        <td>
                          <button
                            className={
                              result.projectExecutionStatus === "RED"
                                ? "btn btn-danger"
                                : "btn btn-success"
                            }
                            disabled
                          >
                            {result.projectExecutionStatus}
                          </button>
                        </td>
                        <td>{result.remedialActionDuration}</td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </Card.Body>
              <Button onClick={() => navigate(-1)}>Back to Checklist</Button>
            </Card>
          </div>
        )
      )}
      {error !== null && !loading && <Error error={error} />}
    </>
  );
};

export default AuditResult;
