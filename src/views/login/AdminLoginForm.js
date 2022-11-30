/* Admin Login Form Index
 * @author Thu Ta
 * @create 17/06/2022
 */
import CIcon from "@coreui/icons-react";
import {
  CRow,
  CCol,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CButton,
  CInput,
  CLabel,
  CImg,
  CCard,
  CCardBody,
} from "@coreui/react";
import React from "react";
import SuccessError from "../common/SuccessError";
import Loading from "../common/Loading";

const AdminLoginForm = (props) => {
  let {
    loading,
    zoomSize,
    adminChange,
    keyDownHandler,
    passwordChange,
    passwordShown,
    togglePassword,
    checkNullOrBlank,
    signInClick,
    error,
    password,
    adminUser,
  } = props;
  return (
    <>
      <CRow>
        <CCol>
          <CRow className="admin-login-form login-web-view ">
            <Loading start={loading} />
            <CCol>
              <CRow className="login-form " style={{ textAlign: "end" }}>
                {zoomSize < 150 && (
                  <CCol lg="6" className="brycen-bg-col">
                    <CRow>
                      <CCol className="brycen-logo-img-col">
                        <CImg
                          src="/image/loginPageImg.png"
                          alt="brycen-logo"
                          className="brycen-logo-img img-fluid"
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                )}
                <CCol lg="6" className="zoom-login-form">
                  <CRow>
                    <CCol lg="12" className="login-card-col">
                      <CRow className="admin-login-card-row">
                        <CCard className="admin-login-card">
                          <CCardBody>
                            <CForm>
                              <h1 className="login-header">LOGIN</h1>
                              <CRow className="login-err">
                                <SuccessError error={error} />
                              </CRow>
                              <CRow>
                                <CLabel className="admin-label">
                                  Admin User
                                  <span style={{ color: "red" }}>
                                    <b>&nbsp; *</b>
                                  </span>
                                </CLabel>
                                <CInputGroup className="mb-3 admin-user">
                                  <CInputGroupPrepend>
                                    <CInputGroupText>
                                      <CIcon name="cil-user" />
                                    </CInputGroupText>
                                  </CInputGroupPrepend>
                                  <CInput
                                    type="text"
                                    placeholder="admin user ID"
                                    className="admin-input"
                                    autoFocus="focus"
                                    onChange={adminChange}
                                    onKeyDown={keyDownHandler}
                                  />
                                </CInputGroup>
                              </CRow>
                              <CRow>
                                <CLabel className="admin-label">
                                  Password
                                  <span style={{ color: "red" }}>
                                    <b>&nbsp; *</b>
                                  </span>
                                </CLabel>
                                <CInputGroup className="admin-password">
                                  <CInputGroupPrepend>
                                    <CInputGroupText>
                                      <CIcon name="cil-lock-locked" />
                                    </CInputGroupText>
                                  </CInputGroupPrepend>
                                  <CInput
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="password"
                                    className="password-input"
                                    onChange={passwordChange}
                                    onKeyDown={keyDownHandler}
                                  />
                                  {checkNullOrBlank(password) && (
                                    <img
                                      src="image/visibility.png"
                                      className="eye-img"
                                      onClick={togglePassword}
                                      alt=""
                                    />
                                  )}
                                </CInputGroup>
                              </CRow>
                              {checkNullOrBlank(adminUser) &&
                                checkNullOrBlank(password) && (
                                  <CRow className="">
                                    <CCol xs="6"></CCol>
                                    <CCol xs="6" className="text-right">
                                      <CButton
                                        color="primary"
                                        className="px-4 focus-signin-button"
                                        style={{
                                          backgroundColor: "#4e57aa",
                                          border: "none",
                                        }}
                                        onClick={() => signInClick()}
                                      >
                                        Sign In
                                      </CButton>
                                    </CCol>
                                  </CRow>
                                )}
                              {!checkNullOrBlank(adminUser) &&
                                !checkNullOrBlank(password) && (
                                  <CRow className="">
                                    <CCol xs="6"></CCol>
                                    <CCol xs="6" className="text-right">
                                      <CButton
                                        color="primary"
                                        className="px-4 signin-button"
                                        style={{
                                          backgroundColor: "#4e57aa",
                                          border: "none",
                                        }}
                                        onClick={() => signInClick()}
                                      >
                                        Sign In
                                      </CButton>
                                    </CCol>
                                  </CRow>
                                )}
                              {checkNullOrBlank(adminUser) &&
                                !checkNullOrBlank(password) && (
                                  <CRow className="">
                                    <CCol xs="6"></CCol>
                                    <CCol xs="6" className="text-right">
                                      <CButton
                                        color="primary"
                                        className="px-4 signin-button"
                                        style={{
                                          backgroundColor: "#4e57aa",
                                          border: "none",
                                        }}
                                        onClick={() => signInClick()}
                                      >
                                        Sign In
                                      </CButton>
                                    </CCol>
                                  </CRow>
                                )}
                              {!checkNullOrBlank(adminUser) &&
                                checkNullOrBlank(password) && (
                                  <CRow className="">
                                    <CCol xs="6"></CCol>
                                    <CCol xs="6" className="text-right">
                                      <CButton
                                        color="primary"
                                        className="px-4 signin-button"
                                        style={{
                                          backgroundColor: "#4e57aa",
                                          border: "none",
                                        }}
                                        onClick={() => signInClick()}
                                      >
                                        Sign In
                                      </CButton>
                                    </CCol>
                                  </CRow>
                                )}
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CRow className="login-mobile-view">
            <CRow>
              <CCol style={{ padding: 0 }}>
                <CRow className="mobile-view-img-div">
                  <CImg
                    src="/image/mobile-background.png"
                    alt="background image"
                    className="mobile-view-img"
                  />
                </CRow>
                <CRow className="login-mobile-card">
                  <CCard className="login-mobile-card">
                    <CCardBody className="login-mobile-card-body">
                      <CForm>
                        <h3 className="login-header">LOGIN</h3>
                        <CRow className="login-err">
                          <SuccessError error={error} />
                        </CRow>
                        <CRow>
                          <CLabel className="admin-label">
                            Admin User
                            <span style={{ color: "red" }}>
                              <b>&nbsp; *</b>
                            </span>
                          </CLabel>
                          <CInputGroup className="mb-3 admin-user">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type="text"
                              placeholder="admin user ID"
                              className="admin-input"
                              autoFocus="focus"
                              onChange={adminChange}
                              onKeyDown={keyDownHandler}
                            />
                          </CInputGroup>
                        </CRow>
                        <CRow>
                          <CLabel className="admin-label">
                            Password
                            <span style={{ color: "red" }}>
                              <b>&nbsp; *</b>
                            </span>
                          </CLabel>
                          <CInputGroup className="admin-password">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput
                              type={passwordShown ? "text" : "password"}
                              placeholder="password"
                              className="password-input"
                              onChange={passwordChange}
                              onKeyDown={keyDownHandler}
                            />
                            {checkNullOrBlank(password) && (
                              <img
                                src="image/visibility.png"
                                className="eye-img"
                                onClick={togglePassword}
                                alt=""
                              />
                            )}
                          </CInputGroup>
                        </CRow>
                        {checkNullOrBlank(adminUser) &&
                          checkNullOrBlank(password) && (
                            <CRow className="">
                              <CCol xs="6"></CCol>
                              <CCol xs="6" className="text-right">
                                <CButton
                                  color="primary"
                                  className="px-4 focus-signin-button"
                                  style={{
                                    backgroundColor: "#4e57aa",
                                    border: "none",
                                  }}
                                  onClick={() => signInClick()}
                                >
                                  Sign In
                                </CButton>
                              </CCol>
                            </CRow>
                          )}
                        {!checkNullOrBlank(adminUser) &&
                          !checkNullOrBlank(password) && (
                            <CRow className="">
                              <CCol xs="6"></CCol>
                              <CCol xs="6" className="text-right">
                                <CButton
                                  color="primary"
                                  className="px-4 signin-button"
                                  style={{
                                    backgroundColor: "#4e57aa",
                                    border: "none",
                                  }}
                                  onClick={() => signInClick()}
                                >
                                  Sign In
                                </CButton>
                              </CCol>
                            </CRow>
                          )}
                        {checkNullOrBlank(adminUser) &&
                          !checkNullOrBlank(password) && (
                            <CRow className="">
                              <CCol xs="6"></CCol>
                              <CCol xs="6" className="text-right">
                                <CButton
                                  color="primary"
                                  className="px-4 signin-button"
                                  style={{
                                    backgroundColor: "#4e57aa",
                                    border: "none",
                                  }}
                                  onClick={() => signInClick()}
                                >
                                  Sign In
                                </CButton>
                              </CCol>
                            </CRow>
                          )}
                        {!checkNullOrBlank(adminUser) &&
                          checkNullOrBlank(password) && (
                            <CRow className="">
                              <CCol xs="6"></CCol>
                              <CCol xs="6" className="text-right">
                                <CButton
                                  color="primary"
                                  className="px-4 signin-button"
                                  style={{
                                    backgroundColor: "#4e57aa",
                                    border: "none",
                                  }}
                                  onClick={() => signInClick()}
                                >
                                  Sign In
                                </CButton>
                              </CCol>
                            </CRow>
                          )}
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CRow>
              </CCol>
            </CRow>
          </CRow>
        </CCol>
      </CRow>
    </>
  );
};
export default AdminLoginForm;
