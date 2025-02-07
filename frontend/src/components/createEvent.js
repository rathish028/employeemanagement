import { useEffect, useState } from "react";
import { BACKEND_URL, getToken, urlRegEx } from "./config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [data, setData] = useState({
    name: "",
    type: "",
    location: "",
    description: "",
    dateAndTime: "",
  });
  const [token, setToken] = useState(getToken());
  const [locations, setLocations] = useState([
    "Coimbatore",
    "Chennai",
    "Madurai",
    "Bengaluru",
    "Goa",
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please SignIn..!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, []);

  const handlechange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const validate = () => {
    const { name, type, location, description, dateAndTime } = data;
    if (!name || name === null) {
      toast.error("Name must be an url..!");
      return false;
    }
    if (!urlRegEx.test(name)) {
      toast.error("Enter valid Url");
      return false;
    }
    if (!type || type === null) {
      toast.error("Event type is required..!");
      return false;
    }
    if (!location || location === null) {
      toast.error("Location is required...!");
      return false;
    }
    if (!description || description === null) {
      toast.error("Description is required..!");
      return false;
    }
    if (!dateAndTime || dateAndTime === null) {
      toast.error("Event date is required..!");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    // const {type, location} = data
    if (validate()) {
      fetch(`${BACKEND_URL}/create-event`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
          token: token,
        },
      })
        .then((res) => {
          const jsonRes = res.json();
          jsonRes.then((result) => {
            if (result.err && result.err !== null) {
              console.log(result);
              toast.error("Event creation failed..!");
            } else {
              console.log(result);
              setData({
                name: "",
                type: " ",
                location: " ",
                description: "",
                dateAndTime: "",
              });
              toast.success("Event created successfully..!");
              navigate("/events");
            }
          });
        })
        .catch((err) => {
          toast.error("Event creation failed..!");
        });
    }
  };
  return (
    <>
      <div className="container border mt-5 p-4 rounded-3 signup-parent">
        <div className="mb-4">
          <h2 className="text-end">Create Event</h2>
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={data.name}
            onChange={handlechange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Event Type</label>
          <input
            className="form-control"
            type="text"
            name="type"
            value={data.type}
            onChange={handlechange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            type="text"
            value={data.description}
            name="description"
            onChange={handlechange}
            rows={3}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <select
            name="location"
            className="form-control"
            value={data.location}
            onChange={handlechange}
          >
            <option value=""></option>
            {locations.map((location, idx) => {
              return (
                <option value={location} key={idx}>
                  {location}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label className="form-label">Date and Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="dateAndTime"
            value={data.dateAndTime}
            onChange={handlechange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div className="mt-5 mb-3">
            <button
              className="btn btn-outline-danger px-5"
              onClick={() => navigate("/events")}
            >
              Cancel
            </button>
          </div>
          <div className="mt-5 mb-3">
            <button className="btn btn-outline-light px-5" onClick={handleSubmit}>
              Create Event
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateEvent;
