import React from "react";
import { useLocation } from "react-router-dom";

const Error = ({ error }) => {
  console.log(error.response);
  return (
    <div style={{}}>
      <div style={{ paddingTop: "" }}>
        <h1 style={{ fontSize: "900%" }}>
          {error.response.status == 0 ? 500 : error.response.status}
        </h1>
        <h1>{error.response.data ? error.response.data : error.message}</h1>
      </div>
    </div>
  );
};

export default Error;
