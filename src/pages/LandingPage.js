//Import hook
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Logo from "../assets/kondisyon_final2.png";

//Import redux
import { fetchCurrentUser } from "../redux/reducers/usersSlice";

//Import routingqs
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
import {BsArrowRight} from "react-icons/bs"

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
        .post("https://kondisyon-api.onrender.com/api/V1/usert/checkNumber", {
          phoneNumber: phoneNumber,
          locationLongitude: locationLongitude,
          locationLatitude: locationLatitude,
        })
        .then((result) => {
          dispatch(fetchCurrentUser({ ...result.data }));
          console.log(result);
          localStorage.setItem("phoneNumber", phoneNumber);
          if (result.data.status === "new request") {
            navigate("/dashboard");
          } else {
            // localStorage.setItem("userData", result.data);
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
    <div className="landing-page-container d-flex flex-column justify-content-center">
      <div className="kondisyon-logo d-flex justify-content-center">
        <a href="./">
          <img src={Logo} alt="logo" />{" "}
        </a>
      </div>
      <p className="text-light text-top text-center mt-5">
        May we ask for you to calm down.
        <br />
        We will definitely send help the soonest.
      </p>
      <Form
        onSubmit={onSubmitHandler}
        className="d-flex justify-content-center flex-column align-items-center"
      >
        <FormGroup className="mb-3 d-flex justify-content-center flex-column align-items-center">
          <Label for="phoneNumber">Enter your phone number</Label>
          <InputGroup className="input-group-alternative">
            <InputGroupText addontype="prepend">
              <FaPhoneAlt />
            </InputGroupText>
            <Input
              id="phoneNumber"
              placeholder="09xxxxxxxxx"
              type="tel"
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
      <small className="text-center w-75 align-self-center">
        By signing in you agree to {"Kondisyons'"}
        <br />
        <Link to="/privacy-policy">Terms of Service and Privacy Policy.</Link>
      </small>
      <Button className="mt-4 mb-0 bg-sucess w-25" onClick={() => navigate("/admin")}><small>Responder's dashboard </small><BsArrowRight /></Button>
    </div>
  );
};

export default LandingPage;
