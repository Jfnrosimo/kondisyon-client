//Import hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCurrentUser } from "../redux/reducers/usersSlice";

//Import UI
import "./History.css";

const History = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users.users);
  console.log(state);

  useEffect(() => {
    axios
      .post("http://localhost:8099/api/v1/usert/userHistory", {
        phoneNumber: localStorage.getItem("phoneNumber"),
      })
      .then((result) => {
        dispatch(fetchCurrentUser({ ...result.data }));
      });
  }, []);

  //Get current user details
  const phoneNumber = state.userDetails.phoneNumber;
  const status = state.userDetails.status;
  const statusDesc = state.userDetails.statusDesc;

  return (
    <div className="history-page-container">
      <div>
        <p className=" text-black">{phoneNumber}</p>
        <p>{status}</p>
        <p>{statusDesc}</p>
      </div>
      <div>
        <h3 className="history-table-title text-light text-center">History</h3>
      </div>
    </div>
  );
};

export default History;
