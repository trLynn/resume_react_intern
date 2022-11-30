/**  User Form Index
 *
 * @author Thu Rein Lynn
 *
 * @create 20/6/2022
 *
 */
import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import Loading from "../common/Loading";
import ResumeConfirmMessage from "../common/ResumeConfirmMessage";
import { useHistory } from "react-router-dom";
import CommonMessage from "../common/CommonMessage";
import Moment from "moment";
import { validateEmail, validateIntegerOnly,} from "../common/CommonValidation";
import { ApiRequest } from "../common/ApiRequest";

const UserFormIndex = () => {
  const [loading, setLoading] = useState(false); //For Loading
  const [checked, setChecked] = useState(false); //for check is require field or not
  const [downloadcheck, setDownloadcheck] = useState(0); //For Download Check
  const [value, setValue] = useState([]); //To Send Value for Save Api and Update Api
  const [applicantid, setApplicantID] = useState(); //for Applicant-ID FormLoad ID
  const [show, setShow] = useState(false); // Confirmation Box Show
  const [confirmType, setConfirmType] = useState(""); // confirmation box type
  const [confirmHeader, setConfirmHeader] = useState(""); // Conffirmation Header Type
  const [confirmContent, setConfirmContent] = useState(""); // Confirmation Content Type
  const [error, setError] = useState([]); //for Error Message
  const [success, setSuccess] = useState([]); //for Succsess Message
  const [heading, setHeading] = useState([]); //for Heading Data
  const [templatename, setTemplateName] = useState(""); //for Resume Content Name
  const [status, setStatus] = useState(); //for Applicant status
  const [editstatus, setEditStatus] = useState(false); // For Update Api Status
  const [headingname, setHeadingName] = useState([]); //For Error Message HeadingName
  const [image, setImage] = useState(""); //Image Attach
  const [imagepreviewurl, setImagePreviewUrl] = useState( "/image/selectpic.png" ); //For Image Preview URL
  const [filename, setFileName] = useState([]); // for file name in uploading file
  let user_email = JSON.parse(localStorage.getItem("USER_EMAIL"));//Session Data Email
  let template_id = JSON.parse(localStorage.getItem("TEMPLATE_ID"));//Session Data Template ID
  const history = useHistory(); // route Change state
  let list =""// for form load api heading list
  useEffect(() => {
    if (template_id == "" && template_id == null) {
      history.push(`/template/user-login/:id`);} 
    else {
      (async () => { await FormLoad(template_id, user_email);})();
    }
    document.body.style.overflowY = "auto";
    return ;
  }, []);
  //FormLoad API for applicant
  const FormLoad = async (id, email) => {
    setLoading(true);
    let err=[];
    let headname = [];
    let user_accept = localStorage.getItem("USER_ACCEPT");
    let obj = {method: "get", url: `/resume/applicant/form-load/${id}/${email}`};
    let response = await ApiRequest(obj);
    setTemplateName(response.data.data.template_name);
    if (user_accept != `${email}${id}`) {history.push(`/template/user-login/${id}`);}
    if (response.flag == false)
    {
      setError(response.message);
      if(response.message == "Template does not exist!" ){
            history.push(`/template/user-login/`+template_id);  
      }
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        setApplicantID(response.data.data.applicant_id);
        let arr = []; 
        let sub_value = [];
        let app_id = [];
        let sec_val = [];
        let app_info_id = 0;
        let cloud_file = "";
        let app_info_name = "";
        let sub_file = [];
        let app_link = [];
        list = response.data.data.headings;
        list.map((data) => {headname.push(data.heading_name);});
        setHeadingName(headname);
        if (response.data.data.applicant_id == null) {
          list.forEach((data) => {
            if (data.type_id != 2 && data.type_id != 7) {
              arr.push({
                heading_id: data.heading_id,
                type_id: data.type_id,
                required_flag: data.require_flag,
                heading_name: data.heading_name,
                value: "",
              });
            } else if (data.type_id == 7) {
              arr.push({
                heading_id: data.heading_id,
                type_id: data.type_id,
                required_flag: data.require_flag,
                heading_name: data.heading_name,
                value: [],
              });
            } else {
              data.subheadings.forEach((sub) => {
                if (data.levels == "") {
                  sub_value.push({
                    subheading_id: sub.subheading_id,
                    check: false,
                  });
                } else {
                  sub_value.push({
                    subheading_id: sub.subheading_id,
                    level_id: "",
                    level_name: "",
                    check: false,
                  });
                }
              });
              arr.push({
                heading_id: data.heading_id,
                type_id: data.type_id,
                required_flag: data.require_flag,
                heading_name: data.heading_name,
                value: sub_value,
              });
              sub_value = [];
            }
          });
          setValue(arr);
        } else {
          list.forEach((data) => {
            if (data.type_id != 2 && data.type_id != 7 && data.type_id != 8) {
              if (data.applicant_info.length > 0) {
                data.applicant_info.map((sec) => {
                  sec_val = sec.applicant_info_name;
                  app_id = sec.applicant_info_id;
                  app_info_id = sec.applicant_info_id;
                });}
              arr.push({
                heading_id: data.heading_id,
                type_id: data.type_id,
                required_flag: data.require_flag,
                heading_name: data.heading_name,
                applicant_info_id: app_id,
                value: sec_val,
              });
              sec_val = "";
            } else if (data.type_id == 8) {
              if (data.applicant_info.length > 0) {
                data.applicant_info.map((sec) => {
                  sec_val = sec.applicant_info_name;
                  cloud_file = sec.applicant_cloud_file;
                  setImagePreviewUrl(cloud_file);
                });}else{
                  setImagePreviewUrl("/image/selectpic.png")
                }
              arr.push({
                heading_id: data.heading_id,
                type_id: data.type_id,
                required_flag: data.require_flag,
                heading_name: data.heading_name,
                value: cloud_file,
                applicant_link_id: app_info_id.toString(),
              });   
            } else if (data.type_id == 7) {
              if (data.applicant_info.length > 0) {
                data.applicant_info.map((sec) => {
                  sec_val = sec.applicant_file;
                  cloud_file = sec.applicant_cloud_file;
                  app_id = sec.applicant_info_id.toString();
                  app_info_name = sec.applicant_info_name;
                  filename.push(sec_val)
                  if (data.applicant_info != "") {
                    sub_file.push({
                      data: app_info_name,
                      name: sec_val,
                    });
                    app_link.push({
                      applicant_link_id: app_id,
                      applicant_link: app_info_name,
                    });}
                     else {
                    sub_file.push({
                      data: "",
                      name: "",
                    });
                    app_link.push({
                      applicant_link_id: "",
                      applicant_link: "",
                    });
                  }
                });
                arr.push({
                  heading_id: data.heading_id,
                  type_id: data.type_id,
                  required_flag: data.require_flag,
                  heading_name: data.heading_name,
                  value: sub_file,
                  applicant_links: app_link,
                  applicant_info_id: app_id,
                });
              } else {
                arr.push({
                  heading_id: data.heading_id,
                  type_id: data.type_id,
                  required_flag: data.require_flag,
                  heading_name: data.heading_name,
                  value: [],
                });
              }
            } else {
              if (data.applicant_info.length > 0) {
                data.subheadings.forEach((sub) => {
                  let flg = false;
                  data.applicant_info.forEach((sec) => {
                    if (sub.subheading_name == sec.applicant_info_name) {
                      let level = "";
                      data.levels.map((levels) => {
                        if (sec.applicant_info_level == levels.level_name) {
                          level = levels.level_id;
                        }
                      });
                      if (sec.applicant_info_level != null) {
                        sub_value.push({
                          subheading_id: sub.subheading_id,
                          level_id: level,
                          level_name: sec.applicant_info_level,
                          applicant_info_id: sec.applicant_info_id,
                          check: sec.applicant_info_level == null ? false : true,
                        });
                      } else {
                        sub_value.push({
                          subheading_id: sub.subheading_id,
                          check: true,
                        });
                      }
                      flg = true;
                    }
                  });
                  if(!flg) {
                    if (data.levels == "") {
                      sub_value.push({
                        subheading_id: sub.subheading_id,
                        check: false,
                      });
                    } else {
                      sub_value.push({
                        subheading_id: sub.subheading_id,
                        level_id: "",
                        level_name: "",
                        check: false,
                      });
                    }
                  }
                });
              }
              arr.push({
                heading_id: data.heading_id,
                type_id: data.type_id,
                required_flag: data.require_flag,
                heading_name: data.heading_name,
                value: sub_value,
              });
              sub_value = [];
            }
          });
          setValue(arr);
          setEditStatus(true);
        }
        setError([]); setHeading(response.data.data.headings);setStatus(response.data.data.status);
      }else {setError(response.data.data.message);setSuccess([]);window.scrollTo({ top: 0, left: 0, behavior: "smooth" });}
    }
    if(response.data.data.status==2){err.push("This form has already been rejected.")}
    if(response.data.data.status==3){err.push("This form has already been processed.")}
    if(response.data.data.status==4){err.push("This form has already been passed.")}
    if(response.data.data.status==5){err.push("This form has already failed.")}
    setError(err)
    setLoading(false);
  };
  //Applicant User Info Save and Update
  const SaveData = () => {
    let err = [];
    const re = /^[0-9\b]|[၀-၉\b]+$/;
   // const re_mm=/^+$/;
    //Error Message For All Form
    value.map((data) => {
      headingname.map((name) => {
        if (data.heading_name == name) {
          if (data.value == "" && data.type_id == 1 && data.required_flag == 1 )
          {
            err.push(CommonMessage.JSE001.replace("%s", name));
          }
          if (data.value == "" && data.type_id == 3 && data.required_flag == 1)
          {
            err.push(CommonMessage.JSE001.replace("%s", name));
          }
          if (data.value == "" &&data.type_id == 4 && data.required_flag == 1)
          {
            err.push(CommonMessage.JSE005.replace("%s", name));
          }
          if (data.value!="" && data.type_id == 4 &&  data.heading_name.toLowerCase().includes("email")  && data.required_flag == 1 && 
          !validateEmail(data.value))
          {
            err.push("Invalid "+name+" Address");
          }
          else if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("email")  && data.required_flag == 2 && !validateEmail(data.value))
          {
            err.push("Invalid "+name+" Address");
          }
           else if (data.value!="" && data.type_id == 4 && data.heading_name.includes("အီးမေး")  && data.required_flag == 1 && 
            !validateEmail(data.value))
          {
            err.push("Invalid "+name+" Address");
          }
          else if (data.value!="" && data.type_id == 4 && data.heading_name.includes("အီးမေး")  && data.required_flag == 2 && 
          !validateEmail(data.value))
          {
            err.push("Invalid "+name+" Address");
          }
           if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("phone") && data.required_flag == 1 &&
            !re.test(data.value) ) 
          { 
            err.push(CommonMessage.JSE030.replace("%s", "0").replace("%s", "9").concat(" at "+name," Field"));
          }
          if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("phone") && data.required_flag == 1 &&
          !validateIntegerOnly(data.value) ) 
        { 
          err.push(CommonMessage.JSE030.replace("%s", "0").replace("%s", "9").concat(" at "+name," Field"));
        }
        if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("phone") && data.required_flag == 2 &&
        !validateIntegerOnly(data.value) ) 
      { 
        err.push(CommonMessage.JSE030.replace("%s", "0").replace("%s", "9").concat(" at "+name," Field"));
      }
          else if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("phone") && data.required_flag == 2 &&
          !re.test(data.value)) 
          { 
            err.push(CommonMessage.JSE030.replace("%s", "0").replace("%s", "9").concat(" at "+name," Field"));
          }
          else if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("ဖုန်း") && data.required_flag == 1 &&
          !re.test(data.value)) 
          { 
            err.push(CommonMessage.JSE030.replace("%s", "0").replace("%s", "9").concat(" at "+name," Field"));
          }
          else if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("ဖုန်း") && data.required_flag == 1 &&
          !validateIntegerOnly(data.value)) 
          { 
            err.push(CommonMessage.JSE030.replace("%s", "0").replace("%s", "9").concat(" at "+name," Field"));
          }
          else if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("ဖုန်း") && data.required_flag == 2 &&
          !validateIntegerOnly(data.value)) 
          { 
            err.push(CommonMessage.JSE030.replace("%s", "0").replace("%s", "9").concat(" at "+name," Field"));
          }
          else if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("ဖုန်း") && data.required_flag == 2 &&
          !re.test(data.value)) 
          { 
            err.push(CommonMessage.JSE030.replace("%s", "0").replace("%s", "9").concat(" at "+name," Field"));
          }
           if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("age") && data.required_flag == 1 &&
            !re.test(data.value)) 
          { 
            err.push(CommonMessage.JSE030.replace("%s", "0").replace("%s", "9").concat(" at "+name," Field"));
          }
          else if (data.value!="" && data.type_id == 4 && data.heading_name.toLowerCase().includes("age") && data.required_flag == 2 &&
          !re.test(data.value)) 
          { 
            err.push(CommonMessage.JSE030.replace("%s", "0").replace("%s", "9").concat(" at "+name," Field"));
          }
          // if(data.type_id == 4  && data.value !="" && data.value.match(/^ *$/) !== null  && data.required_flag == 1 && data.heading_name.toLowerCase().includes("name") )
          // { 
          //     err.push(CommonMessage.JSE005.replace("%s","Text on "+name)) 
          // }
          if(data.type_id == 4  && data.value !="" && data.value.match(/^ *$/) !== null && data.required_flag == 1 && data.heading_name.toLowerCase().includes("name"))
          { 
              err.push(CommonMessage.JSE005.replace("%s","Text on "+name)) 
          }
          if(data.type_id == 4  && data.value !="" && data.value.match(/^ *$/) !== null && data.required_flag == 1 && data.heading_name.toLowerCase().includes("နာမည်"))
          { 
              err.push(CommonMessage.JSE005.replace("%s","Text on "+name)) 
          }
          if(data.type_id == 4  && data.value !="" && data.value.match(/^ *$/) !== null && data.required_flag == 1 && data.heading_name.toLowerCase().includes("email"))
          { 
              err.push(CommonMessage.JSE005.replace("%s","Text on "+name)) 
          }
          if(data.type_id == 4  && data.value !="" && data.value.match(/^ *$/) !== null && data.required_flag == 1 && data.heading_name.toLowerCase().includes("အီးမေး"))
          { 
              err.push(CommonMessage.JSE005.replace("%s","Text on "+name)) 
          }
          // if(data.type_id == 4  && data.value !="" && data.value.match(/^ *$/) !== null  && data.required_flag == 2 )
          // { 
          //     err.push(CommonMessage.JSE005.replace("%s","Text on "+name)) 
          // }
          else if(data.type_id == 4  && data.value !="" && data.value.match(/^ *$/) !== null  && data.required_flag == 1  && data.heading_name.toLowerCase().includes("phone"))
          { 
              err.push(CommonMessage.JSE005.replace("%s","Number on "+name)) 
          }
         else if(data.type_id == 4  && data.value !="" && data.value.match(/^ *$/) !== null  && data.required_flag == 1 &&  data.heading_name.toLowerCase().includes("ဖုန်း"))
          { 
            err.push(CommonMessage.JSE005.replace("%s","Number on "+name)) 
          }
          if(data.type_id == 4 && data.value!="" && data.value.length>11 && data.heading_name.toLowerCase().includes("phone")){
            err.push(name+" must be less than 12 characters")
          }
          if(data.type_id == 4 && data.value!="" && data.value.length>11 && data.heading_name.toLowerCase().includes("ဖုန်း")){
            err.push(name+" must be less than 12 characters")
          }
          if(data.type_id == 4 && data.value!="" && data.value.length>50 && data.heading_name.toLowerCase().includes("email")){
            err.push(name+" must be less than 50 characters")
          }
          if(data.type_id == 4 && data.value!="" && data.value.length>50 && data.heading_name.toLowerCase().includes("အီးမေး")){
            err.push(name+" must be less than 50 characters")
          }
          if(data.type_id == 4  && data.value !="" && data.value.length>255 && data.heading_name.toLowerCase().includes("name")){ 
              err.push(CommonMessage.JSE033.replace("%s",name).replace("%s", "255"))  
          }
          if(data.type_id == 4  && data.value !="" && data.value.length>255 && data.heading_name.toLowerCase().includes("နာမည်")){ 
            err.push(CommonMessage.JSE033.replace("%s",name).replace("%s", "255"))  
        }
          if(data.type_id == 5 && data.value !="" && data.value.length > 1500)
          {
              err.push(CommonMessage.JSE033.replace("%s",name).replace("%s", "1500"))
          }
          if ( data.value == "" && data.type_id == 5 &&  data.required_flag == 1) 
          {
            err.push(CommonMessage.JSE005.replace("%s", name));
          }
          if (data.value == "" && data.type_id == 6 && data.required_flag == 1)
          {
            err.push(CommonMessage.JSE005.replace("%s", name));
          }
          if (data.value == "" && data.type_id == 7 && data.required_flag == 1) 
          {
            err.push(CommonMessage.JSE001.replace("%s", name));
          }
          if (data.value == "" && data.type_id == 8 && data.required_flag == 1) 
          {
            err.push(CommonMessage.JSE001.replace("%s", name));
          }
          if (data.type_id == 2 && data.required_flag == 1 )  
          {
            let isCheck = false;
            let isSelect = true;
            data.value.map((checkbox) => {
              if (checkbox.check) {
                isCheck = true;
                // select
                if (checkbox.level_id == "") {
                  isSelect = false;
                }
              }
            });
            if (!isSelect) {
              err.push(CommonMessage.JSE001.replace("%s", name)+" Level")
            }
            if (!isCheck) {
              err.push(CommonMessage.JSE001.replace("%s", name));
            }
          }
          if (data.type_id == 2 && data.required_flag == 2 ) 
          {
            let isCheck = false;
            let isSelect = true;
            data.value.map((checkbox) => {
              if (checkbox.check) {
                isCheck = true;
                // select
                if (checkbox.level_id == "") {
                  isSelect = false;
                }
              }
            });
            if(isCheck){
              if (!isSelect) { err.push(CommonMessage.JSE001.replace("%s", name)+" Level")}
            }   
          }
        } 
      });
    });
    if (filename.length > 10) {err.push("The number of files has exceeded.Maximum upload files limit is 10");}  
    //If No Error Save and Update ConfirmBox Pop-up
    if ((!editstatus) && err == "" || err == null) {
      setError([]);
      setShow(true);
      setConfirmHeader("<h5 style='color:green'>Applicant Informations</h5>");
      setConfirmContent("<p>Are you sure want to<span style='color:green'>&nbsp;Save &nbsp;</span>this informations</p>");
      setConfirmType("save");
    } 
   else if((editstatus) && err == "" || err == null) {
      setError([]);
      setShow(true);
      setConfirmHeader("<h5 style='color:green'>Applicant Informations</h5>");
      setConfirmContent("<p>Are you sure want to<span style='color:green'>&nbsp;Update &nbsp;</span>this informations</p>");
      setConfirmType("update");
    } 
    else {setError(err);setSuccess([]);window.scrollTo({ top: 0, left: 0, behavior: "smooth" });}
  };
  //Confirmation Box Save Function
  const saveOK = async () => {
    setLoading(true);
    setShow(false);
    if (downloadcheck == 1){
      let obj = {method: "post", url: "/applicant/save",
        params: {
          template_id: template_id,
          applicant_email: user_email,
          template_name:templatename,
          fields: value,
          checked: downloadcheck,
        },
        type: "blob",
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message);
        if(response.message == "This template is no longer avaliable. For more info, please contact with admin!" ){
          setTimeout(() => {
              history.push(`/template/user-login/`+template_id);
          },2500)
        }
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.statusText == "OK") {
          let tmpName = "";
          let getHeader = response.headers["content-disposition"];
          // check header contains utf-8 encoding
          if (getHeader.indexOf("filename*=utf-8") !== -1) {
            // get only utf-8 file name from getHeader variable
            tmpName = getHeader.split("filename*=utf-8")[1];
            tmpName = decodeURIComponent(tmpName);
          } else {
            tmpName = getHeader.split("filename=")[1];
          }
          let filename = tmpName.replace(/['"]+/g, "");
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          let arr = [];
          let sub_value = [];
          heading.forEach((sec) => {
            if (sec.type_id != 2 && sec.type_id != 7 &&sec.type_id != 6) {
              arr.push({
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: "",
              });}
              else if (sec.type_id == 6){
              arr.push({
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value:""
              });}
             else if (sec.type_id == 7) {
              arr.push({
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: [],
              });}
               else {
              sec.subheadings.forEach((sub) => {
                if (sec.levels == "") {
                  sub_value.push({
                    subheading_id: sub.subheading_id,
                    check: false,
                  });
                } else {
                  sub_value.push({
                    subheading_id: sub.subheading_id,
                    level_id: "",
                    level_name: "",
                    check: false,
                  });
                }
              });
              arr.push({
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: sub_value,
              });
              sub_value = [];
            }
          });
          setValue(arr);
          setChecked(checked.is_checked==false);
          setFileName([]);
          setImagePreviewUrl("/image/selectpic.png");
          localStorage.removeItem("EMAIL_VERIFIED");
          localStorage.removeItem("USER_ACCEPT");
          setError([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          setSuccess(["This form is successfully submitted to Admin"]);
        } 
         else {
          setError([response.data.message]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    } else {
      let obj = { method: "post", url: "/applicant/save",
        params: {
          template_id: template_id,
          applicant_email: user_email,
          template_name:templatename,
          fields: value,
          checked: downloadcheck,
        }
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message);
        if(response.message == "This template is no longer avaliable. For more info, please contact with admin!" ){
          setTimeout(() => {
              history.push(`/template/user-login/`+template_id);
          },2500)
        }
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.data.status == "OK") {
          let arr = [];
          let sub_value = [];
          heading.forEach((sec) => {
            if (sec.type_id != 2 && sec.type_id != 7 &&sec.type_id != 6) {
              arr.push({
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: "",
              });}
              else if (sec.type_id == 6){
              arr.push({
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value:""
              });}
             else if (sec.type_id == 7) {
              arr.push({
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: [],
              });}
               else {
              sec.subheadings.forEach((sub) => {
                if (sec.levels == "") {
                  sub_value.push({
                    subheading_id: sub.subheading_id,
                    check: false,
                  });
                } else {
                  sub_value.push({
                    subheading_id: sub.subheading_id,
                    level_id: "",
                    level_name: "",
                    check: false,
                  });
                }
              });
              arr.push({
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: sub_value,
              });
              sub_value = [];
            }
          });
          setValue(arr);
          setFileName([]);
          setImagePreviewUrl("/image/selectpic.png");
          localStorage.removeItem("EMAIL_VERIFIED");
          localStorage.removeItem("USER_ACCEPT");
          setError([]);
          setSuccess([response.data.message]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });  
        }    
        else {
          setError([response.data.message]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }}
    setLoading(false);
  };
  // Confirmation Box Update Function
  const updateOK = async () => {
    setLoading(true);
    setShow(false);
    if (downloadcheck == 1) {
      let obj = { method: "put",  url: "/applicant/update",
        params: {
          template_id: template_id,
          applicant_id: applicantid,
          template_name:templatename,
          fields: value,
          checked: downloadcheck,
        },
        type: "blob",
      };
      let response = await ApiRequest(obj);
    
      if (response.flag === false) {    
        setError(response.message);
        if(response.message == "This template is no longer avaliable. For more info, please contact with admin!" ){
          setTimeout(() => {
              history.push(`/template/user-login/`+template_id);
          },2500)
        }
        if(response.message == "Admin is deleted You!" ){
          setTimeout(() => {
            history.push(`/template/user-login/`+template_id); 
          }, 2500);
        }
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.statusText == "OK") {
          setError([]);
          let tmpName = "";
          let getHeader = response.headers["content-disposition"];
          // check header contains utf-8 encoding
          if (getHeader.indexOf("filename*=utf-8") !== -1) {
            // get only utf-8 file name from getHeader variable
            tmpName = getHeader.split("filename*=utf-8")[1];
            tmpName = decodeURIComponent(tmpName);
          } else {
            tmpName = getHeader.split("filename=")[1];
          }
          let filename = tmpName.replace(/['"]+/g, "");
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          let arr = [];
          let sub_value = [];
          let app_info_id="";
          heading.forEach((sec) => {
            if (sec.type_id != 2 && sec.type_id != 7  && sec.type_id!=8) {
              if (sec.applicant_info.length > 0) {
                sec.applicant_info.map((sec) => {
                  app_info_id = sec.applicant_info_id;
                });}
              arr.push({
                applicant_info_id:app_info_id,
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: "",
              });}   
             else if (sec.type_id == 7) {
              if (sec.applicant_info.length > 0) {
                sec.applicant_info.map((sec) => {
                  app_info_id = sec.applicant_info_id;
                });}
              arr.push({
                applicant_info_id:app_info_id,
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: [],
              });}
              else if (sec.type_id == 8){
                arr.push({
                  applicant_info_id:app_info_id,
                  heading_id: sec.heading_id,
                  type_id: sec.type_id,
                  required_flag: sec.require_flag,
                  heading_name: sec.heading_name,
                  value: ""
                });}
               else {
              sec.subheadings.forEach((sub) => {
                if (sec.applicant_info.length > 0) {
                  sec.applicant_info.map((sec) => {
                    app_info_id = sec.applicant_info_id;
                  });}
                if (sec.levels == "") {
                  sub_value.push({
                    subheading_id: sub.subheading_id,
                    check: false,
                  });
                } else {
                  sub_value.push({
                    subheading_id: sub.subheading_id,
                    level_id: "",
                    level_name: "",
                    check: false,
                  });
                }
              });
              arr.push({
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: sub_value,
              });
              sub_value = [];
            }
          });
          setValue(arr);
          setFileName([]);
          setImagePreviewUrl("/image/selectpic.png");
          localStorage.removeItem("EMAIL_VERIFIED");
          localStorage.removeItem("USER_ACCEPT");
          setChecked(checked.is_checked==false)
          setError([]);
          setSuccess(["Successfully Update!"]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          setError([response.data.message]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    } else {
      let obj = {method: "put", url: "/applicant/update", 
      params: {
          template_id: template_id,
          applicant_id: applicantid,
          template_name:templatename,
          fields: value,
          checked: downloadcheck,
        },
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message);
        if(response.message == "This template is no longer avaliable. For more info, please contact with admin!" ){
          setTimeout(() => {
              history.push(`/template/user-login/`+template_id);
          },2500)
        }
        if(response.message == "Admin is deleted You!" ){
          setTimeout(() => {
              history.push(`/template/user-login/`+template_id);
          }, 2500); 
        }
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.data.status == "OK") {
          let arr = [];
          let sub_value = [];
          let app_info_id=""
          heading.forEach((sec) => {
            if (sec.type_id != 2 && sec.type_id != 7  && sec.type_id!=8) {
              if (sec.applicant_info.length > 0) {
                sec.applicant_info.map((sec) => {
                  app_info_id = sec.applicant_info_id;
                });}
              arr.push({
                applicant_info_id:app_info_id,
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: "",
              });}   
             else if (sec.type_id == 7) {
              if (sec.applicant_info.length > 0) {
                sec.applicant_info.map((sec) => {
                  app_info_id = sec.applicant_info_id;
                });}
              arr.push({
                applicant_info_id:app_info_id.toString(),
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: [],
              });}
              else if (sec.type_id == 8){
                arr.push({
                  applicant_info_id:app_info_id.toString(),
                  heading_id: sec.heading_id,
                  type_id: sec.type_id,
                  required_flag: sec.require_flag,
                  heading_name: sec.heading_name,
                  value: ""
                });}
               else {
              sec.subheadings.forEach((sub) => {
                if (sec.applicant_info.length > 0) {
                  sec.applicant_info.map((sec) => {
                    app_info_id = sec.applicant_info_id;
                  });}
                if (sec.levels == "") {
                  sub_value.push({
                    subheading_id: sub.subheading_id,
                    check: false,
                  });
                } else {
                  sub_value.push({
                    subheading_id: sub.subheading_id,
                    level_id: "",
                    level_name: "",
                    check: false,
                  });
                }
              });
              arr.push({
                heading_id: sec.heading_id,
                type_id: sec.type_id,
                required_flag: sec.require_flag,
                heading_name: sec.heading_name,
                value: sub_value,
              });
              sub_value = [];
            }
          });
          setValue(arr);
          setFileName([]);
          setImagePreviewUrl("/image/selectpic.png");
          localStorage.removeItem("EMAIL_VERIFIED");
          localStorage.removeItem("USER_ACCEPT");
          setError([]);
          setSuccess([response.data.message]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
          setError([response.data.message]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    } 
    setLoading(false);
  };
  // PDF Download for Applicant Template Checked and Unchecked
  const DownloadCheck = (e) => {
    let check = e.target.checked;
    setChecked(check)
    if (check) {setDownloadcheck(1);} 
    else {setDownloadcheck(0);}
  };
   // for Type ID one Dropdown change function Select Box
   const typeIDOneDropDownChange = (id, val) => {
    let res = value.map((data) => {
      if (data.heading_id == id) {data.value = val.target.value; return data;}
      return data;
    });
    setValue(res);
  };
  // for type ID two check-box change function 
  const typeIDTwoChange = (id, checkId) => {
    let res=[];
     res = value.map((data) => {
      if (data.heading_id == id) {
        if (data.value.length > 0) {
          data.value.map((sub) => {
            if (sub.subheading_id === checkId) {sub.check = !sub.check;return sub;}
            return data;
          });
        }
      }
      return data;
    });
    setValue(res);
  };
  // for Type ID two dropdown change function Select Box
  const typeIDTwoDropDownChange = (id, checkId, e) => {
    let res = value.map((data) => {
      if (data.value.length > 0) {
        if (data.heading_id == id) {
          data.value.map((sub) => {
            if (sub.subheading_id == checkId) {
              if ( e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text =="---Select---") 
              {
                sub.level_id = "";
                sub.level_name = "";
              }
               else {
                sub.level_id = e.target.value;
                sub.level_name =
                e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text;
              }
              return sub;
            }
            return data;
          });
        }
      }
      return data;
    });
    setValue(res);
  };
  // for Type ID three radio button change function
  const typeIDThreeChange = (id, val, name) => {
    let res = value.map((data) => {
      if (data.heading_id == id) {data.value = name; return data;}
      return data;
    });
    setValue(res);
  };
   // for type ID four text change function 
   const typeIDFourChange = (id, val) => {
    let res = value.map((data) => {
      if (data.heading_id == id) {data.value = val.target.value; return data;}
      return data;
    });
    setValue(res);
  };
  //for Type ID five text area change function
  const typeIDFiveChange = (id, val) => {
    let res = value.map((data) => {
      if (data.heading_id == id) {data.value = val.target.value; return data;}
      return data;
    });
    setValue(res);
  };
  //for Type ID six Date Change Function
  const typeIDSixChange = (id, val) => {
    let date = "";
    if(val != null){date= Moment(val).format("YYYY-MM-DD");}
    let res = value.map((data) => {
      if (data.heading_id == id) {data.value = date;return data;}
      return data;
    });
    setValue(res);
  };
 //for Type ID seven File Change Function
 const typeIDSevenChange = (id, val) => {
  let res = [];
  let base64data = "";
  let tmp = [];
  let File = val.target.files;
  let fSize =''
  let size=''
  let name=''
  setLoading(true)
  for (let i = 0; i < File.length; i++) {
    var reader = new FileReader();
    reader.readAsDataURL(File[i]);
    reader.onloadend= () => {
      base64data = reader.result;
      fSize=File[i].size
      name =File[i].name;
       size = Math.round(fSize / 1024); 
       if(size > 30000)
       {
        setSuccess([])
         setError([CommonMessage.JSE014.replace("%s","This file's size").replace("%s","30M")]);
         setFileName(filename);
         window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
       }
       else{
        setError([]);
        res = value.map((data) => {  
          if (data.heading_id == id ) {
            data.value.push({ data: base64data, name: name });
            filename.map((i)=> {
              if(i==name){
                setError([CommonMessage.JSE022])
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                value.map((subData)=> {
                  if(subData.value.length > 0){
                    if(subData.heading_id==id){ setError([CommonMessage.JSE022])
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                      subData.value.pop();
                    }     
                  }
                })
              }
            })
            return data;
          }
          return data;
        });
        
        if (i == File.length - 1) {
          let filtered = res.filter((item) => {
            return item.heading_id == id;
          });
          filtered[i].value.map((element) => {
            tmp.push(element.name);
          });
        }setValue(res);setFileName(tmp);
       }
    };
  } setLoading(false);
 // setFileName(tmp);
};
  // Clear File Attach
  const Clear = (file, e) => {
    let arr;  let res = [];
    arr = filename.filter((d) => { return file != d;});
    setFileName(arr);
    res = value.map((data) => {
       if (data.heading_id == e) {
        let filter = data.value.filter(el => {return arr.includes(el.name);})  
         data.value = [...filter];
        return data;
       }
      return data;
    });
    setValue(res);};
// Clear FileList from input file
  const clearFile = (id,val) => {val.target.value = null; }
  //for Type ID eight Image Upload Change Function
  const typeIDEightChange = (id, val) => {
    let res = "";
    let base64data = "";
    let File = val.target.files;
    if(File.length>0){
    let tmp = File[0].type.split("/");
      let fSize = File[0].size;
      const size = Math.round(fSize / 1024);
      if (size > 10000 && 
        (tmp[1].toLowerCase() == "png" ||tmp[1].toLowerCase() == "jpg" ||tmp[1].toLowerCase() == "jpeg" )) 
      {
        setSuccess([])
       setError([CommonMessage.JSE014.replace("%s","This Image File's size").replace("%s","10M")])
       setImagePreviewUrl("");
       setImagePreviewUrl(imagepreviewurl)
       window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      else if (size > 10000 && ( 
        tmp[1].toLowerCase() == "pdf" ||
        tmp[1].toLowerCase() == "vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        tmp[1].toLowerCase() == "mpeg" ||
        tmp[1].toLowerCase() == "svg" ||
        tmp[1].toLowerCase() == "plain" ||
        tmp[1].toLowerCase() == "gif" ||
        tmp[1].toLowerCase() == "webp" )) 
      {
        setSuccess([])
       setError([CommonMessage.JSE024])
       setImagePreviewUrl(imagepreviewurl)
       window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      else if (tmp.length < 2 ||(
        tmp[1].toLowerCase() == "pdf" ||
        tmp[1].toLowerCase() == "vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        tmp[1].toLowerCase() == "mpeg" ||
        tmp[1].toLowerCase() == "svg" ||
        tmp[1].toLowerCase() == "plain" ||
        tmp[1].toLowerCase() == "gif" ||
        tmp[1].toLowerCase() == "webp" 
          )
      ) {   
        setSuccess([])
        setError([CommonMessage.JSE024])
        setImagePreviewUrl(imagepreviewurl)
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } 
      else{
        setError([])
        var reader = new FileReader();
        reader.readAsDataURL(File[0]);
        reader.onload = function () {base64data = reader.result; setImagePreviewUrl(base64data);
          res = value.map((data) => {if (data.heading_id == id) {data.value = base64data; return data;}return data;});
          setValue(res);
        };
        let img = val.target.files[0];
        setImage(img);
        }  
    }
    val.target.value=null
  };
  const ClearImage=(id,e)=>{
    let res=value.map((data)=>{
      if(data.heading_id==id){
          data.value=""
      }
      return data
    })
    setValue(res)
    setImagePreviewUrl("/image/selectpic.png")
  }
  return ( <>
      <Loading start={loading} />
      <ResumeConfirmMessage show={show} type={confirmType} header={confirmHeader} content={confirmContent}
        cancel={() => setShow(false)} saveOK={saveOK} updateOK={updateOK} okButton={"Yes"} cancelButton={"Cancel"} />
      <UserForm heading={heading} checked={checked} value={value} image={image} status={status} success={success} error={error}
        filename={filename} headingname={headingname} imagepreviewurl={imagepreviewurl} templatename={templatename}
        editstatus={editstatus} Clear={Clear} SaveData={SaveData} DownloadCheck={DownloadCheck}
        typeIDOneDropDownChange={typeIDOneDropDownChange} typeIDTwoChange={typeIDTwoChange}
        typeIDTwoDropDownChange={typeIDTwoDropDownChange} typeIDThreeChange={typeIDThreeChange} 
        typeIDFourChange={typeIDFourChange} typeIDFiveChange={typeIDFiveChange} typeIDSixChange={typeIDSixChange}  
        typeIDSevenChange={typeIDSevenChange} typeIDEightChange={typeIDEightChange} clearFile={clearFile} ClearImage={ClearImage} 
        />
    </>
  );
};
export default UserFormIndex;
