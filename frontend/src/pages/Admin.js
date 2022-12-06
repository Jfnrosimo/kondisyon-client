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

//Import component
import Map from "../components/Map/Map";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Admin = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users.users);
  // console.log(typeof state);
  const [long, setLong] = useState(12313);
  const [lang, setLang] = useState(1321);

  const onClickMap = (latitude, longitude) => {
    setLong(longitude);
    setLang(latitude);
    // window.location.reload();
    console.log(`${latitude} ${longitude}`);
    // console.log("map button");
  };

  //Filter users that asks help
  const needHelpUsers = state.filter((item) => {
    return item.status !== "Safe now";
  });

  console.log(needHelpUsers);
  useEffect(() => {
    try {
      axios
        .get("http://localhost:8099/api/v1/admin/getUser", {})
        .then((result) => {
          console.log(result);
          dispatch(fetchUsers(result.data));
        });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  return (
    <div>
      <h1>Admin Control System</h1>
      <Table>
        <thead>
          <tr>
            <th>PHONE NUMBER</th>
            <th>COORDINATE (Latitude, Longitude) </th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {needHelpUsers.map((item) => {
            return (
              <UserRow
                key={item.phoneNumber}
                phoneNumber={item.phoneNumber}
                status={item.status}
                longitude={item.locationLongitude}
                latitude={item.locationLatitude}
                onClickUserMapProp={onClickMap}
              />
            );
          })}
        </tbody>
      </Table>
      <Map longitude={long} latitude={lang} />
      <div></div>
    </div>
  );
};

export default Admin;
