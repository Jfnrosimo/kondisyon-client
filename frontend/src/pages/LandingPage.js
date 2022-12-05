//Import hook
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//Import redux
import { fetchCurrentUser } from "../redux/reducers/usersSlice";

//Import routing
import { useNavigate } from "react-router-dom";

//Reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //create states
  const [phoneNumber, setphoneNumber] = useState("");
  const [locationLatitude, setLocationLatitude] = useState("");
  const [locationLongitude, setLocationLongitude] = useState("");

  const [errorMessage, setErrorMessage] = useState({ value: "" });

  //Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocationLatitude(pos.coords.latitude);
      setLocationLongitude(pos.coords.longitude);
    });
  });

  //After submitting phone phoneNumber/logging google account
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (phoneNumber === "") {
      return setErrorMessage((prevState) => ({
        value: "Empty phone number field",
      }));
    }
    try {
      axios
        .post("http://localhost:8080/api/v1/users", {
          phoneNumber: phoneNumber,
          locationLatitude: locationLatitude,
          locationLongitude: locationLongitude,
        })
        .then((result) => {
          dispatch(fetchCurrentUser({ ...result.data.user }));
          localStorage.setItem("userId", result.data.userId);
          navigate("/dashboard");
        });
    } catch (error) {
      setErrorMessage((prevState) => ({
        value: "Invalid phone number/google email",
      }));
    }
  };

  return (
    <div lg="5" md="7">
      <h1 className="text-center">Kondisyon</h1>
      <Card className="shadow border-0 w-50 align-content-center">
        <CardBody className="px-lg-5 py-lg-5">
          <Form onSubmit={onSubmitHandler}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupText addonType="prepend">
                  <i className="ni ni-email-83" />
                </InputGroupText>
                <Input
                  placeholder="09xxxxxxxxx"
                  type="text"
                  autoComplete="new-phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setphoneNumber(e.target.value)}
                  minLength={11}
                  maxLength={11}
                />
              </InputGroup>
            </FormGroup>
          </Form>
          <Button className="my-4" color="primary" type="submit">
            Proceed
          </Button>
          {errorMessage.value && (
            <p className="text-danger"> {errorMessage.value} </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default LandingPage;
