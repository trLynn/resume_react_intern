/**  Template List Form
 *
 * @author Thu Ta
 *
 * @create 21/6/2022
 *
 */
import React from "react";
import {
  CButton,
  CRow,
  CCard,
  CCardBody,
  CImg,
  CPagination,
  CLink,
  CInput,
  CInputGroup,
  CSpinner,
  CTooltip,
  CSelect,
  CLabel,
} from "@coreui/react";
import SuccessError from "../common/SuccessError";

const TemplateListForm = (props) => {
  let {
    error,
    success,
    goToRegister,
    inputChange,
    mainTable,
    totalRows,
    currentPage,
    lastPage,
    setActivePage,
    copyLinkClick,
    viewClick,
    editClick,
    deleteClick,
    searchClick,
    indexNumber,
    clickCopyLink,
    copied,
    keyHandler,
    activeClick,
    inActiveClick,
    activeChange,
  } = props;
  return (
    <>
      <CCard className="template-list-cardBody">
        <CCardBody>
          <CRow className="m-0">
            <SuccessError success={success} error={error} />
          </CRow>
          <CInputGroup className="mobile-search">
            <CInput
              className="search-border"
              placeholder="search everything"
              onChange={inputChange}
              onKeyDown={keyHandler}
            />
            <img
              onClick={() => {
                searchClick();
              }}
              src="image/search.svg"
              className="mobile-search-img cursorStyle"
            />
          </CInputGroup>
          <CRow alignHorizontal="center" className="mt-2">
            <h3 className="responsive-font">
              Create Professional Resume Template
            </h3>
          </CRow>
          <CRow alignHorizontal="center" className="mt-2">
            <p className="responsive-text">
              Fill in the blanks, choose a template and download your CV in
              minutes.
            </p>
          </CRow>
          <CRow alignHorizontal="center mt-2">
            <CButton onClick={goToRegister} className="create-btn">
              Create Resume Template
            </CButton>
          </CRow>
          <CRow alignHorizontal="center mt-5 mb-3 align-items-center">
            <CLabel className="font-weight-bold mb-0">Status</CLabel>
            <CSelect className="p-0 cursorStyle w-auto ml-3" onChange={activeChange}>
              <option value="">All</option>
              <option value="1">Active</option>
              <option value="2">InActive</option>
            </CSelect>
          </CRow>
          {mainTable.length > 0 && (
            <div className="templateList-bg">
              <div className="template-list-heading mr-3">
                <h5 className="font-weight-bold responsive-list-heading-font">
                  <CImg
                    className="templateList-img"
                    src="./avatars/list.png"
                    width={20}
                    height={20}
                  ></CImg>
                  Template Lists Data
                </h5>
                <p className="font-weight-bold">
                  <span className="hideRow">Total Row:</span> {totalRows} row(s)
                </p>
              </div>
              <div className="overflow-style">
                <table className="templateList-table">
                  <thead className="text-center">
                    <tr>
                      <th style={{ width: 60 }} rowSpan="2">
                        No
                      </th>
                      <th style={{ width: 160 }} rowSpan="2">
                        Name
                      </th>
                      <th style={{ width: 160 }} rowSpan="2">
                        Date
                      </th>
                      <th style={{ width: 160 }} rowSpan="2">
                        Link
                      </th>
                      <th style={{ width: 480 }} colSpan="4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {mainTable.length > 0 &&
                      mainTable.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td style={{ width: 60 }}>{parseInt(indexNumber) + index + 1}</td>
                            <td style={{ width: 160 }}>
                              {data.template_name.length <= 20 &&
                                data.template_name}
                              {data.template_name.length > 20 && (
                                <>
                                  {data.template_name.substring(0, 20)}
                                  <CTooltip
                                    content={data.template_name}
                                    placement="right"
                                  >
                                    <span>.....</span>
                                  </CTooltip>
                                </>
                              )}
                            </td>
                            <td style={{ width: 160 }}>{data.date}</td>
                            <td style={{ width: 160 }}>
                              {clickCopyLink == data.template_id && (
                                <CSpinner
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                  }}
                                  component="span"
                                  aria-hidden="true"
                                  color="primary"
                                />
                              )}
                              {data.active_flag == 1 && (
                                <CLink
                                  className="copyLink-style"
                                  onClick={() => {
                                    copyLinkClick(data.template_id, data.link);
                                  }}
                                >
                                  {clickCopyLink != data.template_id &&
                                    copied != data.template_id && (
                                      <>Copy Link</>
                                    )}
                                </CLink>
                              )}
                              {data.active_flag == 0 && (
                                <CLink className="inactive-link">
                                  {clickCopyLink != data.template_id &&
                                    copied != data.template_id && (
                                      <>Copy Link</>
                                    )}
                                </CLink>
                              )}
                              {copied == data.template_id && (
                                <span className="copied px-2 py-1">
                                  Link Copied
                                </span>
                              )}
                            </td>
                            <td style={{ width: 120 }}>
                              <CButton
                                className="templateList-viewBtn pl-2"
                                onClick={() => {
                                  viewClick(data.template_id);
                                }}
                              >
                                <CImg
                                  className="mr-2 image-btn"
                                  src="./avatars/eye.png"
                                  width={15}
                                  height={17}
                                ></CImg>
                                View
                              </CButton>
                            </td>
                            <td style={{ width: 120 }}>
                              {data.active_flag == 1 && (
                                <>
                                  {data.isUse === false && (
                                    <CButton
                                      className="templateList-editBtn"
                                      onClick={() => {
                                        editClick(data.template_id);
                                      }}
                                    >
                                      <CImg
                                        className="mr-2 mt-n1"
                                        src="./image/Edit icon.svg"
                                        width={15}
                                        height={15}
                                      ></CImg>
                                      Edit
                                    </CButton>
                                  )}
                                  {data.isUse === true && (
                                    <CButton
                                      className="template-list-used-btn"
                                      disabled
                                    >
                                      <CImg
                                        className="mr-2 mt-n1"
                                        src="./image/Edit gray.svg"
                                        width={15}
                                        height={15}
                                      ></CImg>
                                      Edit
                                    </CButton>
                                  )}
                                </>
                              )}
                              {data.active_flag == 0 && (
                                <>
                                  <CButton
                                    className="template-list-used-btn "
                                    disabled
                                  >
                                    <CImg
                                      className="mr-2 mt-n1"
                                      src="./image/Edit gray.svg"
                                      width={15}
                                      height={15}
                                    ></CImg>
                                    Edit
                                  </CButton>
                                </>
                              )}
                            </td>
                            <td style={{ width: 120 }}>
                              {data.isUse === false && (
                                <CButton
                                  className="templateList-delBtn px-1"
                                  onClick={() => deleteClick(data.template_id)}
                                >
                                  <CImg
                                    className="mr-1 image-btn"
                                    src="./image/delete.svg"
                                    width={15}
                                    height={15}
                                  ></CImg>
                                  Delete
                                </CButton>
                              )}
                              {data.isUse === true && (
                                <CButton
                                  className="template-list-used-btn px-1"
                                  disabled
                                >
                                  <CImg
                                    className="mr-1 image-btn"
                                    src="./image/delete-gray.svg"
                                    width={15}
                                    height={15}
                                  ></CImg>
                                  Delete
                                </CButton>
                              )}
                            </td>
                            <td style={{ width: 120 }}>
                              {data.active_flag === 1 && (
                                <CButton
                                  className="templateList-active-btn px-1"
                                  onClick={() =>
                                    activeClick(
                                      data.template_id,
                                      data.active_flag
                                    )
                                  }
                                >
                                  Active
                                </CButton>
                              )}
                              {data.active_flag === 0 && (
                                <CButton
                                  className="templateList-in-active-btn px-1"
                                  onClick={() =>
                                    inActiveClick(
                                      data.template_id,
                                      data.active_flag
                                    )
                                  }
                                >
                                  InActive
                                </CButton>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {totalRows > 20 && (
                <CRow alignHorizontal="center" className="mt-3">
                  <CPagination
                    activePage={currentPage}
                    pages={lastPage}
                    dots={false}
                    arrows={false}
                    align="center"
                    firstButton="First page"
                    lastButton="Last page"
                    onActivePageChange={(i) => setActivePage(i)}
                  ></CPagination>
                </CRow>
              )}
            </div>
          )}
        </CCardBody>
      </CCard>
    </>
  );
};

export default TemplateListForm;
