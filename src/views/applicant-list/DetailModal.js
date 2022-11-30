/* eslint-disable jsx-a11y/alt-text */

/**
 * DetailModal Component
 *
 * @author Thu Rein Lynn
 *
 * @create 20/6/2022
 *
 */

import React from "react";
import { CModal, CImg, CModalHeader } from "@coreui/react";
const DetailModal = (props) => {
  const { show, closeBtn, viewLink } = props;

  return (
    <>
      <CModal
        size="xl"
        centered
        closeOnBackdrop={false}
        show={show}
        id="advanced"
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
        </CModalHeader>

        <iframe
          src={viewLink}
         
          style={{ marginTop: "-40px" ,width: "100%" , height: "90vh" }}
        ></iframe>
      </CModal>
    </>
  );
};
export default DetailModal;
