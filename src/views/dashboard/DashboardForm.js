/* Dashboard  Index
 * @author Thu Ta
 * @create 24/6/2022
 */
import { CRow, CCol, CCard, CCardBody, CImg, CLabel } from "@coreui/react";
import React from "react";
import SuccessError from "../common/SuccessError";
import CountUp from "react-countup";
import Loading from "../common/Loading";

const DashboardForm = (props) => {
  let {
    loading,
    error,
    appPending,
    appProcess,
    appPass,
    tempActives,
    tempInActives,
    tempTotal,
  } = props;
  return (
    <CRow className="">
      <Loading start={loading} />
      <CCol>
        <CCard className="template-list-cardBody dashboard-card-body">
          <CCardBody>
            <CRow>
              <SuccessError error={error} />
            </CRow>
            <CRow>
              <CCol lg="4">
                <CCard className="common-card card-one">
                  <CCardBody>
                    <CRow>
                      <CCol lg="9" md="8" sm="8" xs="8">
                        <CRow>
                          <CLabel className="card-label-text applicant-pending">
                            Applicant
                          </CLabel>
                        </CRow>
                        <CRow>
                          <span className="card-label-num">
                            <CountUp end={appPending} duration={1} />
                          </span>
                        </CRow>
                        <CRow>
                          <span className="span-text-pending">Pending</span>
                        </CRow>
                      </CCol>
                      <CCol lg="3" md="4" sm="4" xs="4">
                        <CRow className="image-container">
                          <CImg
                            src="image/Applicant-Pending.png"
                            className="tem-app-image"
                          />
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg="4">
                <CCard className="common-card card-two">
                  <CCardBody>
                    <CRow>
                      <CCol lg="9" md="8" sm="8" xs="8">
                        <CRow>
                          <CLabel className="card-label-text applicant-processing">
                            Applicant
                          </CLabel>
                        </CRow>
                        <CRow>
                          <span className="card-label-num">
                            <CountUp end={appProcess} duration={1} />
                          </span>
                        </CRow>
                        <CRow>
                          <span className="span-text-processing">
                            Processing
                          </span>
                        </CRow>
                      </CCol>
                      <CCol lg="3" md="4" sm="4" xs="4">
                        <CRow className="image-container">
                          <CImg
                            src="image/Applicant-Processing.png"
                            className="tem-app-image"
                          />
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg="4">
                <CCard className="common-card card-three">
                  <CCardBody>
                    <CRow>
                      <CCol lg="9" md="8" sm="8" xs="8">
                        <CRow>
                          <CLabel className="card-label-text applicant-success">
                            Applicant
                          </CLabel>
                        </CRow>
                        <CRow>
                          <span className="card-label-num">
                            <CountUp end={appPass} duration={1} />
                          </span>
                        </CRow>
                        <CRow>
                          <span className="span-text-success">Success</span>
                        </CRow>
                      </CCol>
                      <CCol lg="3" md="4" sm="4" xs="4">
                        <CRow className="image-container">
                          <CImg
                            src="image/Applicant-Success.png"
                            className="tem-app-image"
                          />
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol lg="4">
                <CCard className="common-card card-four">
                  <CCardBody>
                    <CRow>
                      <CCol lg="9" md="8" sm="8" xs="8">
                        <CRow>
                          <CLabel className="card-label-text template-active">
                            Templates
                          </CLabel>
                        </CRow>
                        <CRow>
                          <span className="card-label-num">
                            <CountUp end={tempActives} duration={1} />
                          </span>
                        </CRow>
                        <CRow>
                          <span className="span-text-active">Active</span>
                        </CRow>
                      </CCol>
                      <CCol lg="3" md="4" sm="4" xs="4">
                        <CRow className="image-container">
                          <CImg
                            src="image/TemplateActive.png"
                            className="tem-app-image"
                          />
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg="4">
                <CCard className="common-card card-five">
                  <CCardBody>
                    <CRow>
                      <CCol lg="9" md="8" sm="8" xs="8">
                        <CRow>
                          <CLabel className="card-label-text template-inactive">
                            Templates
                          </CLabel>
                        </CRow>
                        <CRow>
                          <span className="card-label-num">
                            <CountUp end={tempInActives} duration={1} />
                          </span>
                        </CRow>
                        <CRow>
                          <span className="span-text-inactive">InActive</span>
                        </CRow>
                      </CCol>
                      <CCol lg="3" md="4" sm="4" xs="4">
                        <CRow className="image-container">
                          <CImg
                            src="image/TemplateInactive.png"
                            className="tem-app-image"
                          />
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg="4">
                <CCard className="common-card card-six">
                  <CCardBody>
                    <CRow>
                      <CCol lg="9" md="8" sm="8" xs="8">
                        <CRow>
                          <CLabel className="card-label-text template-total">
                            Templates
                          </CLabel>
                        </CRow>
                        <CRow>
                          <span className="card-label-num">
                            <CountUp end={tempTotal} duration={1} />
                          </span>
                        </CRow>
                        <CRow>
                          <span className="span-text-total">Total</span>
                        </CRow>
                      </CCol>
                      <CCol lg="3" md="4" sm="4" xs="4">
                        <CRow className="image-container">
                          <CImg
                            src="image/TotalTemplate.png"
                            className="tem-app-image"
                          />
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CCard className="card-text">
                  <CCardBody>
                    <CRow>
                      <h5 className="h3-text">
                        How important is CV for job application?
                      </h5>
                    </CRow>
                    <CRow>
                      <p
                        className="dashboard-text"
                        style={{ textAlign: "justify" }}
                      >
                        Often, it's the first chance you get to introduce
                        yourself to a potential employer and show them why
                        you're a great candidate. Employers and recruiters can
                        have tens or even hundreds of CVs to sort through for
                        each vacancy, so it's important to create a CV that
                        stands out from the crowd.
                      </p>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
export default DashboardForm;
