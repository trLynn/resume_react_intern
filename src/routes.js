import React from "react";
import TemplateRegisterIndex from "./views/template-create/TemplateRegisterIndex";
const Dashboard = React.lazy(() => import("./views/dashboard/DashboardIndex"));
const AdminLogin = React.lazy(() => import("./views/login/AdminLoginIndex"));
// const UserForm = React.lazy(() => import("./views/userform/UserFormIndex"));
const AppListIndex = React.lazy(() =>
  import("./views/applicant-list/ApplicantListIndex")
);
const TemplateListIndex = React.lazy(() =>
  import("./views/template-list/TemplateListIndex")
);
// const TemplateRegisterIndex = React.lazy(() =>
//   import("./views/template-create/TemplateRegisterIndex")
// );
const Logout = React.lazy(() => import("./views/logout/Logout"))

//
const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/admin-login",
    name: "Admin Login",
    component: AdminLogin,
    exact: true,
  },
  { path: "/dashboard", name: "Dashboard", component: Dashboard, exact: true },
  {
    path: "/applicant-list",
    name: "Applicant List",
    component: AppListIndex,
    exact: true,
  },
  {
    path: "/template-list",
    name: "Template List",
    component: TemplateListIndex,
    exact: true,
  },
  {
    path: "/template-list/template-create",
    name: "Create CV",
    component: TemplateRegisterIndex,
    exact: true,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    exact: true,
  },
];

export default routes;
