/**  User Form Design
 *
 * @author Thu Rein Lynn
 *
 * @create 20/6/2022
 *
 */
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CImg,
  CInput,
  CInputRadio,
  CLabel,
  CRow,
  CSelect,
  CTextarea,
  CInputCheckbox,
  CInputGroup,
} from "@coreui/react";
import { KeyboardDatePicker ,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import UserSuccessError from "./UserSuccessError";
import React from "react";
import moment from "moment";
import $ from "jquery";

const UserForm = (props) => {
  const {
    value,
    typeIDFourChange,
    image,
    imagepreviewurl,
    Clear,
    filename,
    DownloadCheck,
    SaveData,
    typeIDTwoChange,
    typeIDTwoDropDownChange,
    typeIDOneDropDownChange,
    typeIDThreeChange,
    typeIDFiveChange,
    typeIDSixChange,
    typeIDSevenChange,
    typeIDEightChange,
    checked,
    editstatus,
    status,
    heading,
    success,
    error,
    templatename,
    ClearImage,
    clearFile,
    // ImageClear
  } = props;
  // const inputFile =()=>{
  //   $( "#inputGroupFile02" ).click();
  // }
  return (
    <>
      <CRow style={{margin:"0px",padding:'0px'}}>
        <CCol lg="2" md="2" xs="1" sm="1"></CCol>
        <CCol lg="8" md="8" xs="10" sm="10">
          {heading.length > 0 && (
            <>
             <UserSuccessError success={success} error={error} />
            <h3 style={{ wordBreak: "break-all", textAlign: "center", fontWeight: "bold", marginTop: "40px", marginBottom: "20px",}}>
              {templatename}
            </h3>
            </>
          )}
          {heading.length > 0 &&
            heading.map((data, idx) => {
              return (
                <div key={idx}>
                  {data.type_id == 1 && (
                    <CCard className="userform-card">
                      <CCardBody>
                        <CRow>
                          <CCol lg="6" sm="6" md="6" xs="6">
                            <CLabel className="userform-label">
                              {data.heading_name}
                              {data.require_flag == 1 && (
                                <span style={{ color: "red", fontSize: "20px" }}> * </span>
                              )}
                            </CLabel>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol lg="6" sm="12" xs="12" md="12">
                            <CSelect
                              className="userform-select input-field"
                              onChange={(e) => typeIDOneDropDownChange(data.heading_id, e)}
                              value={value[idx]["value"]}
                              >
                              <option value="">...Select....</option>
                              {data.subheadings.map((singleChoice, index) => {
                                return (
                                  <option
                                    style={{ backgroundColor: "#e6e8ff" }}
                                    key={index}
                                  >
                                    {singleChoice.subheading_name}
                                  </option>
                                );
                              })}
                            </CSelect>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  )}
                 {data.type_id == 2 &&  <>
                    <CCard className="userform-card">
                        <CCardBody>
                        <CRow>
                          <CCol lg="6">
                            <CLabel className="userform-label">
                              {data.heading_name}
                              {data.require_flag == 1 && (
                                <span style={{ color: "red", fontSize: "20px" }}>*</span>
                              )}
                            </CLabel>
                          </CCol>
                        </CRow>
                        {data.levels.length < 1 && 
                         <CRow className="ml-4" style={{ display: "flex" }}>
                            {data.subheadings.map((multiChoice, index) => {
                            let level_id = "";
                            let filtered = value[idx]["value"].filter(item => {
                            return item.subheading_id === multiChoice.subheading_id;
                            })
                            if(filtered.length > 0) {
                            level_id = filtered[0].level_id;
                            }
                          return (
                            <CCol lg="2" key={index} className="radio-label"> 
                             <CLabel className="RadioLabel" style={{wordBreak: "break-word",paddingLeft:'5px',paddingTop:'3px'}}>
                             <CInputCheckbox 
                                value={multiChoice.subheading_id}
                                checked={value[idx]["value"].some(e => e.subheading_id === multiChoice.subheading_id && e.check)}
                                style={{ width: "15px", height: "15px", accentColor:"#818ce1" ,cursor: "pointer"}}
                                onChange={(e) =>typeIDTwoChange( data.heading_id, multiChoice.subheading_id)}
                              />
                                {multiChoice.subheading_name}
                              </CLabel>
                            </CCol>
                          );
                        })}
                         </CRow>
                        }
                        {data.levels.length >0 &&  <>
                         {data.subheadings.map((multiChoice,index)=>{
                             let level_id = "";
                             let filtered = value[idx]["value"].filter(item => {
                             return item.subheading_id === multiChoice.subheading_id;
                             })
                             if(filtered.length > 0) {
                             level_id = filtered[0].level_id;
                             }
                            return(
                                <CRow key={index}>
                                <CCol lg="2" style={{ marginLeft: "20px" }}>    
                               
                                <CLabel className="RadioLabel" style={{wordBreak: "break-word",paddingLeft:'5px',paddingTop:'3px'}}> 
                                <CInputCheckbox
                                     value={multiChoice.subheading_id}
                                     checked={value[idx]["value"].some(e => e.subheading_id === multiChoice.subheading_id && e.check)}
                                     style={{ width: "15px", height: "15px" ,accentColor:"#818ce1",cursor:'pointer'}}
                                     onChange={(e) =>typeIDTwoChange(data.heading_id,multiChoice.subheading_id)} 
                                  /> 
                                    {multiChoice.subheading_name}
                                  </CLabel>
                                </CCol>
                                <CCol lg="3">
                                <CSelect
                                      className="userform-select input-field"
                                      value={level_id}
                                      style={{ marginBottom: "10px" }}
                                      onChange={(e) =>typeIDTwoDropDownChange(data.heading_id,multiChoice.subheading_id,e)}       
                                    >
                                      <option
                                        key={index}
                                        value=""
                                        name=""
                                      >
                                        ---Select---
                                      </option>
                                      {data.levels.map((levelid, index) => {
                                        return (
                                          <option
                                            style={{
                                              backgroundColor: "#e6e8ff",
                                            }}
                                            key={index}
                                            value={levelid.level_id}
                                            name={levelid.level_id}
                                          >
                                            {levelid.level_name}
                                          </option>
                                        );
                                      })}
                                    </CSelect>
                                </CCol>
                            </CRow>
                            )
                         })}
                         </>
                         }
                        </CCardBody>
                    </CCard>
                  </>}
                  {data.type_id == 3 && (
                    <CCard className="userform-card">
                      <CCardBody>
                        <CRow>
                          <CCol lg="12">
                            <CLabel className="userform-label">
                              {data.heading_name}
                              {data.require_flag == 1 && (
                                <span style={{ color: "red", fontSize: "20px" }}>*</span>
                              )}
                            </CLabel>
                          </CCol>
                        </CRow>
                        <CRow>
                            {data.subheadings.map((singleChoice, index) => {
                              return (
                                <CCol className="radio-label" lg='2' key={index} style={{ marginLeft: "25px" }}>
                                  <CLabel  style={{ wordBreak: "break-all" }}>
                                    <CInputRadio
                                    style={{cursor:'pointer'}}
                                      value={singleChoice.subheading_name}
                                      className="Radio"
                                      name={singleChoice.subheading_name}
                                      checked={value[idx]['value'] == singleChoice.subheading_name? true: false }
                                      onChange={(e) =>typeIDThreeChange(data.heading_id,e.target.value,e.target.name)}
                                    />
                                    {singleChoice.subheading_name}
                                  </CLabel>
                                  <br />
                                </CCol>
                              );
                            })}
                        </CRow>
                      </CCardBody>
                    </CCard>
                  )}
                  {data.type_id == 4 && (
                    <CCard className="userform-card">
                      <CCardBody>
                        <CRow>
                          <CCol lg="6">
                            <CLabel className="userform-label">
                              {data.heading_name}
                              {data.require_flag == 1 && (
                                <span style={{ color: "red", fontSize: "20px" }}>*</span>
                              )}
                            </CLabel>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol lg="6" sm="10" xs="11" md="10">
                            <CInput
                              id={data.heading_id}
                              className="input-field"
                              value={value[idx]["value"]}
                              onChange={(e) =>typeIDFourChange(data.heading_id, e)}
                            />
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  )}
                  {data.type_id == 5 && (
                    <CCard className="userform-card">
                      <CCardBody>
                        <CRow>
                          <CCol lg="6">
                            <CLabel className="userform-label">
                              {data.heading_name}
                              {data.require_flag == 1 && (
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  *
                                </span>
                              )}
                            </CLabel>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol lg="6" sm="10" xs="11" md="10">
                            <>
                              <CTextarea
                                value={value[idx]["value"]}
                                onChange={(e) =>
                                  typeIDFiveChange(data.heading_id, e)
                                }
                                className="userform-textarea"
                              />
                            </>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  )}
                  {data.type_id == 6 && (
                    <CCard className="userform-card">
                      <CCardBody>
                        <CRow>
                          <CCol lg="6">
                            <CLabel className="userform-label">
                              {data.heading_name}
                              {data.require_flag == 1 && (
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  *
                                </span>
                              )}
                            </CLabel>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol lg="6" sm="10" xs="11" md="10">
                              <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                InputProps={{
                                  readOnly:true,
                                  disableUnderline: true,
                                 }}
                                // allowKeyboardControl={false}
                                clearable
                                //defaultValue={null}
                                placeholder="yyyy/mm/dd"
                                value={value[idx]["value"]== "" || value[idx]["value"]== null  ?null:value[idx]["value"]}
                                style={{backgroundColor:"White",border: '1px solid #7582ff',width:"100%",borderRadius:"5px",overflow:"hidden"}}
                                onChange={(e) =>typeIDSixChange(data.heading_id,e)}
                                format="yyyy/MM/dd"
                              />   
                              </MuiPickersUtilsProvider>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  )}
                  {data.type_id == 7 && (
                    <CCard className="userform-card">
                      <CCardBody>
                        <CRow>
                          <CCol lg="6">
                            <CLabel className="userform-label">
                              {data.heading_name}
                              {data.require_flag == 1 && (
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  *
                                </span>
                              )}
                            </CLabel>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol lg="6" sm="10" xs="11" md="10">
                            <CInputGroup className="mb-3"
                             //onClick={inputFile}
                             >
                              <CLabel
                                className="userform-attach"
                                htmlFor="inputGroupFile02"
                              >
                                Pick File
                              </CLabel>
                              <CInput
                               style={{border: '1px solid #7582ff'}}
                              // id={data.heading_id}
                              disabled
                            />
                            </CInputGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol lg="12">
                            <CInput  
                              className="input-field"
                              hidden
                              accept=".pdf,.xlsx"
                              // value={value[idx]["value"][index].name}
                              type="file"
                              id="inputGroupFile02"
                              onChange={(e) =>
                                typeIDSevenChange(data.heading_id, e)
                              }
                              onClick={(e)=>clearFile(data.heading_id, e)}
                            />
                          </CCol>
                        </CRow>  
                         {filename.map((file, index) => {
                          return (
                            <CRow style={{ marginBottom: "20px" }} key={index}>
                              <CCol lg="6" sm='10' md='6' xs='10'>
                                <ul>
                                  <li>{file}</li>
                                </ul>
                              </CCol>
                              <CCol lg="1" sm='2' md='1' xs='1'>
                                <CButton
                                style={{padding:'0px'}} 
                                 onClick={() => Clear(file ,data.heading_id)}>
                                  <CImg
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50px",
                                    }}
                                    src="/avatars/crossblack.png"
                                  />
                                </CButton>
                                
                              </CCol>
                            </CRow>
                          );
                        })
                        }
                      </CCardBody>
                    </CCard>
                  )}
                  {data.type_id == 8 && (
                    <CCard className="userform-card">
                      <CCardBody>
                        <CRow>
                          <CCol lg="6">
                            <CLabel className="userform-label">
                              {data.heading_name}
                              {data.require_flag == 1 && (
                                <span
                                  style={{ color: "red", fontSize: "20px" }}
                                >
                                  *
                                </span>
                              )}
                            </CLabel>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol lg="2" sm="6" xs="6" md="6">
                            <>
                              <CInputGroup>
                                <CLabel htmlFor="photo-upload">
                                  <CImg
                                    className="circle-photo"
                                    id="photo-upload-id"
                                    htmlFor="photo-upload"
                                    src={imagepreviewurl}
                                    value={image}
                                  />
                                </CLabel>
                                <div className="circle-camera">
                                  <CImg
                                    className="camera"
                                    id="photo-upload-id"
                                    value={image}
                                    src="/image/camera.png"
                                  />
                                  <input
                                    id="photo-upload"
                                    htmlFor="photo-upload-id"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    hidden
                                    onChange={(e) =>
                                      typeIDEightChange(data.heading_id, e)
                                    }
                                  />
                                  {value[idx]["value"] &&  <CButton className="image-remove" onClick={(e) => ClearImage(data.heading_id,e)}>Remove</CButton>
                                  }
                                </div>
                              </CInputGroup>
                            </>
                          </CCol>
                        </CRow>
                      </CCardBody>
                    </CCard>
                  )}
                </div>
              );
            })}
        </CCol>
        <CCol lg="2" md="2" sm="1" xs="1"></CCol>
      </CRow>
      {heading.length > 0 && (
        <CRow style={{ marginBottom: "30px" }}>
          <CCol lg="2" sm="1" md="2" xs="1"></CCol>
          <CCol lg="8" sm="10" md="8" xs="10" style={{ textAlign: "right" }}>
            {editstatus &&  status== 1&&(
              <>
               <CInputCheckbox
                onChange={DownloadCheck}
                //value={checked}
                checked={checked}
                className="userform-label"
                style={{
                  cursor: "pointer",
                  width: "17px",
                  height: "17px",
                  accentColor: "#818ce1",
                }}
              />
              <CLabel className="userform-downloadbtn">    
              Download Resume
            </CLabel>
              <CButton className="userform-btn" onClick={SaveData}>
                Update
              </CButton>
              </>
            )}
              {editstatus && status == 2 &&(
                <>
                 <CInputCheckbox
                disabled
                onChange={DownloadCheck}
                checked={checked.is_checked}
                className="userform-label"
                style={{
                  cursor:"not-allowed",
                  width: "17px",
                  height: "17px",
                  accentColor: "#818ce1",
                }}
              />
              <CLabel className="userform-downloadbtn">
              Download Resume
            </CLabel>
              <CButton style={{cursor:"not-allowed"}} disabled className="userform-btn" onClick={SaveData}>
                Update
              </CButton>
              </>
            )}
             {editstatus && status == 3 &&(
                <>
                  <CInputCheckbox
              disabled
              onChange={DownloadCheck}
              checked={checked.is_checked}
              className="userform-label"
              style={{
                cursor:"not-allowed",
                width: "17px",
                height: "17px",
                accentColor: "#818ce1",
              }}
            />
          <CLabel className="userform-downloadbtn">
            Download Resume
          </CLabel>
            <CButton style={{cursor:"not-allowed"}} disabled className="userform-btn" onClick={SaveData}>
              Update
            </CButton>
            </>
            )}
             {editstatus && status == 4 &&(
                 <>
                  <CInputCheckbox
               disabled
               onChange={DownloadCheck}
               checked={checked.is_checked}
               className="userform-label"
               style={{
                cursor:"not-allowed",
                 width: "17px",
                 height: "17px",
                 accentColor: "#818ce1",
               }}
             />
          <CLabel className="userform-downloadbtn">  
             Download Resume
           </CLabel>
             <CButton style={{cursor:"not-allowed"}} disabled className="userform-btn" onClick={SaveData}>
               Update
             </CButton>
             </>
            )}
          {editstatus && status == 5 &&(
          <>
           <CInputCheckbox
              disabled
              onChange={DownloadCheck}
              checked={checked.is_checked}
              className="userform-label"
              style={{
                cursor:"not-allowed",
                width: "17px",
                height: "17px",
                accentColor: "#818ce1",
              }}
            />
           <CLabel className="userform-downloadbtn">
            Download Resume
          </CLabel>
            <CButton style={{cursor:"not-allowed"}} disabled className="userform-btn" onClick={SaveData}>
              Update
            </CButton>
            </>
            )}
            {!editstatus && (
              <>    
            <CInputCheckbox
                onChange={DownloadCheck}
                checked={checked}
                className="userform-label"
                style={{
                  cursor: "pointer",
                  width: "17px",
                  height: "17px",
                  accentColor: "#818ce1",
                }}
              />
            <CLabel  className='userform-downloadbtn'>
              Download Resume
            </CLabel>
              <CButton className="userform-btn" onClick={SaveData}>
                Save
              </CButton>
              </>
            )}
          </CCol>
          <CCol lg="2" sm="1" md="2" xs="1"></CCol>
        </CRow>
      )}
    </>
  );
};
export default UserForm;
