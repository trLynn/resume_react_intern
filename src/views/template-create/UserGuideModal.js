
/**
 * DetailModal Component
 *
 * @author Thu Rein Lynn
 *
 * @create 20/6/2022
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
 const UserGuideModal = (props) => {
   const { show, closeBtn } = props;
   return (
     <>
       <CModal
         size="xl"
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
           <h2 style={{fontWeight:"bold"}}>User Guide For New Resume Create</h2>
         </CModalHeader>
         <CModalBody>
           <br />
 
           <CRow id="approver-modal">
             <CCol lg="3" style={{ textAlign: "start", marginTop: "20px" , marginLeft: "20px" }}>
               <h5 style={{fontWeight:"bold"}}>Text Box</h5>
               <p>For : Name,Email,FatherName</p>
             </CCol>
 
             <CCol lg="8">
               <CImg
                 style={{ marginTop: "2px", borderRadius: "5px", width: "100%"}}
                 src="/avatars/t1.png"
                 
               ></CImg>
             </CCol>
             <CCol lg="1"></CCol>
           </CRow>
           <br />
 
           <CRow id="approver-modal">
             
             <CCol lg="3" style={{ textAlign: "start", marginTop: "20px" , marginLeft: "20px" }}>
               <h5 style={{fontWeight:"bold"}}>Comment Box</h5>
               <p>For : Address,Description</p>
             </CCol>
 
             <CCol lg="8">
               <CImg
                 style={{ marginTop: "2px", borderRadius: "5px" ,marginRight: "5px",width: "100%" }}
                 src="/avatars/t2.png"
                
               ></CImg>
             </CCol>
             <CCol lg="1"></CCol>
           </CRow>
           <br />
 
           <CRow id="approver-modal">
             
             <CCol lg="3" style={{ textAlign: "start", marginTop: "20px" , marginLeft: "20px" }}>
               <h5 style={{fontWeight:"bold"}}>Single Choice</h5>
               <p>For : Gender,Relationship Status</p>
             </CCol>
 
             <CCol lg="8">
               <CImg
                 style={{ marginTop: "2px", borderRadius: "5px" ,marginRight: "5px" ,width: "100%"}}
                 src="/avatars/t3.png"
                
               ></CImg>
             </CCol>
             <CCol lg="1"></CCol>
           </CRow>
           <br />
          
           <CRow id="approver-modal">
             
             <CCol lg="3" style={{ textAlign: "start", marginTop: "20px" , marginLeft: "20px" }}>
               <h5 style={{fontWeight:"bold"}}>Data List</h5>
               <p>For : Career,Position</p>
             </CCol>
 
             <CCol lg="8">
               <CImg
                 style={{ marginTop: "2px", borderRadius: "5px"  ,width: "100%"}}
                 src="/avatars/t4.png"
                
               ></CImg>
             </CCol>
             <CCol lg="1"></CCol>
           </CRow>
           <br />
 
           <CRow id="approver-modal">
             
             <CCol lg="3" style={{ textAlign: "start", marginTop: "20px" , marginLeft: "20px" }}>
               <h5 style={{fontWeight:"bold"}}>Multiple Choice</h5>
               <p>For : Japanese Level,Skill Level</p>
             </CCol>
 
             <CCol lg="8">
               <CImg
                 style={{ marginTop: "2px", borderRadius: "5px" ,width: "100%" }}
                 src="/avatars/t5.png"
               
               ></CImg>
             </CCol>
             <CCol lg="1"></CCol>
           </CRow>
           <br />
 
           <CRow id="approver-modal">
             
             <CCol lg="3" style={{ textAlign: "start", marginTop: "20px" , marginLeft: "20px" }}>
               <h5 style={{fontWeight:"bold"}}>Attach File</h5>
               <p>For : Attach PDF,Excle</p>
             </CCol>
             <CCol lg="8">
               <CImg
                 style={{ marginTop: "2px", borderRadius: "5px" ,width: "100%" }}
                 src="/avatars/t6.png"
               ></CImg>
             </CCol>
             <CCol lg="1"></CCol>
           </CRow>
           <br />
 
           <CRow id="approver-modal">
             <CCol lg="3" style={{ textAlign: "start", marginTop: "20px" , marginLeft: "20px" }}>
               <h5 style={{fontWeight:"bold"}}>Profile Image</h5>
               <p>For : Attach Profile Image</p>
             </CCol>
 
             <CCol lg="8">
               <CImg
                 style={{ marginTop: "2px", borderRadius: "5px" ,width: "100%" }}
                 src="/avatars/profilez.png"
               
               ></CImg>
             </CCol>
             <CCol lg="1"></CCol>
           </CRow>
           <br />
 
           <CRow id="approver-modal">
             
             <CCol lg="3" style={{ textAlign: "start", marginTop: "20px" , marginLeft: "20px" }}>
               <h5 style={{fontWeight:"bold"}}>Date Time</h5>
               <p>For : Date of Birth</p>
             </CCol>
 
             <CCol lg="8">
               <CImg
                 style={{ marginTop: "2px", borderRadius: "5px" ,width: "100%" }}
                 src="/avatars/t9.png"
                
               ></CImg>
             </CCol>
             <CCol lg="1"></CCol>
           </CRow>
           <br />
         </CModalBody>
       </CModal>
     </>
   );
 };
 export default UserGuideModal;
 