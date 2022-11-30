/* Admin Login Form Index
 * @author Thu Ta
 * @create 17/06/2022
 */
import {
  checkNullOrBlank,
  validateIntegerOnly,
  isEmpty,
} from "../common/CommonValidation";
import AdminLoginForm from "./AdminLoginForm";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ApiRequest } from "../common/ApiRequest";
import CommonMessage from "../common/CommonMessage";
import $ from "jquery";

const AdminLoginIndex = () => {
  let history = useHistory(); //for history
  const [adminUser, setAdminUser] = useState(); // admin user input data
  const [password, setPassword] = useState(); // admin user password
  const [error, setError] = useState([]); // error message
  const [loading, setLoading] = useState(false); // loading page default('false')
  const [passwordShown, setPasswordShown] = useState(false); // show hide password
  const [zoomSize, setZoomSize] = useState(
    Math.round(window.devicePixelRatio * 100)
  ); //browser zoom level

  useEffect(() => {
    $(window).resize(function () {
      setZoomSize(Math.round(window.devicePixelRatio * 100));
    });
  }, []);

  /** Key handler function for admin login
   * @author Zeyar Min
   * @create 30/06/2022
   * @param  e
   */
  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      signInClick();
    }
  };
  /**
   * admin user id input
   * @author Zeyar Min
   * @create 20/06/2022
   * @param e
   */
  const adminChange = (e) => {
    setAdminUser(e.target.value);
  };
  /**
   * admin user password input
   * @author Zeyar Min
   * @create 20/06/2022
   * @param e
   */
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };
  /** show hide password eye icon click
   * @author Zeyar Min
   * @create 24/06/2022
   */
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
    let img = document.querySelector(".eye-img"); // select the eye image
    if (passwordShown) {
      img.src = "image/visibility.png";
    } else {
      img.src = "image/blind.png";
    }
  };
  /**
   * signIn Button Click Function and login authentication
   * @author zeyar min
   * @create 17/06/2022
   * @param e
   */
  const signInClick = async () => {
    let err = [];
    if (isEmpty(adminUser)) {
      err.push(CommonMessage.JSE018.replace("%s", "Admin User ID"));
    } else if (!validateIntegerOnly(adminUser)) {
      err.push(CommonMessage.JSE026.replace("%s", "Admin User ID"));
    } else if (!checkNullOrBlank(password)) {
      err.push(CommonMessage.JSE005.replace("%s", "password"));
    } else if (password.length < 5) {
      err.push(
        CommonMessage.JSE027.replace("%s", "Password").replace(
          "%s",
          "5 characters"
        )
      );
    }
    if (err.length > 0) {
      setError(err);
    } else {
      setLoading(true);
      let adminLogin = {
        method: "post",
        url: "admin/login",
        params: {
          employee_id: adminUser,
          password: password,
        },
      };
      let response = await ApiRequest(adminLogin);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.data.status === "OK") {
          setError([]);
          localStorage.setItem("LOGIN_ID", adminUser);
          history.push(`/dashboard`);
        } else {
          setError(response.data.message);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    }
  };
  return (
    <>
      <AdminLoginForm
        loading={loading}
        zoomSize={zoomSize}
        adminChange={adminChange}
        keyDownHandler={keyDownHandler}
        passwordChange={passwordChange}
        passwordShown={passwordShown}
        togglePassword={togglePassword}
        checkNullOrBlank={checkNullOrBlank}
        signInClick={signInClick}
        error={error}
        password={password}
        adminUser={adminUser}
      />
    </>
  );
};
export default AdminLoginIndex;
