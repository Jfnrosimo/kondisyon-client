//Import hook
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//Import redux
import { fetchCurrentUser } from "../redux/reducers/usersSlice";

//Import routing
import { useNavigate, Link, useResolvedPath } from "react-router-dom";

//Import UI
import { Button } from "reactstrap";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fetch, setFetch] = useState(false);
  const user = useSelector((data) => data);
  console.log(user.data);

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
    </div>
  );
};

export default Dashboard;
