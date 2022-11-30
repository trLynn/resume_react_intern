/**
 * Employee Index Main Form
 *
 * @author Thu Rein Lynn
 *
 * @create 17/6/2022
 *
 */

import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import ApplicantTable from "./ApplicantTable";
import AppListSearch from "./ApplicantSearchForm";
import DetailModal from "./DetailModal";
import AppSuccessError from "./AppSuccessError";
import { ApiRequest } from "../common/ApiRequest";
import Loading from "../common/Loading";
import { useHistory } from "react-router-dom";
import CommonMessage from "../common/CommonMessage";
import ResumeConfirmMessage from "../common/ResumeConfirmMessage";
import UserGuide from "./UserGuide";

const AppListIndex = () => {
  const [tmpTitleSelectValue, setTmpTitleSelectValue] = useState("0"); // for TempTitle Selected Value
  const [loading, setLoading] = useState(false); // for loading condition (true,false)
  const [infoSelectValue, setInfoSelectValue] = useState(""); // for Information Selected Value
  const [statusSelectValue, setStatusSelectValue] = useState("0"); // for Status Selected Value
  const [skillSelectValue, setSkillSelectValue] = useState(""); // for Skill Selected Value
  const [currentPage, setCurrentPage] = useState(""); // for current page for pagination
  const [lastPage, setLastPage] = useState(1); // for last page for pagination
  const [detailModalShow, setDetailModalShow] = useState(false); //for detailModalShow condition (true,false)
  const [userShow, setUserShow] = useState(false); //for detailModalShow condition (true,false)
  const [deleteShow, setDeleteShow] = useState(false); // for confirmation message box (true,false)
  const [deleteType, setDeleteType] = useState(""); //for confirmation box type
  const [allCheck, setAllCheck] = useState(false); // for all check box (true,false)
  const [levelbox, setLevelbox] = useState(0); // for type of skill
  const [infoText, setInfoText] = useState(""); // for information input text field
  const [success, setSuccess] = useState([]); // for success messages
  const [error, setError] = useState([]); //for error messages
  const [skillNameSelectValue, setSkillNameSelectValue] = useState(""); //for skill name select value
  const [viewLink, setViewLink] = useState(""); //for image link for view
  const [skillNameSelectName, setSkillNameSelectName] = useState(""); //for dropdown skill selectname
  const [tmpTitleSelectValueSearch, setTmpTitleSelectValueSearch] =useState(""); //for search title select value
  const [infoSelectValueSearch, setInfoSelectValueSearch] = useState(""); //for search info select value
  const [levelboxSearch, setLevelboxSearch] = useState(""); //for search level box select value
  const [headingValueSearch, setHeadingValueSearch] = useState(""); //for search heading select value
  const [skillSelectValueSearch, setSkillSelectValueSearch] = useState(""); //for search skill select value
  const [statusSelectValueSearch, setStatusSelectValueSearch] = useState(""); //for search status select value
  const [infoDataName, setInfoName] = useState(""); //for skill Name RS Status DOB etc.. selectname
  const [totalRow, setTotalRow] = useState(""); // for totalRow
  const [userData, setUserData] = useState([]); // for table Data
  const [tmpTitleData, setTmpTitleData] = useState([]); // for template title data
  const [infoData, setInfoData] = useState([]); // for information data
  const [skillName, setSkillName] = useState([]); //for leveldata
  const [skillData, setSkillData] = useState([]); // for skill Name Data
  const [confirmHeader, setConfirmHeader] = useState(""); // confirmation box header text
  const [confirmContent, setConfirmContent] = useState(""); // confirmation box content text
  const [indexNumber, setIndexNumber] = useState(""); // confirmation box content text
  let tempIndexNumber; // for number of table auto increment
  
  const [statusData] = useState([
    { status: 1, status_Name: "Pending" },
    { status: 2, status_Name: "Reject" },
    { status: 3, status_Name: "Processing" },
    { status: 4, status_Name: "Pass" },
    { status: 5, status_Name: "Fail" },
  ]); //for status data

  let history = useHistory();
  /**
   * fornLoad UseEffect
   * @author YuwaKoKo
   * @create 20/08/2022
   */
  useEffect(() => {
    document.body.style.overflow = "auto";
    let login_id = localStorage.getItem("LOGIN_ID");
    if (login_id == null) {
      history.push("/admin-login");
    } else {
      (async () => {
        setLoading(true);
        await getTemp();
      })();
    }
  }, []);
  
  /**
   * get template title from API
   * @author YuwaKoKo
   * @create 20/08/2022
   * @return TmpTitleData
   */
  const getTemp = async () => {
    setLoading(true);
    let obj = {
      method: "get",
      url: "/templates/search/template-name",
      params: {
        login_id: localStorage.getItem("LOGIN_ID"),
      },
    };
    let response = await ApiRequest(obj);

    if (response.flag == false) {
      setError(response.message);
    } else {
      if (response.data.status == "OK") {
        setTmpTitleData(response.data.data);
      } else {
        setSuccess([]);
        setError([response.data.message]);
      }
    }
    setLoading(false);
  };

  /**
   * TemplateTitle Select Change Function with Applicant List Heading All API
   * @author YuwaKoKo
   * @create 17/08/2022
   * @param e
   * @return infoData,Error,Success,tmpTitleSelectValue
   */
  let tmpTitleSelectChange = async (e) => {
    setInfoText("");
    setSkillData("");
    setSkillName("");
    setLevelbox("");
    setInfoSelectValue("");
    setSkillNameSelectValue("");
    setSkillNameSelectName("");
    setSkillSelectValue("");
    setTmpTitleSelectValue(e.target.value);
    setError([]);
    setSuccess([]);
    setLoading(true);
    let id = e.target.value;
    setTmpTitleSelectValue(id);
    let obj = {
      method: "get",
      url: `template-headings/show/${id}`,
      params: { login_id: localStorage.getItem("LOGIN_ID") },
    };
    let response = await ApiRequest(obj);
    if (response.flag == false) {
      setError(response.message);
      setInfoData([]);
    } else {
      if (response.data.status == "OK") {
        setInfoData(response.data.data);
        setError([]);
      } else {
        setSuccess([]);
        setError([response.data.data.message]);
        setInfoData([]);
      }
    }
    setLoading(false);
  };
  /**
   * Status Select Change Function
   * @author YuwaKoKo
   * @create 18/08/2022
   * @param e
   * @return StatusSelectValue
   */
  let statusSelectChange = (e) => {
    setError([]);
    setSuccess([]);
    setStatusSelectValue(e.target.value);
  };
  /**
   * InfoData Select Change Function with Skill Data API
   * @author YuwaKoKo
   * @create 17/08/2022
   * @param e
   * @return infoSelectValue,infoName,skillName,skillData,error,success
   */
  let infoSelectChange = async (e) => {
    setError([]);
    setInfoText("");
    setSuccess([]);
    setSkillNameSelectValue("");
    setSkillSelectValue("");
    setSkillData("");
    setSkillName("");
    setSkillNameSelectName("");
    setInfoName("");
    let arr = e.target.value.split(",");
    let infoId = arr[0];
    let type = arr[1];
    let infoSName =arr.slice(2).join(",");
    setInfoSelectValue(infoId);
    setLevelbox(type);
    setInfoName(infoSName);

    let obj = {
      method: "get",
      url: `template-headings/show`,
      params: {
        heading_id: infoId,
        template_id: tmpTitleSelectValue,
        login_id: localStorage.getItem("LOGIN_ID"),
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag == false) {
      setError(response.message);
      setInfoData([]);
    } else {
      if (response.data.status == "OK") {
        setSkillName(response.data.data.sub_headings);
        setSkillData(response.data.data.levels);
        setError([]);
      } else {
        setSuccess([]);
        setError([response.data.data.message]);
        setInfoData([]);
      }
    }
    setLoading(false);
  };

  /**
   * Skill Name Select Change Function
   * @author YuwaKoKo
   * @create 17/08/2022
   * @param e
   * @return skillNameSelectValue,skillNameSelectName
   */
  let skillNameSelectChange = async (e) => {
    setError([]);
    setSuccess([]);
    let arr1 = e.target.value.split(",");
    let skillId = arr1[0]
    let skillName = arr1.slice(1).join(",");
    setSkillNameSelectValue(skillId);
    setSkillNameSelectName(skillName);
    setSkillSelectValue("");
  };


    //Key Handler for search box
    const keyHandler = (e) => {
      if (e.key == "Enter") {
       searchClick();
      }
    };

  /**
   * Skill Select Change Function
   * @author YuwaKoKo
   * @create 17/08/2022
   * @param e
   * @return skillSelectValue
   */
  let skillSelectChange = (e) => {
    setError([]);
    setSuccess([]);
    setSkillSelectValue(e.target.value);
  };

  /**
   * Skill Name Select Change Function
   * @author YuwaKoKo
   * @create 17/08/2022
   * @param page
   * @return page
   */
  const setActivePage = (page) => {
    
    setError([]);
    setSuccess([]);
    setAllCheck(false);
    searchStatus(page);
  };

  /**
   * View Close Function
   * @author YuwaKoKo
   * @create 20/08/2022
   * @param e
   */
  let closeBtn = () => {
    setDetailModalShow(false);
    document.body.style.overflow = "auto";
  };

  /**
   * User Guide Close Function
   * @author YuwaKoKo
   * @create 20/08/2022
   * @param e
   */
  let closeBtnUser = () => {
    setUserShow(false);
    document.body.style.overflow = "auto";
  };

  /**
   * viewClick Function from Table with Applicant View Api
   * @author YuwaKoKo
   * @create 20/08/2022
   * @param id
   * @return viewLink,error,success
   */
  let viewClick = async (id) => {
    let viewSlectId = id;
    setSuccess([]);
    setError([]);
    setLoading(true);
    let viewData = {
      method: "GET",
      url: `applicants/view/${viewSlectId}`,
      params: { login_id: localStorage.getItem("LOGIN_ID") },
    };
    let response = await ApiRequest(viewData);
    if (response.flag == false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setTimeout(() => {
       
        if (userData.length -1 == 0) {
         let page = currentPage - 1;
         searchStatus(page)
         setAllCheck(false);
        }else{
          searchStatus(currentPage)
          setAllCheck(false);
        } 
      },2500)
    } else {
      if (response.data.status == "OK") {
        setViewLink(response.data.data);
        setError([]);
        setDetailModalShow(true);
        document.body.style.overflow = "hidden";
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setError([response.data.message]);
        setSuccess([]);
        setDetailModalShow(false);
        document.body.style.overflow = "auto";
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  /**
   * Delete Button From Table Function
   * @author YuwaKoKo
   * @create 20/08/2022
   * @return deleteShow,deleteType
   */
  const deleteCLick = () => {
    let checktrue = [];
    userData.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });

    if (checktrue.length == 0) {
      setSuccess([]);
      setError([CommonMessage.JSE001.replace("%s", "at least one checkbox")]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setDeleteShow(true);
      setConfirmHeader("<h5 style='color:red'>Delete Informations</h5>");
      setConfirmContent(
        "<p>Are you sure want to<span style='color:red'>&nbsp;permanently delete &nbsp;</span>this informations</p>"
      );
      setDeleteType("delete");
    }
  };

  /**
   * Delete OK Click Function with Applicant List Delete API
   * @author YuwaKoKo
   * @create 20/08/2022
   * @return tmpSearch,error,success
   */
  const deleteOK = async () => {
    setDeleteShow(false);
    let checktrue = [];
    userData.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError(["Please select at least one CheckBox"]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setSuccess([]);
      setError([]);
      setLoading(true);
      let deleteData = {
        method: "delete",
        url: `applicants/delete`,
        params: {
          applicant_id: checktrue,
          login_id: localStorage.getItem("LOGIN_ID"),
        },
      };
      let response = await ApiRequest(deleteData);
      if (response.flag == false) {
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setTimeout(() => {
          if (userData.length  == 0) {
           let page = currentPage - 1;
           searchStatus(page)
           setAllCheck(false);
          }else{
            searchStatus(currentPage)
            setAllCheck(false);
          }
        },2500)
        if(allCheck == true){
          setAllCheck(true);
        }else{ setAllCheck(false);}
       
      } else {
        if (response.data.status == "OK") {
          
           setSuccess([response.data.message]);
           setTimeout(() => {
            setSuccess([])
          },2500)
          let page = currentPage;
          if (userData.length - 1 == 0) {
            page = currentPage - 1;
            setTimeout(() => {
              setSuccess([])
            },2500)
          }
          if (allCheck == true) {
            page = currentPage - 1;
          }
          setError([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          tempSearch(page);
        } else {
          setError([response.data.message]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    }
    setLoading(false);
  };

  /**
   * Table SubCheck box change Function
   * @author YuwaKoKo
   * @create 20/08/2022
   * @param id
   * @return allCheck,userData
   */
  let subCheckboxChange = (id) => {
    setError("");
    let flg = true;
    let data = userData.map((data) => {
      if (data.applicant_id == id) {
        data.isChecked = !data.isChecked;
        return data;
      }
      return data;
    });
    data.forEach((main) => {
      if (main.isChecked == false) {
        flg = false;
      }
    });
    setAllCheck(flg);
    setUserData(data);
  };

  /**
   * Table Main Check box change Function
   * @author YuwaKoKo
   * @create 20/08/2022
   * @return userData
   */
  let mainCheckboxChange = () => {
    setError("");
    setAllCheck(!allCheck);
    let data = userData.map((data) => {
      data.isChecked = !allCheck;
      return data;
    });
    setUserData(data);
  };

  /**
   * Table Info name change function
   * @author YuwaKoKo
   * @create 17/08/2022
   * @param e
   * @return infoText
   */
  const infoTextChange = (e) => {
    setInfoText(e.target.value);

  };

  /**
   * Table Info name change function with Applicant Download API
   * @author YuwaKoKo
   * @create 17/08/2022
   * @param id
   * return success,error
   */
  const downloadClick = async (id) => {
    const downSelId = id;
    setAllCheck(false);
    setSuccess([]);
    setError([]);
    setLoading(true);
    let DownloadData = {
      method: "GET",
      url: `applicants/download/${downSelId}`,
      params: {
        login_id: localStorage.getItem("LOGIN_ID"),
      },
      type: "blob",
    };
    let response = await ApiRequest(DownloadData);

    if (response.flag == false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setTimeout(() => {
        if (userData.length -1 == 0) {
         let page = currentPage - 1;
         searchStatus(page)
         setAllCheck(false);
        }else{
          searchStatus(currentPage)
          setAllCheck(false);
        } 
      },2500)
    } else {
      let getHeader = response.headers["content-disposition"];
      let tmpName = getHeader.split("filename=")[1];
      let fileName = tmpName.replace(/['"]+/g, "");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setSuccess(["Successfully Downloaded!"]);
      setError([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    setLoading(false);
  };

  /**
   * Excel Download Click Function with Applicant Excel Download API
   * @author YuwaKoKo
   * @create 20/08/2022
   * @return success,error
   */
  const excdownloadClick = async () => {
    setAllCheck(false);
    setLoading(true);
    setSuccess([]);
    setError([]);
    let headingValue;
    if (
      levelbox == 4 ||
      levelbox == 5 ||
      levelbox == 6 ||
      levelbox == 7 ||
      levelbox == 8
    ) {
      headingValue = infoText;
    }
    if (levelbox == 1 || levelbox == 2 || levelbox == 3) {
      headingValue = skillNameSelectName;
    }
    let downloadFile = {
      method: "GET",
      url: `applicants/excel-download`,
      params: {
        template_id: tmpTitleSelectValue,
        heading_id: infoSelectValue,
        heading_type: levelbox,
        heading_value: headingValue,
        level: skillSelectValue,
        status: statusSelectValue,
        login_id: localStorage.getItem("LOGIN_ID"),
      },
      type: "blob",
    };
    let response = await ApiRequest(downloadFile);

    if (response.flag == false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.statusText == "OK") {
        let fileName = "Applicantslist.xlsx";
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setSuccess(["Successfully Downloaded!"]);
        setError([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  /**
   * Status Processing Reject Failed Fail Button Function with Level API
   * @author YuwaKoKo
   * @create 20/08/2022
   * @param id
   * @return error,success
   */
  const statusChangeClick = async (id) => {
    setAllCheck(false);
    let status = id;
    let checktrue = [];
    userData.forEach((main) => {
      if (main.isChecked == true) {
        checktrue.push(main.applicant_id);
      }
    });
    if (checktrue.length == 0) {
      setSuccess([]);
      setError([CommonMessage.JSE001.replace("%s", "at least one checkbox")]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setSuccess([]);
      setError([]);
      setLoading(true);
      let statusChange = {
        method: "PATCH",
        url: `/applicant-status/update/${status}`,
        params: {
          applicant_id: checktrue,
          login_id: localStorage.getItem("LOGIN_ID"),
        },
      };
      let response = await ApiRequest(statusChange);
      if (response.flag == false) {
        if(checktrue.length == userData.length){
          setAllCheck(true);
        }
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      
        setTimeout(() => {
          if (userData.length == 0) {
           let page = currentPage - 1;
           searchStatus(page)
           setAllCheck(false);  
          }else{
            searchStatus(currentPage)
            setAllCheck(false);
          }
        },2500)
        if(response.message == "Applicant is already deleted!"){
          setTimeout(() => {
            if (userData.length -1 == 0) {
             let page = currentPage - 1;
             searchStatus(page)
             setAllCheck(false);
            }else{
              searchStatus(currentPage)
              setAllCheck(false);
            }
          },2500)
      }

        if(allCheck == true){
          setAllCheck(true)
        }else{setAllCheck(false);}
      } else {
        if (response.data.status == "OK") {
          searchStatus(currentPage);
          setError([]);
          setSuccess([response.data.message]);
          setTimeout(() => {
            setSuccess([])
          },2500)
          
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          setError([response.data.message]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
      setLoading(false);
    }
  };

  /**
   * Table Info name change function
   * @author YuwaKoKo
   * @create 17/08/2022
   */
  let searchClick = () => {
    setAllCheck(false);
    setError([]);
    setSuccess([]);
    search();
  };

  /**
   * Applicant Search Lists API
   * @author YuwaKoKo
   * @create 17/08/2022
   * @param page
   * @return success,error,userData
   */
  let search = async (page = 1) => {
    let headingValue;
    if (
      levelbox == 4 ||
      levelbox == 5 ||
      levelbox == 6 ||
      levelbox == 7 ||
      levelbox == 8
    ) {
      headingValue = infoText;
    }
    if (levelbox == 1 || levelbox == 2 || levelbox == 3) {
      headingValue = skillNameSelectName;
    }
    setError([]);
    setSuccess([]);
    setLoading(true);
    let search = {
      method: "get",
      url: `/applicants/search?page=${page}`,
      params: {
        template_id: tmpTitleSelectValue,
        heading_id: infoSelectValue,
        heading_type: levelbox,
        heading_value: headingValue,
        level: skillSelectValue,
        status: statusSelectValue,
        login_id: localStorage.getItem("LOGIN_ID"),
      },
    };
    let response = await ApiRequest(search);
    if (response.flag == false) {
    
        setError([response.message]);
      
      setUserData([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        tempIndexNumber = (response.data.data.current_page - 1 ) * 20;
        setIndexNumber(tempIndexNumber)
        setUserData(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setTotalRow(response.data.data.total);
        setLastPage(response.data.data.last_page);
        setTmpTitleSelectValueSearch(tmpTitleSelectValue);
        setInfoSelectValueSearch(infoSelectValue);
        setLevelboxSearch(levelbox);
        setHeadingValueSearch(headingValue);
        setSkillSelectValueSearch(skillSelectValue);
        setStatusSelectValueSearch(statusSelectValue);
        if (response.data.data.total == 0) {
          setError(["Data not Found!"]);
        }
      } else {
        setUserData([]);
        setSuccess([]);
        setError([response.data.data.message]);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }

    setLoading(false);
  };

  /**
   * TempSearch function for Delete
   * @author YuwaKoKo
   * @create 17/08/2022
   * @param page
   * @return success,error,userData
   */
  let tempSearch = async (page = 1) => {
    setAllCheck(false);
    setLoading(true);
    let search = {
      method: "get",
      url: `/applicants/search?page=${page}`,
      params: {
        template_id: tmpTitleSelectValueSearch,
        heading_id: infoSelectValueSearch,
        heading_type: levelboxSearch,
        heading_value: headingValueSearch,
        level: skillSelectValueSearch,
        status: statusSelectValueSearch,
        login_id: localStorage.getItem("LOGIN_ID"),
      },
    };
    let response = await ApiRequest(search);
    if (response.flag == false) {
      setTimeout(() => {
        setError([response.message]);
      },2500)
      setUserData([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        tempIndexNumber = (response.data.data.current_page - 1 ) * 20;
        setIndexNumber(tempIndexNumber)
        setUserData(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setTotalRow(response.data.data.total);
        setLastPage(response.data.data.last_page);
      } else {
        setUserData([]);
        setSuccess([]);
        setError([response.data.data.message]);      
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
    setLoading(false);
  };

  /**
   * ScrollClick Function When Table title more than 19
   * @author YuwaKoKo
   * @create 22/08/2022
   * @param page
   */
  const scrollClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const userClick = () => {
    setUserShow(true)
    document.body.style.overflow = "hidden";
  };

  let searchStatus = async (page = 1) => {
    setError([]);
    setSuccess([]);
    setLoading(true);
    let search = {
      method: "get",
      url: `/applicants/search?page=${page}`,
      params: {
        template_id: tmpTitleSelectValueSearch,
        heading_id: infoSelectValueSearch,
        heading_type: levelboxSearch,
        heading_value: headingValueSearch,
        level: skillSelectValueSearch,
        status: statusSelectValueSearch,
        login_id: localStorage.getItem("LOGIN_ID"),
      },
    };
    let response = await ApiRequest(search);
    if (response.flag == false) {
      setTimeout(() => {
        setError([response.message]);
      },2500)
      setUserData([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        tempIndexNumber = (response.data.data.current_page - 1 ) * 20;
        setIndexNumber(tempIndexNumber)
        setUserData(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setTotalRow(response.data.data.total);
        setLastPage(response.data.data.last_page);
      } else {
        setUserData([]);
        setSuccess([]);
        setError([response.data.data.message]);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
    setLoading(false);
  };
  return (
    <CRow>
      <CCol xs="12">
        <CCard className="template-list-cardBody">
          <CCardBody>
            <Loading start={loading} />
            <AppSuccessError error={error} success={success} />
            <AppListSearch
              keyHandler={keyHandler}
              tmpTitleSelectValue={tmpTitleSelectValue}
              infoSelectValue={infoSelectValue}
              statusSelectValue={statusSelectValue}
              skillSelectValue={skillSelectValue}
              skillNameSelectValue={skillNameSelectValue}
              skillNameSelectName={skillNameSelectName}
              infoText={infoText}
              tmpTitleData={tmpTitleData}
              infoData={infoData}
              infoDataName={infoDataName}
              statusData={statusData}
              skillData={skillData}
              skillName={skillName}
              tmpTitleSelectChange={tmpTitleSelectChange}
              infoSelectChange={infoSelectChange}
              statusSelectChange={statusSelectChange}
              skillSelectChange={skillSelectChange}
              infoTextChange={infoTextChange}
              excdownloadClick={excdownloadClick}
              skillNameSelectChange={skillNameSelectChange}
              searchClick={searchClick}
              userData={userData}
              levelbox={levelbox}
            />
            <br></br>
            <ApplicantTable
              indexNumber={indexNumber}
              currentPage={currentPage}
              lastPage={lastPage}
              setActivePage={setActivePage}
              viewClick={viewClick}
              deleteCLick={deleteCLick}
              statusChangeClick={statusChangeClick}
              userData={userData}
              subCheckboxChange={subCheckboxChange}
              mainCheckboxChange={mainCheckboxChange}
              allCheck={allCheck}
              downloadClick={downloadClick}
              totalRow={totalRow}
              scrollClick={scrollClick}
              userClick={userClick}
            />
            <DetailModal
              show={detailModalShow}
              closeBtn={closeBtn}
              viewLink={viewLink}
            />
            
             <ResumeConfirmMessage
                show={deleteShow}
                type={deleteType}
                header={confirmHeader}
                content={confirmContent}
                cancel={() => setDeleteShow(false)}
                deleteOK={deleteOK}
                okButton={"Yes,delete it"}
                cancelButton={"Cancel"}
      />
        <UserGuide
              show={userShow}
              closeBtn={closeBtnUser}
              viewLink={viewLink}
            />
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AppListIndex;
