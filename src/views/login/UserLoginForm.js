/* User Login via email
 *
 * @author Thu Ta
 *
 * @create 17/6/2022
 *
 */
import {
  CRow,
  CCol,
  CForm,
  CInputGroup,
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

const UserLoginForm = (props) => {
  let {
    loading,
    zoomSize,
    error,
    emailChange,
    userKeyDownHandler,
    userSignInClick,
  } = props;
  return (
    <>
      <CRow className="user-login-form login-web-view">
        <Loading start={loading} />
        <CCol className="user-login-form-col">
          <CRow className="userlogin-sec-div">
            {zoomSize < 150 && (
              <CCol lg="6" className="brycen-bg-col">
                <CRow>
                  <CCol>
                    <CImg
                      src="/image/loginPageImg.png"
                      alt="brycen-logo"
                      className="brycen-logo-img"
                    />
                  </CCol>
                </CRow>
              </CCol>
            )}
            <CCol lg="6" md="12" sm="12" xs="12">
              <CRow className="user-login-form-row">
                <CCol className="user-login-card-col">
                  <CRow className="user-login-card-row">
                    <CCard className="user-login-card-web">
                      <CCardBody className="user-login-card-body">
                        <CForm>
                          <h1 className="login-header">LOGIN</h1>
                          <CRow className="login-err">
                            <SuccessError error={error} />
                          </CRow>
                          <CRow>
                            <CLabel className="admin-label">
                              Email
                              <span style={{ color: "red" }}>
                                <b>&nbsp; *</b>
                              </span>
                            </CLabel>
                            <CInputGroup className="mb-3 email-input-box">
                              <CInput
                                className="user-email-input"
                                type="text"
                                placeholder="example@gmail.com"
                                onChange={emailChange}
                                onKeyDown={userKeyDownHandler}
                                autoFocus="focus"
                              />
                            </CInputGroup>
                          </CRow>
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
                                onClick={() => userSignInClick()}
                              >
                                Sign In
                              </CButton>
                            </CCol>
                          </CRow>
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
        <Loading start={loading} />
        <CCol>
          <CRow>
            <CImg
              src="/image/mobile-background.png"
              alt="mobile background"
              className="mobile-view-img"
            />
          </CRow>
          <CRow className="userlogin-sec-div">
            <CCol className="user-login-mobile-col">
              <CRow className="user-login-mobile-div">
                <CCard className="user-login-card-mobile">
                  <CCardBody>
                    <CForm>
                      <h1 className="login-header">LOGIN</h1>
                      <CRow className="login-err">
                        <SuccessError error={error} />
                      </CRow>
                      <CRow>
                        <CLabel className="admin-label">
                          Email
                          <span style={{ color: "red" }}>
                            <b>&nbsp; *</b>
                          </span>
                        </CLabel>
                        <CInputGroup className="mb-3 email-input-box">
                          <CInput
                            className="user-email-input"
                            type="text"
                            placeholder="example@gmail.com"
                            onChange={emailChange}
                            onKeyDown={userKeyDownHandler}
                            autoFocus="focus"
                          />
                        </CInputGroup>
                      </CRow>
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
                            onClick={() => userSignInClick()}
                          >
                            Sign In
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CRow>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  );
};
export default UserLoginForm;
