import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar} from '@coreui/react';

const ConfirmSave = props => {
    return (
        <>
            <CModal centered closeOnBackdrop={false} show={props.show} style={{boxShadow: 'rgb(0 0 0 / 25%) 0px 3px 7px'}}>
                <CModalBody className="m-body">
                  <CRow className="ml-3 mt-3">
                    <h5 style={{color:"red"}}>Save Applicant Informations</h5>
                  </CRow>
                    <CRow className="mt-3 ml-3">
                        <p style={{fontSize:13}}>Are you sure you want to &nbsp;
                        <span style={{color:"red"}}>save</span>&nbsp;this informations?</p>
                    </CRow>
                    <CButtonToolbar className="confirm-body confirmbox-btn" justify="end">
                    <CButton className="cancel-confirm-btn" onClick={props.cancel}>{props.cancelButton}</CButton>
                        <CButton className="delete-confirm-btn ml-3 mr-4" onClick={
                            (props.type === 'save') ? props.saveOK :
                            (props.type === 'save-data') ? props.saveConfirmData :
                            (props.type === 'update') ? props.updateOK : props.deleteOK 
                        }>{props.okButton}</CButton>
                    </CButtonToolbar>
                </CModalBody>
            </CModal>
        </>
    )
}
export default ConfirmSave