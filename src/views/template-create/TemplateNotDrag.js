/**
 * Template Not Drag(Update)
 * @author Thu Ta
 * @create 20/07/2022
 */
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  CCol,
  CRow,
  CLabel,
  CInput,
  CButton,
  CImg,
  CCard,
  CCardBody,
  CTextarea,
  CInputRadio,
  CInputGroup,
  CSelect,
  CInputCheckbox,
} from "@coreui/react";

const TemplateNotDrag = (props) => {
  let { data, remove, edit } = props;
  return (
    <>
      {data.map((data, index) => {
        return (
          <CRow key={index} style={{ marginTop: "30px" }}>
            <CCol lg="1"></CCol>
            <CCol lg="10">
              {data.type_id == 1 && (
                <CCard className="template-card ">
                  <CCardBody>
                    <CRow>
                      <CCol lg="6" sm="6" md="6" xs="6">
                        <CLabel className="userform-label" style={{ wordBreak: "break-all" }}>
                          {data.heading_name}
                          {data.require_flag == 1 && (
                            <span style={{ color: "red",fontSize: "20px",}}>*</span>
                          )}
                        </CLabel>
                      </CCol>
                      <CCol lg="2" sm="0" md="0" xs="0"></CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "end",marginBottom: "10px"}}>
                        <CButton className="btn-create" 
                          onClick={() => 
                          edit(data)}
                        >
                          <CImg className="info-add-img" style={{ marginBottom: "4px" }} src={"/image/Edit icon.svg"}/>
                          Edit
                        </CButton>
                      </CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "start",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => remove(data)}
                        >
                          <CImg className="info-add-img" style={{ marginBottom: "4px" }} src={"/image/trash.png"}/>
                          Delete
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="6" sm="12" xs="12" md="12">
                        <CRow key={index}>
                          <CCol>
                            <CSelect className="input-field ">
                              {data.subheadings.map((singleChoice, index) => {
                                return (
                                  <option key={index}>{singleChoice}</option>
                                );
                              })}
                            </CSelect>
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              )}
              {data.type_id == 2 && (
                <CCard className="template-card ">
                  <CCardBody>
                    <CRow>
                      <CCol lg="6">
                        <CLabel className="userform-label" style={{ wordBreak: "break-all" }}>
                          {data.heading_name}
                          {data.require_flag == 1 && (
                            <span style={{color: "red",fontSize: "20px", }}>*</span>
                          )}
                        </CLabel>
                      </CCol>
                      <CCol lg="2" sm="0" md="0" xs="0"></CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "end",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => edit(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/Edit icon.svg"}
                          />
                          Edit
                        </CButton>
                      </CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "start",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => remove(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/trash.png"}
                          />
                          Delete
                        </CButton>
                      </CCol>
                    </CRow>
                    {data.level.level_cat == 0 && 
                      <CRow className="ml-2" style={{ display: "flex" }}>
                        {data.subheadings.map((multiChoice, index) => {
                          return (
                            <CCol lg="2" key={index} className="radio-label">
                              <CInputCheckbox className="chk-style"/>
                              <CLabel style={{wordBreak: "break-word",paddingLeft:"5px"}}>
                                {multiChoice}
                              </CLabel>
                            </CCol>
                          );
                        })}
                      </CRow>}
                    {(data.level.level_cat == 1 || data.level.level_cat == 2 || data.level.level_cat == 3) &&
                      <>
                      {data.subheadings.map((multiChoice, index) => {
                        return (
                          <CRow key={index}>
                            <CCol lg="2" style={{ marginLeft: "20px" }}>
                              <CInputCheckbox className="chk-style"/>
                              <CLabel style={{wordBreak: "break-word",paddingLeft:"5px"}}>
                                {multiChoice}
                              </CLabel>
                            </CCol>
                            <CCol lg="3">
                              <CSelect style={{marginBottom: "5px"}} className="input-field ">
                                {(data.level.level_cat == 1 || data.level.level_cat == 2) &&
                                  data.level.level_data.map((data, index) => {
                                    return (
                                      <option key={index}>{data}</option>
                                    );
                                  })}
                                  {data.level.level_cat == 3 && (
                                    <>
                                      <option>Beginner</option>
                                      <option>Intermediate</option>
                                      <option>Advanced</option>
                                    </>
                                )}
                              </CSelect>
                            </CCol>
                          </CRow>
                        );
                      })} 
                    </> }
                  </CCardBody>
                </CCard>
              )}
              {data.type_id == 3 && (
                <CCard className="template-card ">
                  <CCardBody>
                    <CRow>
                      <CCol lg="6">
                        <CLabel className="userform-label" style={{wordBreak: "break-all" }}>
                          {data.heading_name}
                          {data.require_flag == 1 && (
                            <span style={{color: "red",fontSize: "20px"}}>*</span>
                          )}
                        </CLabel>
                      </CCol>
                      <CCol lg="2" sm="0" md="0" xs="0"></CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "end",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => edit(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/Edit icon.svg"}
                          />
                          Edit
                        </CButton>
                      </CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{ textAlign: "start",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => remove(data)}
                        >
                          <CImg
                            className="info-add-img "
                            style={{ marginBottom: "4px" }}
                            src={"/image/trash.png"}
                          />
                          Delete
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="ml-2" style={{ display: "flex" }}>
                      {data.subheadings.map((singleChoice, index) => {
                        return (
                          <CCol key={index} lg="2" className="radio-label">
                            <CInputRadio className="radio" />
                            <CLabel style={{wordBreak: "break-word"}}>
                              {singleChoice}
                            </CLabel>
                          </CCol>
                        );
                      })}
                    </CRow>
                  </CCardBody>
                </CCard>
              )}
              {data.type_id == 4 && (
                <CCard className="template-card ">
                  <CCardBody>
                    <CRow>
                      <CCol lg="6">
                        <CLabel className="userform-label" style={{ wordBreak: "break-all" }}>
                          {data.heading_name}
                          {data.require_flag == 1 && (
                            <span style={{ color: "red",fontSize: "20px"}}>*</span>
                          )}
                        </CLabel>
                      </CCol>
                      <CCol lg="2" sm="0" md="0" xs="0"></CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "end",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => edit(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/Edit icon.svg"}
                          />
                          Edit
                        </CButton>
                      </CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "start",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => remove(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/trash.png"}
                          />
                          Delete
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="6" sm="10" xs="11" md="10">
                        <CInput className="input-field " />
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              )}
              {data.type_id == 5 && (
                <CCard className="template-card ">
                  <CCardBody>
                    <CRow>
                      <CCol lg="6">
                        <CLabel className="userform-label" style={{ wordBreak: "break-all" }}>
                          {data.heading_name}
                          {data.require_flag == 1 && (
                            <span style={{color: "red",fontSize: "20px"}}>*</span>
                          )}
                        </CLabel>
                      </CCol>
                      <CCol lg="2" sm="0" md="0" xs="0"></CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "end",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => edit(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/Edit icon.svg"}
                          />
                          Edit
                        </CButton>
                      </CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "start",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => remove(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/trash.png"}
                          />
                          Delete
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="6" sm="10" xs="11" md="10">
                        <CTextarea className="input-field " />
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              )}
              {data.type_id == 6 && (
                <CCard className="template-card ">
                  <CCardBody>
                    <CRow>
                      <CCol lg="6">
                        <CLabel className="userform-label" style={{ wordBreak: "break-all" }}>
                          {data.heading_name}
                          {data.require_flag == 1 && (
                            <span style={{color: "red",fontSize: "20px"}}>*</span>
                          )}
                        </CLabel>
                      </CCol>
                      <CCol lg="2" sm="0" md="0" xs="0"></CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "end",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => edit(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/Edit icon.svg"}
                          />
                          Edit
                        </CButton>
                      </CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "start",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => remove(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/trash.png"}
                          />
                          Delete
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="6" sm="10" xs="11" md="10">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker style={{backgroundColor: "white",width:"100%",border: '1px solid #7582ff',borderRadius:"5px",overflow:"hidden"}}
                            placeholder="yyyy/mm/dd"
                            value={"yyyy/mm/dd"}
                            format="yyyy/MM/dd"
                            disabled
                            InputProps={{
                              readOnly:true,
                              disableUnderline: true,
                             }}
                          />
                        </MuiPickersUtilsProvider>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              )}
              {data.type_id == 7 && (
                <CCard className="template-card ">
                  <CCardBody>
                    <CRow>
                      <CCol lg="6">
                        <CLabel className="userform-label" style={{ wordBreak: "break-all"}}>
                          {data.heading_name}
                          {data.require_flag == 1 && (
                            <span style={{color: "red",fontSize: "20px"}}>*</span>
                          )}
                        </CLabel>
                      </CCol>
                      <CCol lg="2" sm="0" md="0" xs="0"></CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "end",marginBottom: "10px"}}
                      >
                        <CButton
                          className="btn-create"
                          onClick={() => edit(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/Edit icon.svg"}
                          />
                          Edit
                        </CButton>
                      </CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "start",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => remove(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/trash.png"}
                          />
                          Delete
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="6" sm="10" xs="11" md="10">
                        <CInputGroup className="mb-3">
                          <CLabel
                            className="userform-attach"
                            htmlFor="inputGroupFile02"
                          >
                            Pick File
                          </CLabel>
                          <CInput hidden type="file" id="inputGroupFile02" />
                          <CInput id="uploadFile" disabled="disabled" />
                        </CInputGroup>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              )}
              {data.type_id == 8 && (
                <CCard className="template-card ">
                  <CCardBody>
                    <CRow>
                      <CCol lg="6">
                        <CLabel className="userform-label" style={{wordBreak: "break-all"}}
                        >
                          {data.heading_name}
                          {data.require_flag == 1 && (
                            <span style={{color: "red",fontSize: "20px"}}>*</span>
                          )}
                        </CLabel>
                      </CCol>
                      <CCol lg="2" sm="0" md="0" xs="0"></CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "end",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => edit(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/Edit icon.svg"}
                          />
                          Edit
                        </CButton>
                      </CCol>
                      <CCol lg="2" sm="6" md="6" xs="6" style={{textAlign: "start",marginBottom: "10px"}}>
                        <CButton
                          className="btn-create"
                          onClick={() => remove(data)}
                        >
                          <CImg
                            className="info-add-img"
                            style={{ marginBottom: "4px" }}
                            src={"/image/trash.png"}
                          />
                          Delete
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol lg="6" sm="10" xs="11" md="10">
                        <CInputGroup>
                          <div className="circle-photo">Take Your Photo</div>
                          <div className="circle-camera">
                            <CImg
                              className="camera"
                              src={"/image/camera.png"}
                            />
                          </div>
                        </CInputGroup>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              )}
            </CCol>
            <CCol lg="1"></CCol>
          </CRow>
        );
      })}
    </>
  );
};

export default TemplateNotDrag;
