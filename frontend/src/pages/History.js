//Import hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCurrentUser } from "../redux/reducers/usersSlice";

//Import component
import TableRow from "../components/TableRow";

//Import UI
import { Table } from "reactstrap";
import moment from "moment";
import "./History.css";
import Waiting from "../assets/waiting.png";
import Ambulance from "../assets/ambulance.png";
import Safe from "../assets/safe.png";

const History = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users.users);
  console.log(state);

  // const [phoneNumber, setPhoneNumber] = useState("");
  const [locationLatitude, setLocationLatitude] = useState("");
  const [locationLongitude, setLocationLongitude] = useState("");

  //Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocationLatitude(pos.coords.latitude);
      setLocationLongitude(pos.coords.longitude);
    });
  }, [dispatch, locationLatitude]);

  useEffect(() => {
    axios
      .post("http://localhost:8099/api/v1/usert/userHistory", {
        phoneNumber: localStorage.getItem("phoneNumber"),
        locationLongitude: locationLongitude,
        locationLatitude: locationLatitude,
      })
      .then((result) => {
        console.log(result);
        dispatch(fetchCurrentUser({ ...result.data }));
      });
  }, [dispatch]);

  //Get current user details
  const phoneNumber = localStorage.getItem("phoneNumber");
  const status = state.userDetails.status;
  const statusDesc = state.userDetails.statusDesc;
  const userHistory = state.userHistory;

  // if (state.status === "Request sent") {
  //   status = state.result.status;
  //   statusDesc = state.userDetails.statusDesc;
  //   userHistory = state.userHistory;
  // } else {
  //   status = state.user
  // }

  return (
    <div className="history-page-container">
      <div className="phonenumstatus">
        <div className="phonenumer">
          <h5 className="labelphone">Phone Number</h5>
          <p className=" text-black">{phoneNumber}</p>
        </div>
        <span className="statusspan">
          <h5 className="labelstatus">STATUS</h5>
          <br />
          {status.toLowerCase() === "waiting for a responder" ? (
            <img className="iconsstatus" src={Waiting} alt="waiting icon" />
          ) : status.toLowerCase() === "responder on the way" ? (
            <img className="iconsstatus" src={Ambulance} alt="ambulance logo" />
          ) : status.toLowerCase() === "safe now" ? (
            <img className="iconsstatus" src={Safe} alt="safe check logo" />
          ) : null}
          <span className="statusupdate">{status}</span>
        </span>
        <p>{statusDesc}</p>
      </div>
      <div className="tablerows">
        <h3 className="history-table-title text-light text-center">History</h3>
        <Table>
          <thead>
            <tr className="historylist">
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {userHistory &&
              userHistory.map((data, index) => {
                return (
                  <TableRow
                    longitude={data.locationLongitude}
                    latitude={data.locationLatitude}
                    date={moment(`${data.dateUpdated}`).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  />
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default History;
