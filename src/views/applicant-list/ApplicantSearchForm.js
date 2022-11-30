/* eslint-disable jsx-a11y/alt-text */

/**
 * Applicant search form
 *
 * @author Thu Rein Lynn
 *
 * @create 17/6/2022
 *
 */

import React from "react";
import { CButton, CCol, CImg, CInput, CRow, CSelect } from "@coreui/react";
const AppListSearch = (props) => {
  let {
    tmpTitleData,
    tmpTitleSelectChange,
    tmpTitleSelectValue,
    infoData,
    infoDataName,
    infoSelectChange,
    infoSelectValue,
    statusSelectChange,
    statusData,
    statusSelectValue,
    skillData,
    skillSelectChange,
    skillSelectValue,
    skillNameSelectName,
    levelbox,
    infoText,
    infoTextChange,
    excdownloadClick,
    skillNameSelectChange,
    skillName,
    skillNameSelectValue,
    searchClick,
    keyHandler
    
  } = props;

  return (
    <>
      <CRow>
        <CCol lg="6">
          <CRow>
            <CCol lg="4">
              <p
                style={{
                  marginTop: "7px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Template Title
              </p>
            </CCol>
            <CCol lg="7">
              <CSelect
                onChange={tmpTitleSelectChange}
                value={tmpTitleSelectValue}
                style={{ border: "1px solid #7582FF" }}
              >
                <option value="0">All</option>
                {tmpTitleData != "" &&
                  tmpTitleData.map((data, index) => {
                    return (
                      <option key={index} value={data.template_id}>
                        {data.template_name.length <= 20 && data.template_name}
                        {data.template_name.length > 20 &&
                          data.template_name.substring(0, 20).concat("....")}
                      </option>
                    );
                  })}
              </CSelect>
            </CCol>
          </CRow>
        </CCol>
        <CCol lg="6">
          <CRow>
            <CCol lg="4">
              <p
                style={{
                  marginTop: "7px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Status
              </p>
            </CCol>
            <CCol lg="7">
              <CSelect
                onChange={statusSelectChange}
                value={statusSelectValue}
                style={{ border: "1px solid #7582FF" }}
              >
                <option value="0">All</option>
                {statusData != "" &&
                  statusData.map((data, index) => {
                    return (
                      <option key={index} value={data.status}>
                        {data.status_Name.length <= 20 && data.status_Name}
                        {data.status_Name.length > 20 &&
                          data.status_Name.substring(0, 20).concat("....")}
                      </option>
                    );
                  })}
              </CSelect>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <br></br>

      {infoData.length > 0 && (
        <>
          {tmpTitleSelectValue == "0" && <CRow></CRow>}
          {tmpTitleSelectValue !== "0" && (
            <CRow>
              <CCol lg="6">
                <CRow>
                  <CCol lg="4">
                    <p
                      style={{
                        marginTop: "7px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Information
                    </p>
                  </CCol>
                  <CCol lg="7">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        {(levelbox == 1 ||
                          levelbox == 2 ||
                          levelbox == 3 ||
                          levelbox == 4 ||
                          levelbox == 5 ||
                          levelbox == 6 ||
                          levelbox == 7 ||
                          levelbox == 8) && (
                          <CSelect
                            onChange={infoSelectChange}
                          
                            value={`${infoSelectValue},${levelbox},${infoDataName}`}
                            className="borderStyleRight"
                          >
                            <option value={["", 0]}>All</option>
                            {infoData.length > 0 &&
                              infoData.map((data, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={`${data.heading_id},${data.heading_type_id},${data.heading_name}`}
                                  >
                                    {data.heading_name}
                                  </option>
                                );
                              })}
                          </CSelect>
                        )}

                        {levelbox == 0 && (
                          <CSelect
                            onChange={infoSelectChange}
                           
                            value={`${infoSelectValue},${levelbox},${infoDataName}`}
                            className="border-simple-style"
                          >
                            <option value={["", 0]}>All</option>
                            {infoData != "" &&
                              infoData.map((data, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={`${data.heading_id},${data.heading_type_id},${data.heading_name}`}
                                  >
                                    {data.heading_name}
                                  </option>
                                );
                              })}
                          </CSelect>
                        )}
                      </div>

                      {(levelbox == 4 ||
                        levelbox == 5 ||
                        levelbox == 6 ||
                        levelbox == 7 ||
                        levelbox == 8) && (
                        <CInput
                          style={{ border: "1px solid #7582FF" }}
                          type="text"
                          value={infoText}
                          className="form-control"
                          aria-label="Text input with dropdown button"
                          placeholder="Please Enter Search Value"
                          onChange={infoTextChange}
                          onKeyDown={keyHandler}
                        />
                      )}
                      {(levelbox == 3 || levelbox == 1 || levelbox == 2) && (
                        <CSelect
                          onChange={skillNameSelectChange}
                         
                          value={`${skillNameSelectValue},${skillNameSelectName}`}
                          className="border-simple-style"
                        >
                          <option value="0">All</option>
                          {skillName != "" &&
                            skillName.map((data, index) => {
                              return (
                                <option
                                  key={index}
                                  value={`${data.subheading_id},${data.subheading_name}`}
                                >
                                  {data.subheading_name}
                                </option>
                              );
                            })}
                        </CSelect>
                      )}
                    </div>
                  </CCol>
                </CRow>
              </CCol>
              <CCol lg="6">
                {levelbox == 2 && (
                  <CRow>
                    <CCol lg="3">
                      {skillData != "" && (
                        <CSelect
                          onChange={skillSelectChange}
                        
                          value={skillSelectValue}
                          style={{ border: "1px solid #7582FF" }}
                        >
                          {" "}
                          <option value="0">All</option>
                          {skillData != "" &&
                            skillData.map((data, index) => {
                              return (
                                <option key={index} value={data.level_id}>
                                  {data.level}
                                </option>
                              );
                            })}
                        </CSelect>
                      )}
                    </CCol>
                  </CRow>
                )}
              </CCol>
            </CRow>
          )}
        </>
      )}
      <br></br>
      <CRow>
        <CCol lg="4"></CCol>
        <CCol lg="4" style={{ justifyContent: "center", display: "flex" }}>
          <CButton
            type="button"
            className="create-btn btn"
            style={{ height: "45px", width: "120px", marginBottom: "10px" }}
            onClick={searchClick}
          >
            <p className="pcontainer"> Search </p>
          </CButton>
          &nbsp;&nbsp;
          <>
            <CButton
              type="button"
              className="create-btn btn"
              style={{ marginBottom: "10px", width: "150px" , padding: "1px"}}
              onClick={excdownloadClick}
              onKeyDown={keyHandler}
            >
              <CImg src="./avatars/down.png" width={25} height={25}></CImg>{" "}
              Excel Download
            </CButton>
          </>
        </CCol>

        <CCol lg="4"></CCol>
      </CRow>
    </>
  );
};

export default AppListSearch;
