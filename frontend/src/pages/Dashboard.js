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
      <p className="text-center fs-5">
        Your phone number is: {localStorage.getItem("phoneNumber")}
      </p>
      <div className="d-flex flex-column align-items-center">
        <h2 className="notify-container border border-solid border-white rounded text-center p-2 text-light w-75">
          Notify Responders
        </h2>
        <p className=" text-center">Let us know about your situation.</p>
        <div>
          <Button
            className="help-btn mx-3 p-3 text-light"
            onClick={onClickHelp}
          >
            I need HELP
          </Button>
          <Button className="safe-btn mx-3 p-3" onClick={onClickSafe}>
            I am SAFE
          </Button>
        </div>
      </div>
      <div className="status-container mt-5">
        <h2 className="text-center">STATUS LEGEND</h2>
        <ul className="list-unstyled text-center">
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
