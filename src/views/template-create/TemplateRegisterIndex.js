/**
 * Template Registration Main Form
 * @author Thu Ta
 * @create 20/06/2022
 */
import { CCard, CCardBody} from "@coreui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../common/Loading";
import TemplateCreateForm from "./TemplateCreateForm";
import TemplateCreateModal from "./TemplateCreateModal";
import CommonMessage from "../common/CommonMessage";
import {checkNullOrBlank} from "../common/CommonValidation";
import ResumeConfirmMessage from "../common/ResumeConfirmMessage";
import TemplateChooseModal from "./TemplateChooseModal";
import UserGuideModal from "./UserGuideModal";
import { ApiRequest } from "../common/ApiRequest";
import { useHistory } from "react-router-dom";

const TemplateRegisterIndex = () => {
  const [error, setError] = useState([]); //for error message for template create modal
  const [subErrorField, setSubErrorField] = useState([]); //for error message for template create modal of add field
  const [levelNumError, setLevelNumErr] = useState([]); //for error message for template create modal of add field
  const [success, setSuccess] = useState([]); //for success message
  const [mainErr, setMainErr] = useState([]); //for main error of template create form
  const [loading, setLoading] = useState(false); // For Loading
  const [title, setTitle] = useState(""); //for template title
  const [showTemplateCreateModal, setShowTemplateCreateModal] = useState(false); //for show template create modal
  const [checked, setChecked] = useState(false); //for check is require field or not
  const [label, setLabel] = useState(""); //for get label from label input field
  const [selectField, setSelectField] = useState([]); //for select field
  const [levelRadio, setLevelRadio] = useState([
    { id: 0, name: "None" },
    { id: 1, name: "A-Z" },
    { id: 2, name: "1~10" },
    { id: 3, name: "Beginner, Intermediate, Advanced" },
  ]); //for choose level of multiple choice
  const [selectTypeValue, setSelectTypeValue] = useState(""); //for get value of selected type
  const [data, setData] = useState([]); //for store created data(headings array from api)
  const [multiChooseField, setMultiChooseField] = useState([]); //for add more field(dataList,multiple choice,single choice)
  const [subLabel, setSubLabel] = useState([]); //for sub label of (datalist,multiple choice,single choice)
  const [requireFlag, setRequireFlag] = useState(2); //for require flag(true=1,false=2)
  const [levelId, setLevelId] = useState(""); //for level id(multiple choice)
  const [selectNumber, setSelectNumber] = useState(""); //for get number besides check box of radio
  const [showCharacter, setShowCharacter] = useState(false); //for show input field of character (A_Z)
  const [showNum, setShowNum] = useState(false); //for show input field of number (1-infinity)
  const [levelData, setLevelData] = useState([]); //for level data
  const [editStatus, setEditStatus] = useState(false); //for edit status
  const [index, setIndex] = useState(""); //for edit index
  const [showUserGuideModal, setShowUserGuideModal] = useState(false); //for show user guide modal
  const [comfirmDeleteData, setComfirmDeleteData] = useState(""); //for delete data comfirm
  const [showChooseTemplateModal, setShowChooseTemplateModal] = useState(false); //for show template choose modal
  const [showApplyBtn, setShowApplyBtn] = useState(false); //for show apply btn
  const [imgId, setImgId] = useState(""); //for template image id
  const [diffImgOne, setDiffImgOne] = useState(false); //for show different choose image one
  const [diffImgTwo, setDiffImgTwo] = useState(false); //for show different choose image one
  const [diffImgThree, setDiffImgThree] = useState(false); //for show different choose image one
  const [mainImgOne, setMainImgOne] = useState(true); //for show main template image one
  const [mainImgTwo, setMainImgTwo] = useState(true); //for show main template image two
  const [mainImgThree, setMainImgThree] = useState(true); //for show main template image three
  const [confirmShow, setConfirmShow] = useState(false); // confirmation box show
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [confirmHeader, setConfirmHeader] = useState(""); //for confirm header
  const [confirmContent, setConfirmContent] = useState(""); //for confirm content
  const [layoutId, setLayoutId] = useState(""); //for tempory id for template choose
  const [contentOK, setContentOk] = useState(""); //for ok button of comfirm box
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [templateUpId, setTemplateUpId] = useState(""); //for template id(edit/update)
  const [headingId, setHeadingId] = useState([]); //for heading id(edit/update)
  const [formTitle, setFormTitle] = useState(""); //for form title
  const [checkHeaderUpdate, setCheckHeaderUpdate] = useState(""); //for check duplicate header in update
  const [idUpdate,setIdUpdate] = useState("");//for update layout id
  const [itemList, setItemList] = useState([]);//for item list to drag and drop
  const [dataId,setDataId] = useState(0);//data id
  let tempHead = []; //for tempory heading_id array
  let history = useHistory(); //for useHistory
  let errArry = []; //for store error
  let levelErr = [];//for level error array of mutiple choice

  /**
   * useEffect to get types and edit data from template list
   * @author yaminzaw
   * @create 27/06/2022
   */
  useEffect(() => {
    document.body.style.overflow = "auto";
    let login_id = localStorage.getItem("LOGIN_ID");
    if (login_id == null) {
      history.push("/admin-login");
    } else {
      (async () => {
        await getType();
      })();
      let templateEditData = JSON.parse(localStorage.getItem("template_data"));
      systemFormLoadEdit(templateEditData);
      localStorage.removeItem("template_data"); //clear section
    }
  }, []);

  /**
   * edit function(get edit data from template list)
   * @author yaminzaw
   * @create 27/06/2022
   * @param id(from edit button click of template list)
   */
  const systemFormLoadEdit = (data) => {
    if (data == null) {
      setUpdateStatus(false);
      setFormTitle("Create New Resume Template");
    } else {
      setUpdateStatus(true);
      setFormTitle("Update Resume Template");
      setTitle(data.title);
      setTemplateUpId(data.template_id);
      setLayoutId(data.layout_id);
      setData(data.headings);
      data.headings.map((head,idx) => {
        tempHead.push(head.heading_id);
      });
      setHeadingId(tempHead);
    }
  };

  /**
   * get type from api
   * @author yaminzaw
   * @create 17/06/2022
   */
  const getType = async () => {
    setLoading(true);
    let obj = {
      method: "get",
      url: "/templates/types",
      params: { login_id: localStorage.getItem("LOGIN_ID") },
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        setSelectField(response.data.data);
      } else {
        setMainErr([response.data.message]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  /**
   * get template title from input field
   * @author yaminzaw
   * @create 17/06/2022
   * @param e
   */
  const handleChangeTitle = (e) => {
    setSuccess([]);
    setTitle(e.target.value);
  };

  /**
   * click function on add more information button and then show template create modal
   * @author yaminzaw
   * @create 17/06/2022
   */
  const addMoreInfoClick = () => {
    document.body.style.overflow = "hidden";
    setError([]);
    setMainErr([]);
    setSuccess([]);
    setShowTemplateCreateModal(true);
    setChecked(true);
    setRequireFlag(2);
    setSelectNumber("");
    setLevelId("");
    setEditStatus(false);
    setLabel("");
    setSelectTypeValue("");
    setSubLabel([]);
    setShowNum(false);
    setShowCharacter(false);
    setSubErrorField([]);
  };

  /**
   * click function on close function of template create modal box
   * @author yaminzaw
   * @create 17/06/2022
   */
  const templateCreateModalCloseBtn = () => {
    document.body.style.overflow = "auto";
    setShowTemplateCreateModal(false);
  };

  /**
   * check function on check box of is require field( to show user require field or not)
   * @author yaminzaw
   * @create 17/06/2022
   */
  const checkRequire = () => {
    setChecked(!checked);
    if (checked == false) {
      setRequireFlag(2);
    } else if (checked == true) {
      setRequireFlag(1);
    }
  };

  /**
   * get label from input field
   * @author yaminzaw
   * @create 17/06/2022
   * @param e
   */
  const handleChangeLabel = (e) => {
    setError([]);
    setLabel(e.target.value);
  };

  /**
   * get number from level input field
   * @author yaminzaw
   * @create 17/06/2022
   * @param e
   */
  const handleChangeNumber = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSelectNumber(e.target.value);
    }
  };

  /**
   * onChange function of select box(select type)
   * @author yaminzaw
   * @create 20/06/2022
   * @param e
   */
  const selectTypeOnChange = (e) => {
    setError([]);
    setSelectNumber("");
    setShowNum(false);
    setShowCharacter(false);
    setSubErrorField([]);
    let id = e.target.value;
    if (id == 1 || id == 3 || id == 2) {
      setMultiChooseField([{ id: 1, value: "" }]);
    }
    setSelectTypeValue(id);
    if ((id = 2)) {
      setLevelId(levelRadio[0].id);
    }
  };

  /**
   * click add field function
   * @author yaminzaw
   * @create 20/06/2022
   */
  const clickAddField = () => {
    setError([]);
    setSubErrorField([]);
    setMultiChooseField([
      ...multiChooseField,
      {
        id: multiChooseField[multiChooseField.length - 1]["id"] + 1,
        value: subLabel,
      },
    ]);
  };

  /**
   * onChange function of sublabel input field
   * @author yaminzaw
   * @create 20/06/2022
   * @param e,id
   */
  const subLabelChange = (e, id) => {
    multiChooseField.forEach((data) => {
      if (data.id == id) {
        data.value = e.target.value;
        setSubLabel([data.value]);
      }
    });
    setSubLabel([]);
  };

  /**
   * click minus img of sublabel field
   * @author yaminzaw
   * @create 20/06/2022
   * @param id
   */
  const deleteFieldClick = (id) => {
    setError([]);
    setSubErrorField([]);
    if (multiChooseField.length == 1) {
      errArry.push(CommonMessage.JSE031.replace("%s", "This template field"));
      setError(errArry);
    } else {
      let data = multiChooseField.filter((d) => {
        return id != d.id;
      });
      setMultiChooseField(data);
    }
  };

  /**
   * onChange function on radio(level) of multiple choice
   * @author yaminzaw
   * @create 20/06/2022
   * @param data
   */
  const clickLevel = (data) => {
    setError([]);
    setSelectNumber("");
    setShowCharacter(false);
    setShowNum(false);
    setLevelNumErr([]);
    setLevelId(data.id);
    if (data.id == 1) {
      setShowCharacter(true);
    } else if (data.id == 2) {
      setShowNum(true);
    }
  };

  /**
   * onClick delete button of created field from template card
   * @author yaminzaw
   * @create 21/06/2022
   * @param dataRemove
   */
  let remove = (dataRemove) => {
    setComfirmDeleteData(dataRemove);
    setConfirmShow(true);
    setConfirmHeader("<h5 style='color:red'>Delete Informations</h5>");
    setConfirmContent("<p>Are you sure want to<span style='color:red'>&nbsp;permanently delete &nbsp;</span>this informations</p>");
    setConfirmType("delete");
    setContentOk("Yes,I delete it");
    setMainErr([]);
  };

  /**
   * onClick (Yes I delete it) function of delete button
   * @author yaminzaw
   * @create 21/06/2022
   */
  const deleteOK = () => {
    let dataArr = data.filter((d) => {
      return comfirmDeleteData != d;
    });
    if(updateStatus == false){
      let itemArr = itemList.filter((i)=>{
        return i !=comfirmDeleteData.id;
      })
      setItemList(itemArr)
    }
    setData(dataArr);
    setConfirmShow(false);
  };

  /**
   * onClick edit button of created field from template card
   * @author yaminzaw
   * @create 21/06/2022
   * @param dataEdit
   */
  let edit = (dataEdit) => {
    let validateData = data.filter((d) => {
      return dataEdit != d;
    });
    setCheckHeaderUpdate(validateData);
    setChecked(false);
    setError([]);
    setMainErr([]);
    setMultiChooseField([]);
    setEditStatus(true);
    setShowTemplateCreateModal(true);
    setLevelNumErr([]);
    document.body.style.overflow = "hidden";
    setShowNum(false);
    setShowCharacter(false);
    setSubErrorField([]);
    let levelDataArr = [];
    let selectNum;
    let sub = [];
    let arr_format = [];
    let tmpFlag;
    let i = data.indexOf(dataEdit);
    setIndex(i);
    setLabel(dataEdit.heading_name);
    setSelectTypeValue(dataEdit.type_id);

    tmpFlag = dataEdit.require_flag;
    if (tmpFlag == 2) {
      setRequireFlag(2);
      setChecked(true);
    } else if (tmpFlag == 1) {
      setRequireFlag(1);
      setChecked(false);
    }

    if (dataEdit.type_id == 2) {
      setLevelId(dataEdit.level.level_cat);
      levelDataArr = dataEdit.level.level_data;
      if (dataEdit.level.level_cat == 1) {
        setShowCharacter(true);
        selectNum = levelDataArr.length;
      } else if (dataEdit.level.level_cat == 2) {
        setShowNum(true);
        selectNum = (levelDataArr.length + 1) / 2;
      }
      setSelectNumber(selectNum);
    }

    if (dataEdit.type_id == 1 ||dataEdit.type_id == 2 ||dataEdit.type_id == 3) {
      sub = dataEdit.subheadings;
      sub.forEach((data, idx) => {
        arr_format.push({ id: idx + 1, value: data });
      });
      setMultiChooseField(arr_format);
    }
  };

  /**
   * common validation of duplicate check for all headers/attach file(type_id = 7)/profile image(type_id = 8)
   * @author yaminzaw
   * @create 14/07/2022
   * @param id
   */
  const checkDuplicateHeader = (data,id)=>{
    data.map((d) => {
      if (d.heading_name.toLowerCase().trim() == label.toLowerCase().trim()) {
        errArry.push(CommonMessage.JSE034.replace("%s", "This label"));
      }
    });
    if (id == 8) {
      data.map((d) => {
        if (d.type_id == id) {
          errArry.push(CommonMessage.JSE034.replace("%s", "Profile image"));
        }
      });
    }else if (id == 7) {
      data.map((d) => {
        if (d.type_id == id) {
          errArry.push(CommonMessage.JSE034.replace("%s", "Attach file"));
        }
      });
    }
  }

  /**
   * common function of add field and update field
   * @author yaminzaw
   * @create 21/06/2022
   * @param id
   */
  const commonAddUpdate = (id) => {
    setError([]);
    let subHeading = [];
    let levelDataArr = [];
    let subErrArray = [];
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    multiChooseField.forEach((data) => {
      subHeading.push(data.value);
    });

    let cap_label = capitalizeWords(label);
    if (label == "") {
      errArry.push(CommonMessage.JSE005.replace("%s", "template field label"));
    } else  if(label.match(/^ *$/) !== null) {
      errArry.push(CommonMessage.JSE005.replace("%s", "template field label"));
    } 
    else if (label.length > 100) {
      errArry.push(CommonMessage.JSE033.replace("%s", "Template field label").replace("%s","100"));
    }
    if (editStatus == false) {
      checkDuplicateHeader(data,id);
    }
    if (editStatus == true) {
      checkDuplicateHeader(checkHeaderUpdate,id);
    }
    if (selectTypeValue == "") {
      errArry.push(CommonMessage.JSE019.replace("%s", "template field label type"));
    }
    if (selectTypeValue == 1 || selectTypeValue == 2 ||selectTypeValue == 3) {
      if (multiChooseField.length > 0) {
        multiChooseField.forEach((data, idx) => {
          if (data.value == "" || data.value.length == 0) {
            subErrArray.push({id: data.id,value: CommonMessage.JSE005.replace("%s", "add field label")});
          }else  if(data.value.match(/^ *$/) !== null) {
            subErrArray.push({id: data.id,value: CommonMessage.JSE005.replace("%s", "add field label")});
          }else if (data.value.length > 100) {
            subErrArray.push({id: data.id,value: CommonMessage.JSE033.replace("%s","Add field label").replace("%s", "100")});
          } else if ( data.value != "" || data.value.length > 0) {
            for (let j = 0; j < multiChooseField.length; j++) {
              if (idx !== j) {
                if (multiChooseField[idx].value.toString().toUpperCase().trim() == multiChooseField[j].value.toString().toUpperCase().trim()) {
                  subErrArray.push({id: data.id,value: CommonMessage.JSE032.replace("%s","add field").replace("%s", "label")});
                  break;
                }
              }
            }
          }
        });
      }
    }
    if (selectTypeValue == 2) {
      if ((levelId == 1 || levelId == 2) && !checkNullOrBlank(selectNumber)) {
        levelErr.push(CommonMessage.JSE005.replace("%s", "number"));
      } else if (levelId == 1 && (selectNumber <= 0 || selectNumber > 26)) {
        levelErr.push(CommonMessage.JSE030.replace("%s", "1").replace("%s", "26"));
      } else if (levelId == 2 && (selectNumber <= 0 || selectNumber > 10)) {
        levelErr.push(CommonMessage.JSE030.replace("%s", "1").replace("%s", "10"));
      }
    }
    if (selectTypeValue == 2) {
      if (levelId == 2) {
        for (let i = 1.0; i <= selectNumber; i += 0.5) {
          levelDataArr.push(i);
          setLevelData(levelDataArr);
        }
      } else if (levelId == 1) {
        for (let i = 0; i < selectNumber; i++) {
          levelDataArr.push(alphabet[i]);
        }
        setLevelData(levelDataArr);
      } else if (levelId == 3) {
        levelDataArr.push("Beginner", "Intermediate", "Advanced");
        setLevelData(levelDataArr);
      } else if (levelId == 0) {
        setLevelData(levelDataArr);
      }
    }
    if (editStatus == false) {
      if (errArry.length > 0 || subErrArray.length > 0 || levelErr.length > 0) {
        setError(errArry);
        setSubErrorField(subErrArray);
        setLevelNumErr(levelErr);
      } else {
        setSubErrorField([]);
        if (id == 1) {
          setData([...data,{heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: subHeading,level: {},id: dataId+1}]);//id: multiChooseField[multiChooseField.length - 1]["id"] + 1,
        } else if (id == 2) {
          setData([...data,{heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: subHeading,level: { level_cat: levelId, level_data: levelDataArr },id: dataId+1}]);
        } else if (id == 3) {
          setData([...data,{heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: subHeading,level: {},id: dataId+1}]);
        } else if (id == 4) {
          setData([...data,{  heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: [],level: {},id: dataId+1}]);
        } else if (id == 5) {
          setData([...data,{heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: [],level: {},id: dataId+1}]);
        } else if (id == 6) {
          setData([...data,{heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: [],level: {},id: dataId+1}]);
        } else if (id == 7) {
          setData([...data,{heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: [],level: {},id: dataId+1}]);
        } else if (id == 8) {
          setData([...data,{heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: [],level: {},id: dataId+1}]);
        }
        setShowTemplateCreateModal(false);
        document.body.style.overflow = "auto";
        setDataId(dataId+1)
      }
    }
    if (editStatus == true) {
      if (errArry.length > 0 || subErrArray.length > 0 || levelErr.length > 0) {
        setError(errArry);
        setSubErrorField(subErrArray);
        setLevelNumErr(levelErr);
      } else {
        setSubErrorField([]);
        let tmp = data;
        for (let i = 0; i <= tmp.length; i++) {
          if (i == index) {
            if (id == 1) {
              if (updateStatus == true) {
                tmp[index] = {heading_id: headingId[i],heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: subHeading,level: {}};
              } else {
                tmp[index] = {heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: subHeading,level: {},id: tmp[index].id};
              }
            } else if (id == 2) {
              if (updateStatus == true) {
                tmp[index] = {heading_id: headingId[i],heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: subHeading,level: { level_cat: levelId, level_data: levelDataArr }};
              } else {
                tmp[index] = {heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: subHeading,level: { level_cat: levelId, level_data: levelDataArr},id: tmp[index].id};
              }
            } else if (id == 3) {
              if (updateStatus == true) {
                tmp[index] = {heading_id: headingId[i],heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: subHeading,level: {}};
              } else {
                tmp[index] = {heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: subHeading,level: {},id: tmp[index].id};
              }
            } else if (id == 4) {
              if (updateStatus == true) {
                tmp[index] = {heading_id: headingId[i],heading_name: cap_label,type_id: id,require_flag: requireFlag};
              } else {
                tmp[index] = {heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: [],level: {},id: tmp[index].id};
              }
            } else if (id == 5) {
              if (updateStatus == true) {
                tmp[index] = {heading_id: headingId[i],heading_name: cap_label,type_id: id,require_flag: requireFlag};
              } else {
                tmp[index] = {heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: [],level: {},id: tmp[index].id};
              }
            } else if (id == 6) {
              if (updateStatus == true) {
                tmp[index] = {heading_id: headingId[i],heading_name: cap_label,type_id: id,require_flag: requireFlag};
              } else {
                tmp[index] = {heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: [],level: {},id: tmp[index].id};
              }
            } else if (id == 7) {
              if (updateStatus == true) {
                tmp[index] = {heading_id: headingId[i],heading_name: cap_label,type_id: id,require_flag: requireFlag};
              } else {
                tmp[index] = {heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: [],level: {},id: tmp[index].id};
              }
            } else if (id == 8) {
              if (updateStatus == true) {
                tmp[index] = {heading_id: headingId[i],heading_name: cap_label,type_id: id,require_flag: requireFlag};
              } else {
                tmp[index] = {heading_name: cap_label,type_id: id,require_flag: requireFlag,subheadings: [],level: {},id: tmp[index].id};
              }
            }
          }
        }
        setShowTemplateCreateModal(false);
        document.body.style.overflow = "auto";
      }
    }
    if(editStatus == false && (errArry.length == 0 && subErrArray.length == 0 && levelErr.length == 0)){
      setItemList([...itemList, (dataId +1).toString()])
    }
  };

  /**
   * drag and drop function
   * @author yaminzaw
   * @create 26/07/2022
   */
  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

    let main = data;let res = [];
    updatedList.forEach(up=>{
      main.forEach(data=>{
        if(parseInt(up) == data.id ){
          res.push(data)
        }
      })
    })
    setData(res);
    setItemList(updatedList);
  };

  /**
   * click done button
   * @author yaminzaw
   * @create 23/06/2022
   */
  const doneClick = () => {
    setSuccess([]);
    setMainErr([]);
    let mainErr = [];

    if (!checkNullOrBlank(title)) {
      mainErr.push(CommonMessage.JSE005.replace("%s", "template title"));
    } else  if(title.match(/^ *$/) !== null) {
      mainErr.push(CommonMessage.JSE005.replace("%s", "template title"));
    } else if (title.length > 100) {
      mainErr.push(CommonMessage.JSE033.replace("%s", "Template title").replace("%s", "100"));
    }
    if (mainErr.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setMainErr(mainErr);
    } else {
      setShowChooseTemplateModal(true);
      document.body.style.overflow = "hidden";
      setDiffImgOne(false);
      setDiffImgTwo(false);
      setDiffImgThree(false);
      setShowApplyBtn(false);
      setMainImgOne(true);
      setMainImgTwo(true);
      setMainImgThree(true);
      if (updateStatus == true) {
        if (layoutId == 1) {
          imgClick(1);
          setDiffImgOne(true);
          setMainImgOne(false);
          setMainImgTwo(true);
          setMainImgThree(true);
        } else if (layoutId == 2) {
          imgClick(2);
          setDiffImgTwo(true);
          setMainImgTwo(false);
          setMainImgOne(true);
          setMainImgThree(true);
        } else if (layoutId == 3) {
          imgClick(3);
          setDiffImgThree(true);
          setMainImgThree(false);
          setMainImgOne(true);
          setMainImgTwo(true);
        }
      }
    }
  };

  /**
   * click image among 3 image of template sample
   * @author yaminzaw
   * @create 23/06/2022
   * @param id
   */
  const imgClick = (id) => {
    setDiffImgOne(false);
    setDiffImgTwo(false);
    setDiffImgThree(false);
    if (id == 1) {
      setDiffImgOne(true);
      setMainImgOne(false);
      setMainImgTwo(true);
      setMainImgThree(true);
    } else if (id == 2) {
      setDiffImgTwo(true);
      setMainImgTwo(false);
      setMainImgOne(true);
      setMainImgThree(true);
    } else if (id == 3) {
      setDiffImgThree(true);
      setMainImgThree(false);
      setMainImgOne(true);
      setMainImgTwo(true);
    }
    setImgId(id);
    setShowApplyBtn(true);
  };

  /**
   * click apply button below image
   * @author yaminzaw
   * @create 23/06/2022
   * @param id
   */
  const applyClick = (id) => {
    setShowChooseTemplateModal(false);
    document.body.style.overflow = "auto";
    if((id== 2 || id == 3) && data.length < 8){
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      },300)
      setMainErr([CommonMessage.JSE035.replace("%s", "this template").replace("%s", "8 fields")]);
    }else{
      if (updateStatus) {
        setIdUpdate(id);
        setConfirmShow(true);
        setConfirmHeader("<h5 style='color:#7582ff'>Update Template</h5>");
        setConfirmContent("<p>Are you sure want to<span style='color:#7582ff'>&nbsp;update&nbsp;</span>this template?</p>");
        setConfirmType("update");
        setContentOk("Yes Update it");
      } else if (!updateStatus) {
        setLayoutId(id);
        setConfirmShow(true);
        setConfirmHeader("<h5 style='color:#7582ff'>Create Template</h5>");
        setConfirmContent("<p>Are you sure want to<span style='color:#7582ff'>&nbsp;create&nbsp;</span>this template?</p>");
        setConfirmType("save");
        setContentOk("Yes Create it");
      }
    }
  };

  /**
   * onClick (Ok) function of Yes button to create template
   * @author yaminzaw
   * @create 21/06/2022
   */
  const saveOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let cap_title = capitalizeWords(title);

    let saveTemplate = {
      method: "post",
      url: "/templates/save",
      params: {
        login_id: localStorage.getItem("LOGIN_ID"),
        title: cap_title,
        headings: data,
        layout_id: layoutId,
      },
    };
    let response = await ApiRequest(saveTemplate);
    if (response.flag === false) {
      setMainErr(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        localStorage.setItem("create_success", response.data.message);
        window.location.href = "/template-list";
      } else {
        setMainErr([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
  };

  /**
   * onClick (Ok) function of Yes button to update template
   * @author yaminzaw
   * @create 27/06/2022
   */
  const updateOK = async () => {
    setLoading(true);
    setConfirmShow(false);
    let cap_title = capitalizeWords(title);

    let updateTemplate = {
      method: "post",
      url: "/templates/update",
      params: {
        login_id: localStorage.getItem("LOGIN_ID"),
        template_id: templateUpId,
        title: cap_title,
        headings: data,
        layout_id: idUpdate,
      },
    };
    let response = await ApiRequest(updateTemplate);
    if (response.flag === false) {
      setMainErr(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        localStorage.setItem("create_success", response.data.message);
        window.location.href = "/template-list";
      } else {
        setMainErr([response.data.message]);
        setSuccess([]);
      }
    }
    setLoading(false);
  };

  /**
   * change format of Template Title and Heading
   * @author yaminzaw
   * @create 06/07/2022
   */
  const capitalizeWords = (text) => {
    let arr = text.split(" ");
    return arr
      .map((element) => {
          return (
            element.charAt(0).toUpperCase() + element.substring(1).toLowerCase()
          );
        return element;
      })
      .join(" ");
  }

  /**
   * click userGuide
   * @author yaminzaw
   * @create 23/06/2022
   */
  const userGuideClick = () => {
    setShowUserGuideModal(true);
    setMainErr([]);
  };

  return (
    <>
      <Loading start={loading} />
      <CCard className="template-list-cardBody">
        <CCardBody>
          <TemplateCreateForm
            handleChangeTitle={handleChangeTitle}
            title={title}
            addMoreInfoClick={addMoreInfoClick}
            data={data}
            remove={remove}
            edit={edit}
            userGuideClick={userGuideClick}
            doneClick={doneClick}
            error={mainErr}
            formTitle={formTitle}
            itemList={itemList}
            setItemList={setItemList}
            handleDrop={handleDrop}
            updateStatus={updateStatus}
          />
          <TemplateCreateModal
            show={showTemplateCreateModal}
            templateCreateModalCloseBtn={templateCreateModalCloseBtn}
            checked={checked}
            checkRequire={checkRequire}
            handleChangeLabel={handleChangeLabel}
            label={label}
            selectField={selectField}
            selectTypeOnChange={selectTypeOnChange}
            selectTypeValue={selectTypeValue}
            error={error}
            clickAddField={clickAddField}
            multiChooseField={multiChooseField}
            subLabelChange={subLabelChange}
            deleteFieldClick={deleteFieldClick}
            levelRadio={levelRadio}
            clickLevel={clickLevel}
            levelId={levelId}
            selectNumber={selectNumber}
            handleChangeNumber={handleChangeNumber}
            showCharacter={showCharacter}
            showNum={showNum}
            editStatus={editStatus}
            commonAddUpdate={commonAddUpdate}
            subError={subErrorField}
            levelNumError={levelNumError}
          />
          <ResumeConfirmMessage
            show={confirmShow}
            type={confirmType}
            header={confirmHeader}
            content={confirmContent}
            cancel={() => setConfirmShow(false)}
            deleteOK={deleteOK}
            saveOK={saveOK}
            updateOK={updateOK}
            okButton={contentOK}
            cancelButton={"Cancel"}
          />
          <TemplateChooseModal
            show={showChooseTemplateModal}
            applyClick={applyClick}
            imgClick={imgClick}
            showApplyBtn={showApplyBtn}
            imgId={imgId}
            diffImgOne={diffImgOne}
            diffImgTwo={diffImgTwo}
            diffImgThree={diffImgThree}
            mainImgOne={mainImgOne}
            mainImgTwo={mainImgTwo}
            mainImgThree={mainImgThree}
            cancel={() => {setShowChooseTemplateModal(false);document.body.style.overflow = "auto";}}
          />
          <UserGuideModal
            show={showUserGuideModal}
            closeBtn={() => setShowUserGuideModal(false)}
          />
        </CCardBody>
      </CCard>
    </>
  );
};
export default TemplateRegisterIndex;
