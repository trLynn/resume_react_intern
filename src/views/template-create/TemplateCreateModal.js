/**
 * Template Registration
 * @author Thu Ta
 * @create 20/06/2022
 */
import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CButtonToolbar,
  CRow,
  CCol,
  CLabel,
  CInput,
  CInputCheckbox,
  CSelect,
  CImg,
  CInputRadio,
} from "@coreui/react";
import SuccessError from "../common/SuccessError";
const TemplateCreateModal = (props) => {
  let {
    templateCreateModalCloseBtn,
    show,
    checked,
    checkRequire,
    label,
    handleChangeLabel,
    selectField,
    selectTypeValue,
    selectTypeOnChange,
    error,
    clickAddField,
    multiChooseField,
    subLabelChange,
    deleteFieldClick,
    levelRadio,
    clickLevel,
    levelId,
    handleChangeNumber,
    selectNumber,
    showNum,
    showCharacter,
    editStatus,
    commonAddUpdate,
    subError,
    levelNumError
  } = props;
  if(error.length > 0 && subError.length === 0 && levelNumError.length === 0){
    let element = document.getElementById("advanced");
    element.scrollIntoView({behavior: "smooth", block: "start"});
  }
  return (
    <>
      <CModal
        size="xl"
        centered
        closeOnBackdrop={false}
        show={show}
        id="advanced"
        onClose={templateCreateModalCloseBtn}
      >
        <CModalBody style={{marginBottom:"30px"}}>
          <CRow style={{marginBottom:"30px"}}>
            <CCol lg="12" style={{width:"100%"}}><SuccessError error={error} /></CCol>
          </CRow>
          <CRow id="approver-modal" lg="12" style={{marginBottom: "10px"}}>
            <CCol lg="1"></CCol>
            <CCol lg="3">
              <CLabel style={{ fontSize: "15px" }}>
                Template Field Label
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </CLabel>
            </CCol>
            <CCol lg="4" sm="10" xs="10" md="10" >
              <CInput
                autoFocus="focus"
                className="input-field"
                placeholder="Enter Template Field Label"
                type="text"
                value={label}
                onChange={(e) => handleChangeLabel(e)}
              />
            </CCol>
            <CCol lg="2" style={{ marginLeft: "1.5rem" }}>
              <CInputCheckbox
                className="chk-style"
                onChange={checkRequire}
                checked ={checked? false : true}
                id="check_req"
              />
              <CLabel style={{ color: "red" }} htmlFor="check_req">Is this field required?</CLabel>
            </CCol>
          </CRow>
          <CRow id="approver-modal" lg="12">
            <CCol lg="1"></CCol>
            <CCol lg="3" >
              <CLabel style={{ fontSize: "15px" }}>
                Template Field Label Type
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </CLabel>
            </CCol>
            <CCol lg="4" sm="10" xs="10" md="10">
              <CSelect
                className="input-field"
                value={selectTypeValue}
                onChange={selectTypeOnChange}
              >
                <option value="">---Select Template Field Label Type---</option>
                {selectField.map((data, index) => {
                  return (
                    <option key={index} id={data.id} value={data.id}>
                      {data.name}
                    </option>
                  );
                })}
              </CSelect>
            </CCol>
          </CRow>
          {selectTypeValue == 1 && (
            <>
              <CRow className="divide-div">
                <CCol lg="4" sm="0" md="0" xs="0"></CCol>
                <CCol lg="2" sm="6" md="5" xs="8">
                  <CLabel>Add Field</CLabel>
                </CCol>
                <CCol lg="1" sm="1" md="1" xs="1" style={{marginLeft:"-5.5rem"}}>
                  <CImg
                    className="add-field-img"
                    src={"/image/plus-icon.png"}
                    onClick={clickAddField}
                  />
                </CCol>
              </CRow>
              {multiChooseField.map((data, index) => {
                return (
                  <CRow key={index}>
                    <CCol lg="4" sm="0" xs="0" md="0"></CCol>
                    <CCol lg="4" sm="8" xs="8" md="8">
                      <CInput
                        className="input-field sub-div"
                        placeholder="Enter Add Field Label"
                        type="text"
                        id={data.id}
                        value={data.value}
                        onChange={(e) => subLabelChange(e, data.id)}
                      />
                      {subError.map((d,i)=>{
                        return(
                          data.id == d.id && 
                          <span key={i} style={{color:"red"}}>{d.value}</span>
                        )
                      })}
                    </CCol>
                    <CCol lg="1" xs="1" md="1" sm="1" className="minus-div">
                      <CImg
                        className="delete-field-img"
                        src={"/image/minus.png"}
                        onClick={()=>deleteFieldClick(data.id)}
                      />
                    </CCol>
                  </CRow>
                );
              })}
            </>
          )}
          {selectTypeValue == 2 && (
            <>
               <CRow className="divide-div">
                <CCol lg="4" sm="0" md="0" xs="0"></CCol>
                <CCol lg="2" sm="6" md="5" xs="8">
                  <CLabel>Add Field</CLabel>
                </CCol>
                <CCol lg="1" sm="1" md="1" xs="1" style={{marginLeft:"-5.5rem"}}>
                  <CImg
                    className="add-field-img"
                    src={"/image/plus-icon.png"}
                    onClick={clickAddField}
                  />
                </CCol>
              </CRow>
              {multiChooseField.map((data, index) => {
                return (
                  <CRow key={index}>
                    <CCol lg="3" xs="0" sm="0" md="0"></CCol>
                    <CCol lg="1" xs="1" sm="1" md="1" className="minus-div" style={{textAlign:"end"}} >
                      <input type="checkbox" className="chk-style"/>
                    </CCol>
                    <CCol lg="4" sm="8" xs="8" md="8">
                      <CInput
                        className="input-field sub-div"
                        placeholder="Enter Add Field Label"
                        type="text"
                        id={data.id}
                        value={data.value}
                        onChange={(e) => subLabelChange(e, data.id)}
                      />
                     {subError.map((d,i)=>{
                        return(
                          data.id == d.id && 
                          <span key={i} style={{color:"red"}}>{d.value}</span>
                        )
                      })}
                    </CCol>
                    <CCol lg="1" sm="1" xs="1" md="1" className="minus-div">
                      <CImg
                        className="delete-field-img"
                        src={"/image/minus.png"}
                        onClick={()=>deleteFieldClick(data.id)}
                      />
                    </CCol>
                  </CRow>
                );
              })}
                <div style={{marginTop:"30px"}}>
                  {levelRadio.map((data, index) => {
                    return (
                        <CRow key={index} className="radio-label" style={{marginBottom:"20px"}} >
                          <CCol lg="4" ></CCol>
                          <CCol lg="3" sm="6" xs="5" md="6" style={{marginLeft:"2.5rem"}}>
                          <CInputRadio
                            id={`radio${index}`}
                            className="radio"
                            name={data.name}
                            value={data.id}
                            onChange={() => clickLevel(data)}
                            checked={levelId == data.id ? true : false}
                          />
                          <CLabel htmlFor={`radio${index}`} >{data.name}</CLabel>
                          </CCol>
                          {(data.id == 1 && showCharacter==true) && (
                            <>
                              <CCol lg="1" sm="3" xs="5" md="3" style={{marginRight:"-1rem"}}>
                                <CInput className="input-field"
                                  maxLength="2"
                                  type="text"
                                  value={selectNumber}
                                  onChange={(e) => handleChangeNumber(e)}
                                  style={{textAlign:"center"}}
                                />
                              </CCol>
                              <CCol lg="3">
                                <span style={{color:'red'}}>{levelNumError}</span>
                              </CCol>
                            </>
                          )}
                          {(data.id == 2 && showNum==true)  && (
                            <>
                              <CCol lg="1" sm="3" xs="5" md="3" style={{marginRight:"-1rem"}}>
                                <CInput className="input-field"
                                  maxLength="2"
                                  type="text"
                                  value={selectNumber}
                                  onChange={(e) => handleChangeNumber(e)}
                                  style={{textAlign:"center"}}
                                />
                              </CCol>
                              <CCol lg="3">
                                <span style={{color:'red'}}>{levelNumError}</span>
                              </CCol>
                            </>
                          )} 
                          <CCol lg="3"></CCol>
                        </CRow>
                    );
                  })}
                </div>
            </>
          )}
          {selectTypeValue == 3 && (
            <>
              <CRow className="divide-div">
                <CCol lg="4" sm="0" md="0" xs="0"></CCol>
                <CCol lg="2" sm="6" md="5" xs="8">
                  <CLabel>Add Field</CLabel>
                </CCol>
                <CCol lg="1" sm="1" md="1" xs="1" style={{marginLeft:"-5.5rem"}}>
                  <CImg
                    className="add-field-img"
                    src={"/image/plus-icon.png"}
                    onClick={clickAddField}
                  />
                </CCol>
              </CRow>
              {multiChooseField.map((data, index) => {
                return (
                  <CRow key={index}>
                    <CCol lg="3" sm="0" xs="0" md="0"></CCol>
                    <CCol lg="1" xs="1" sm="1" md="1" className="minus-div" style={{textAlign:"end"}} >
                      <input type="radio" />
                    </CCol>
                    <CCol lg="4" sm="8" xs="8" md="8">
                      <CInput
                        className="input-field sub-div"
                        placeholder="Enter Add Field Label"
                        type="text"
                        id={data.id}
                        value={data.value}
                        onChange={(e) => subLabelChange(e, data.id)}
                      />
                      {subError.map((d,i)=>{
                        return(
                          data.id == d.id && 
                          <span key={i} style={{color:"red"}}>{d.value}</span>
                        )
                      })}
                    </CCol>
                    <CCol lg="1" sm="1" xs="1" md="1" className="minus-div">
                      <CImg
                        className="delete-field-img"
                        src={"/image/minus.png"}
                        onClick={()=>deleteFieldClick(data.id)}
                      />
                    </CCol>
                  </CRow>
                );
              })}
            </>
          )}
          <CButtonToolbar style={{justifyContent:"center"}}>
              <CButton style={{marginRight:"10px"}}
                className="btn-create btn-cancel"
                onClick={templateCreateModalCloseBtn}
              >
                Cancel
              </CButton>
              {!editStatus && (
                <CButton
                  className="btn-create btn-add"
                  onClick={() => commonAddUpdate(selectTypeValue)}
                >
                <CImg className="info-add-img" src={"/image/plus-white.png"} />
                  Add
                </CButton>   
              )}
              {editStatus && (
                <CButton
                  className="btn-create btn-add"
                  onClick={() => commonAddUpdate(selectTypeValue)}
                >
                <CImg className="info-add-img" src={"/image/plus-white.png"} />
                  Update
                </CButton>
              )}
          </CButtonToolbar>
        </CModalBody>
      </CModal>
    </>
  );
};
export default TemplateCreateModal;
