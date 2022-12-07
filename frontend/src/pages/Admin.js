//Import hooks
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import reducer
import { fetchUsers } from "../redux/reducers/usersSlice";

//Import UI
import { Table } from "reactstrap";

//Import pages
import UserRow from "../components/UserRow";



const Admin = () => {


 

  return (
    <div>
      
      <UserRow/>
    </div>
  );
};

export default Admin;
