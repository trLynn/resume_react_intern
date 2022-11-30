import { CCard } from "@coreui/react";
import React from "react";

/**
 * To show error and success message
 *
 * @author  Thu Rein Lynn
 * @create  06/04/2021
 * @param   {error} props => for error message
 *          {error2} props => for error2 message
 *          {success} props => for success message
 * @returns output shown in web page
 */

const AppSuccessError = (props) => {
  return (
    <>
      {
        // to show error message
        props.error?.length > 0 && (
          <CCard className="errMsgBox">
            {Array.from(new Set(props.error)).map((data, index) => {
              return (
                <div key={index}>
                  <p style={{ marginLeft: "10px", marginTop: "10px" }}>
                    {data}
                  </p>
                </div>
              );
            })}
          </CCard>
        )
      }
      {
        // to show success message
        props.success?.length > 0 && (
          <CCard className="susMsgBox">
            {props.success.map((data, index) => {
              return (
                <div key={index}>
                  <p style={{ marginLeft: "10px", marginTop: "10px" }}>
                    {data}
                  </p>
                </div>
              );
            })}
          </CCard>
        )
      }
    </>
  );
};
export default AppSuccessError;
