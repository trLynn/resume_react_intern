/**  Template first Layout Form
 *
 * @author Thu Ta
 *
 * @create 22/6/2022
 *
 */
import {
  CImg,
  CModal,
  CModalBody,
  CRow,
  CCol,
  CLabel,
  CInput,
  CSelect,
  CInputGroup,
  CInputRadio,
  CInputCheckbox,
} from "@coreui/react";
import React from "react";

const TemplateOne = (props) => {
  let temp = []; // temp array for only email, address, phone
  let nameTemp = ""; // temp for name value
  let { viewData, filterArray } = props;
  return (
    <>
      <CModal
        size="xl"
        centered
        onClose={props.cancel}
        closeOnBackdrop={false}
        show={props.show}
        style={{
          boxShadow: "rgb(0 0 0 / 25%) 0px 3px 7px",
          borderRadius: "unset",
        }}
      >
        <CModalBody className="p-0">
          <CImg
            className="cross-img cursorStyle"
            onClick={props.cancel}
            src="./avatars/close.png"
            width={33}
            height={33}
          ></CImg>
          <div className="templateOne text-white">
            <CRow className="ml-3 mr-3 p-3">
              <CCol
                lg="3"
                md="3"
                sm="3"
                xs="3"
                className="px-0 align-self-center"
              >
                <CImg
                  className="templateOne-responsive-img templateOne-profile"
                  src="./avatars/profile.jpg"
                  width={150}
                  height={150}
                ></CImg>
              </CCol>
              {viewData != "" &&
                viewData != "null" &&
                viewData.headings.map((data) => {
                  if (
                    data.heading_name.toLowerCase() == "name" ||
                    data.heading_name == "အမည်" ||
                    data.heading_name == "နာမည်"
                  ) {
                    nameTemp = data.heading_name;
                  }
                })}
              <CCol
                lg="4"
                md="4"
                sm="4"
                xs="4"
                className="px-0 align-self-center"
              >
                <CLabel className="name-font responsive-name-font">
                  {nameTemp}
                  {viewData != "" &&
                    viewData != "null" &&
                    viewData.headings.map((data, index) => {
                      if (
                        data.heading_name.toLowerCase() == "name" ||
                        data.heading_name == "အမည်" ||
                        data.heading_name == "နာမည်") {
                        return (
                          data.require_flag == "1" &&
                          <span key={index} style={{ color: "red" }}>
                            *
                          </span>

                        );
                      }
                    })}
                </CLabel>
              </CCol>
              {viewData != "" &&
                viewData != "null" &&
                viewData.headings.map((data) => {
                  if (
                    data.heading_name.toLowerCase().includes("email") ||
                    data.heading_name.toLowerCase().includes("phone") ||
                    data.heading_name.toLowerCase().includes("address") ||
                    data.heading_name.includes("ဖုန်း") ||
                    data.heading_name.includes("အီးမေး") ||
                    data.heading_name.includes("လိပ်စာ")
                  ) {
                    temp.push({
                      name: data.heading_name,
                      flag: data.require_flag,
                    });
                  }
                })}
              <CCol
                lg="5"
                md="5"
                sm="5"
                xs="5"
                className="px-0 align-self-center word-break"
              >
                {temp.length > 0 &&
                  temp.map((data, index) => {
                    return (
                      <div key={index}>
                        <CLabel className="mb-0 font-weight-bold">
                          {data.name}
                          {data.flag == "1" && (
                            <span style={{ color: "red" }}>*</span>
                          )}
                        </CLabel>
                        <CInput
                          className="borderRadius"
                          disabled="disabled"
                        ></CInput>
                      </div>
                    );
                  })}
              </CCol>
            </CRow>
          </div>
          <div className="ml-3 mr-3 p-3 templateOneTwo-font-color">
            {filterArray.length > 0 &&
              filterArray.map((data, index) => {
                return (
                  <div key={index}>
                    {data.type_id == "1" && (
                      <CRow className="mt-3 mb-4 word-break">
                        <CLabel className="subHeading">
                          {data.heading_name}
                          {data.require_flag == "1" && (
                            <span style={{ color: "red" }}>*</span>
                          )}
                        </CLabel>
                        <CSelect className="borderRadius cursorStyle">
                          <option>Select Your Data</option>
                          {data.subheadings.length > 0 &&
                            data.subheadings.map((data, index) => {
                              return (
                                <option key={index}>
                                  {data.subheading_name}
                                </option>
                              );
                            })}
                        </CSelect>
                      </CRow>
                    )}
                    {data.type_id == "2" && (
                      <div className="mb-4">
                        <CRow className="word-break">
                          <CLabel className="subHeading">
                            {data.heading_name}
                            {data.require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                        </CRow>
                        {data.levels.length > 0 &&
                          data.subheadings.map((subData, index) => {
                            return (
                              <CRow
                                key={index}
                                className="checkbox-style mb-2 align-items-center word-break"
                              >
                                <input disabled="disabled" type="checkbox" />
                                <CLabel className="checkLabel-one">
                                  {subData.subheading_name}
                                </CLabel>
                                <CSelect className="borderRadius cursorStyle">
                                  <option>Select Your Data</option>
                                  {data.levels.map((subData, index) => {
                                    return (
                                      <option key={index}>
                                        {subData.level_name}
                                      </option>
                                    );
                                  })}
                                </CSelect>
                              </CRow>
                            );
                          })}
                        {!(data.levels.length > 0) &&
                          <CRow className="pl-3 word-break">
                            {data.subheadings.map((subData, index) => {
                              return (
                                <CCol className="word-break" key={index} lg="4" md="4" sm="4" xs="6">
                                  <CInputCheckbox disabled="disabled" />
                                  <CLabel>{subData.subheading_name}</CLabel>
                                </CCol>
                              );
                            })}
                          </CRow>
                        }
                      </div>
                    )}
                    {data.type_id == "3" && (
                      <div className="mb-4">
                        <CRow className="word-break">
                          <CLabel className="subHeading">
                            {data.heading_name}
                            {data.require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                        </CRow>
                        <CRow className="pl-3 word-break">
                          {data.subheadings.length > 0 &&
                            data.subheadings.map((data, index) => {
                              return (
                                <CCol
                                  lg="4"
                                  md="4"
                                  sm="4"
                                  xs="4"
                                  className="word-break"
                                  key={index}
                                >
                                  <CInputRadio disabled="disabled" />
                                  {data.subheading_name}
                                </CCol>
                              );
                            })}
                        </CRow>
                      </div>
                    )}
                    {data.type_id == "4" &&
                      data.heading_name.toLowerCase() != "name" &&
                      data.heading_name != "အမည်" &&
                      data.heading_name != "နာမည်" &&
                      !data.heading_name.includes("ဖုန်း") &&
                      !data.heading_name.includes("အီးမေး") &&
                      !data.heading_name.includes("လိပ်စာ") &&
                      !data.heading_name.toLowerCase().includes("email") &&
                      !data.heading_name.toLowerCase().includes("phone") &&
                      !data.heading_name.toLowerCase().includes("address") && (
                        <CRow className="mb-4 word-break">
                          <CLabel className="subHeading">
                            {data.heading_name}
                            {data.require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                          <CInput
                            className="w-100 borderRadius"
                            disabled="disabled"
                          ></CInput>
                        </CRow>
                      )}
                    {data.type_id == "5" && (
                      <CRow className="mb-4 word-break">
                        <CLabel className="subHeading">
                          {data.heading_name}
                          {data.require_flag == "1" && (
                            <span style={{ color: "red" }}>*</span>
                          )}
                        </CLabel>
                        <textarea
                          className="w-100 borderRadius comment-box"
                          disabled="disabled"
                        ></textarea>
                      </CRow>
                    )}
                    {data.type_id == "6" && (
                      <CRow className="mb-4 word-break">
                        <CLabel className="subHeading">
                          {data.heading_name}
                          {data.require_flag == "1" && (
                            <span style={{ color: "red" }}>*</span>
                          )}
                        </CLabel>
                        <input
                          className="w-100 p-2 borderRadius"
                          disabled="disabled"
                          type="text"
                          placeholder="yyyy/mm/dd"
                        />
                      </CRow>
                    )}
                    {data.type_id == "7" && (
                      <CRow className="mb-4 word-break">
                        <CLabel className="subHeading">
                          {data.heading_name}
                          {data.require_flag == "1" && (
                            <span style={{ color: "red" }}>*</span>
                          )}
                        </CLabel>
                        <CInputGroup>
                          <CLabel className="attach" disabled="disabled">
                            Pick File
                          </CLabel>
                          <CInput
                            className="borderRadius"
                            placeholder="No File Chosen"
                            disabled="disabled"
                          />
                        </CInputGroup>
                      </CRow>
                    )}
                  </div>
                );
              })}
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export default TemplateOne;
