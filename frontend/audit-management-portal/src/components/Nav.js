import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      let config = {
        method: "post",
        url: `http://localhost:8100/auth/validate`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      await axios(config)
        .then(function (response) {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    if (localStorage.getItem("isLoggedIn")) getUserData();
    console.log(JSON.parse(localStorage.getItem("user")));

    return () => {};
  }, []);

  return (
    <>
      <div className="bg-dark text-white p-2">
        <div className="container ">
          <div className="row p-2">
            <div className="col-lg-3">
              <h3>Audit Management</h3>
            </div>
            <div className="col-lg-5"></div>
            <div className="col-lg-4 d-flex justify-content-around">
              {location.pathname !== "/" && user !== null && (
                <>
                  <h6 className="my-auto">
                    <sapn className="p-3 font-large">
                      <FaUser />
                    </sapn>
                    {/* {JSON.parse(localStorage.getItem("user")).name} */}
                    {user.name}
                  </h6>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
