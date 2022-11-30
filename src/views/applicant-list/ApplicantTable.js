/* eslint-disable jsx-a11y/alt-text */

/**
 * Applicant Table Form
 *
 * @author Thu Rein Lynn
 *
 * @create 17/6/2022
 *
 */

import React from "react";
import {
  CButton,
  CRow,
  CImg,
  CPagination,
  CCol,
  CTooltip,
} from "@coreui/react";

const ApplicantTable = (props) => {
  let {
    currentPage,
    lastPage,
    setActivePage,
    viewClick,
    deleteCLick,
    userData,
    subCheckboxChange,
    mainCheckboxChange,
    allCheck,
    downloadClick,
    statusChangeClick,
    totalRow,
    scrollClick,
    userClick,
    indexNumber
  } = props;

  return (
    <>
      {userData.length > 0 && (
        <div className="templateList-bg">
          <div style={{ marginRight: "1rem" }} className="app-list-heading">
            <h5 style={{ display: "flex" }}>
              
              <CImg
                className="templateList-img"
                src="./avatars/list.png"
                width={20}
                height={20}
                style={{ marginTop: "3px" }}
              ></CImg>
              <p style={{ fontWeight: "bold", marginTop: "3px" }}>
                Applicant Lists Data
              </p>
            </h5>
            <p style={{ fontWeight: "bold" }}>Total Row: {totalRow} row(s)</p>
          </div>
          <div className="overflow-style">
            <table className="app-table">
              <thead>
                <tr>
                  <th style={{ width: 20 ,textAlign: "center" }}>
                    <input
                      type="CheckBox"
                      onChange={mainCheckboxChange}
                      style={{
                        width: "17px",
                        height: "17px",
                        marginTop: "4px",

                      }}
                      checked={allCheck}
                    />
                  </th>
                  <th
                    style={{
                      width: 60,
                      textAlign: "start",
                      marginLeft: 0,
                      paddingLeft: 0,
                    }}
                  >
                    No
                  </th>
                  <th style={{ width: 180, textAlign: "center" }}>Profile</th>
                  <th style={{ width: 180, textAlign: "center" }}>Name</th>
                  <th style={{ width: 240, textAlign: "center" }}>
                    Template Title
                  </th>
                  <th style={{ width: 220, textAlign: "center" }}>Date</th>

                 
                  <th style={{ width: 250, textAlign: "center" }}>Email</th>
                  <th style={{ width: 180, textAlign: "center" }}>Status</th>
                  <th style={{ width: 409, textAlign: "center" }} colSpan="2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {userData.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ width: 20 }}>
                        <input
                          type="CheckBox"
                          style={{
                            width: "17px",
                            height: "17px",
                            marginTop: "4px",
                          }}
                          checked={data.isChecked === true}
                          onChange={() => subCheckboxChange(data.applicant_id)}
                        />
                      </td>
                      <td
                        style={{
                          width: 70,
                          textAlign: "start",
                          marginLeft: 0,
                          paddingLeft: 0,
                        }}
                      >
                        {indexNumber + index + 1}
                      </td>
                        {data.image_link === "" && (
                            <td style={{ width: 60}}>
                            <CImg
                              style={{
                                borderRadius: "50%",
                                marginLeft: "-14px",
                              }}
                              src="./image/DefaultProfile.png"
                              width={60}
                              height={60}
                            ></CImg>
                         
                        </td>
                        )}
                        {data.image_link !== "" && (
                           <td style={{ width: 60}}>
                          <CImg
                            style={{
                              borderRadius: "50%",
                              marginLeft: "-14px",
                            }}
                            src={data.image_link}
                            width={60}
                            height={60}
                          ></CImg>
                       
                      </td>)}
 
                      <td style={{ width: 180 }}>
                        {data.name === "" && "_"}
                        {data.name.length <= 30 && data.name}
                        {data.name.length > 30 && (
                          <>
                            {data.name.substring(0, 30)}
                            <CTooltip content={data.name} placement="right">
                              <span>.....</span>
                            </CTooltip>
                          </>
                        )}
                      </td>
                      <td style={{ width: 300 }}>
                        {data.template_name === "" && "_"}
                        {data.template_name.length <= 30 && data.template_name}
                        {data.template_name.length > 30 && (
                          <>
                            {data.template_name.substring(0, 30)}
                            <CTooltip
                              content={data.template_name}
                              placement="right"
                            >
                              <span>.....</span>
                            </CTooltip>
                          </>
                        )}
                      </td>
                      <td style={{ width: 220 }}>
                        {data.date === "" && "_"}
                        {data.date.length <= 30 && data.date}
                        {data.date.length > 30 && (
                          <>
                            {data.date.substring(0, 30)}
                            <CTooltip content={data.date} placement="right">
                              <span>.....</span>
                            </CTooltip>
                          </>
                        )}
                      </td>
                   
                      <td style={{ width: 180 }}>
                        {data.email === "" && "_"}
                        {data.email.length <= 30 && data.email}
                        {data.email.length > 30 && (
                          <>
                            {data.email.substring(0, 30)}
                            <CTooltip content={data.email} placement="right">
                              <span>.....</span>
                            </CTooltip>
                          </>
                        )}
                      </td>
                      <td style={{ display: 'flex' ,justifyContent: 'center' }}>
                        {data.status_id === 1 && (
                          <p
                            style={{
                              color: "#EAAB38",
                              backgroundColor: "#FCFDDC",
                              borderRadius: "15px",
                              width: "100px",
                              height: "30px",
                              marginTop: "16px",
                            }}
                          >
                            <label style={{ marginTop: "5px" }}>Pending</label>
                          </p>
                        )}
                        {data.status_id === 2 && (
                          <p
                            style={{
                              color: "#E63E33",
                              backgroundColor: "#FDEBE9",
                              borderRadius: "15px",
                              width: "100px",
                              height: "30px",
                              marginTop: "16px",
                            }}
                          >
                            <label style={{ marginTop: "5px" }}>Reject</label>
                          </p>
                        )}
                        {data.status_id === 3 && (
                          <p
                            style={{
                              color: "#1F01E4",
                              backgroundColor: "#DED9FF",
                              borderRadius: "15px",
                              width: "100px",
                              height: "30px",
                              marginTop: "16px",
                            }}
                          >
                            <label style={{ marginTop: "5px" }}>
                              Processing
                            </label>
                          </p>
                        )}
                        {data.status_id === 4 && (
                          <p
                            style={{
                              color: "#7BB07D",
                              backgroundColor: "#EDF5EE",
                              borderRadius: "15px",
                              width: "100px",
                              height: "30px",
                              marginTop: "16px",
                            }}
                          >
                            <label style={{ marginTop: "5px" }}>Success</label>
                          </p>
                        )}
                        {data.status_id === 5 && (
                          <p
                            style={{
                              color: "#E401A0",
                              backgroundColor: "#FFD1F1",
                              borderRadius: "15px",
                              width: "100px",
                              height: "30px",
                              marginTop: "16px",
                            }}
                          >
                            <label style={{ marginTop: "5px" }}>Fail</label>
                          </p>
                        )}
                      </td>
                      <td style={{ width: 130 }}>
                        <CButton
                          className="app-viewBtn"
                          onClick={() => viewClick(data.applicant_id)}
                        
                        >
                          <CImg
                            style={{ marginRight: 10 }}
                            src="./avatars/eye.png"
                            width={15}
                            height={17}
                          ></CImg>
                          View
                        </CButton>
                      </td>
                      <td style={{ width: 280 }} >
                        <CButton
                          className="templateList-viewBtn"
                          style={{
                            width: "150px",
                          }}
                          onClick={() => downloadClick(data.applicant_id)}
                        >
                          <CImg
                            style={{ marginRight: 10, marginTop: "2px" }}
                            src="./image/file_download.svg"
                            width={20}
                            height={20}
                          ></CImg>{" "}
                          File Download
                        </CButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {totalRow > 20 && (
            <CRow alignHorizontal="center" className="mt-3">
              <CPagination
                activePage={currentPage}
                pages={lastPage}
                dots={false}
                arrows={false}
                align="center"
                firstButton="First page"
                lastButton="Last page"
                onActivePageChange={(i) => setActivePage(i)}
              ></CPagination>
            </CRow>
          )}
          {userData.length > 0 && (
            <>
              <br></br>
              <CRow>
              <CCol lg="1">
              <CButton className="mobile-view"
                            style={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: "#e6e8ff",
                              borderRadius: "15px",
                              color: "black",
                              marginLeft: "20px",
                              marginTop: "10px",
                            }}
                            onClick={userClick}
                          >
                           <CImg
                          style={{ marginTop: "5px" }}
                          src="/image/user guide.svg"
                          width={20}
                          height={20}
                        ></CImg>
                          </CButton>

              </CCol>
                <CCol lg="1" ></CCol>
                <CCol lg="8">
                  <CRow className="btn_fixed">
                    <CCol lg="2" md="4" sm="6" xs="5">
                      <CButton
                        className="common-btn"
                        onClick={() => statusChangeClick(3)}
                       
                      >
                        <CImg
                          style={{ width: "1rem", height: "1rem",marginRight: "0.2rem"}}
                          src="./avatars/pending.png"
                          
                        ></CImg>
                      Processing
                      </CButton>
                    </CCol>
                    <CCol lg="2"md="4" sm="6" xs="5">
                      <CButton
                        className="common-btn"
                        onClick={() => statusChangeClick(2)}
                        
                      >
                        <CImg
                         style={{ width: "1rem", height: "1rem",marginRight: "0.2rem" }}
                          src="./avatars/closed.png"
                          
                        ></CImg>
                     Reject
                      </CButton>
                    </CCol>
                    <CCol lg="2" md="4" sm="6" xs="5">
                      <CButton
                        className="common-btn"
                        
                        onClick={() => statusChangeClick(4)}
                      >
                        <CImg
                         style={{ width: "1rem", height: "1rem",marginRight: "0.2rem" }}
                          src="./avatars/passed.png"
                         
                        ></CImg>
                        Passed
                      </CButton>
                    </CCol>
                    <CCol lg="2" md="4" sm="6" xs="5">
                      <CButton
                        onClick={() => statusChangeClick(5)}
                        className="common-btn"
                       
                      >
                        <CImg
                          style={{ width: "1rem", height: "1rem",marginRight: "0.2rem" }}
                          src="./avatars/fail.png"
                         
                        ></CImg>
                     Fail
                      </CButton>
                    </CCol>
                    <CCol lg="2" md="4" sm="6" xs="5">
                      <CButton
                        className="common-btn"
                        onClick={deleteCLick}
                      >
                        <CImg
                          style={{ width: "1rem", height: "1rem",marginRight: "0.2rem" }}
                          src="./avatars/del2.png"
                        
                        ></CImg>
                        Delete
                      </CButton>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol lg="1" className="btn-up">
                <CButton className="mobile-view-left"
                            style={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: "#e6e8ff",
                              borderRadius: "15px",
                              color: "black",
                              marginLeft: "20px",
                            }}
                            onClick={userClick}
                          >
                              <CImg
                          style={{ marginTop: "5px" }}
                          src="/image/user guide.svg"
                          width={20}
                          height={20}
                        ></CImg>
                          </CButton>

                </CCol>
                
                <CCol lg="1" className="btn-up">
                       
                {userData.length > 10 && (
                          <CButton
                          style={{
                            width: "50px",
                            height: "50px",
                            backgroundColor: "#e6e8ff",
                            borderRadius: "15px",
                            color: "black",
                            marginRight: "15px",
                            float: "inline-end",
                            marginTop: "10px",
                           
                          }}
                          onClick={scrollClick}
                        >
                           <CImg
                        src="/image/uparrow.png"
                        width={20}
                        height={20}
                      ></CImg>
                         
                        </CButton>
                          )}
                       
                </CCol>

              </CRow>
              
              <br></br>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ApplicantTable;