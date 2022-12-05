//Import hook
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//Import redux
import { fetchCurrentUser } from "../redux/reducers/usersSlice";

//Import routing
import { useNavigate } from "react-router-dom";

//Import UI
import { Button } from "reactstrap";
import Waiting from "../assets/waiting.png";
import Ambulance from "../assets/ambulance.png";
import Safe from "../assets/safe.png";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fetch, setFetch] = useState(false);
  const user = useSelector((data) => data);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [locationLatitude, setLocationLatitude] = useState("");
  const [locationLongitude, setLocationLongitude] = useState("");

  //Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocationLatitude(pos.coords.latitude);
      setLocationLongitude(pos.coords.longitude);
    });
  });

  //On clik help button
  const onClickHelp = () => {
    try {
      axios
        .post("http://localhost:8099/api/v1/usert/NewKondisyon", {
          phoneNumber: localStorage.getItem("phoneNumber"),
          locationLongitude: locationLongitude,
          locationLatitude: locationLatitude,
        })
        .then((result) => {
          dispatch(fetchCurrentUser({ ...result.data }));
          console.log(result);
          navigate("/history");
        });
    } catch (error) {
      console.log(error);
    }
  };

  //On click safe button
  const onClickSafe = () => {};

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p className="text-center fs-5">
        Your phone number is: {localStorage.getItem("phoneNumber")}
      </p>
      <p className=" text-center">Let us know about your situation.</p>
      <h2 className="border border-solid border-white rounded w-75">
        Notify Responders
      </h2>
      <div>
        <Button onClick={onClickHelp}>I need HELP</Button>
        <Button onClick={onClickSafe}>I am SAFE</Button>
      </div>
      <div className="status-container">
        <h2>STATUS LEGEND</h2>
        <ul>
          <li>
            <img src={Waiting} /> Waiting for a response
          </li>
          <li>
            <img src={Ambulance} /> Responder on the way
          </li>
          <li>
            <img src={Safe} /> Safe now
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
