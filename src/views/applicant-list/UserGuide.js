/* eslint-disable jsx-a11y/alt-text */

/**
 * DetailModal Component
 *
 * @author Thu Rein Lynn
 *
 * @create 8/6/2022
 *
 */

import React from "react";
import {
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CCol,
  CImg,
} from "@coreui/react";
const UserGuide = (props) => {
  const { show, closeBtn } = props;

  return (
    <>
      <CModal
        size="lg"
        centered
        closeOnBackdrop={false}
        show={show}
        id="advanced"
        style={{ backgroundColor: "#ffff" }}
        onClose={closeBtn}
      >
        <CModalHeader style={{ justifyContent: "center" }}>
          <CImg
            className="cross-img cursorStyle"
            onClick={closeBtn}
            src="/avatars/close.png"
            width={33}
            height={33}
          ></CImg>
          <h2 style={{ fontWeight: "bold" }}>User Guide For Status Change</h2>
        </CModalHeader>
        <CModalBody>
          <br />
          <CRow style={{ paddingLeft: "20px" }}>
            &#9658;
            <label
              style={{
                color: "#EAAB38",
              }}
            >
              &nbsp; Pending&nbsp;
            </label>
            status is default status and it can be changed to
            <label style={{ color: "#1F01E4" }}>&nbsp; Processing &nbsp;</label>
            status and
            <label style={{ color: "#E63E33" }}>&nbsp; Reject &nbsp;</label>
            status.
          </CRow>
          <CRow id="approver-modal">
            <CCol lg="3" md="4" sm="4" xs="5" style={{ textAlign: "start" }}>
              <p
                style={{
                  color: "#EAAB38",
                  backgroundColor: "#FCFDDC",
                  borderRadius: "15px",
                  width: "100%",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                Pending
              </p>
            </CCol>
            <CCol lg="1" md="1" sm="2" xs="2" style={{ textAlign: "start" }}>
              <p
                style={{
                  fontSize: "27px",
                }}
              >
                &#10144;
              </p>
            </CCol>

            <CCol lg="8" md="7" sm="6" xs="5" style={{ textAlign: "start" }}>
              <CRow>
                <CCol lg="4" md="12" sm="12" xs="12">
                  <p
                    style={{
                      color: "#1F01E4",
                      backgroundColor: "#DED9FF",
                      borderRadius: "15px",
                      width: "100%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Processing
                  </p>
                </CCol>

                <CCol lg="4" md="12" sm="12" xs="12">
                  <p
                    style={{
                      color: "#E63E33",
                      backgroundColor: "#FDEBE9",
                      borderRadius: "15px",
                      width: "100%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Reject
                  </p>
                </CCol>

                <CCol lg="4" md="12" sm="12" xs="12">
                  <p
                    style={{
                      color: "#940c0c",
                      backgroundColor: "#e89b9b",
                      borderRadius: "15px",
                      width: "100%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Delete
                  </p>
                </CCol>
              </CRow>
            </CCol>
          </CRow>

          <br />
          <CRow style={{ paddingLeft: "20px" }}>
            &#9658;
            <label
              style={{
                color: "#1F01E4",
              }}
            >
              {" "}
              &nbsp; Processing
            </label>
            &nbsp; status can be changed to
            <label style={{ color: "#7BB07D" }}>&nbsp; Success &nbsp;</label>
            status and
            <label style={{ color: "#E401A0" }}>&nbsp; Fail &nbsp;</label>
            status.
          </CRow>
          <CRow id="approver-modal">
            <CCol lg="3" md="4" sm="4" xs="5" style={{ textAlign: "start" }}>
              <p
                style={{
                  color: "#1F01E4",
                  backgroundColor: "#DED9FF",
                  borderRadius: "15px",
                  width: "100%",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                Processing
              </p>
            </CCol>

            <CCol lg="1" md="1" sm="2" xs="2" style={{ textAlign: "start" }}>
              <p
                style={{
                  fontSize: "27px",
                }}
              >
                &#10144;
              </p>
            </CCol>

            <CCol lg="8" md="7" sm="6" xs="5" style={{ textAlign: "start" }}>
              <CRow>
                <CCol lg="4" md="12" sm="12" xs="12">
                  <p
                    style={{
                      color: "#7BB07D",
                      backgroundColor: "#EDF5EE",
                      borderRadius: "15px",
                      width: "100%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Success
                  </p>
                </CCol>

                <CCol lg="4" md="12" sm="12" xs="12">
                  <p
                    style={{
                      color: "#E401A0",
                      backgroundColor: "#FFD1F1",
                      borderRadius: "15px",
                      width: "100%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Fail
                  </p>
                </CCol>

                <CCol lg="4" md="8" sm="6" xs="12"></CCol>
              </CRow>
            </CCol>
          </CRow>
          <br />
          <CRow style={{ paddingLeft: "20px" }}>
            &#9658;
            <label
              style={{
                color: "#7BB07D",
              }}
            >
              {" "}
              &nbsp; Success
            </label>
            &nbsp; status can only be changed to
            <label style={{ color: "#E63E33" }}>&nbsp; Reject &nbsp;</label>
            status.
          </CRow>
          <CRow id="approver-modal">
            <CCol lg="3" md="4" sm="4" xs="5" style={{ textAlign: "start" }}>
              <p
                style={{
                  color: "#7BB07D",
                  backgroundColor: "#EDF5EE",
                  borderRadius: "15px",
                  width: "100%",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                Success
              </p>
            </CCol>

            <CCol lg="1" md="1" sm="2" xs="2" style={{ textAlign: "start" }}>
              <p
                style={{
                  fontSize: "27px",
                }}
              >
                &#10144;
              </p>
            </CCol>

            <CCol lg="8" md="7" sm="6" xs="5" style={{ textAlign: "start" }}>
              <CRow>
                <CCol lg="4" md="12" sm="12" xs="12">
                  <p
                    style={{
                      color: "#E63E33",
                      backgroundColor: "#FDEBE9",
                      borderRadius: "15px",
                      width: "100%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Reject
                  </p>
                </CCol>

                <CCol lg="4" md="8" sm="6" xs="12"></CCol>

                <CCol lg="4" md="8" sm="6" xs="12"></CCol>
              </CRow>
            </CCol>
          </CRow>
          <br />
          <CRow style={{ paddingLeft: "20px" }}>
            &#9658;
            <label
              style={{
                color: "#E63E33",
              }}
            >
              {" "}
              &nbsp; Reject
            </label>
            &nbsp; status cannot change to any status.
          </CRow>
          <CRow id="approver-modal">
            <CCol lg="3" md="4" sm="4" xs="5" style={{ textAlign: "start" }}>
              <p
                style={{
                  color: "#E63E33",
                  backgroundColor: "#FDEBE9",
                  borderRadius: "15px",
                  width: "100%",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                Reject
              </p>
            </CCol>
            <CCol lg="1" md="1" sm="2" xs="2" style={{ textAlign: "start" }}>
              <p
                style={{
                  fontSize: "27px",
                }}
              >
                &#10144;
              </p>
            </CCol>

            <CCol lg="8" md="7" sm="6" xs="5" style={{ textAlign: "start" }}>
              <CRow>
                <CCol lg="4" md="12" sm="12" xs="12">
                  <p
                    style={{
                      color: "#940c0c",
                      backgroundColor: "#e89b9b",
                      borderRadius: "15px",
                      width: "100%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Delete
                  </p>
                </CCol>

                <CCol lg="4" md="8" sm="6" xs="12"></CCol>

                <CCol lg="4" md="8" sm="6" xs="12"></CCol>
              </CRow>
            </CCol>
          </CRow>
          <br />
          <CRow style={{ paddingLeft: "20px" }}>
            &#9658;
            <label
              style={{
                color: "#E401A0",
              }}
            >
              {" "}
              &nbsp; Fail
            </label>
            &nbsp; status can be changed to
            <label style={{ color: "#7BB07D" }}>&nbsp; Success &nbsp;</label>
            status.
          </CRow>
          <CRow id="approver-modal">
            <CCol lg="3" md="4" sm="4" xs="5" style={{ textAlign: "start" }}>
              <p
                style={{
                  color: "#E401A0",
                  backgroundColor: "#FFD1F1",
                  borderRadius: "15px",
                  width: "100%",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                Fail
              </p>
            </CCol>

            <CCol lg="1" md="1" sm="2" xs="2" style={{ textAlign: "start" }}>
              <p
                style={{
                  fontSize: "27px",
                }}
              >
                &#10144;
              </p>
            </CCol>

            <CCol lg="8" md="7" sm="6" xs="5" style={{ textAlign: "start" }}>
              <CRow>
                <CCol lg="4" md="12" sm="12" xs="12">
                  <p
                    style={{
                      color: "#7BB07D",
                      backgroundColor: "#EDF5EE",
                      borderRadius: "15px",
                      width: "100%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Success
                  </p>
                </CCol>

                <CCol lg="4" md="12" sm="12" xs="12">
                  <p
                    style={{
                      color: "#940c0c",
                      backgroundColor: "#e89b9b",
                      borderRadius: "15px",
                      width: "100%",
                      textAlign: "center",
                      padding: "10px",
                    }}
                  >
                    Delete
                  </p>
                </CCol>

                <CCol lg="4" md="8" sm="6" xs="12"></CCol>
              </CRow>
            </CCol>
          </CRow>
          <br></br>
          <CRow style={{ paddingLeft: "20px" , fontWeight: "bold" }}>
            
            <label> &#10071; </label> &nbsp; Applicants with
            <label style={{ color: "#1F01E4" }}> &nbsp; Processing &nbsp;</label>
            status or
            <label style={{ color: "#7BB07D" }}> &nbsp; Success &nbsp;</label>
            status cannot 
            <label style={{ color: "#940c0c"}}> &nbsp; Delete</label>!
          </CRow>
          <br />
        </CModalBody>
      </CModal>
    </>
  );
};
export default UserGuide;
