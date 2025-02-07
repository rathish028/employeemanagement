import { useState } from "react";
import { BACKEND_URL, mobileRegEx } from "./config";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [data, setData] = useState({
    mobile: "",
    password: "",
  });
  const navigate = useNavigate()
  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const validate = () => {
    const { mobile, password } = data;
    console.log(mobileRegEx.test(mobile));

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
    // const {mobile, password} = data
    if (validate()) {
      fetch(`${BACKEND_URL}/signIn`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      })
        .then(async (res) => {
          const jsonRes = res.json();
          jsonRes.then((result) => {
            if (result.err && result.err !== null) {
              console.log(result);
              toast.error("Login failed due to invalid credentials..!");
            } else {
              console.log(result);
              setData({
                mobile: "",
                password: "",
              });
              localStorage.setItem("token", JSON.stringify(result.data.token));
              localStorage.setItem("user", JSON.stringify(result.data.user));
              toast.success("Login sucessfully..!");
              navigate("/events")
            }
          });
        })
        .catch((err) => {
          toast.error("Login failed..!");
        });
    }
  };
  return (
    <>
      <div className="container border mt-5 p-4 rounded-3 signup-parent">
        <div className="mb-4">
          <h2 className="text-end">Sign In</h2>
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={data.mobile}
            className="form-control"
            onChange={handlechange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={data.password}
            className="form-control"
            onChange={handlechange}
          />
        </div>
        <div className="mt-5 text-center">
          <button className="btn btn-outline-light px-5" onClick={handleSubmit}>
            Sign In
          </button>
        </div>
        <div className="text-center mt-3">
          Don't have an account ?&nbsp;&nbsp;&nbsp;
          <Link to={"/signup"}>Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
