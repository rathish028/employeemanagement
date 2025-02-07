import react, { useEffect, useState } from "react";
import { BACKEND_URL, getToken, getUser } from "./config";
import { toast } from "react-toastify";
import { Link, useActionData, useNavigate } from "react-router-dom";

const Events = (props) => {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [ticCount, setTicCount] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      fetch(`${BACKEND_URL}/events`, {
        headers: {
          token: token,
        },
      }).then(async (result) => {
        const jsonRes = await result.json();
        //   console.log(jsonRes.data);
        const eveRes = jsonRes.data
        setEvents(eveRes);
        fetch(`${BACKEND_URL}/tickets`, {
          headers: {
            token: token,
          },
        }).then(async (result1) => {
          const jsonRes1 = await result1.json();
          //   console.log(jsonRes.data);
          const ticRes = jsonRes1.data
          setTickets(ticRes);
        });
      });
    } else {
      toast.error("Please SignIn..!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, []);

  const handleDelete = (eventId) => {
    console.log(eventId, "event id");

    const response = window.confirm("Are you sure want to delete this Event ?");

    if (response) {
      fetch(`${BACKEND_URL}/delete-event/${eventId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          token: token,
        },
      })
        .then((res) => {
          const jsonRes = res.json();
          jsonRes.then((result) => {
            if (result.err || result.err !== null) {
              console.log(result);
              toast.error("Event deletion failed..!");
            } else {
              console.log(result);
              toast.success("Event deleted successfully..!");
              fetch(`${BACKEND_URL}/events`, {
                headers: {
                  token: token,
                },
              }).then(async (result) => {
                const jsonRes = await result.json();
                //   console.log(jsonRes.data);
                setTickets(jsonRes.data);
              });
            }
          });
        })
        .catch((err) => {
          toast.error("Event deletion failed..!");
        });
    }
  };

  const transferDataForUpdate = (event) => {
    navigate(`/update-event/${event._id}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleBooking = (eventId) => {
    // console.log(eventId, "event id");
    const response = window.confirm("Are you sure want to book this Event ?");

    if (response) {
        const data = {
          user: getUser() && getUser()._id,
          event: eventId
        }
      fetch(`${BACKEND_URL}/create-ticket`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          token: token,
        },
        body: JSON.stringify(data)
      })
        .then((res) => {
          const jsonRes = res.json();
          jsonRes.then((result) => {
            if (result.err || result.err !== null) {
              console.log(result);
              toast.error("Ticket booking failed..!");
            } else {
              console.log(result);
              toast.success("Ticket booked..!");
              fetch(`${BACKEND_URL}/tickets`, {
                headers: {
                  token: token,
                },
              }).then(async (result) => {
                const jsonRes = await result.json();
                //   console.log(jsonRes.data);
                setTickets(jsonRes.data)
                navigate("/events")
              });
            }
          });
        })
        .catch((err) => {
          toast.error("Ticket booking failed..!");
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-end">
        <Link to={"/create-event"}>
          <button className="btn btn-success" style={{ marginRight: "15px" }}>
            Create Event<span className="badge badge-default">+</span>
          </button>
        </Link>
        <button className="btn btn-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="row">
        {events && events.length > 0 ? (
          events.map((event, idx) => {
            return (
              <div
                className="card m-3 p-0 position-relative"
                style={{ width: "18rem" }}
                key={`eventCard${idx}`}
              >
                {tickets.map((tic, ticId) => {
                  if (
                    String(tic.event) === String(event._id) &&
                    String(tic.user) === String(user._id)
                  ) {
                    return (
                      <span
                        key={`dfgdf${ticId}`}
                        className="position-absolute start-0 top-0 badge rounded-pill bg-success"
                      >
                        Booked
                      </span>
                    );
                  }
                })}
                <img
                  src={event.name}
                  className="card-img-top"
                  alt="event name"
                  style={{ maxHeight: "150px" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-capitalize mb-3">
                    <span style={{ marginRight: "20px" }}>{event.type}</span>|
                    <span style={{ marginLeft: "20px" }}>{event.location}</span>
                  </h5>
                  <h6 className="card-subtitle mb-3">
                    <span
                      className="d-block mb-2"
                      style={{ marginRight: "20px" }}
                    >
                      Date :{new Date(event.dateAndTime).toLocaleDateString()}
                    </span>
                    <span>
                      Time :{new Date(event.dateAndTime).toLocaleTimeString()}
                    </span>
                  </h6>
                  <p
                    className="card-text text-capitalize"
                    style={{
                      maxHeight: "50px",
                      minHeight: "50px",
                      overflow: "auto",
                    }}
                  >
                    {event.description}
                  </p>
                  <div className="container">
                    {String(user._id) === String(event.organiser) ? (
                      <div className="row justify-content-between my-3">
                        <button
                          className="btn btn-outline-success col-4"
                          onClick={() => transferDataForUpdate(event)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger col-4"
                          onClick={() => handleDelete(event._id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="row">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleBooking(event._id)}
                        >
                          Book Ticket
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Events found</div>
        )}
      </div>
    </div>
  );
};

export default Events;
