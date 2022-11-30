/* User Login via email
 *
 * @author Thu Ta
 *
 * @create 17/6/2022
 *
 */
import React, { useState, useEffect } from "react";
import UserLoginForm from "./UserLoginForm";
import { validateEmail, isEmpty } from "../common/CommonValidation";
import { useHistory } from "react-router-dom";
import { ApiRequest } from "../common/ApiRequest";
import CommonMessage from "../common/CommonMessage";
import $ from "jquery";

const UserLogin = () => {
  const history = useHistory(); // use history
  const [email, setEmail] = useState(""); // For email input
  const [error, setError] = useState([]); // For error message
  const [loading, setLoading] = useState(false); // For loading
  const [urlID, setURLID] = useState(""); // for url id
  const [zoomSize, setZoomSize] = useState(
    Math.round(window.devicePixelRatio * 100)
  ); //browser zoom level

  useEffect(() => {
    getURL();
    $(window).resize(function () {
      setZoomSize(Math.round(window.devicePixelRatio * 100));
    });
  }, []);

  /**
   * to get user ID from URL
   * @author Zeyar Min
   * @create 24/06/2022
   *
   */
  const getURL = () => {
    let url = window.location.href;
    let splitURL = url.toString().split("/");
    setURLID(splitURL[5]);
  };
  /**
   * Email input box
   * @author zeyar min
   * @create 18/06/2022
   * @param e
   */
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  /** Key handler function for user email login
   * @author Zeyar Min
   * @create 30/06/2022
   * @param  e
   */
  const userKeyDownHandler = (e) => {
    if (e.key == "Enter") {
      userSignInClick();
      e.preventDefault();
    }
  };

  /** Sign In button Click
   * @author zeyar min
   * @create 17/06/2022
   * @param
   * @return error
   */
  const userSignInClick = async () => {
    let err = [];
    let template_id = `${urlID}`;
    if (isEmpty(email)) {
      err.push(CommonMessage.JSE005.replace("%s", "an email address"));
    } else if (!validateEmail(email)) {
      err.push(CommonMessage.JSE028.replace("%s", "email address"));
    }
    if (err.length > 0) {
      setError(err);
    } else {
      setLoading(true);
      let userlogin = {
        method: "post",
        url: `resume/applicant/login/${template_id}`,
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
          localStorage.setItem("TEMPLATE_ID", JSON.stringify(urlID));
          history.push(`/template/email-verification`);
        } else {
          setError(response.data.message);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <UserLoginForm
        loading={loading}
        zoomSize={zoomSize}
        error={error}
        emailChange={emailChange}
        userKeyDownHandler={userKeyDownHandler}
        userSignInClick={userSignInClick}
      />
    </>
  );
};
export default UserLogin;
