/**  Template Third Layout Form
 *
 * @author Thu Ta
 *
 * @create 22/6/2022
 *
 */
import {
  CCol,
  CImg,
  CModal,
  CModalBody,
  CRow,
  CLabel,
  CInput,
  CSelect,
  CInputGroup,
  CInputRadio,
  CInputCheckbox,
} from "@coreui/react";
import React from "react";

const TemplateTwo = (props) => {
  let temp = []; // array for only email, address and phone
  let result = []; //  array except [0] and [1] from filterArray
  let nameTemp = ""; // temp for name value
  let { viewData, filterArray } = props;
  return (
    <>
      {viewData != 0 && (
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
            <CRow className="ml-0 mr-0">
              <CCol lg="8" md="8" sm="8" xs="8" className="word-break">
                <div className="ml-3 mr-3 py-3 templateOneTwo-font-color">
                  {filterArray.length > 0 &&
                    filterArray.map((data, index) => {
                      if (index != "0" && index != "1") {
                        result.push(data);
                      }
                    })}
                  {result.length > 0 &&
                    result.map((data, index) => {
                      return (
                        <div key={index}>
                          {data.type_id == "1" && (
                            <CRow className="mt-3 mb-4">
                              <CLabel className="subHeading">
                                {data.heading_name}
                                {data.require_flag == "1" && (
                                  <span style={{ color: "red" }}>*</span>
                                )}
                              </CLabel>
                              {
                                <CSelect className="borderRadius cursorStyle">
                                  <option>Select Your Data</option>
                                  {data.subheadings.length > 0 &&
                                    data.subheadings.map((subData, index) => {
                                      return (
                                        <option key={index}>
                                          {subData.subheading_name}
                                        </option>
                                      );
                                    })}
                                </CSelect>
                              }
                            </CRow>
                          )}
                          {data.type_id == "2" && (
                            <div className="mb-4">
                              <CRow>
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
                                      className="checkbox-style mb-2 align-items-center checkbox-margin"
                                    >
                                      <input
                                        disabled="disabled"
                                        type="checkbox"
                                      />
                                      <CLabel className="checkLabel">
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
                                data.subheadings.length > 0 && (
                                  <CRow className="pl-3">
                                    {data.subheadings.map((subData, index) => {
                                      return (
                                        <CCol
                                          className="word-break"
                                          key={index}
                                          lg="4"
                                          md="4"
                                          sm="6"
                                        >
                                          <CInputCheckbox disabled="disabled" />
                                          <CLabel>
                                            {subData.subheading_name}
                                          </CLabel>
                                        </CCol>
                                      );
                                    })}
                                  </CRow>
                                )}
                            </div>
                          )}
                          {data.type_id == "3" && (
                            <div className="mb-4">
                              <CRow>
                                <CLabel className="subHeading">
                                  {data.heading_name}
                                  {data.require_flag == "1" && (
                                    <span style={{ color: "red" }}>*</span>
                                  )}
                                </CLabel>
                              </CRow>
                              <CRow className="pl-3">
                                {data.subheadings.map((subData, index) => {
                                  return (
                                    <CCol
                                      className="word-break"
                                      lg="4"
                                      md="4"
                                      sm="6"
                                      key={index}
                                    >
                                      <CInputRadio disabled="disabled" />
                                      {subData.subheading_name}
                                    </CCol>
                                  );
                                })}
                              </CRow>
                            </div>
                          )}
                          {data.type_id == "4" && (
                            <CRow className="mb-4">
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
                            <CRow className="mb-4">
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
                            <CRow className="mb-4">
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
                            <CRow className="mb-4">
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
              </CCol>
              <CCol
                lg="4"
                md="4"
                sm="4"
                xs="4"
                className="templateTwo word-break"
              >
                <div className="text-white">
                  <CRow alignHorizontal="center" className="p-3 ml-0 mr-0">
                    <CImg
                      className="profileImg responsive-img"
                      src="./avatars/profile.jpg"
                      width={150}
                      height={150}
                    ></CImg>
                  </CRow>
                  {viewData.headings.map((data) => {
                    if (
                      data.heading_name.toLowerCase() == "name" ||
                      data.heading_name == "အမည်" ||
                      data.heading_name == "နာမည်"
                    ) {
                      nameTemp = data.heading_name;
                    }
                  })}
                  <CRow className="mt-3" alignHorizontal="center">
                    <CLabel className="name-font text-center">
                      {nameTemp}
                      {viewData != 0 &&
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
                  </CRow>
                  {viewData.headings.map((data) => {
                    if (
                      data.heading_name.toLowerCase().includes("email") ||
                      data.heading_name.toLowerCase().includes("phone") ||
                      data.heading_name.toLowerCase().includes("address") ||
                      data.heading_name.includes("ဖုန်း") ||
                      data.heading_name.includes("အီးမေး") ||
                      data.heading_name.includes("လိပ်စာ")
                    ) {
                      temp.push(data.heading_name);
                    }
                  })}
                  {temp.length > 0 && (
                    <CRow>
                      <CLabel className="subHeading ml-3 mt-3">Contact</CLabel>
                    </CRow>
                  )}
                  {temp.length > 0 &&
                    temp.map((data, index) => {
                      return (
                        <CInput
                          key={index}
                          placeholder={data}
                          className="contact-input"
                          disabled="disabled"
                        ></CInput>
                      );
                    })}
                  {filterArray.length > 0 && (
                    <div className="mt-4 mb-4 ml-3 mr-3">
                      {filterArray[0].type_id == "1" && (
                        <CRow>
                          <CLabel className="subHeading">
                            {filterArray[0].heading_name}
                            {filterArray[0].require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                          {
                            <CSelect className="borderRadius cursorStyle">
                              <option>Select Your Data</option>
                              {filterArray[0].subheadings.length > 0 &&
                                filterArray[0].subheadings.map(
                                  (data, index) => {
                                    return (
                                      <option key={index}>
                                        {data.subheading_name}
                                      </option>
                                    );
                                  }
                                )}
                            </CSelect>
                          }
                        </CRow>
                      )}
                      {filterArray[0].type_id == "2" && (
                        <div className="mb-4">
                          <CRow>
                            <CLabel className="subHeading">
                              {filterArray[0].heading_name}
                              {filterArray[0].require_flag == "1" && (
                                <span style={{ color: "red" }}>*</span>
                              )}
                            </CLabel>
                          </CRow>
                          {filterArray[0].levels.length > 0 &&
                            filterArray[0].subheadings.map((subData, index) => {
                              return (
                                <CRow
                                  key={index}
                                  className="checkbox-style mb-2 align-items-center checkbox-margin"
                                >
                                  <input disabled="disabled" type="checkbox" />
                                  <CLabel className="checkLabel">
                                    {subData.subheading_name}
                                  </CLabel>
                                    <CSelect className="borderRadius cursorStyle">
                                      <option>Select Your Level</option>
                                      {filterArray[0].levels.map(
                                        (subData, index) => {
                                          return (
                                            <option key={index}>
                                              {subData.level_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </CSelect>
                                </CRow>
                              );
                            })}
                          {!(filterArray[0].levels.length > 0) &&
                            filterArray[0].subheadings.length > 0 && (
                              <CRow className="pl-3">
                                {filterArray[0].subheadings.map(
                                  (subData, index) => {
                                    return (
                                      <CCol
                                        className="word-break"
                                        key={index}
                                        lg="6"
                                      >
                                        <CInputCheckbox disabled="disabled" />
                                        <CLabel>
                                          {subData.subheading_name}
                                        </CLabel>
                                      </CCol>
                                    );
                                  }
                                )}
                              </CRow>
                            )}
                        </div>
                      )}
                      {filterArray[0].type_id == "3" && (
                        <div className="mb-4">
                          <CRow>
                            <CLabel className="subHeading">
                              {filterArray[0].heading_name}
                              {filterArray[0].require_flag == "1" && (
                                <span style={{ color: "red" }}>*</span>
                              )}
                            </CLabel>
                          </CRow>
                          <CRow className="pl-3">
                            {filterArray[0].subheadings.map(
                              (subData, index) => {
                                return (
                                  <CCol
                                    className="word-break"
                                    lg="6"
                                    key={index}
                                  >
                                    <CInputRadio disabled="disabled" />
                                    {subData.subheading_name}
                                  </CCol>
                                );
                              }
                            )}
                          </CRow>
                        </div>
                      )}
                      {filterArray[0].type_id == "4" && (
                        <CRow className="mb-4">
                          <CLabel className="subHeading">
                            {filterArray[0].heading_name}
                            {filterArray[0].require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                          <CInput
                            className="w-100 borderRadius"
                            disabled="disabled"
                          ></CInput>
                        </CRow>
                      )}
                      {filterArray[0].type_id == "5" && (
                        <CRow className="mb-4">
                          <CLabel className="subHeading">
                            {filterArray[0].heading_name}
                            {filterArray[0].require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                          <textarea
                            className="w-100 borderRadius comment-box"
                            disabled="disabled"
                          ></textarea>
                        </CRow>
                      )}
                      {filterArray[0].type_id == "6" && (
                        <CRow className="mb-4">
                          <CLabel className="subHeading">
                            {filterArray[0].heading_name}
                            {filterArray[0].require_flag == "1" && (
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
                      {filterArray[0].type_id == "7" && (
                        <CRow className="mb-4">
                          <CLabel className="subHeading">
                            {filterArray[0].heading_name}
                            {filterArray[0].require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                          <CInputGroup>
                            <CLabel
                              className="attach"
                              htmlFor="inputGroupFile02"
                              disabled="disabled"
                            >
                              Pick File
                            </CLabel>
                            <CInput
                              className="borderRadius"
                              id="uploadFile"
                              placeholder="No File Chosen"
                              disabled="disabled"
                            />
                          </CInputGroup>
                        </CRow>
                      )}
                    </div>
                  )}
                  {filterArray.length > 1 && (
                    <div className="ml-3 mr-3 mb-4">
                      {filterArray[1].type_id == "1" && (
                        <CRow className="mt-3 mb-4">
                          <CLabel className="subHeading">
                            {filterArray[1].heading_name}
                            {filterArray[1].require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                          {
                            <CSelect className="borderRadius cursorStyle">
                              <option>Select Your Data</option>
                              {filterArray[1].subheadings.length > 0 &&
                                filterArray[1].subheadings.map(
                                  (data, index) => {
                                    return (
                                      <option key={index}>
                                        {data.subheading_name}
                                      </option>
                                    );
                                  }
                                )}
                            </CSelect>
                          }
                        </CRow>
                      )}
                      {filterArray[1].type_id == "2" && (
                        <div className="mb-4">
                          <CRow>
                            <CLabel className="subHeading">
                              {filterArray[1].heading_name}
                              {filterArray[1].require_flag == "1" && (
                                <span style={{ color: "red" }}>*</span>
                              )}
                            </CLabel>
                          </CRow>
                          {filterArray[1].levels.length > 0 &&
                            filterArray[1].subheadings.map((subData, index) => {
                              return (
                                <CRow
                                  key={index}
                                  className="checkbox-style mb-2 align-items-center checkbox-margin"
                                >
                                  <input disabled="disabled" type="checkbox" />
                                  <CLabel className="checkLabel">
                                    {subData.subheading_name}
                                  </CLabel>
                                    <CSelect className="borderRadius cursorStyle">
                                      <option>Select Your Level</option>
                                      {filterArray[1].levels.map(
                                        (subData, index) => {
                                          return (
                                            <option key={index}>
                                              {subData.level_name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </CSelect>
                                </CRow>
                              );
                            })}
                          {!(filterArray[1].levels.length > 0) &&
                            filterArray[1].subheadings.length > 0 && (
                              <CRow className="pl-3">
                                {filterArray[1].subheadings.map(
                                  (subData, index) => {
                                    return (
                                      <CCol
                                        className="word-break"
                                        key={index}
                                        lg="6"
                                      >
                                        <CInputCheckbox disabled="disabled" />
                                        <CLabel>
                                          {subData.subheading_name}
                                        </CLabel>
                                      </CCol>
                                    );
                                  }
                                )}
                              </CRow>
                            )}
                        </div>
                      )}
                      {filterArray[1].type_id == "3" && (
                        <div className="mb-4">
                          <CRow>
                            <CLabel className="subHeading">
                              {filterArray[1].heading_name}
                              {filterArray[1].require_flag == "1" && (
                                <span style={{ color: "red" }}>*</span>
                              )}
                            </CLabel>
                          </CRow>
                          <CRow className="pl-3">
                            {filterArray[1].subheadings.map(
                              (subData, index) => {
                                return (
                                  <CCol
                                    className="word-break"
                                    lg="6"
                                    key={index}
                                  >
                                    <CInputRadio disabled="disabled" />
                                    {subData.subheading_name}
                                  </CCol>
                                );
                              }
                            )}
                          </CRow>
                        </div>
                      )}
                      {filterArray[1].type_id == "4" && (
                        <CRow className="mb-4">
                          <CLabel className="subHeading">
                            {filterArray[1].heading_name}
                            {filterArray[1].require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                          <CInput
                            className="w-100 borderRadius"
                            disabled="disabled"
                          ></CInput>
                        </CRow>
                      )}
                      {filterArray[1].type_id == "5" && (
                        <CRow className="mb-4">
                          <CLabel className="subHeading">
                            {filterArray[1].heading_name}
                            {filterArray[1].require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                          <textarea
                            className="w-100 borderRadius comment-box"
                            disabled="disabled"
                          ></textarea>
                        </CRow>
                      )}
                      {filterArray[1].type_id == "6" && (
                        <CRow className="mb-4">
                          <CLabel className="subHeading">
                            {filterArray[1].heading_name}
                            {filterArray[1].require_flag == "1" && (
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
                      {filterArray[1].type_id == "7" && (
                        <CRow className="mb-4">
                          <CLabel className="subHeading">
                            {filterArray[1].heading_name}
                            {filterArray[1].require_flag == "1" && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </CLabel>
                          <CInputGroup>
                            <CLabel
                              className="attach"
                              htmlFor="inputGroupFile02"
                              disabled="disabled"
                            >
                              Pick File
                            </CLabel>
                            <CInput
                              className="borderRadius"
                              id="uploadFile"
                              placeholder="No File Chosen"
                              disabled="disabled"
                            />
                          </CInputGroup>
                        </CRow>
                      )}
                    </div>
                  )}
                </div>
              </CCol>
            </CRow>
          </CModalBody>
        </CModal>
      )}
    </>
  );
};

export default TemplateTwo;
