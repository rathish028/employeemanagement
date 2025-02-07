import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./signInForm";
import SignUp from "./signUpForm";
import CreateEvent from "./createEvent";
import Events from "./Events";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import UpdateEvent from "./updateEvent";
import NotFound from "./notFound";
import img from "../assets/pexels-joshsorenson-976866.jpg";
import NavigationBar from "./navigationBar";
import { getToken, getUser } from "./config";

const App = () => {
  return (
    // <React.StrictMode>
    <div className="">
      <BrowserRouter>
        {/* <NavigationBar /> */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/update-event/:id" element={<UpdateEvent />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
    // </React.StrictMode>
  );
};

export default App;
