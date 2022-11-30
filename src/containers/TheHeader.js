import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
  CInput,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import EventEmitter from "../views/utils/EventEmitter";
import { ApiRequest } from "../views/common/ApiRequest";
import Loading from "../views/common/Loading";

// routes config
import routes from "../routes";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";

const TheHeader = () => {
  const [flagId, setFlagId] = useState(""); // flag status from template List
  const [searchData, setSearchData] = useState(""); // value to send data from search box
  const [loading, setLoading] = useState(false); // loading condition
  let [rout, setRout] = useState([]);
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  let tempIndex; // temporaray index for table index

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  useEffect(() => {
    let ro = routes;
    for (let i = 0; i < ro.length; i++) {
      ro[i].name = ro[i].name;
    }
    setRout(ro);

    const onActive = (eventData) => {
      setFlagId(eventData.flagId);
    };
    const listener = EventEmitter.addListener("active", onActive);
    return () => {
      listener.remove();
    };
  }, [rout]);

  //  Search function from DB (API)
  const searchClick = async () => {
    setLoading(true);
    let obj = {
      method: "get",
      url: `/templates/search`,
      params: {
        login_id: localStorage.getItem("LOGIN_ID"),
        name: searchData,
        active_flag: flagId,
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      EventEmitter.emit("NewLog", {
        error: response.message,
        searchData: searchData,
        tempIndex: 0,
      });
    } else {
      if (response.data.status === "OK") {
        EventEmitter.emit("NewLog", {
          tempIndex: (response.data.data.current_page - 1) * 20,
          copied: "",
          error: response.data.message,
          searchData: searchData,
          success: response.data.message,
          mainTableData: response.data.data.data,
          totalRow: response.data.data.total,
          current_page: response.data.data.current_page,
          last_page: response.data.data.last_page,
        });
      } else {
        EventEmitter.emit("NewLog", {
          error: response.data.message,
          searchData: searchData,
          tempIndex: 0,
        });
      }
    }
  };

  // onChange function for search box
  const inputChange = (e) => {
    setSearchData(e.target.value);
    EventEmitter.emit("direct", {
      searchData: e.target.value,
    });
  };

  // Key handler function for search box
  const keyHandler = (e) => {
    if (e.key == "Enter") {
      searchClick();
    }
  };

  return (
    <>
      <Loading start={loading} />
      <CHeader withSubheader className="templateList-heading">
        <div className="icon-path-style">
          <CToggler
            inHeader
            className="ml-md-3 d-lg-none"
            onClick={toggleSidebarMobile}
          />
          <CToggler
            inHeader
            className="ml-3 d-md-down-none"
            onClick={toggleSidebar}
          />
          {/* <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <h1>Logo</h1>
      </CHeaderBrand> */}

          <CHeaderNav>
            <CHeaderNavItem className="px-3 responsive-heading">
              <CBreadcrumbRouter
                className="border-0 c-subheader-nav m-0 px-0 px-md-0"
                routes={rout}
              />
            </CHeaderNavItem>
            {/* <CHeaderNavItem  className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem> */}
          </CHeaderNav>
        </div>
        <div className="pc-search">
          {window.location.pathname == "/template-list" && (
            <>
              <CInput
                type="text"
                className="search-button"
                placeholder="search everything"
                onChange={inputChange}
                onKeyDown={keyHandler}
              />
              <CImg
                onClick={searchClick}
                className="search-img cursorStyle"
                src="./image/search.svg"
              ></CImg>
            </>
          )}
        </div>

        {/* <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif/>
        <TheHeaderDropdownTasks/>
        <TheHeaderDropdownMssg/>
        <TheHeaderDropdown/>
      </CHeaderNav> */}

        {/* <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            >
              <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div>
      </CSubheader> */}
      </CHeader>
    </>
  );
};

export default TheHeader;
