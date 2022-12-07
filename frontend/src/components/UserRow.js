//Import UI
import { Button, Form, Modal } from "react-bootstrap";

//Import
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/reducers/usersSlice";
import { fetchUsers } from "../redux/reducers/usersSlice";
import axios from "axios";

//Import component
import Map from "./Map/Map";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


const UserRow = ({
  phoneNumber,
  status,
  latitude,
  longitude,
  onClickUserMapProp,
}) => {
  const dispatch = useDispatch();
  const currentPhoneUser = phoneNumber;

  const state = useSelector((state) => state.users.users);
  const needHelpUsers = state.filter((item) => {
    return item.status !== "Safe now";
  });
  console.log(needHelpUsers);



  //Set new value of user
  const [newStatus, setNewStatus] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setShow(true);

    const users = {
      phoneNumber: currentPhoneUser,
      status: newStatus,
      description: description,
    };
    dispatch(updateUser({ users }));
    window.location.reload();
  };

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
      {/* <Table> */}
      <table>
        <thead>
          <tr>
            <th>PHONE NUMBER</th>
            <th>COORDINATE (Latitude, Longitude) </th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
              {
                needHelpUsers.map( user => {
                  return (
                  
                  <tr>
                    <td>{user.phoneNumber}</td>
                    <td>
                      {user.locationLatitude}, {user.locationLongitude}
                    </td>
                    <td>{user.status}</td>
                    <td>
                      <>
                        <Button variant="primary" onClick={handleShow}>
                          Respond to user
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Update the user status</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter status"
                                  onChange={(e) => setNewStatus(e.target.value)}
                                />
                              </Form.Group>
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Label>Status Description</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  onChange={(e) => setDescription(e.target.value)}
                                />
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={handleUpdateSubmit}
                              type="submit"
                            >
                              Update Changes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <Button
                          className="mx-2"
                            onClick={() => {
                              localStorage.setItem("latitude",user.locationLatitude);
                              localStorage.setItem('longitude',user.locationLongitude)
                              window.location.reload()
                            }}
                        >
                          View location
                        </Button>
                      </>
                  </td>
                </tr>

                )})
              }

        </tbody>
      </table>
      
        {/* Mapp */}
      <div>
              <Map />
      </div>

    </div>
    
  )
};

export default UserRow;
