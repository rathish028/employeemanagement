import React, { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL, emailRegEx, mobileRegEx } from "./config";
import { Link } from "react-router-dom";


const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const { name, email, mobile, password } = data;
    if (!name || name === null) {
      toast.error("Name is required..!");
      return false;
    }
    if (!email || email === null) {
      toast.error("Email is required..!");
      return false;
    }
    if (!emailRegEx.test(email)) {
      toast.error("Invalid email..!");
      return false;
    }
    if (!mobile || mobile === null) {
      toast.error("Mobile number is required..!");
      return false;
    }
    if (!mobileRegEx.test(mobile)) {
      toast.error("Invalid Mobile number..!");
      return false;
    }
    if (!password || password === null) {
      toast.error("Password is required..!");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    // alert(`${data.name}, ${data.mobile},${data.email},${data.password}`);
    // const { name, mobile, email, password } = data;
    if (validate()) {
      fetch(`${BACKEND_URL}/create-user`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          const jsonRes = res.json();
          jsonRes.then((result) => {
            if (result.err && result.err !== null) {
              console.log(result);
              toast.error("Signup failed due to invalid credentials..!");
            } else {
              console.log(result);
              setData({
                name: "",
                email: "",
                password: "",
                mobile: "",
              });
              toast.success("User created successfully..!");
            }
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("User creation failed..!");
        });
    }
  };
  return (
    <>
      <div className="container border mt-5 p-4 rounded-3 signup-parent">
        <div className="mb-4">
          <h2 className="text-end">Sign Up</h2>
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            className="form-control"
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={data.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <div className="text-center">
          <button
            className="btn btn-outline-light mt-3 px-5"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
        <div className="text-center mt-3">Already have account ?&nbsp;&nbsp;&nbsp;<Link to={"/"}>Sign In</Link></div>
      </div>
    </>
  );
};

export default SignUp;
