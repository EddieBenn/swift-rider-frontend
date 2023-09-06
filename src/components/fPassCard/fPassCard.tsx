/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./fPassCard.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURI } from "../../utils/api/axios";
const baseUrl = baseURI;

const ForgetPasswordCard = () => {
  const [createForm, setCreateForm] = useState({});
  const navigate = useNavigate();
  const submitDetails = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log({ name, value });
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };
  const fetchLink = async () => {
    try {
      console.log("async function");
      await axios
        .post(`${baseUrl}/users/forgotpasswordd`, createForm)
        .then((res) => {
          toast.success(res.data.message);
          navigate("/sentmail");
          setTimeout(() => {
            console.log(res.data);
          }, 10000);
        })
        .catch((err) => {
          toast.error(err.response.data.Error);
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h">
      <form className="Cover" onSubmit={fetchLink}>
        <div className="maindiv">
          <div className="text">
            <h3>Forgot Password</h3>
            <div className="size">
              <p className="nter">
                Enter the email associated with your account and we’ll send an
                email with instruction to reset your password
              </p>
            </div>
          </div>
          <div>
            <label className="labelpass">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="fill"
              name="email"
              onChange={submitDetails}
            />
          </div>

          <div>
            <Link to="/sentmail">
              <button className="resetBtn" type="submit">
                Reset Password
              </button>
            </Link>
          </div>
        </div>
        <div>
          <button className="backLog">Back to Login</button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordCard;
