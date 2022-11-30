/**
 * Template Registration Form
 * @author Thu Ta
 * @create 20/06/2022
 */
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  CCol,
  CRow,
  CLabel,
  CInput,
  CButton,
  CImg,
} from "@coreui/react";
import SuccessError from "../common/SuccessError";
import TemplateDrag from "./TemplateDrag";
import TemplateNotDrag from "./TemplateNotDrag";
const TemplateCreateForm = (props) => {
  let {
    handleChangeTitle,
    title,
    addMoreInfoClick,
    data,
    remove,
    edit,
    userGuideClick,
    doneClick,
    error,
    formTitle,
    itemList,
    handleDrop,
    updateStatus,
  } = props;
  return (
    <>
      <CRow>
        <CCol lg="12" style={{ width: "100%" }}>
          <SuccessError error={error} />
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="10"></CCol>
        <CCol lg="2" style={{ textAlign: "end" }}>
          <CImg
            className="user-guide"
            src={"/image/user guide.svg"}
            onClick={userGuideClick}
          />
        </CCol>
      </CRow>
      <CRow style={{ justifyContent: "center" }}>
        <h4>{formTitle}</h4>
      </CRow>
      <CRow style={{ marginTop: "30px" }}>
        <CCol lg="3"></CCol>
        <CCol lg="1">
          <CLabel style={{ fontSize: "17px" }}>
            Title<span style={{ color: "red", fontSize: "20px" }}>*</span>
          </CLabel>
        </CCol>
        <CCol lg="5" md="10" sm="10" xs="12">
          <CInput
            autoFocus="focus"
            className="input-field "
            placeholder="Enter Title"
            type="text"
            value={title}
            onChange={(e) => handleChangeTitle(e)}
          />
        </CCol>
        <CCol lg="3"></CCol>
      </CRow>
      {updateStatus == false && 
      <div className="App">
        <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="list-container">
            {(provided) => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {itemList.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        className="item-container"
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <TemplateDrag
                          data={data}
                          remove={remove}
                          edit={edit}
                          item={item}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      }
      {updateStatus == true && 
        <TemplateNotDrag
        data={data}
        remove={remove}
        edit={edit}
      />
      }
      {data.length > 0 && (
        <CRow style={{ marginBottom: "30px", marginTop: "30px" }}></CRow>
      )}
      <CRow
        style={{
          marginTop: "30px",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <CButton
          className="btn-create"
          onClick={addMoreInfoClick}
          style={{ marginRight: "10px", marginBottom: "10px" }}
        >
          <CImg className="info-add-img" src={"/image/add.png"} />
          Add More Information
        </CButton>
        {data.length != 0 && (
          <CButton
            className="btn-create"
            onClick={doneClick}
            style={{ marginBottom: "10px" }}
          >
            Done
          </CButton>
        )}
      </CRow>
    </>
  );
};

export default TemplateCreateForm;
