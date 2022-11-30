/* Dashboard  Index
 * @author Thu Ta
 * @create 24/6/2022
 */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DashboardForm from "./DashboardForm";
import { ApiRequest } from "../common/ApiRequest";

const DashboardIndex = () => {
  let history = useHistory(); //for history
  const [tempActives, setTempActives] = useState(); // actives template
  const [tempInActives, setTempInActives] = useState(); // InActive template
  const [tempTotal, setTempTotal] = useState(); // total template
  const [appPass, setAppPass] = useState(); // applicant success
  const [appProcess, setAppProcess] = useState(); // applicant processing
  const [appPending, setAppPending] = useState(); // applicant pending
  const [error, setError] = useState([]); // for error message
  const [loading, setLoading] = useState(false); // loading page default('false')

  useEffect(() => {
    let loginID = localStorage.getItem("LOGIN_ID");
    if (loginID == null) {
      history.push(`/admin-login`);
    }
    (async () => {
      await systemFormLoad();
    })();
    document.body.style.overflow = "auto";
  }, []);

  // Formload function
  const systemFormLoad = async () => {
    setLoading(true);
    let dashboard = {
      method: "get",
      url: "dashboard",
    };
    let response = await ApiRequest(dashboard);
    if (response.flag === false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status === "OK") {
        setLoading(false);
        setError([]);
        setTempActives(response.data.data.template_actives);
        setTempInActives(response.data.data.template_inactives);
        setTempTotal(response.data.data.template_total);
        setAppPass(response.data.data.applicant_success);
        setAppProcess(response.data.data.applicant_processing);
        setAppPending(response.data.data.applicant_pending);
      } else {
        setError(response.data.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <DashboardForm
      loading={loading}
      error={error}
      appPending={appPending}
      appProcess={appProcess}
      appPass={appPass}
      tempActives={tempActives}
      tempInActives={tempInActives}
      tempTotal={tempTotal}
    />
  );
};
export default DashboardIndex;
