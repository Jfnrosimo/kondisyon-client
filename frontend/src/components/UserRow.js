//Import UI
import { Button, Form, Modal } from "react-bootstrap";

//Import
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/reducers/usersSlice";
import { fetchUsers } from "../redux/reducers/usersSlice";
import axios from "axios";

const UserRow = ({
  phoneNumber,
  status,
  latitude,
  longitude,
  onClickUserMapProp,
}) => {
  const dispatch = useDispatch();
  const currentPhoneUser = phoneNumber;

  //Set new value of user
  const [newStatus, setNewStatus] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickUserMap = (latitude, longitude) => {
    onClickUserMapProp(latitude, longitude);
  };

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
  return (
    <tr>
      <td>{phoneNumber}</td>
      <td>
        {latitude}, {longitude}
      </td>
      <td>{status}</td>
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
            onClick={() => onClickUserMap(latitude, longitude)}
          >
            View location
          </Button>
        </>
      </td>
    </tr>
  );
};

export default UserRow;
