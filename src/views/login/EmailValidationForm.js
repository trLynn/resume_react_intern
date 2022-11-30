/* Email Verification Form
 *
 * @authar Thu Rein Lynn
 *
 * @create 17/06/2022
 *
 */
import React from "react";
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
import SuccessError from "../common/SuccessError";

const EmailVerifiactionForm = (props) => {
  const {
    keyDownHandler,
    inputHandleChange,
    submitClick,
    resendClick,
    ssnValues,
    error,
    zoomSize,
    inputHandleChangeMobile,
    ssnValuesMobile,
  } = props;

  return (
    <>
      <CRow className="email-veri-first login-web-view">
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
        <CCol lg="6">
          <CRow className="email-veri-sec" lg="12" sm="10" xs="8">
            <CCol
              lg="12"
              md="12"
              sm="12"
              xs="12"
              className="email-veri-login-card-col"
            >
              <CRow className="email-veri-login-card-row">
                <CCard className="email-veri-login-card-web">
                  <CCardBody>
                    <CFormGroup
                      inline
                      style={{
                        marginTop: "1rem",
                        borderBox: "box-sizing",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "30px",
                          fontWeight: "bold",
                        }}
                      >
                        Verification Code
                      </h3>
                      <p
                        style={{
                          marginTop: "10px",
                          marginBottom: "30px",
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        Please type the verification code sent to your email.
                      </p>
                      <CRow className="login-err">
                        <SuccessError error={error} />
                      </CRow>
                      <CLabel style={{ fontWeight: "600", fontSize: "14px" }}>
                        Passcode
                        <span
                          style={{
                            color: "red",
                            fontSize: "18px",
                            lineHeight: "0.5rem",
                          }}
                        >
                          <b>&nbsp; *</b>
                        </span>
                      </CLabel>
                      <CRow className="passcode-row">
                        <CInput
                          type="text"
                          className="passcode-input"
                          onChange={inputHandleChange}
                          name="1"
                          autoFocus="focus"
                          value={ssnValues[0]["value"]}
                          onKeyDown={keyDownHandler}
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                        />
                        <CInput
                          type="text"
                          className="passcode-input"
                          onChange={inputHandleChange}
                          name="2"
                          value={ssnValues[1]["value"]}
                          onKeyDown={keyDownHandler}
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                        />
                        <CInput
                          type="text"
                          className="passcode-input"
                          onChange={inputHandleChange}
                          name="3"
                          value={ssnValues[2]["value"]}
                          onKeyDown={keyDownHandler}
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                        />
                        <CInput
                          type="text"
                          className="passcode-input"
                          onChange={inputHandleChange}
                          name="4"
                          value={ssnValues[3]["value"]}
                          onKeyDown={keyDownHandler}
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                        />
                        <CInput
                          type="text"
                          className="passcode-input"
                          onChange={inputHandleChange}
                          name="5"
                          value={ssnValues[4]["value"]}
                          onKeyDown={keyDownHandler}
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                        />
                        <CInput
                          type="text"
                          className="passcode-input"
                          onChange={inputHandleChange}
                          name="6"
                          style={{ marginRight: "0.2rem" }}
                          value={ssnValues[5]["value"]}
                          onKeyDown={keyDownHandler}
                          onPaste={(e) => {
                            e.preventDefault();
                            return false;
                          }}
                        />
                      </CRow>
                      <CRow className="submit-div">
                        <CCol className="text-right">
                          <CButton
                            color="primary"
                            className="px-4 submit-btn"
                            style={{
                              backgroundColor: "#4e57aa",
                              border: "none",
                            }}
                            onClick={() => resendClick()}
                          >
                            Resend
                          </CButton>
                          <CButton
                            color="primary"
                            className="px-4 submit-btn"
                            style={{
                              backgroundColor: "#4e57aa",
                              border: "none",
                            }}
                            onClick={() => submitClick()}
                          >
                            Submit
                          </CButton>
                        </CCol>
                      </CRow>
                    </CFormGroup>
                  </CCardBody>
                </CCard>
              </CRow>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="email-veri-sec-mobile login-mobile-view">
        <CCol>
          <CRow>
            <CImg
              src="/image/mobile-background.png"
              alt="mobile background"
              className="mobile-view-img"
            />
          </CRow>
          <CRow lg="12">
            <CCol lg="12" className="email-veri-login-col">
              <CCard className="email-veri-login-card-mobile">
                <CCardBody>
                  <CFormGroup
                    inline
                    style={{
                      marginTop: "1rem",
                      borderBox: "box-sizing",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                      }}
                    >
                      Verification Code
                    </h3>
                    <p
                      style={{
                        marginTop: "10px",
                        marginBottom: "30px",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      Please type the verification code sent to your email.
                    </p>
                    <CRow className="login-err">
                      <SuccessError error={error} />
                    </CRow>
                    <CLabel style={{ fontWeight: "600", fontSize: "14px" }}>
                      Passcode
                      <span
                        style={{
                          color: "red",
                          fontSize: "18px",
                          lineHeight: "0.5rem",
                        }}
                      >
                        <b>&nbsp; *</b>
                      </span>
                    </CLabel>
                    <CRow className="passcode-row">
                      <CInput
                        type="text"
                        className="passcode-input"
                        onChange={inputHandleChangeMobile}
                        name="7"
                        autoFocus="focus"
                        value={ssnValuesMobile[0]["value"]}
                        onKeyDown={keyDownHandler}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                      />
                      <CInput
                        type="text"
                        className="passcode-input"
                        onChange={inputHandleChangeMobile}
                        name="8"
                        value={ssnValuesMobile[1]["value"]}
                        onKeyDown={keyDownHandler}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                      />
                      <CInput
                        type="text"
                        className="passcode-input"
                        onChange={inputHandleChangeMobile}
                        name="9"
                        value={ssnValuesMobile[2]["value"]}
                        onKeyDown={keyDownHandler}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                      />
                      <CInput
                        type="text"
                        className="passcode-input"
                        onChange={inputHandleChangeMobile}
                        name="10"
                        value={ssnValuesMobile[3]["value"]}
                        onKeyDown={keyDownHandler}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                      />
                      <CInput
                        type="text"
                        className="passcode-input"
                        onChange={inputHandleChangeMobile}
                        name="11"
                        value={ssnValuesMobile[4]["value"]}
                        onKeyDown={keyDownHandler}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                      />
                      <CInput
                        type="text"
                        className="passcode-input"
                        onChange={inputHandleChangeMobile}
                        name="12"
                        style={{ marginRight: "0.2rem" }}
                        value={ssnValuesMobile[5]["value"]}
                        onKeyDown={keyDownHandler}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
                      />
                    </CRow>
                    <CRow className="submit-div">
                      <CCol className="text-right">
                        <CButton
                          color="primary"
                          className=" submit-btn"
                          style={{
                            backgroundColor: "#4e57aa",
                            border: "none",
                          }}
                          onClick={() => resendClick()}
                        >
                          Resend
                        </CButton>
                        <CButton
                          color="primary"
                          className="submit-btn"
                          style={{
                            backgroundColor: "#4e57aa",
                            border: "none",
                          }}
                          onClick={() => submitClick()}
                        >
                          Submit
                        </CButton>
                      </CCol>
                    </CRow>
                  </CFormGroup>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  );
};
export default EmailVerifiactionForm;
