/* eslint-disable linebreak-style */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/common/loader/loader.tsx";
import Calendar from "./container/dashboards/calendar/Calendar.tsx";
import { Reports } from "./container/dashboards/reports/Reports.tsx";
import Profile from "./container/dashboards/Profile/Profile.tsx";
import Dashboard from "./container/AdminDashboard/Dashboard/Dashboard.tsx";
import AdminSetSchedule from "./container/AdminDashboard/AdminSetSchedule/AdminSetSchedule.tsx";
import AdminProfile from "./container/AdminDashboard/AdminProfil/AdminProfile.tsx";
import AdminReports from "./container/AdminDashboard/AdminReport/AdminReports.tsx";
import Auth from "./firebase/auth.tsx";
import DoctorLogin from "./firebase/login.tsx";
import Signup from "./firebase/signup.tsx";
import Users from "./container/AdminDashboard/Users/Users.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <BrowserRouter>
      {/* <Provider store={store}> */}
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />}>
            <Route index element={<DoctorLogin />} />
            <Route
              path={`${import.meta.env.BASE_URL}firebase/login`}
              element={<DoctorLogin />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}firebase/signup`}
              element={<Signup />}
            />
          </Route>

          <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/calendar`}
              element={<Calendar />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/Reports`}
              element={<Reports />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}dashboards/Profile`}
              element={<Profile />}
            />

            <Route
              path={`${import.meta.env.BASE_URL}superAdmin/user`}
              element={<Users />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}superAdmin/dashboard`}
              element={<Dashboard />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}superAdmin/setschedule`}
              element={<AdminSetSchedule />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}superAdmin/profile`}
              element={<AdminProfile />}
            />
            <Route
              path={`${import.meta.env.BASE_URL}superAdmin/reports`}
              element={<AdminReports statesWithPatientsNo={[]} totalpatientCount={0} />}
            />
          </Route>
        </Routes>
      </React.Suspense>
      {/* </Provider> */}
    </BrowserRouter>
  </React.Fragment>
);
