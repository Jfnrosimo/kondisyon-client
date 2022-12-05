//Import hook
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//Import redux
import { fetchCurrentUser } from "../redux/reducers/usersSlice";

//Import routing
import { useNavigate, Link } from "react-router-dom";

//Import UI
import {
  Button,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
import "./LandingPage.css";
import { FaPhoneAlt } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //create states
  const [phoneNumber, setphoneNumber] = useState("");
  const [locationLatitude, setLocationLatitude] = useState("");
  const [locationLongitude, setLocationLongitude] = useState("");

  const [errorMessage, setErrorMessage] = useState({ value: "" });

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
        .post("http://localhost:8099/api/V1/usert/checkNumber", {
          phoneNumber: phoneNumber,
          locationLongitude: locationLongitude,
          locationLatitude: locationLatitude,
        })
        .then((result) => {
          dispatch(fetchCurrentUser({ ...result.data }));
          console.log(result);
          if (result.data.status === "new request") {
            localStorage.setItem("phoneNumber", phoneNumber);
            navigate("/dashboard");
          } else {
            localStorage.setItem("userData", result.data);
            navigate("/history");
          }
          // console.log(result);
          // console.log(result.data.locationLongitude);
          // localStorage.setItem("userId", result.data);
        });
    } catch (error) {
      setErrorMessage((prevState) => ({
        value: "Invalid phone number/google email",
      }));
    }
  };

  return (
    <div className="landing-page-container" lg="5" md="7">
      <h1 className="text-center">Kondisyon</h1>
      <p className="text-light text-center">
        May we ask for you to calm down. We will definitely send help the
        soonest.
      </p>
      <Form onSubmit={onSubmitHandler}>
        <FormGroup className="mb-3">
          <Label for="phoneNumber">Enter your phone number</Label>
          <InputGroup className="input-group-alternative">
            <InputGroupText addontype="prepend">
              <FaPhoneAlt />
            </InputGroupText>
            <Input
              id="phoneNumber"
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
        {errorMessage.value && (
          <p className="text-danger"> {errorMessage.value} </p>
        )}
        <Button className="proceed-button my-4" type="submit">
          Proceed
        </Button>
      </Form>
      <small>
        By signing in you agree to our{" "}
        <Link to="/privacy-policy">Terms of Service and Privacy Policy.</Link>
      </small>
    </div>
  );
};

export default LandingPage;
