import React, { Component} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const UserForm = React.lazy(() => import("./views/userform/UserFormIndex"));
const AdminLogin = React.lazy(() => import("./views/login/AdminLoginIndex"));
const UserLogin = React.lazy(() => import("./views/login/UserLoginIndex"));
const EmailValidation = React.lazy(() =>
  import("./views/login/EmailValidationIndex")
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/admin-login"
              name="Admin Login Page"
              render={(props) => <AdminLogin {...props} />}
            ></Route>
            <Route
              exact
              path="/template/user-login/:id"
              name="User Login Page"
              render={(props) => <UserLogin {...props} />}
            ></Route>
            <Route
              exact
              path="/template/email-verification"
              name="Email Verification"
              render={(props) => <EmailValidation {...props} />}
            ></Route>
            <Route
              exact
              path="/template/user-form"
              name="User-Form"
              render={(props) => <UserForm {...props} />}
            ></Route>
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />

            <Route
              path="/template-list/template-create"
              name="Create New CV"
              render={(props) => <TheLayout {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
