/**  Template List Main Form
 *
 * @author Thu Ta
 *
 * @create 21/6/2022
 *
 */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TemplateListForm from "./TemplateListForm";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";
import EventEmitter from "../utils/EventEmitter";
import { ApiRequest } from "../common/ApiRequest";
import ResumeConfirmMessage from "../common/ResumeConfirmMessage";
import Loading from "../common/Loading";
const TemplateListIndex = () => {
  const history = useHistory(); // route Change state
  const [success, setSuccess] = useState([]); // templatelist page success message
  const [error, setError] = useState([]); // templatelist page error message
  const [searchData, setSearchData] = useState(""); // value from search box
  const [mainTable, setMainTable] = useState([]); // main table data for templateList table
  const [viewData, setViewData] = useState([]); // view data for view button
  const [deleteId, setDeleteId] = useState(""); // delete Id for template list table

  const [templateOneShow, setTemplateOneShow] = useState(false); // templateOne detail modal show
  const [templateTwoShow, setTemplateTwoShow] = useState(false); // templateOne detail modal show
  const [templateThreeShow, setTemplateThreeShow] = useState(false); // templateOne detail modal show

  const [totalRows, setTotalRows] = useState(""); // total rows
  const [currentPage, setCurrentPage] = useState(); // current page for pagination
  const [lastPage, setLastPage] = useState(); // last page for pagination
  const [filterArray, setFilterArray] = useState([]); // array except from "Email,Phone,Address"

  const [loading, setLoading] = useState(false); // Loading condition
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [confirmHeader, setConfirmHeader] = useState(""); // confirmation box header text
  const [confirmContent, setConfirmContent] = useState(""); // confirmation box content text
  const [clickCopyLink, setClickCopyLink] = useState(""); // for copyLink status
  const [copied, setCopied] = useState(""); // for copied data status
  const [activeFlag, setActiveFlag] = useState(""); // activeFlag status
  const [indexNumber, setIndexNumber] = useState("0"); // auto increase index for table

  let temp = []; // temp array for filterArray
  let tempIndexNumber = ""; // temporaray index for table index

  useEffect(() => {
    let login_id = localStorage.getItem("LOGIN_ID");

    if (login_id == null) {
      history.push("/admin-login");
    } else {
      (async () => {
        await systemFormLoad();
      })();

      // get input change data immediately from header search box onchange function
      const onDirect = (eventData) => {
        setSearchData(eventData.searchData == "" ? "" : eventData.searchData);
      }

      // get API data from header component's search box
      const onNewLog = (eventData) => {
        setIndexNumber(eventData.tempIndex == "" ? "0" : eventData.tempIndex)
        setSearchData(eventData.searchData == "" ? "" : eventData.searchData);
        setCopied(eventData.copied == "" ? "" : eventData);
        setError(eventData.error == [] ? [] : eventData.error);
        setSuccess(eventData.success == [] ? [] : eventData.success);
        setMainTable(eventData.mainTableData ? eventData.mainTableData : []);
        setTotalRows(eventData.totalRow == "" ? "" : eventData.totalRow);
        setCurrentPage(
          eventData.current_page == "" ? "" : eventData.current_page
        );
        setLastPage(eventData.last_page == "" ? "" : eventData.last_page);
      };
      const listener = EventEmitter.addListener("NewLog", onNewLog);
      const listener1 = EventEmitter.addListener("direct", onDirect); 
      return () => {
        listener.remove();
        listener1.remove();
      };
    }
  }, []);

  //Key Handler for search box
  const keyHandler = (e) => {
    if (e.key == "Enter") {
      searchClick();
    }
  };

  //  formload function
  const systemFormLoad = async () => {
    let successMessage = localStorage.getItem("create_success"); // success message from template Create page
    if (successMessage == null || successMessage == "") {
      setSuccess([]);
    } else {
      setSuccess([successMessage]);
    }
    localStorage.removeItem("create_success");
    setLoading(true);
    let obj = {
      method: "get",
      url: "/templates/all",
      params: {
        login_id: localStorage.getItem("LOGIN_ID"),
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        tempIndexNumber = (response.data.data.current_page - 1 ) * 20;
        setIndexNumber(tempIndexNumber)
        setError([]);
        setMainTable(response.data.data.data);
        setTotalRows(response.data.data.total);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  // scrollTop function
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  // goToRegister onClick Function
  const goToRegister = () => {
    history.push("/template-list/template-create");
  };

  // setActivePage pagination onClick
  const setActivePage = (page) => {
    setSuccess([]);
    setError([]);
    searchClick(page);
  };

  // confirmation box for delete btn from TemplateList
  const deleteClick = (id) => {
    setDeleteId(id);
    setConfirmShow(true);
    setConfirmHeader("<h5 style='color:red'>Delete Informations</h5>");
    setConfirmContent(
      "<p>Are you sure want to<span style='color:red'>&nbsp;permanently delete &nbsp;</span>this informations?</p>"
    );
    setConfirmType("delete");
  };

  // deleteOK function( delete data from db )
  const deleteOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let obj = {
      method: "delete",
      url: `/templates/delete`,
      params: {
        template_id: deleteId,
        login_id: localStorage.getItem("LOGIN_ID"),
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      scrollTop();
    } else {
      if (response.data.status === "OK") {
        let page = currentPage;
        setSuccess([response.data.message]);
        if (mainTable.length - 1 == 0) {
          page = currentPage - 1;
          setTimeout(() => {
            setSuccess([]);
          }, 2000);
        }
        tempSearch(page);
        setError([]);
        scrollTop();
      } else {
        setError([response.data.message]);
        setSuccess([]);
        scrollTop();
      }
    }
  };

  // view detail data
  const viewClick = async (id) => {
    setError([]);
    setSuccess([]);
    setLoading(true);
    let obj = {
      method: "get",
      url: `/templates/view/${id}`,
      params: {
        login_id: localStorage.getItem("LOGIN_ID"),
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      scrollTop();
    } else {
      if (response.data.status === "OK") {
        setViewData(response.data.data);
        if (response.data.data.headings.length > 0) {
          temp = response.data.data.headings.filter((para) => {
            return (
              para.heading_name.toLowerCase() != "name" &&
              para.type_id != "8" &&
              (!para.heading_name.toLowerCase().includes("email")) &&
              (!para.heading_name.toLowerCase().includes("phone")) &&
              (!para.heading_name.toLowerCase().includes("address")) && 
              para.heading_name != "အမည်" &&
              para.heading_name != "နာမည်" &&
              !para.heading_name.includes("ဖုန်း") &&
              !para.heading_name.includes("အီးမေး") &&
              !para.heading_name.includes("လိပ်စာ")
            );
          });
          setFilterArray(temp);
        }
        document.body.style.overflow = "hidden";
        if (response.data.data.layout_id == 1) {
          setTemplateOneShow(true);
        }
        if (response.data.data.layout_id == 2) {
          setTemplateTwoShow(true);
        }
        if (response.data.data.layout_id == 3) {
          setTemplateThreeShow(true);
        }
      } else {
        setSuccess([]);
        setError([response.data.message]);
        scrollTop();
      }
    }
  };

  // Active Click
  const activeClick = async (id, flag) => {
    let obj = {
      method: "get",
      url: `templates/change-active-status`,
      params: {
        template_id: id,
        active_flag: flag == 1 ? 0 : 1,
        login_id: localStorage.getItem("LOGIN_ID"),
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      scrollTop();
    } else {
      if (response.data.status === "OK") {
        searchClick(currentPage);
      } else {
        setSuccess([]);
        setError([response.data.message]);
        scrollTop();
      }
    }
  };

  // In Active Click
  const inActiveClick = async (id, flag) => {
    let obj = {
      method: "get",
      url: `templates/change-active-status`,
      params: {
        template_id: id,
        active_flag: flag == 1 ? 0 : 1,
        login_id: localStorage.getItem("LOGIN_ID"),
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      scrollTop();
    } else {
      if (response.data.status === "OK") {
        searchClick(currentPage);
      } else {
        setSuccess([]);
        setError([response.data.message]);
        scrollTop();
      }
    }
  };

  // active inactive change
  const activeChange = async (e) => {
    EventEmitter.emit("active", {
      flagId: e.target.value,
    });
    setActiveFlag(e.target.value);
    setSuccess([]);
    setError([]);
    setLoading(true);
    let obj = {
      method: "get",
      url: `/templates/search`,
      params: {
        login_id: localStorage.getItem("LOGIN_ID"),
        name: searchData,
        active_flag: e.target.value,
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      setMainTable([]);
    } else {
      if (response.data.status === "OK") {
        tempIndexNumber = (response.data.data.current_page - 1 ) * 20;
        setIndexNumber(tempIndexNumber)
        setCopied("");
        setError([]);
        setMainTable(response.data.data.data);
        setTotalRows(response.data.data.total);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };
  //cancel Click modal box
  const cancelClick = () => {
    setTemplateOneShow(false);
    setTemplateTwoShow(false);
    setTemplateThreeShow(false);
    document.body.style.overflow = "auto";
  };

  // edit click
  const editClick = async (id) => {
    let obj = {
      method: "get",
      url: `templates/edit/${id}`,
      params: { login_id: localStorage.getItem("LOGIN_ID") },
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setSuccess([]);
      setError(response.message);
      scrollTop();
    } else {
      if (response.data.status === "OK") {
        localStorage.setItem(
          "template_data",
          JSON.stringify(response.data.data)
        );
        history.push("/template-list/template-create");
      } else {
        setSuccess([]);
        setError([response.data.message]);
        scrollTop();
      }
    }
  };

  //copyLink onChange
  const copyLinkClick = (id, link) => {
    navigator.clipboard.writeText(window.location.host + link);
    setClickCopyLink(id);

    setTimeout(() => {
      setClickCopyLink("");
      setCopied(id);
      setTimeout(() => {
        setCopied("");
      }, 2000);
    }, 1000);
  };

  // input value from search box
  const inputChange = (e) => {
    setSearchData(e.target.value);
  };

  // templateList Search
  const searchClick = async (page = 1) => {
    setSuccess([]);
    setError([]);
    setLoading(true);
    let obj = {
      method: "get",
      url: `/templates/search?page=${page}`,
      params: {
        login_id: localStorage.getItem("LOGIN_ID"),
        name: searchData,
        active_flag: activeFlag,
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      setMainTable([]);
    } else {
      if (response.data.status === "OK") {
        tempIndexNumber = (response.data.data.current_page - 1 ) * 20;
        setIndexNumber(tempIndexNumber)
        setCopied("");
        setError([]);
        setMainTable(response.data.data.data);
        setTotalRows(response.data.data.total);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
  };

  // templateList Search
  const tempSearch = async (page = 1) => {
    setLoading(true);
    let obj = {
      method: "get",
      url: `/templates/search?page=${page}`,
      params: {
        login_id: localStorage.getItem("LOGIN_ID"),
        name: searchData,
        active_flag: activeFlag,
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setTimeout(() => {
        setError(response.message);
      }, 2000);
      setMainTable([]);
    } else {
      if (response.data.status === "OK") {
        tempIndexNumber = (response.data.data.current_page - 1 ) * 20;
        setIndexNumber(tempIndexNumber)
        setMainTable(response.data.data.data);
        setTotalRows(response.data.data.total);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
      } else {
        setError([response.data.message]);
      }
    }
  };

  return (
    <>
      <Loading start={loading} />
      <TemplateOne
        show={templateOneShow}
        cancel={cancelClick}
        viewData={viewData}
        filterArray={filterArray}
      />
      <TemplateTwo
        show={templateTwoShow}
        cancel={cancelClick}
        viewData={viewData}
        filterArray={filterArray}
      />
      <TemplateThree
        show={templateThreeShow}
        cancel={cancelClick}
        viewData={viewData}
        filterArray={filterArray}
      />
      <ResumeConfirmMessage
        show={confirmShow}
        type={confirmType}
        header={confirmHeader}
        content={confirmContent}
        cancel={() => setConfirmShow(false)}
        deleteOK={deleteOK}
        okButton={"Yes,delete it"}
        cancelButton={"Cancel"}
      />
      <TemplateListForm
        goToRegister={goToRegister}
        mainTable={mainTable}
        totalRows={totalRows}
        currentPage={currentPage}
        lastPage={lastPage}
        setActivePage={setActivePage}
        deleteClick={deleteClick}
        viewClick={viewClick}
        editClick={editClick}
        activeClick={activeClick}
        inActiveClick={inActiveClick}
        copyLinkClick={copyLinkClick}
        searchClick={searchClick}
        indexNumber={indexNumber}
        keyHandler={keyHandler}
        inputChange={inputChange}
        error={error}
        success={success}
        clickCopyLink={clickCopyLink}
        copied={copied}
        activeChange={activeChange}
      />
    </>
  );
};

export default TemplateListIndex;
