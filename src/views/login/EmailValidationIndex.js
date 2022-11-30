/* Email Verification Form
 *
 * @author Thu Rein Lynn
 *
 * @create 17/06/2022
 *
 */
import {
  CRow,
  CCol,
  CButton,
  CInput,
  CLabel,
  CFormGroup,
  CCard,
  CCardBody,
  CImg,
} from "@coreui/react";
import { checkNullOrBlank } from "../common/CommonValidation";
import EmailVerifiactionForm from "./EmailValidationForm";
import SuccessError from "../common/SuccessError";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../common/Loading";
import { ApiRequest } from "../common/ApiRequest";
import CommonMessage from "../common/CommonMessage";
import $ from "jquery";

const EmailVerifiaction = () => {
  const history = useHistory(); // for history
  const [error, setError] = useState([]); // for error message
  const [loading, setLoading] = useState([]); // for loading
  const [email, setEmail] = useState(""); //for eamil input
  const [tempID, setTempID] = useState(""); //for template ID
  const [zoomSize, setZoomSize] = useState(
    Math.round(window.devicePixelRatio * 100)
  ); //browser zoom level
  const [ssnValues, setSSNValue] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
    { id: 5, value: "" },
    { id: 6, value: "" },
  ]);
  const [ssnValuesMobile, setSSNValueMobile] = useState([
    { id: 7, value: "" },
    { id: 8, value: "" },
    { id: 9, value: "" },
    { id: 10, value: "" },
    { id: 11, value: "" },
    { id: 12, value: "" },
  ]);

  useEffect(() => {
    let localEmail, localTempID;
    localEmail = JSON.parse(localStorage.getItem("USER_EMAIL"));
    localTempID = JSON.parse(localStorage.getItem("TEMPLATE_ID"));
    setEmail(localEmail);
    setTempID(localTempID);
    $(window).resize(function () {
      setZoomSize(Math.round(window.devicePixelRatio * 100));
    });
  }, []);

  /** Key handler function for admin login
   * @author Zeyar Min
   * @create 30/06/2022
   * @param  e
   */
  const keyDownHandler = async (e) => {
    let { name, value } = e.target;
    if (e.key == "Enter") {
      submitClick();
    } else if (e.key == "Backspace" && value == "") {
      if (name != "1" && value.length == 0) {
        const preSibling = document.querySelector(
          `input[name="${parseInt(name) - 1}"]`
        );
        preSibling.focus();
        e.preventDefault();
      }
    }
  };

  /** input email verification code handler
   * @author Zeyar Min
   * @create 19/06/2022
   * @param e
   * @return SSNValue
   */
  const inputHandleChange = async (e) => {
    const { value, name } = e.target;
    // let text = await navigator.clipboard.readText();
    let flg = /^[0-9]+$/.test(value);
    if (flg == true || value == "") {
      let result = [];
      if (value.length > 1) {
        result = ssnValues.map((data) => {
          if (data.id == name) {
            data.value = value.substring(1);
            return data;
          }
          return data;
        });
      } else {
        //if (value.length === 1)
        result = ssnValues.map((data) => {
          if (data.id == name) {
            data.value = value;
            return data;
          }
          return data;
        });
      }
      const nextSibling = document.querySelector(
        `input[name="${parseInt(name) + 1}"]`
      );
      if (value.length >= 1 && name != "6") {
        //nextSibling !== null
        nextSibling.focus();
      } else if (value.length == 0) {
        if (name !== "1") {
          const preSibling = document.querySelector(
            `input[name="${parseInt(name) - 1}"]`
          );
          preSibling.focus();
        }
      }
      setSSNValue(result);
    }
  };

  const inputHandleChangeMobile = async (e) => {
    const { value, name } = e.target;
    // let text = await navigator.clipboard.readText();
    let flg = /^[0-9]+$/.test(value);
    if (flg == true || value == "") {
      let result = [];
      if (value.length > 1) {
        result = ssnValuesMobile.map((data) => {
          if (data.id == name) {
            data.value = value.substring(1);
            return data;
          }
          return data;
        });
      } else {
        //if (value.length === 1)
        result = ssnValuesMobile.map((data) => {
          if (data.id == name) {
            data.value = value;
            return data;
          }
          return data;
        });
      }
      const nextSibling = document.querySelector(
        `input[name="${parseInt(name) + 1}"]`
      );
      if (value.length >= 1 && name != "12") {
        //nextSibling !== null
        nextSibling.focus();
      } else if (value.length == 0) {
        if (name !== "1") {
          const preSibling = document.querySelector(
            `input[name="${parseInt(name) - 1}"]`
          );
          preSibling.focus();
        }
      }
      setSSNValueMobile(result);
    }
  };

  /** submit button click function
   * @author Zeyar Min
   * @create 19/06/2022
   * @param
   * @return error
   */
  const submitClick = async () => {
    let emailTemp = `${email}${tempID}`;
    let inputOtp = "";
    for (let i = 0; i < 6; i++) {
      inputOtp += ssnValues[i].value;
    }

    for (let i = 0; i < 6; i++) {
      inputOtp += ssnValuesMobile[i].value;
    }
    let err = [];
    if (!checkNullOrBlank(inputOtp)) {
      err.push(CommonMessage.JSE005.replace("%s", "verification codes"));
    } else if (inputOtp.length < 6) {
      err.push(
        CommonMessage.JSE018.replace("%s", "complete verification code")
      );
    }
    if (err.length > 0) {
      setError(err);
    } else {
      setLoading(true);
      let emailVeri = {
        method: "post",
        url: `resume/applicant/check-otp/${email}`,
        params: {
          passcode: inputOtp,
        },
      };
      let response = await ApiRequest(emailVeri);
      setLoading(false);
      if (response.flag == false) {
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.data.status == "OK") {
          setError([]);
          localStorage.setItem("USER_ACCEPT", emailTemp);
          history.push(`/template/user-form`);
        } else {
          setError(response.data.message);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    }
  };
  const resendClick = async () => {
    setSSNValue([
      { id: 1, value: "" },
      { id: 2, value: "" },
      { id: 3, value: "" },
      { id: 4, value: "" },
      { id: 5, value: "" },
      { id: 6, value: "" },
    ]);
    setError([]);
    document.querySelector(`input[name="1"]`).focus();
    setLoading(true);
    let userlogin = {
      method: "post",
      url: `resume/applicant/login/${tempID}`,
      params: {
        email: email,
      },
    };
    let response = await ApiRequest(userlogin);
    setLoading(false);
    if (response.flag == false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        setError([]);
        localStorage.setItem("USER_EMAIL", JSON.stringify(email));
        localStorage.setItem("TEMPLATE_ID", JSON.stringify(tempID));
        history.push(`/template/email-verification`);
      } else {
        setError(response.data.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <Loading start={loading} />
      <EmailVerifiactionForm
        keyDownHandler={keyDownHandler}
        inputHandleChange={inputHandleChange}
        submitClick={submitClick}
        resendClick={resendClick}
        ssnValues={ssnValues}
        zoomSize={zoomSize}
        error={error}
        inputHandleChangeMobile={inputHandleChangeMobile}
        ssnValuesMobile={ssnValuesMobile}
      />
    </>
  );
};
export default EmailVerifiaction;
